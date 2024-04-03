from django.urls import path
from .views import RegisterView, LoginView, LogoutView,  TestCreateView, QuestionCreateView
from . import views

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    #path('users/', UserListView.as_view(), name='user_list'),
    path('tests/', TestCreateView.as_view(), name='test_create'),
    path('tests/<int:test_id>/questions/', QuestionCreateView.as_view(), name='question_create'),
    path('get_prev_tests/', views.get_prev_tests, name='get_prev_tests'),
    path('get_future_tests/', views.get_future_tests, name='get_future_tests'),
    path('api/get_current_tests/', views.get_current_tests, name='get_current_tests'),

]

