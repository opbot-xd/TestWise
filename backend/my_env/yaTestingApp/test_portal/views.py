from django.shortcuts import render
from .models import User, Test, Question, Choice
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
    

class UserListView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

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

