from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserListView, TestCreateView, QuestionCreateView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('logining/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('users/', UserListView.as_view(), name='user_list'),
    path('tests/', TestCreateView.as_view(), name='test_create'),
    path('tests/<int:test_id>/questions/', QuestionCreateView.as_view(), name='question_create')
]

