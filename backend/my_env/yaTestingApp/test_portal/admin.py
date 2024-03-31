from django.contrib import admin
from .models import Test, Question, Choice

'''# Register your models here.

@admin.register(User)  # Register the User model with Django admin
class UserAdmin(admin.ModelAdmin):
    list_display = ('username')  # Fields to display in the admin list view
admin.site.register(UserAdmin)
@admin.register(Test)  # Register the Test model with Django admin
class TestAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'start_date')  # Fields to display in the admin list view

@admin.register(Question)  # Register the Question model with Django admin
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'test', 'question_type')  # Fields to display in the admin list view

@admin.register(Choice)  # Register the Choice model with Django admin
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('text', 'question', 'is_correct')  # Fields to display in the admin list view'''

admin.site.register(Test)
admin.site.register(Question)
admin.site.register(Choice)
