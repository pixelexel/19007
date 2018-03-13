from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.

def index(req):
	import time
	time.sleep(1)

	return JsonResponse({
		'error': False,
		'data': ['Api root', 'nice']
	})
