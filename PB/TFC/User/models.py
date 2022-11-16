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
    subscription = models.ForeignKey(
        Subscription, on_delete=models.SET_NULL, null=True, blank=True)


class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    admin_id = models.AutoField(primary_key=True)


class PaymentInfo(models.Model):
    card_number = models.CharField(max_length=16)
    expiration_date = models.DateField()
    cvv = models.IntegerField()
    payment_info_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_info = models.ForeignKey(PaymentInfo, on_delete=models.CASCADE)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)
    processed_on = models.DateTimeField(auto_now=True)

    def create(cls, user, payment_info, subscription):
        sub = cls(user, payment_info, subscription)
        return sub
