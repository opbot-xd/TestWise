from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    pass

class Admin(User):
    class Meta:
        proxy = True
        permissions = (
            ("test_portal.add_test", _("Can add tests")),
            ("test_portal.change_test", _("Can change tests")),
            ("test_portal.delete_test", _("Can delete tests")),
            ("test_portal.view_all_results", _("Can view all results")),
        )

class Test(models.Model):
    """
    Model for tests.
    """
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    start_date = models.DateTimeField()

class Question(models.Model):
    """
    Model for questions.
    """
    text = models.TextField()
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    question_type = models.CharField(max_length=10, choices=[  # Define choices for question types
        ('MCQ', 'Multiple Choice Question (Single Answer)'),
        ('MCMA', 'Multiple Choice Question (Multiple Answers)'),
        ('INT', 'Integer'),
    ])

class Choice(models.Model):
    """
    Model for choices (if question_type is MCQ or MCMA).
    """
    text = models.CharField(max_length=255)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    is_correct = models.BooleanField(default=False)
