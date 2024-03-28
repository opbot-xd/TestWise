from django import forms
from django.shortcuts import render, redirect
from .models import Question, Test
from .forms import SingleMCQForm
from .forms import IntegerAnswerForm
from .forms import TestForm
from django.contrib.auth.models import User

def create_single_mcq(request):
  if request.method == 'POST':
    form = SingleMCQForm(request.POST)
    if form.is_valid():
      form.save()
      return redirect('list_questions')  # Redirect to question list after successful creation
  else:
    form = SingleMCQForm()
  return render(request, 'create_question.html', {'form': form, 'question_type': 'Single MCQ'})

class SingleMCQForm(forms.ModelForm):
  class Meta:
    model = Question
    fields = ('text', 'type', 'answer_key')  # answer_key stores comma-separated options
  
  def clean(self):
    cleaned_data = super().clean()
    options = cleaned_data['answer_key'].split(',')
    if len(options) < 2:
      raise forms.ValidationError('Single MCQ requires at least two options')
    return cleaned_data


def create_integer_answer(request):
  if request.method == 'POST':
    form = IntegerAnswerForm(request.POST)
    if form.is_valid():
      form.save()
      return redirect('list_questions')
  else:
    form = IntegerAnswerForm()
  return render(request, 'create_question.html', {'form': form, 'question_type': 'Integer Answer'})

class IntegerAnswerForm(forms.ModelForm):
  class Meta:
    model = Question
    fields = ('text', 'type')


def create_test(request):
  if request.method == 'POST':
    form = TestForm(request.POST)
    if form.is_valid():
      form.save()
      return redirect('list_tests')
  else:
    form = TestForm()
  return render(request, 'create_test.html', {'form': form})

class TestForm(forms.ModelForm):
  class Meta:
    model = Test
    fields = ('name', 'duration', 'instructions')
    


class LoginForm(forms.ModelForm):
  username = forms.CharField(label='Username', max_length=150)
  password = forms.CharField(widget=forms.PasswordInput, label='Password')

  class Meta:
    model = User
    fields = ('username', 'password')