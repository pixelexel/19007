from django import forms

from .models import Student

class StudentForm(forms.ModelForm):

    class Meta:
        model = Student
        fields = ('name','no_of_parents','parent_salary', 'age', 'handicapped', 'no_of_siblings', 'school','extra_curr','std', 'date', 'marks', 'gender')

