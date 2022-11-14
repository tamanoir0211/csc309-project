from django.urls import path

urlpatterns = [
    path('add/', AddBankView.as_view(), name='add')
]
