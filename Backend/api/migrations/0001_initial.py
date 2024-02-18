# Generated by Django 4.2.7 on 2023-11-02 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CNGSTATIONS',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('STATION_NAME', models.CharField(max_length=300)),
                ('STATION_ADDRESS', models.TextField(max_length=1000)),
                ('STATION_LATITUDE', models.CharField(max_length=30)),
                ('STATION_LONGITUDE', models.CharField(max_length=30)),
                ('STATION_STATUS', models.BooleanField()),
                ('STATION_STATE', models.CharField(max_length=50)),
                ('STATION_STATE_CODE', models.CharField(max_length=50)),
                ('STATION_DISTRICT', models.CharField(max_length=50)),
                ('STATION_CITY', models.CharField(max_length=20)),
            ],
        ),
    ]
