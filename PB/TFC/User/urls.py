from django.urls import path
from .views import user_create, user_login
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'user'
urlpatterns = [
    path('register/', user_create, name='register'),
    path('login/', user_login, name='login')
]