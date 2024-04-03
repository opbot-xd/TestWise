import datetime
from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Test, Question, Choice
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, TestSerializer, QuestionSerializer, ChoiceSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'}, status=400)

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=200)
        else:
            return Response({'error': 'Invalid credentials'}, status=401)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({}, status=204)
    

'''class UserListView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)'''

class TestCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        serializer = TestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class QuestionCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request, test_id):
        try:
            test = Test.objects.get(pk=test_id)
        except Test.DoesNotExist:
            return Response({'error': 'Test not found'}, status=404)

        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(test=test)
            question_type = serializer.validated_data['question_type']
            if question_type in ['MCQ', 'MCMA']:
                choices_data = request.data.get('choices', [])
                for choice_data in choices_data:
                    Choice.objects.create(question=serializer.instance, **choice_data)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



@api_view(['GET'])
def get_prev_tests(request):
  """
  API endpoint to retrieve upcoming tests (start time within 3 hours).
  """
  # Calculate threshold time (current time minus 3 hours)
  threshold_time = datetime.now() - datetime.timedelta(hours=3)
  upcoming_tests = Test.objects.filter(start_date__lt=threshold_time)
  serializer = TestSerializer(upcoming_tests, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def get_future_tests(request):
  """
  API endpoint to retrieve all tests (including upcoming and past).
  """
  current_time = datetime.now()
  all_tests = Test.objects.filter(start_date__gt=current_time)
  serializer = TestSerializer(all_tests, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def get_upcoming_tests(request):
    """
    API endpoint to retrieve tests within the next 3 hours from current time.
    """
    current_time = datetime.now()
    threshold_time = current_time + datetime.timedelta(hours=3)  # Add 3 hours

    upcoming_tests = Test.objects.filter(
        start_date__gt=current_time, start_date__lt=threshold_time
    )
    serializer = TestSerializer(upcoming_tests, many=True)

    if not upcoming_tests.exists():
        return Response(status=Status.HTTP_204_NO_CONTENT)  # No content found

    return Response(serializer.data)