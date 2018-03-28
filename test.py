from studentapp.models import Student
import json

dt =  json.loads(open('data.json').read())

for it in dt["data"]:
	tem = Student()
	for k,v in it.items():
		setattr(tem, k, v)
	tem.save()

for field in Student._meta.get_fields():
	print(field)
