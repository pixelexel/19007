from django.shortcuts import render, redirect,reverse
from django.http import HttpResponse, JsonResponse
from django.views.generic import TemplateView
import os

def index(request):
	if request.user.is_authenticated:
		return render(request,"index.html",{})
	else:
		return redirect('/api/login')