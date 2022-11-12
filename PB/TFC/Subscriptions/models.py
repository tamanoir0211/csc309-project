from decimal import Decimal
from django.db import models

# Create your models here.


class Subscription(models.Model):

    price = models.DecimalField(
        max_digits=20, decimal_places=2, default=Decimal(0.00))
    length = models.DateTimeField(default=0)
    sub_id = models.AutoField(primary_key=True)

    def create(cls, price, length):
        sub = cls(price, length)
        return sub
