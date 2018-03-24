from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import Student, School, extra_curricular, Acads, Graphs, Lists
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
# Create your views here.
CSV_STORAGE = os.path.join(os.getcwd(), 'studentapp', 'static', 'csv')

def index(req):
	import time
	time.sleep(1)
	return JsonResponse({
		'error': False,
		'data': ['Api root', 'nice']
	})
	

@csrf_exempt
def formVal(request):
	retGraph = {'x':[] , 'y':[] , 'filters':{}}
	rval = Student._meta.get_fields()
	types = {'CharField':'string', 
			'IntegerField':'int',
			'BooleanField':'bool',
			'DateField':'date'}

	for i in rval:
		if types.__contains__(i.get_internal_type()):
			tem = {}
			tem['name'] = i.name
			tem['type'] = types[i.get_internal_type()]
			retGraph['filters'][i.name] = tem
			retGraph['x'].append(i.name)
			retGraph['y'].append(i.name)

	retr = {'graph':retGraph,'list':retGraph}
	return JsonResponse(retr)


@csrf_exempt
def getGraph(request):
	ret = {}
	if request.method == 'POST':
		print(request.body)
		dt = json.loads(request.body.decode('ascii'))
		x_axis = dt['x']
		y_axis = dt['y']
		filters_all = dt['filters']
		new_filter = {}
		x_filter_present = False
		x_filter = {}

		for i in filters_all:
			parm = ''
			val = ''
			for v,k in i.items():
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

		if dt['id'] is not None:
			gd = Graphs.objects.get(id=dt['id'])
			gd.gD = json.dumps(dt)
			gd.save()	
		
		else :
			gd = Graphs()
			gd.save()
			dt['id'] = gd.id
			gd.gD = json.dumps(dt)
			gd.save()
		ret = dt

	return JsonResponse(ret)

def get_list_data(dt, save=True, limit=True):
	x_axis = dt['x']
	print('x_axis', x_axis)
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

	if dt['id'] is not None:
		gd = Lists.objects.get(id=dt['id'])
		df.to_csv(os.path.join(CSV_STORAGE, str(dt['id']) + '.csv'), index=False)
		dt['csv_path'] = 'static/csv/' + str(dt['id']) + '.csv'
		gd.lD = json.dumps(dt)	
		gd.save()

	else:
		gd = Lists()
		gd.save()
		dt['id'] = gd.id
		df.to_csv(os.path.join(CSV_STORAGE, str(dt['id']) + '.csv'), index=False)
		dt['csv_path'] = 'static/csv/' + str(dt['id']) + '.csv'
		gd.lD = json.dumps(dt)
		gd.save()

	return dt
	
@csrf_exempt
def getList(request):
	ret = {} 
	if request.method == 'POST':
		dt = json.loads(request.body)
		ret = get_list_data(dt)

	print(ret) 
	return JsonResponse(ret)

@csrf_exempt
def allGraphs(request):
	qs = Graphs.objects.all()
	data = []
	for i in qs:
		data.append( json.loads(i.gD) )
	return JsonResponse( {
		'data':data
	})

@csrf_exempt
def allLists(request):
	qs = Lists.objects.all()
	data = []
	for i in qs:
		data.append( json.loads(i.lD) )
	return JsonResponse( {
		'data':data
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

		allStudentsMatching = Student.objects.filter(name__contains=query)
		aadharSet = set()

		for s in allStudentsMatching:
			if not aadharSet.__contains__(s.aadhar_id):
				studentList.append({
					'id': s.aadhar_id,
					'name': s.name
				})

				aadharSet.add(s.aadhar_id)

		schoolsMatching = Q()
		schoolsMatching = schoolsMatching | Q(school__contains=query)
		allschoolsMatching = Student.objects.filter(schoolsMatching)
		schoolList = list(map(lambda s: {'name': s}, set([s.school for s in allschoolsMatching])))

		districtsMatching = Q()
		districtsMatching = districtsMatching | Q(district__contains=query)
		alldistrictsMatching = Student.objects.filter(districtsMatching)
		districtList = list(map(lambda s: {'name': s}, set([s.district for s in alldistrictsMatching])))

		statesMatching = Q()
		statesMatching = statesMatching | Q(state__contains=query)
		allstatesMatching = Student.objects.filter(statesMatching)
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
		print('ddd', d)
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
		print(ret)
	return JsonResponse(ret) 

@csrf_exempt
def studentform(request):
	if request.method == "POST":

		form = StudentForm(request.POST)
		if form.is_valid():
			studentdata = form.save(commit = False)
			studentdata.savedata()
			return redirect('studentform')

		return HttpResponse('ERROR')
	else:
		form = StudentForm()
		return render(request, 'studentform.html', {'form' : form})

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

@csrf_exempt
def chatbot(request):
	if request.method == 'POST':
		data = json.loads(request.body)
		pprint(data)
		if not data['status']['code'] == 200:
			return JsonResponse({
				error: 'true',
			})

		result = data['result']

		if result['action'] in ['get_filters', 'get_number_filters']:
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
			}, False, False)

			datalen = len(payload['data'])
			payload['data'] = payload['data'][::-1][:30]
			pprint(payload)

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
