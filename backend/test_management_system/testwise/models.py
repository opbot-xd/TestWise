from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  role = models.CharField(max_length=20, choices=(('admin', 'Admin'), ('user', 'User')), default='user')
class Question(models.Model):
  text = models.TextField()
  type = models.CharField(max_length=20, choices=(('mcq_single', 'Single Choice MCQ'), ('mcq_multiple', 'Multiple Choice MCQ'), ('integer', 'Integer Answer')))  # Question type
  answer_key = models.TextField(blank=True)
  def __str__(self):
    return self.text[:50]
class Test(models.Model):
  name = models.CharField(max_length=200)
  duration = models.IntegerField()
  instructions = models.TextField(blank=True)
  questions = models.ManyToManyField(Question, through='TestQuestion')
  def __str__(self):
    return self.name
class TestQuestion(models.Model):
  test = models.ForeignKey(Test, on_delete=models.CASCADE)
  question = models.ForeignKey(Question, on_delete=models.CASCADE)