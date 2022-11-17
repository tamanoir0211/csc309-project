from django.urls import path
from subscriptions.views import SubscribeView

app_name = 'subscriptions'

urlpatterns = [
    path('<int:subs_id>/subscribe/',
         SubscribeView.as_view(), name='subscribe')
]
