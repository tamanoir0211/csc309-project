from django.urls import path
from .views import SubscribeView, SubscriptionView

app_name = 'subscriptions'

urlpatterns = [
    path('<int:subs_id>/subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('list/', SubscriptionView.as_view(), name='list'),
]
