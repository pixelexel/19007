from django.contrib import admin
from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_form_vals', views.formVal, name='formVal'),
    path('send_graph', views.getGraph, name='getGraph'),
    path('send_list', views.getList, name='getList'),
    path('get_all_graphs', views.allGraphs, name='allGrpahs'),
    path('get_all_lists', views.allLists, name='allLists'),
    path('delete_graph/<int:id>', views.delete_graph, name='delete_graph'),
    path('delete_list/<int:id>', views.delete_list, name='delete_list'),
    path('get_suggestions', views.suggestions, name='suggestions'),
    path('get_student_data/<int:id>', views.getStudentData, name='Get_Student_Data')
]