# Generated by Django 3.1.3 on 2020-12-14 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('websockets', '0005_auto_20201213_0651'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='direction_x',
            field=models.FloatField(default=0),
        ),
    ]
