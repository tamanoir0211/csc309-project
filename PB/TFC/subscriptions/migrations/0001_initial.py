# Generated by Django 4.1.3 on 2022-11-16 15:54

from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('price', models.DecimalField(decimal_places=2, default=Decimal('0'), max_digits=20)),
                ('length', models.IntegerField(default=0)),
                ('sub_id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
    ]
