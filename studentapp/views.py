from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import Student, School, extra_curricular, Acads, Graphs, Lists,UserAcces
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.shortcuts import get_object_or_404
import json
import os
import datetime
from pprint import pprint
import pandas as pd
from .forms import StudentForm
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.forms.models import model_to_dict
from django.contrib.auth.views import login
# Create your views here.
CSV_STORAGE = os.path.join(os.getcwd(), 'studentapp', 'static', 'csv')
 

def index(req):
	return JsonResponse({
		'error': False,
		'data': ['Api root', 'nice']
	})

def custom_login(request,template_name):
    if request.user.is_authenticated:
        return redirect('/?redirect=0')
    else:
        return login(request,template_name=template_name)

def get_formvals():
	retGraph = {'x':[] , 'y':[] , 'filters':{}}
	rval = Student._meta.get_fields()
	types = {'CharField':'string', 
			'IntegerField':'int',
			'BooleanField':'bool',
			'DateField':'date'}
	ss = Student.objects.all()[0]

	for i in rval:
		if types.__contains__(i.get_internal_type()):
			tem = {}
			if i.name in (
				['filter{}_name'.format(x) for x in range(1, 6)] +\
				['filter{}_active'.format(x) for x in range(1, 6)]):
				fnum, ftype = i.name.split('_')
				fnum = fnum[6]

				if ftype == 'name' and getattr(ss, 'filter{}_active'.format(fnum)):
					fname = getattr(ss, 'filter{}_name'.format(fnum))
					tem['name'] = fname
					tem['type'] = getattr(ss, 'filter{}_type'.format(fnum))
					retGraph['filters'][ss.filter1_name] = tem
					retGraph['x'].append(fname)
					retGraph['y'].append(fname)			
				
			else:
				tem['name'] = i.name
				tem['type'] = types[i.get_internal_type()]
				retGraph['filters'][i.name] = tem
				retGraph['x'].append(i.name)
				retGraph['y'].append(i.name)

	retr = {'graph':retGraph,'list':retGraph}
	return retr

@csrf_exempt
def formVal(request):
	retr = get_formvals()
	return JsonResponse(retr)

@csrf_exempt
def getGraph(request):
	ret = {}
	if request.method == 'POST' and request.user.is_authenticated:
		acc = json.loads(UserAcces.objects.get(user=request.user).acc)
		dt = json.loads(request.body.decode('ascii'))
		ss = Student.objects.all()[0]
		custom_filter_names = {
			getattr(ss, 'filter{}_name'.format(x)) : x for x in range(1, 6)
		}
		
		x_axis = dt['x']
		y_axis = dt['y']

		if x_axis in custom_filter_names:
			fid = custom_filter_names[x_axis]
			x_axis = 'filter{}_val'.format(fid)

		if y_axis in custom_filter_names:
			fid = custom_filter_names[y_axis]
			y_axis = 'filter{}_val'.format(fid)

		filters_all = dt['filters']
		new_filter = {}
		x_filter_present = False
		x_filter = {}

		for i in filters_all:
			parm = ''
			val = ''
			
			for v,k in i.items():
				if v == 'name':
					if k in custom_filter_names:
						fid = custom_filter_names[k]
						parm = 'filter{}_val'.format(fid)
					else:
						parm = k
				elif v == 'val':
					val = k 
				elif v == 'op':
					if k == '>=':
						parm += '__gte'
					elif k == '<=':
						parm += '__lte'
					elif k == '>':
						parm += '__gt'
					elif k == '<':
						parm += '__lt'

			for v,k in i.items():
				if v == 'type':
					if k == 'int':
						val = int(val)
					elif k == 'bool':
						val = bool(val)

			new_filter[parm] = val

			if i['name'] == x_axis:
				x_filter_present = True
				x_filter[parm] = val
		
		qs = Student.objects.filter(**new_filter)
	
		if acc['Country'] is False:
			
			starr = acc['State']
			ts = Student.objects.none()
			for i in starr:
				acc_filter ={}
				acc_filter['state'] = i
				ts = ts.union(Student.objects.filter(**acc_filter))
			starr = acc['District']
			for i in starr:
				acc_filter ={}
				acc_filter['district'] = i
				ts = ts.union(Student.objects.filter(**acc_filter))
		
			qs = qs.intersection(ts)
		
		if not x_filter_present:
			qss = Student.objects.all()
		else:
			qss = Student.objects.filter(**x_filter)

		data = {}
		tdata = {}  

		# Filtered objects
		for i in qs:
			ii = i.__dict__
			if isinstance(ii[x_axis], datetime.date):
				ii[x_axis] = str(ii[x_axis])
			
			if data.__contains__(ii[x_axis]):
				data[ii[x_axis]] = float(data[ii[x_axis]]*tdata[x_axis] + ii[y_axis])/(tdata[x_axis] + 1)
				tdata[x_axis] += 1
			
			else:
				data[ii[x_axis]] = ii[y_axis]
				tdata[x_axis] = 1
		
		data_nf = {}
		tdata_nf = {} 

		for i in qss:
			ii = i.__dict__
			if isinstance(ii[x_axis], datetime.date):
				ii[x_axis] = str(ii[x_axis])

			if data_nf.__contains__(ii[x_axis]):
				data_nf[ii[x_axis]] = float(data_nf[ii[x_axis]]*tdata_nf[x_axis] + ii[y_axis])/(tdata_nf[x_axis] + 1)
				tdata_nf[x_axis] += 1
			else:
				data_nf[ii[x_axis]] = ii[y_axis]
				tdata_nf[x_axis] = 1

		dt['data'] = data
		dt['data_nf'] = data_nf
		is_new_dash = False

		try:
			s = int(dt['dash_id'])
			dash_id = s
			gs = Graphs.objects.filter(dash_id=dash_id)
			ls = Lists.objects.filter(dash_id=dash_id)
			if len(gs) == 0 and les(ls) == 0:
				dash_name = 'Untitled Dashboard {}'.format(dash_id)
			else:
				if len(gs) > 0:
					dash_name = gs[0].dash_name
				else:
					dash_name = ls[0].dash_name

		except (TypeError, ValueError) as e:
			g = Graphs.objects.all()
			try:
				last = max(map(lambda x: x.id, g))
			except:
				last = 0
				
			dash_id = last + 1
			dash_name = 'Untitled Dashboard {}'.format(dash_id)
			is_new_dash = True

		if dt['id'] is not None:
			gd = Graphs.objects.get(id=dt['id'])
			gd.gD = json.dumps(dt)
			gd.dash_id = dash_id
			gd.dash_name = dash_name
			gd.save()
		
		else :
			gd = Graphs()
			gd.save()
			dt['id'] = gd.id
			gd.gD = json.dumps(dt)
			gd.dash_id = dash_id
			gd.dash_name = gd.dash_name
			gd.save()

		ret = dt
		ret['is_new_dash'] = is_new_dash
		ret['dash_id'] = dash_id
		ret['dash_name'] = dash_name

	return JsonResponse(ret)

