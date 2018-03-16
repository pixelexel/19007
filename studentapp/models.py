from django.db import models

# Create your models here.
class School(models.Model):
	id = models.AutoField(primary_key=True,unique=True)
	name = models.CharField(max_length=30)
	board = models.CharField(max_length=30)
	no_of_students = models.IntegerField()
	no_of_facualty = models.IntegerField()
	state = models.CharField(max_length=30)
	district = models.CharField(max_length=30)

class Student(models.Model):
	id = models.AutoField(primary_key=True,unique=True)
	name = models.CharField(max_length=30)
	no_of_parents = models.IntegerField(default=0)
	parent_salary = models.IntegerField(default=0)
	age = models.IntegerField()
	handicapped = models.BooleanField(default=False)
	no_of_siblingss = models.IntegerField(default=0)
	caste = models.CharField(max_length=30)
	religion = models.CharField(max_length=30)
	school = models.ForeignKey(School,on_delete=models.CASCADE)

class extra_curricular(models.Model):
	id = models.AutoField(primary_key=True,unique=True)
	student = models.ForeignKey(Student,on_delete=models.CASCADE)
	name = models.CharField(max_length=30)
	standard = models.IntegerField(default=1)
	year = models.IntegerField(default=0)

class Acads(models.Model):
	id = models.AutoField(primary_key=True,unique=True)
	student = models.ForeignKey(Student,on_delete=models.CASCADE)
	name = models.CharField(max_length=30)
	marks = models.IntegerField(default=0)
	standard = models.IntegerField(default=1)
	year = models.IntegerField(default=0)

class Graphs(models.Model):
	id = models.AutoField(primary_key=True,unique=True)


