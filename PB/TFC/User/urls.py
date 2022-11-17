from django.urls import path
from .views import user_create, user_login, user_profile, user_logout, user_update, create_payment_info, \
    UserClassView, UnsubscribeView, PaymentHistoryView
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'user'
urlpatterns = [
    path('register/', user_create, name='register'),
    path('login/', user_login, name='login'),
    path('profile/', user_profile, name='profile'),
    path('logout/', user_logout, name='logout'),
    path('update/', user_update, name='update'),
    path('profile/payment_info/create/',
         create_payment_info, name='create_payment_info'),
    path('classes/', UserClassView.as_view(), name='user_classes'),
    path('unsubscribe/', UnsubscribeView.as_view(), name='unsubscribe'),
    path('payment/history/', PaymentHistoryView.as_view(), name='payment_history'),
]