def get_list_data(dt, request, id=None, save=True, limit=True):
	x_axis = dt['x']
	filters_all = dt['filters']
	new_filter = {}

	for i in filters_all:
		parm = ''
		val = ''
		for v, k in i.items():
			if v == 'name':
				parm = k
			elif v == 'val':
				val = k
			elif v == 'op':
				if k == '>=':
					parm += '__gte'
				elif k == '<=':
					parm += '__lte'
				elif k == '>':
					parm += '__gt'
				elif k == '<':
					parm += '__lt'
					
		for v, k in i.items():
			if v == 'type':
				if k == 'int':
					val = int(val)
				elif k == 'bool':
					val = bool(val)
		new_filter[parm] = val

	qs = Student.objects.filter(**new_filter)
	if request.user.is_authenticated:
		acc = json.loads(UserAcces.objects.get(user=request.user).acc)
		if acc['Country'] is False:
			starr = acc['State']
			ts = Student.objects.none()
			for i in starr:
				acc_filter ={}
				acc_filter['state'] = i
				ts = ts.union(Student.objects.filter(**acc_filter))
			starr = acc['District']
			for i in starr:
				acc_filter ={}
				acc_filter['district'] = i
				ts = ts.union(Student.objects.filter(**acc_filter))
			qs = qs.intersection(ts)

	data = []
	ret = {}

	for i in qs:
		ii = i.__dict__
		tem = {}

		if not ii['aadhar_id'] in ret:
			x_vals = []
			x_unpack = {}
			for k, v in x_axis.items():
				x_vals.append(ii[k])
				x_unpack[k] = ii[k]
				
			ret[ii['aadhar_id']] = {'name': ii['name'], 
					'value': x_vals, 
                    'std': ii['std'], 'unpacked': x_unpack}
		
		else:
			if ret[ii['aadhar_id']]['std'] < ii['std']:
				x_vals = []
				x_unpack = {}
				for k, v in x_axis.items():
					x_vals.append(ii[k])
					x_unpack[k] = ii[k]


				ret[ii['aadhar_id']] = {
					'name': ii['name'], 'value': x_vals, 
					'std': ii['std'], 'unpacked': x_unpack }

	pddata = []
	for k, v in ret.items():
		data.append({
			'name': v['name'],
			'value': v['value'],
			'aadhar_id': k,
			'unpack': v['unpacked'],
		})
		
		udata = {'aadhar_id': k, 'name': v['name']}
		for kx, vx in v['unpacked'].items():
			udata[kx] = vx
		
		pddata.append(udata)
	
	data = sorted(data, key= lambda k : k['value'])
	
	if limit:
		data = data[::-1][:300]

	dt['data'] = data
	if not save:
		return dt
	
	df = pd.DataFrame(pddata)
	is_new_dash = False
	try:
		s = int(id)
		dash_id = s

	except (TypeError, ValueError) as e:
		g = Lists.objects.all()
		gg = Graphs.objects.all()

		if len(g) == 0 and len(gg) == 0:
			last = 0
		else:
			comb_g = [x.id for x in g]
			comb_gg = [x.id for x in gg]

			last = max(comb_g + comb_gg)

		dash_id = last + 1
		is_new_dash = True

	if dt['id'] is not None:
		gd = Lists.objects.get(id=dt['id'])
		df.to_csv(os.path.join(CSV_STORAGE, str(dt['id']) + '.csv'), index=False)
		dt['csv_path'] = 'static/csv/' + str(dt['id']) + '.csv'
		gd.lD = json.dumps(dt)	
		gd.dash_id = dash_id
		gd.save()

	else:
		gd = Lists()
		gd.save()
		dt['id'] = gd.id
		df.to_csv(os.path.join(CSV_STORAGE, str(dt['id']) + '.csv'), index=False)
		dt['csv_path'] = 'static/csv/' + str(dt['id']) + '.csv'
		gd.lD = json.dumps(dt)
		gd.dash_id = dash_id
		gd.save()

	dt['is_new_dash'] = is_new_dash
	dt['dash_id'] = dash_id
	return dt
	
@csrf_exempt
def getList(request):
	ret = {} 
	if request.method == 'POST':
		dt = json.loads(request.body.decode('ascii'))
		ret = get_list_data(dt, request, dt['dash_id'])
	return JsonResponse(ret)

@csrf_exempt
def allGraphs(request, id):
	try:
		ids = int(id)
		qs = Graphs.objects.filter(dash_id=ids)
		if len(qs) > 0:
			dash_name = qs[0].dash_name
		else:
			dash_name = 'Untitled Dashboard {}'.format(ids)

		data = []
		for i in qs:
			data.append( json.loads(i.gD) )
	except:
		data = []
		dash_name = 'Untitled Dashboard'
		
	return JsonResponse( {
        'data':data,
		'dash_name': dash_name,
    })

