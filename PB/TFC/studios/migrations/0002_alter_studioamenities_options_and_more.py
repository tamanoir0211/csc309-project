# Generated by Django 4.1.3 on 2022-11-15 06:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('studios', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='studioamenities',
            options={'verbose_name_plural': 'Studio amenities'},
        ),
        migrations.AlterModelOptions(
            name='studioimages',
            options={'verbose_name_plural': 'Studio images'},
        ),
    ]