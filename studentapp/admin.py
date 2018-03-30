from django.contrib import admin
from .models import Student,School,extra_curricular,Acads,Graphs, Lists,UserAcces
# Register your models here.
admin.site.register(School)
admin.site.register(Student)
admin.site.register(extra_curricular)
admin.site.register(Acads)
admin.site.register(Graphs)
admin.site.register(Lists)
admin.site.register(UserAcces)