@csrf_exempt
def allLists(request, id):
	try:
		ids = int(id)
		qs = Lists.objects.filter(dash_id=ids)
		if len(qs) > 0:
			dash_name = qs[0].dash_name
		else:
			dash_name = 'Untitled Dashboard {}'.format(ids)
		data = []
		for i in qs:
			data.append( json.loads(i.lD) )
	except ValueError:
		data = []
		dash_name = 'Untitled Dashboard'

	return JsonResponse( {
        'data':data,
        'dash_name': dash_name,
    })

@csrf_exempt
def delete_graph(request, id):
    g = get_object_or_404(Graphs, pk=id)
    g.delete()
    return JsonResponse({
            "error": "false"
        })


@csrf_exempt
def delete_list(request, id):
    l = get_object_or_404(Lists, pk=id)
    l.delete()
    return JsonResponse({
        "error": "false"
    })

@csrf_exempt
def suggestions(request):
	if request.method == 'POST':
		qJson = json.loads(request.body.decode('ascii'))

		query = qJson['query']
		if query == '':
			return JsonResponse({
				'student': [],
				'state': [],
				'district': [],
				'school': []
			})

		studentList = []
		studentsMatching = Q() | Q(name__contains=query) 

		allStudentsMatching = Student.objects.filter(studentsMatching)

		schoolsMatching = Q()
		schoolsMatching = schoolsMatching | Q(school__contains=query)
		allschoolsMatching = Student.objects.filter(schoolsMatching)

		districtsMatching = Q()
		districtsMatching = districtsMatching | Q(district__contains=query)
		alldistrictsMatching = Student.objects.filter(districtsMatching)

		statesMatching = Q()
		statesMatching = statesMatching | Q(state__contains=query)
		allstatesMatching = Student.objects.filter(statesMatching)

		if request.user.is_authenticated:
			acc = json.loads(UserAcces.objects.get(user=request.user).acc)
			
			if acc['Country'] is False:
				starr = acc['State']
				ts = Student.objects.none()
				for i in starr:
					acc_filter ={}
					acc_filter['state'] = i
					ts = ts.union(Student.objects.filter(**acc_filter))
				starr = acc['District']
				for i in starr:
					acc_filter ={}
					acc_filter['district'] = i
					ts = ts.union(Student.objects.filter(**acc_filter))
				allStudentsMatching = allStudentsMatching.intersection(ts)
				allschoolsMatching = allschoolsMatching.intersection(ts)
				alldistrictsMatching = alldistrictsMatching.intersection(ts)
				allstatesMatching = allstatesMatching.intersection(ts)

		aadharSet = set()

		for s in allStudentsMatching:
			if not aadharSet.__contains__(s.aadhar_id):
				studentList.append({
					'id': s.aadhar_id,
					'name': s.name,
					'school': s.school,
					'district': s.district,
					'state': s.state,
				})

				aadharSet.add(s.aadhar_id)

		schoolList = list(map(lambda s: {'name': s}, set([s.school for s in allschoolsMatching])))

		districtList = list(map(lambda s: {'name': s}, set([s.district for s in alldistrictsMatching])))

		stateList = list(map(lambda s: {'name': s}, set([s.state for s in allstatesMatching])))

		
		result= {
			'student': studentList,
			'state': stateList,
			'district': districtList,
			'school': schoolList
		}

		return JsonResponse(result)

@csrf_exempt
def getStudentData(request,aadhar_id):
	ret = {}
	if request.method == 'GET':
		aadhar_id_dt = aadhar_id
		qs = Student.objects.filter(aadhar_id=aadhar_id_dt)
		data = []
		acad_data = []
		sport_data = []
		c_data = []
		d_data = []
		eng = 0.0
		maths = 0.0
		hindi = 0.0
		sci = 0.0
		name = ''
		school = ''
		district = ''
		state = ''
		d = {}
		for i in qs:
			acad_data.append({str(i.date):i.marks})
			sport_data.append({str(i.date):i.sport})
			c_data.append({str(i.date):i.extra_curr})
			d_data.append({str(i.date):i.atten})
			eng += i.english_marks
			maths += i.maths_marks
			sci += i.science_marks
			hindi += i.hindi_marks
			name = i.name
			school = i.school
			district = i.district
			state = i.state
			d = model_to_dict(i)

		eng /= len(qs)
		maths /= len(qs)
		sci /= len(qs)
		hindi /= len(qs)
		data = [{'english':eng},{'maths':maths},{'science':sci},{'hindi':hindi}]
		ret = { 
			'data':data, 
			'acad_data':acad_data, 
			'sport_data':sport_data,
			'c_data':c_data, 
			'd_data':d_data,
			'details': {
				'name': name,
				'school': school,
				'district': district,
				'state': state,
			},
			'params': d
		}
	return JsonResponse(ret) 

@csrf_exempt
def studentform(request):
	retGraph = {'x':[] , 'y':[] , 'filters':{}}
	rval = Student._meta.get_fields()
	types = {'CharField':'string', 
			'IntegerField':'int',
			'BooleanField':'bool',
			'DateField':'date'}
	ss = Student.objects.all()[0]

	for i in rval:
		if types.__contains__(i.get_internal_type()):
			tem = {}
			if i.name in (
				['filter{}_name'.format(x) for x in range(1, 6)] +\
				['filter{}_active'.format(x) for x in range(1, 6)]):
				fnum, ftype = i.name.split('_')
				fnum = fnum[6]

				if ftype == 'name' and getattr(ss, 'filter{}_active'.format(fnum)):
					tem['name'] = ss.filter1_name
					tem['type'] = ss.filter1_type
			else:
				tem['name'] = i.name
				tem['type'] = types[i.get_internal_type()]
				retGraph['filters'][i.name] = tem
				
			if 'filter' not in i.name:
				retGraph['x'].append(i.name)
				retGraph['y'].append(i.name)
	content = {} 
	for i in retGraph['x']:
		content[i] = i
	if request.method == 'POST':
		tem = Student()
		for k,v in content.items():
			setattr(tem,k,request.POST[k])		
		tem.save()

	return render(request,'studentform.html',{'content':content})

