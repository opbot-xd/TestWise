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
    class Meta:
        model = User
        fields = ("id", "username")

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ("title", "description", "start_date")

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("text", "test", "question_type")

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ("text", "question", "is_correct")
