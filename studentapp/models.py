from django.db import models
from django.contrib.auth.models import User
# Create your models here.

#{ Country:Boolean , State:[] , District: [], School: [] }
class UserAcces(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	acc = models.CharField(max_length=300)


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
	
	filter1_name = models.CharField(max_length=100, default='')
	filter1_active = models.BooleanField(default=False)
	filter1_val = models.TextField( default='')
	filter1_type = models.TextField( default='')

	filter2_name = models.CharField(max_length=100, default='')
	filter2_active = models.BooleanField(default=False)
	filter2_val = models.TextField( default='')
	filter2_type = models.TextField( default='')

	filter3_name = models.CharField(max_length=100, default='')
	filter3_active = models.BooleanField(default=False)
	filter3_val = models.TextField( default='')
	filter3_type = models.TextField( default='')

	filter4_name = models.CharField(max_length=100, default='')
	filter4_active = models.BooleanField(default=False)
	filter4_val = models.TextField( default='')
	filter4_type = models.TextField( default='')

	filter5_name = models.CharField(max_length=100, default='')
	filter5_active = models.BooleanField(default=False)
	filter5_val = models.TextField( default='')
	filter5_type = models.TextField( default='')

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
	dash_id = models.IntegerField(default=1)
	dash_name = models.CharField(default='Untitled Dashboard', max_length=1000)

	def save(self, *args, **kwargs):
		self.dash_name = "Dashboard {}".format(self.dash_id)
		super(Graphs, self).save(*args, **kwargs)

class Lists(models.Model):
	id = models.AutoField(primary_key=True,unique=True)
	lD = models.CharField(max_length=550)
	dash_id = models.IntegerField(default=1)
	dash_name = models.CharField(default='Untitled Dashboard', max_length=1000)

	def save(self, *args, **kwargs):
		self.dash_name = "Dashboard {}".format(self.dash_id)
		super(Lists, self).save(*args, **kwargs)