def convert_filters(filters):
    sendfilters = []
    for y in filters:
        r = {}
        if not type(y) is dict:
            continue

        for k, v in y.items():
            if k == 'parameter':
                r['name'] = v
                if v == 'number of parents':
                    r['name'] = 'no_of_parents'
                elif v == 'number of siblings':
                    r['name'] = 'no_of_siblings'
                elif len(v.split()) > 1:
                    r['name'] = '_'.join(v.split())

            elif k == 'operator':
                r['op'] = v
            else:
                if k == 'number':
                    r['type'] = 'number'
                else:
                    if v == 'True' or v == 'False':
                        r['type'] = 'bool'
                    else:
                        r['type'] = 'string'

                r['val'] = v
        sendfilters.append(r)
    return sendfilters

def fix_param(param):
	if len(param.strip().split()) > 1:
		return '_'.join(param.strip().split())
	else:
		return param


def fix_param_display(param):
	if param == 'atten':
		return 'attendance'
	elif param  == 'no of parents':
		return 'number of parents'
	elif param == 'no of siblings':
		return 'number of siblings'
	elif param == 'std':
		return 'standard'
	elif param == 'Fedu':
		return 'Father\'s education'
	elif param == 'Medu':
		return 'Mother\'s education'
	else:
		return param

@csrf_exempt
def get_student_list(request):
	if request.method == 'POST':
		filters = json.loads(request.body)['filters']
		# sendfilters = convert_filters(filters)
		ret = get_list_data({
				'x': {'state': True, 'school': True, 'district': True},
				'filters': filters,
                }, request, None, False, False)

		return JsonResponse({
			'data': ret['data'],
		})

	else:
		return JsonResponse({
			error: True
		})

@csrf_exempt
def chatbot(request):
	if request.method == 'POST':
		data = json.loads(request.body)
		if not data['status']['code'] == 200:
			return JsonResponse({
				error: 'true',
			})

		result = data['result']

		if result['action'] == 'get_param_list':
			ret = get_formvals()
			s = ', '.join(ret['graph']['x'])
			ans = 'The possible list of parameters are {}'.format(s)
			return JsonResponse({
				'speech': ans,
				'displayText': ans,
			})

		elif result['action'] == 'get_correlation':
			df = pd.read_csv(os.path.join(os.getcwd(), 'studentapp', 'static', 'misc', 'corr.csv'))
			df = df.set_index(df.columns[0])

			p1 = result['parameters']['Parameter']
			p2 = result['parameters']['Parameter1']
			p1f = fix_param(p1)
			p2f = fix_param(p2)

			corr_value = df[p1f][p2f]
			if corr_value >= 0.15:
				comp = 'strongly and positively correlated'
			elif corr_value <= -0.15:
				comp = 'strongly and negatively correlated'
			else:
				comp = 'not correlated'

			p1 = fix_param_display(p1)
			p2 = fix_param_display(p2)

			return JsonResponse({
				'speech': 'The factors {} and {} are {}'.format(p1, p2, comp),
				'displayText': 'The factors {} and {} are {}'.format(p1, p2, comp),
			})

		elif result['action'] in ['get_filters', 'get_number_filters']:
			filters = result['parameters']['Filter']
			sendfilters = convert_filters(filters)
			x_ans = {}

			try:
				x = result['parameters']['Parameter']
				for v in x:
					if len(v.split()) > 1:
						v = '_'.join(v.split())
					x_ans[v] = True

			except KeyError:
				x_ans = {}

			payload = get_list_data({
				'x': x_ans,
				'filters': sendfilters,
			}, request, None, False, False)

			datalen = len(payload['data'])
			payload['data'] = payload['data'][::-1][:30]

			if result['action'] == 'get_filters':
				
				return JsonResponse({
					'speech': 'Here is a list of top students satisfying your query',
					'displayText': 'Here is a list of top students satisfying your query',
					'data': payload,
				})

			elif result['action'] == 'get_number_filters':
				return JsonResponse({
					'speech': 'There are {} students satisfying your query'.format(datalen),
					'displayText': 'There are {} students satisfying your query'.format(datalen)
				})

		else:
			return JsonResponse({
				'error': 'false',
			})

def StrToDate(strg):
	return datetime.datetime.strptime(strg, '%Y-%m-%d').date()
def StudentFilterLatest(filters,ordering):
	qs = Student.objects.filter(**filters).order_by(ordering)
	sm = {}
	mm = {}
	for i in qs:
		if sm.__contains__(i.aadhar_id):
			if mm[i.aadhar_id] > i.date:
				mm[i.aadhar_id] = i.date
				sm[i.aadhar_id] = i
		else:
			mm[i.aadhar_id] = i.date
			sm[i.aadhar_id] = i
	arr = []
	for k,v in sm.items():
		arr.append(v)
	arr = sorted(arr,key = lambda x: getattr(x,ordering[1:]),reverse=True)
	return arr


