from rest_framework import serializers
from .models import Test, Question, Choice
from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password")

class AdminSerializer(UserSerializer):
    pass


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ("username", "password")

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ("id", "title", "description", "start_date")

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("id", "text", "test", "question_type")

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ("id", "text", "question", "is_correct")
