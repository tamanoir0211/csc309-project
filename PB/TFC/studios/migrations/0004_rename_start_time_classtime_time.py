# Generated by Django 4.1.3 on 2022-11-16 17:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('studios', '0003_alter_classtime_end_time'),
    ]

    operations = [
        migrations.RenameField(
            model_name='classtime',
            old_name='start_time',
            new_name='time',
        ),
    ]