@csrf_exempt
def getStateData(request,state_name):
	ret = {}
	if request.method == 'GET':
		pp_data = {}
		ex_curr = {}
		state_ct = {}
		sport_d = {}
		top_marks = []
		top_sport = []
		top_extra_curr = [] 
		fl = False
		try:
			start = request.GET['start']
			end = request.GET['end']
			fl = True
			qs = Student.objects.filter(**{'state': state_name, 'date__gte': StrToDate(
				start+'-01-01'), 'date__lte': StrToDate(end+'-12-31')})
			print(len(qs))
			p_c = len(Student.objects.filter(state=state_name, marks__gte=35, date__gte=StrToDate(
				start+'-01-01'), date__lte=StrToDate(end+'-12-31')))*100.0/(len(qs))
			p_b = len(Student.objects.filter(state=state_name, gender="m", date__gte=StrToDate(
				start+'-01-01'), date__lte=StrToDate(end+'-12-31')))*100.0/(len(qs))
			p_g = len(Student.objects.filter(state=state_name, gender="f", date__gte=StrToDate(
				start+'-01-01'), date__lte=StrToDate(end+'-12-31')))*100.0/(len(qs))
		except KeyError:
			qs = Student.objects.filter(state=state_name)
			p_c = len(Student.objects.filter(
				state=state_name, marks__gte=35))*100.0/(len(qs))
			p_b = len(Student.objects.filter(
				state=state_name, gender="m"))*100.0/(len(qs))
			p_g = len(Student.objects.filter(
				state=state_name, gender="f"))*100.0/(len(qs))
		for i in qs:
			c_state = i.district
			if state_ct.__contains__(c_state):
				pp_data[c_state] = float(pp_data[c_state]*state_ct[c_state] + i.marks)/(state_ct[c_state] + 1)
				ex_curr[c_state] = float(ex_curr[c_state]*state_ct[c_state] + i.extra_curr)/(state_ct[c_state] + 1)
				sport_d[c_state] = float(sport_d[c_state]*state_ct[c_state] + i.sport)/(state_ct[c_state] + 1)
				state_ct[c_state] += 1
			else:
				pp_data[c_state] = float(i.marks)
				ex_curr[c_state] = float(i.extra_curr)
				sport_d[c_state] = float(i.sport)
				state_ct[c_state] = 1
		t_s_a = {'district':'','avg':0}
		t_s_s = {'district':'','avg':0}
		t_s_e = {'district':'','avg':0}
		for k,v in ex_curr.items():
			if v >= t_s_e['avg']:
				t_s_e['avg'] = v
				t_s_e['district'] = k

		for k,v in sport_d.items():
			if v >= t_s_s['avg']:
				t_s_s['avg'] = v
				t_s_s['district'] = k

		for k,v in pp_data.items():
			if v >= t_s_a['avg']:
				t_s_a['avg'] = v
				t_s_a['district'] = k
		s_n = state_name
		if fl:
			qs = StudentFilterLatest({'state':state_name, 'date__gte': StrToDate(
				start+'-01-01'), 'date__lte': StrToDate(end+'-12-31')}, '-marks')[:10]
		else:
			qs = StudentFilterLatest({'state': state_name, 'date__gte': datetime.datetime.strptime(
				'2010-01-01', '%Y-%m-%d').date()}, '-marks')[:10]
		for i in qs:
			top_marks.append({'name':i.name,'marks':i.marks,'district':i.district})
		if fl:
			qs = StudentFilterLatest({'state': state_name, 'date__gte': StrToDate(
				start+'-01-01'), 'date__lte': StrToDate(end+'-12-31')}, '-extra_curr')[:10]
		else:
			qs = StudentFilterLatest({'state': state_name, 'date__gte': datetime.datetime.strptime(
				'2010-01-01', '%Y-%m-%d').date()}, '-extra_curr')[:10]
		for i in qs:
			top_extra_curr.append({'name':i.name,'extra_curr':i.extra_curr,'district':i.district})
		if fl:
			qs = StudentFilterLatest({'state': state_name, 'date__gte': StrToDate(
				start+'-01-01'), 'date__lte': StrToDate(end+'-12-31')}, '-sport')[:10]
		else:
			qs = StudentFilterLatest({'state': state_name, 'date__gte': datetime.datetime.strptime(
				'2010-01-01', '%Y-%m-%d').date()}, '-sport')[:10]
		for i in qs:
			top_sport.append({'name':i.name,'sport':i.sport,'district':i.district})
		qs = Student.objects.filter(state=state_name)
		dist_names = list({i.district for i in qs}) 
		ret = {'s_n':s_n,'pp_data':pp_data,'ex_curr':ex_curr,'ss_no':state_ct,'sport_d':sport_d,'top_marks':top_marks,'top_sport':top_sport,'top_extra_curr':top_extra_curr,'t_s_a':t_s_a,'t_s_s':t_s_s,'t_s_e':t_s_e,'p_c':p_c,'p_b':p_b,'p_g':p_g,'districts':dist_names}
	return JsonResponse(ret)

