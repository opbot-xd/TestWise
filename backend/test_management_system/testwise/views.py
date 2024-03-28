from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth import authenticate
from datetime import datetime, timedelta
from django.core.exceptions import ValidationError
from testwise.forms import LoginForm
from testwise.models import UserSerializer
from django.shortcuts import render, redirect
from .models import Test, Question

def assign_questions(request, test_id):
  test = Test.objects.get(pk=test_id)
  # Pre-fetch existing questions for the test (optional)
  assigned_questions = test.questions.all()
  available_questions = Question.objects.exclude(pk__in=assigned_questions.values_list('id', flat=True))  # Exclude already assigned questions
  if request.method == 'POST':
    question_ids = request.POST.getlist('questions')  # Get selected question IDs from a checkbox form
    for question_id in question_ids:
      question = Question.objects.get(pk=question_id)
      test.questions.add(question)
    return redirect('test_detail', pk=test_id)  # Redirect to test details after assignment
  return render(request, 'assign_questions.html', {'test': test, 'available_questions': available_questions})



def login_view(request):
  if request.method == 'POST':
    # Handle form submission
    if 'form' in request.POST:  # Check if using a custom form
      form = LoginForm(request.POST)
      if form.is_valid():
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
    else:  # Assuming username and password are submitted directly (without a form)
      username = request.POST['username']
      password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
      #login(request, user)
      return redirect('home')  # Redirect to your desired page after successful login
    else:
      # Handle invalid login (e.g., display error message)
      login_error = 'Invalid username or password'
  else:
    # Handle GET request (render login form)
    if 'form' in request.GET:  # Check if using a custom form (pre-populate if needed)
      form = LoginForm()
    else:
      form = None
  return render(request, 'login.html', {'form': form, 'login_error': login_error})

def schedule_test(request, test_id):
  test = Test.objects.get(pk=test_id)
  if request.method == 'POST':
    start_datetime = datetime.strptime(request.POST['start_datetime'], '%Y-%m-%d %H:%M')
    end_datetime = start_datetime + timedelta(minutes=test.duration)  # Calculate end time based on duration
    try:
      # Basic validation (more complex validation can be added)
      if start_datetime < datetime.now():
        raise ValidationError('Start date and time cannot be in the past')
      # Implement logic to check for scheduling conflicts with other tests (optional)
      # You can query for overlapping tests based on start and end times
      test.start_datetime = start_datetime
      test.end_datetime = end_datetime
      test.save()
      return redirect('test_detail', pk=test_id)  # Redirect to test details after successful scheduling
    except ValidationError as e:
      error_message = e.message
  else:
    start_datetime = datetime.now() + timedelta(hours=1)  # Default start time 1 hour from now
  return render(request, 'schedule_test.html', {'test': test, 'start_datetime': start_datetime, 'error_message': error_message})


