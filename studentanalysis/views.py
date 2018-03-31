from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.generic import TemplateView
import os

def index(request):
	print(os.getcwd())
	if request.user.is_authenticated:
		return TemplateView.as_view(template_name="index.html")
	else:
		return redirect('/api/login')