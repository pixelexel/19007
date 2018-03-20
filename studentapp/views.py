from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Student,School,extra_curricular,Acads 
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.

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
	types = {'CharField':'string','IntegerField':'int','BooleanField':'bool'}
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
		print('hello', json.loads(request.body))
		dt = json.loads(request.body)
		x_axis = dt['x']
		y_axis = dt['y']
		filters_all = dt['filters']
		new_filter = {}
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
						print('sadfsd',val)
						val = int(val)
					elif k == 'bool':
						val = bool(val)
						print(val)
			new_filter[parm] = val
		tq = Student.objects.filter(**{'marks__gt':30})
		qs = Student.objects.filter(**new_filter)
		qss = Student.objects.all()
		data = {}
		tdata = {}  
		for i in qs:
			ii = i.__dict__
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
			if data_nf.__contains__(ii[x_axis]):
				data_nf[ii[x_axis]] = float(data_nf[ii[x_axis]]*tdata_nf[x_axis] + ii[y_axis])/(tdata_nf[x_axis] + 1)
				tdata_nf[x_axis] += 1
			else:
				data_nf[ii[x_axis]] = ii[y_axis]
				tdata_nf[x_axis] = 1
		dt['id'] = 32
		dt['data'] = data
		dt['data_nf'] = data_nf
		ret = dt
	#print(ret) 
	return JsonResponse(ret)

