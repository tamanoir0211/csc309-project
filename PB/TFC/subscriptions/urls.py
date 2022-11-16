from django.urls import path
from subscriptions.views import SubscribeView

urlpatterns = [
    path('subscriptions/subscription/<int:sub_id>/subscribe/',
         SubscribeView.as_view())
]