@csrf_exempt
def getDistrictData(request,district_name):
	ret = {}
	if request.method == 'GET':
		pp_data = {}
		ex_curr = {}
		state_ct = {}
		sport_d = {}
		top_marks = []
		top_sport = []
		top_extra_curr = [] 
		fl = False
		try:
			start = request.GET['start']
			end = request.GET['end']
			fl = True
			qs = Student.objects.filter(**{'district':district_name,'date__gte': StrToDate(start+'-01-01'), 'date__lte': StrToDate(end+'-12-31')})
			print(len(qs))
			p_c = len(Student.objects.filter(district=district_name,marks__gte=35,date__gte=StrToDate(start+'-01-01'),date__lte=StrToDate(end+'-12-31')))*100.0/(len(qs))
			p_b = len(Student.objects.filter(district=district_name,gender="m",date__gte=StrToDate(start+'-01-01'),date__lte=StrToDate(end+'-12-31')))*100.0/(len(qs))
			p_g = len(Student.objects.filter(district=district_name,gender="f", date__gte=StrToDate(
				start+'-01-01'), date__lte=StrToDate(end+'-12-31')))*100.0/(len(qs))
		except KeyError:
			qs = Student.objects.filter(district=district_name)
			p_c = len(Student.objects.filter(
				district=district_name, marks__gte=35))*100.0/(len(qs))
			p_b = len(Student.objects.filter(
				district=district_name, gender="m"))*100.0/(len(qs))
			p_g = len(Student.objects.filter(
				district=district_name, gender="f"))*100.0/(len(qs))
		for i in qs:
			c_state = i.school
			if state_ct.__contains__(c_state):
				pp_data[c_state] = float(pp_data[c_state]*state_ct[c_state] + i.marks)/(state_ct[c_state] + 1)
				ex_curr[c_state] = float(ex_curr[c_state]*state_ct[c_state] + i.extra_curr)/(state_ct[c_state] + 1)
				sport_d[c_state] = float(sport_d[c_state]*state_ct[c_state] + i.sport)/(state_ct[c_state] + 1)
				state_ct[c_state] += 1
			else:
				pp_data[c_state] = float(i.marks)
				ex_curr[c_state] = float(i.extra_curr)
				sport_d[c_state] = float(i.sport)
				state_ct[c_state] = 1
		t_s_a = {'school':'','avg':0}
		t_s_s = {'school':'','avg':0}
		t_s_e = {'school':'','avg':0}
		for k,v in ex_curr.items():
			if v >= t_s_e['avg']:
				t_s_e['avg'] = v
				t_s_e['school'] = k

		for k,v in sport_d.items():
			if v >= t_s_s['avg']:
				t_s_s['avg'] = v
				t_s_s['school'] = k

		for k,v in pp_data.items():
			if v >= t_s_a['avg']:
				t_s_a['avg'] = v
				t_s_a['school'] = k
		s_n = district_name
		
		if fl:
			qs = StudentFilterLatest({'district':district_name,'date__gte':StrToDate(start+'-01-01'),'date__lte':StrToDate(end+'-12-31')},'-marks')[:10]	
		else:
			qs = StudentFilterLatest({'district': district_name,'date__gte': datetime.datetime.strptime('2010-01-01', '%Y-%m-%d').date()}, '-marks')[:10]
		for i in qs:
			top_marks.append({'name':i.name,'marks':i.marks,'district':i.district})
		if fl:
			qs = StudentFilterLatest({'district':district_name,'date__gte':StrToDate(start+'-01-01'),'date__lte':StrToDate(end+'-12-31')},'-extra_curr')[:10]	
		else:
			qs = StudentFilterLatest({'district': district_name,'date__gte': datetime.datetime.strptime('2010-01-01', '%Y-%m-%d').date()}, '-extra_curr')[:10]
		for i in qs:
			top_extra_curr.append({'name':i.name,'extra_curr':i.extra_curr,'district':i.district})
		if fl:
			qs = StudentFilterLatest({'district':district_name,'date__gte':StrToDate(start+'-01-01'),'date__lte':StrToDate(end+'-12-31')},'-sport')[:10]	
		else:
			qs = StudentFilterLatest({'district': district_name,'date__gte': datetime.datetime.strptime('2010-01-01', '%Y-%m-%d').date()}, '-sport')[:10]
		for i in qs:
			top_sport.append({'name':i.name,'sport':i.sport,'district':i.district})
		qs = Student.objects.filter(district=district_name)
		school_names = list({i.school for i in qs}) 
		ret = {'s_n':s_n,'pp_data':pp_data,'ex_curr':ex_curr,'ss_no':state_ct,'sport_d':sport_d,'top_marks':top_marks,'top_sport':top_sport,'top_extra_curr':top_extra_curr,'t_s_a':t_s_a,'t_s_s':t_s_s,'t_s_e':t_s_e,'p_c':p_c,'p_b':p_b,'p_g':p_g,'schools':school_names}
	return JsonResponse(ret)

