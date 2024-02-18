# Generated by Django 4.2.1 on 2023-11-04 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_cngstations_station_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='cngstations',
            name='STATION_POSTALCODE',
            field=models.CharField(default=0, max_length=20),
        ),
        migrations.AlterField(
            model_name='cngstations',
            name='STATION_DISTRICT',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='cngstations',
            name='STATION_STATE',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='cngstations',
            name='STATION_STATE_CODE',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
