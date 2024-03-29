from decimal import Decimal
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class Subscription(models.Model):

    price = models.DecimalField(max_digits=20, decimal_places=2, default=Decimal(0.00))
    length_months = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(12)])
    sub_id = models.AutoField(primary_key=True)

    def create(cls, price, length):
        sub = cls(price, length)
        return sub

    def __str__(self):
        return "subscription " + str(self.sub_id) + ': $' + str(self.price)