@csrf_exempt
def getCountryData(request):
	ret = {}
	if request.method == 'GET':
		pp_data = {}
		ex_curr = {}
		state_ct = {}
		sport_d = {}
		top_marks = []
		top_sport = []
		top_extra_curr = [] 
		fl = False
		try:
			start = request.GET['start']
			end = request.GET['end']
			fl = True
			qs = Student.objects.filter(**{'date__gte':StrToDate(start+'-01-01'),'date__lte':StrToDate(end+'-12-31')})
			print(len(qs))
			p_c = len(Student.objects.filter(marks__gte=35,date__gte=StrToDate(start+'-01-01'),date__lte=StrToDate(end+'-12-31')))*100.0/(len(qs))
			p_b = len(Student.objects.filter(gender="m",date__gte=StrToDate(start+'-01-01'),date__lte=StrToDate(end+'-12-31')))*100.0/(len(qs))
			p_g = len(Student.objects.filter(gender="f", date__gte=StrToDate(
				start+'-01-01'), date__lte=StrToDate(end+'-12-31')))*100.0/(len(qs))
		except KeyError:
			qs = Student.objects.all()
			p_c = len(Student.objects.filter(marks__gte=35))*100.0/(len(qs))
			p_b = len(Student.objects.filter(gender="m"))*100.0/(len(qs))
			p_g = len(Student.objects.filter(gender="f"))*100.0/(len(qs))
		for i in qs:
			c_state = i.state
			if state_ct.__contains__(c_state):
				pp_data[c_state] = float(pp_data[c_state]*state_ct[c_state] + i.marks)/(state_ct[c_state] + 1)
				ex_curr[c_state] = float(ex_curr[c_state]*state_ct[c_state] + i.extra_curr)/(state_ct[c_state] + 1)
				sport_d[c_state] = float(sport_d[c_state]*state_ct[c_state] + i.sport)/(state_ct[c_state] + 1)
				state_ct[c_state] += 1
			else:
				pp_data[c_state] = float(i.marks)
				ex_curr[c_state] = float(i.extra_curr)
				sport_d[c_state] = float(i.sport)
				state_ct[c_state] = 1
		t_s_a = {'state':'','avg':0}
		t_s_s = {'state':'','avg':0}
		t_s_e = {'state':'','avg':0}
		for k,v in ex_curr.items():
			if v >= t_s_e['avg']:
				t_s_e['avg'] = v
				t_s_e['state'] = k

		for k,v in sport_d.items():
			if v >= t_s_s['avg']:
				t_s_s['avg'] = v
				t_s_s['state'] = k

		for k,v in pp_data.items():
			if v >= t_s_a['avg']:
				t_s_a['avg'] = v
				t_s_a['state'] = k
		if fl:
			qs = StudentFilterLatest({'date__gte':StrToDate(start+'-01-01'),'date__lte':StrToDate(end+'-12-31')},'-marks')[:10]	
		else:
			qs = StudentFilterLatest({'date__gte':datetime.datetime.strptime('2010-01-01','%Y-%m-%d').date()},'-marks')[:10]
		for i in qs:
			top_marks.append({'name':i.name,'marks':i.marks,'state':i.state})
		if fl:
			qs = StudentFilterLatest({'date__gte':StrToDate(start+'-01-01'),'date__lte':StrToDate(end+'-12-31')},'-extra_curr')[:10]	
		else:
			qs = StudentFilterLatest({'date__gte':datetime.datetime.strptime('2010-01-01','%Y-%m-%d').date()},'-extra_curr')[:10]
		for i in qs:
			top_extra_curr.append({'name':i.name,'extra_curr':i.extra_curr,'state':i.state})
		if fl:
			qs = StudentFilterLatest({'date__gte':StrToDate(start+'-01-01'),'date__lte':StrToDate(end+'-12-31')},'-sport')[:10]	
		else:
			qs = StudentFilterLatest({'date__gte':datetime.datetime.strptime('2010-01-01','%Y-%m-%d').date()},'-sport')[:10]
		for i in qs:
			top_sport.append({'name':i.name,'sport':i.sport,'state':i.state})
		qs = Student.objects.all()
		state_names = list({i.state for i in qs}) 
		ret = {'pp_data':pp_data,'ex_curr':ex_curr,'ss_no':state_ct,'sport_d':sport_d,'top_marks':top_marks,'top_sport':top_sport,'top_extra_curr':top_extra_curr,'t_s_a':t_s_a,'t_s_s':t_s_s,'t_s_e':t_s_e,'p_c':p_c,'p_b':p_b,'p_g':p_g,'states':state_names}
	return JsonResponse(ret)

@csrf_exempt

def getSchoolData(request,school_name):
	ret = {}
	if request.method == 'GET':
		top_marks = []
		top_sport = []
		top_extra_curr = [] 
		fl = False
		try:
			start = request.GET['start']
			end = request.GET['end']
			fl = True
			qs = Student.objects.filter(**{'school':school_name,'date__gte': StrToDate(start+'-01-01'), 'date__lte': StrToDate(end+'-12-31')})
			print(len(qs))
			p_c = len(Student.objects.filter(school=school_name,marks__gte=35,date__gte=StrToDate(start+'-01-01'),date__lte=StrToDate(end+'-12-31')))*100.0/(len(qs))
			p_b = len(Student.objects.filter(school=school_name,gender="m",date__gte=StrToDate(start+'-01-01'),date__lte=StrToDate(end+'-12-31')))*100.0/(len(qs))
			p_g = len(Student.objects.filter(school=school_name, gender="f", date__gte=StrToDate(
				start+'-01-01'), date__lte=StrToDate(end+'-12-31')))*100.0/(len(qs))
		except KeyError:
			qs = Student.objects.filter(school=school_name)
			p_c = len(Student.objects.filter(school=school_name,marks__gte=35))*100.0/(len(qs))
			p_b = len(Student.objects.filter(school=school_name,gender="m"))*100.0/(len(qs))
			p_g = len(Student.objects.filter(school=school_name,gender="f"))*100.0/(len(qs))
		print(len(qs))
		if fl:
			qs = StudentFilterLatest({'school': school_name, 'date__gte': StrToDate(
				start+'-01-01'), 'date__lte': StrToDate(end+'-12-31')}, '-marks')[:10]
		else:
			qs = StudentFilterLatest({'school': school_name, 'date__gte': datetime.datetime.strptime(
				'2010-01-01', '%Y-%m-%d').date()}, '-marks')[:10]
		for i in qs:
			top_marks.append({'name':i.name,'value':i.marks})
		if fl:
			qs = StudentFilterLatest({'school': school_name, 'date__gte': StrToDate(
				start+'-01-01'), 'date__lte': StrToDate(end+'-12-31')}, '-extra_curr')[:10]
		else:
			qs = StudentFilterLatest({'school': school_name, 'date__gte': datetime.datetime.strptime(
				'2010-01-01', '%Y-%m-%d').date()}, '-extra_curr')[:10]
		for i in qs:
			top_extra_curr.append({'name':i.name,'value':i.extra_curr})
		if fl:
			qs = StudentFilterLatest({'school': school_name, 'date__gte': StrToDate(
				start+'-01-01'), 'date__lte': StrToDate(end+'-12-31')}, '-sport')[:10]
		else:
			qs = StudentFilterLatest({'school': school_name, 'date__gte': datetime.datetime.strptime(
				'2010-01-01', '%Y-%m-%d').date()}, '-sport')[:10]
		for i in qs:
			top_sport.append({'name':i.name,'value':i.sport})
		s_n = school_name
		if fl:
			qs = Student.objects.filter(**{'school': school_name, 'date__gte': StrToDate(
				start+'-01-01'), 'date__lte': StrToDate(end+'-12-31')})
		else:
			qs = Student.objects.filter(school=school_name)
		avg_marks = 0.0
		avg_sport = 0.0
		avg_extra_curr =0.0
		for i in qs:
			avg_marks+= float(i.marks)
			avg_sport+= float(i.sport)
			avg_extra_curr+= float(i.extra_curr)
		avg_marks /= len(Student.objects.filter(school=school_name))
		avg_sport /= len(Student.objects.filter(school=school_name))
		avg_extra_curr /= len(Student.objects.filter(school=school_name)) 
		b_marks = []	
		if fl:
			qs = StudentFilterLatest({'school': school_name, 'date__gte': StrToDate(
				start+'-01-01'), 'date__lte': StrToDate(end+'-12-31'),'gender':'m'}, '-marks')[:10]
		else:
			qs = StudentFilterLatest({'school': school_name, 'date__gte': datetime.datetime.strptime(
				'2010-01-01', '%Y-%m-%d').date(),'gender':'m'}, '-marks')[:10]
		for i in qs:
			b_marks.append({'name':i.name,'value':i.marks})
		g_marks = []	
		if fl:
			qs = StudentFilterLatest({'school': school_name, 'date__gte': StrToDate(
				start+'-01-01'), 'date__lte': StrToDate(end+'-12-31'), 'gender': 'f'}, '-marks')[:10]
		else:
			qs = StudentFilterLatest({'school': school_name, 'date__gte': datetime.datetime.strptime(
				'2010-01-01', '%Y-%m-%d').date(), 'gender': 'f'}, '-marks')[:10]
		for i in qs:
			g_marks.append({'name':i.name,'value':i.marks})
		qs = Student.objects.filter(school=school_name)
		st_st = set()
		student_names = [] 
		for i in qs:
			if st_st.__contains__(i.aadhar_id) is False:
				student_names.append({'name':i.name,'value':i.aadhar_id})
				st_st.add(i.aadhar_id)
		ret = {'s_n':s_n,'p_marks':top_marks,'p_sport':top_sport,'top_extra_curr':top_extra_curr,'p_c':p_c,'p_b':p_b,'p_g':p_g,'avg_marks':avg_marks,'avg_sport':avg_sport,'avg_extra_curr':avg_extra_curr,'b_marks':b_marks,'g_marks':g_marks,'students':student_names}
	return JsonResponse(ret)

