from django.urls import path
from .views import CurrentSubscriptionView, user_create, user_login, user_profile, user_logout, user_update, create_payment_info, \
    UserClassView, UnsubscribeView, PaymentHistoryView, PaymentInfoView, delete_payment_info, DropAllClass, UserClassHistoryView
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'user'
urlpatterns = [
    path('register/', user_create, name='register'),
    path('login/', user_login, name='login'),
    path('profile/', user_profile, name='profile'),
    path('logout/', user_logout, name='logout'),
    path('subscription/', CurrentSubscriptionView.as_view(), name='current_subscriptions'),
    path('update/', user_update, name='update'),
    path('profile/payment_info/create/', create_payment_info, name='create_payment_info'),
    path('classes/', UserClassView.as_view(), name='user_classes'),
    path('classes/history/', UserClassHistoryView.as_view(), name='user_classes_history'),
    path('classes/drop_all/', DropAllClass.as_view(), name='user_classes_dropall'),
    path('unsubscribe/', UnsubscribeView.as_view(), name='unsubscribe'),
    path('payment/history/', PaymentHistoryView.as_view(), name='payment_history'),
    path('profile/payment_info/list', PaymentInfoView.as_view(), name='payment_info'),
    path('profile/payment_info/delete', delete_payment_info, name='delete_payment_info')
]
