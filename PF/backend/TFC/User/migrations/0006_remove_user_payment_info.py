# Generated by Django 4.1.3 on 2022-11-18 21:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0005_user_payment_info'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='payment_info',
        ),
    ]