def get_drawer_data(request):
	graphs = Graphs.objects.all()
	lists = Lists.objects.all()
	dashboard_ids = set(map(lambda x: x.dash_id,  graphs )) | set(map(lambda x : x.dash_id, lists))
	dashboard_names = set(map(lambda x: x.dash_name, graphs))

	all_dashboards = {}
	for g in graphs:
		all_dashboards[g.dash_id] = {'id': g.dash_id, 'name': g.dash_name}
	for l in lists:
		all_dashboards[l.dash_id] = {'id': l.dash_id, 'name': l.dash_name}

	dashboards = [v for k, v in all_dashboards.items()]
	s = Student.objects.all()[0]
	custom_filters = list()

	for x in range(1, 6):
		if getattr(s, 'filter{}_active'.format(x)):
			custom_filters.append({
				'name': getattr(s, 'filter{}_name'.format(x)),
				'id': x,
			})
	
	return JsonResponse({
		'dashboards': dashboards,
		'custom_filters': custom_filters,
	})

@csrf_exempt
def filter_data(request):
	if request.method == 'POST':
		filter_info = json.loads(request.body.decode('utf-8'))
		fil_name = filter_info['filter_name']
		fil_type = filter_info['filter_type']
		stu_sel = filter_info['students_selected']
		filter_default = filter_info['filter_default']
		
		s_All = Student.objects.all()
		set_filter_id = -1

		for s in s_All:
			for i in range(1, 6):
					if not getattr(s, 'filter{}_active'.format(i)):
						set_filter_id = i
						setattr(s, 'filter{}_name'.format(set_filter_id), fil_name)
						setattr(s, 'filter{}_type'.format(set_filter_id), fil_type)
						setattr(s, 'filter{}_active'.format(set_filter_id), True)
						setattr(s, 'filter{}_val'.format(set_filter_id), filter_default)
						s.save()
						break

		for i in stu_sel:
			t = i['aadhar_id']
			v = i['value']

			ss = Student.objects.filter(aadhar_id=t)
			for s in ss:					
				setattr(s, 'filter{}_name'.format(set_filter_id), fil_name)
				setattr(s, 'filter{}_type'.format(set_filter_id), fil_type)
				setattr(s, 'filter{}_active'.format(set_filter_id), True)
				setattr(s, 'filter{}_val'.format(set_filter_id), v)
				s.save()
				break

	return JsonResponse({'error':False})

@csrf_exempt
def import_data(request):
    if request.method == 'POST':
        new_students = request.FILES['myfile']
        if new_students.content_type == 'text/csv':
            df = pd.read_csv(new_students)
        else:
            df = pd.read_excel(new_students) #make sure that there' no header
        path_name = os.path.join('studentapp', 'static', 'tempcsv', 'temp.csv')
        df.to_csv(path_name, index=False)
        return redirect('/api/fieldmatching?df='+ path_name)
    else:
        return render(request, 'import_data.html')


def fieldmatching(request):
    if request.method == 'POST':
        path_name = request.POST['csv_path']
        df = pd.read_csv(path_name)
        names = list(df.columns)

        if request.POST.get('checkBox') == None:
            matched = { key:request.POST.get(key, False) for key in names }
            df.rename(columns = matched, inplace = True)

        df.drop('id', axis=1, inplace=True)
        df.set_index("aadhar_id", drop=True, inplace=True)
        dictionary = df.to_dict(orient="index")
        for aadhar, student in dictionary.items():
            m = Student()
            for k,v in student.items():
                setattr(m, k, v)
            setattr(m, 'aadhar_id', aadhar)
            m.save()

        return redirect('import_data')
    else:
        path_name = request.GET.get('df')
        df = pd.read_csv(path_name)
        names = list(df.columns)
        fields = [field.name for field in Student._meta.get_fields()]
        return render(request, 'fieldmatching.html', {'fields' : fields, 'csv_path': path_name, 'names' : names})
