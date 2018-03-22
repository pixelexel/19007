from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class School(models.Model):
	id = models.AutoField(primary_key=True,unique=True)
	name = models.CharField(max_length=30)
	board = models.CharField(max_length=30)
	no_of_students = models.IntegerField()
	no_of_facualty = models.IntegerField()
	state = models.CharField(max_length=30)
	district = models.CharField(max_length=30)
	def __str__(self):
		return str(self.id) + " - " + self.name

class Student(models.Model):
	id = models.AutoField(primary_key=True,unique=True)
	aadhar_id = models.IntegerField(default=0)
	name = models.CharField(max_length=30)
	no_of_parents = models.IntegerField(default=0)
	parent_salary = models.IntegerField(default=0)
	age = models.IntegerField()
	handicapped = models.BooleanField(default=False)
	no_of_siblings = models.IntegerField(default=0)
	school = models.CharField(max_length=30)
	extra_curr = models.IntegerField(default=0)
	std = models.IntegerField(default=1)
	date = models.DateField()
	marks = models.IntegerField(default=0)
	gender = models.CharField(max_length=10)
	state = models.CharField(max_length=10)
	district = models.CharField(max_length=10)
	english_marks = models.IntegerField(default=0)
	maths_marks = models.IntegerField(default=0)
	science_marks = models.IntegerField(default=0)
	hindi_marks = models.IntegerField(default=0)
	atten = models.IntegerField(default=0)
	urban = models.IntegerField(default=False)
	Fedu = models.IntegerField(default=0)
	Medu = models.IntegerField(default=0)
	sport = models.IntegerField(default=0)
	rank_an = models.IntegerField(default=0)
	def __str__(self):
		return str(self.id) + " - " + self.name

	def savedata(self):
		self.save()

class extra_curricular(models.Model):
	id = models.AutoField(primary_key=True,unique=True)
	student = models.ForeignKey(Student,on_delete=models.CASCADE)
	name = models.CharField(max_length=30)
	standard = models.IntegerField(default=1)
	year = models.IntegerField(default=0)
	def __str__(self):
		return str(self.id) + " - " + self.name

class Acads(models.Model):
	id = models.AutoField(primary_key=True,unique=True)
	student = models.ForeignKey(Student,on_delete=models.CASCADE)
	name = models.CharField(max_length=30)
	marks = models.IntegerField(default=0)
	standard = models.IntegerField(default=1)
	year = models.IntegerField(default=0)
	def __str__(self):
		return str(self.id) + " - " + self.name

class Graphs(models.Model):
	id = models.AutoField(primary_key=True,unique=True)
	gD = models.CharField(max_length=550)

class Lists(models.Model):
	id = models.AutoField(primary_key=True,unique=True)
	lD = models.CharField(max_length=550)
