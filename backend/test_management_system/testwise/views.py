from django.shortcuts import render
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth import authenticate

from testwise.models import UserSerializer

class LoginView(APIView):
  permission_classes = [AllowAny]  
  def post(self, request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
    if user is None:
      return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)