from django.db import models
from subscriptions.models import Subscription
# Create your models here.


class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    avatar_path = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    user_id = models.AutoField(primary_key=True)
    subscription = models.ForeignKey(Subscription, on_delete=models.SET_NULL)


class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    admin_id = models.AutoField(primary_key=True)


class PaymentInfo(models.Model):
    card_number = models.CharField(max_length=16)
    expiration_date = models.DateField()
    cvv = models.IntegerField(max_length=4)
    payment_info_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
