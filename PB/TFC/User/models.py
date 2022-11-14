from django.db import models

# Create your models here.


class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    avatar_path = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    user_id = models.AutoField(primary_key=True)


