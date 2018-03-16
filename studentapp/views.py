from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Student,School,extra_curricular,Acads 
from django.views.decorators.csrf import csrf_exempt

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
	print(retr)
	return JsonResponse(retr)


