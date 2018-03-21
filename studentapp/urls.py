from django.contrib import admin
from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_form_vals', views.formVal, name='formVal'),
    path('send_graph', views.getGraph, name='getGraph'),
    path('send_list', views.getList, name='getList')
]