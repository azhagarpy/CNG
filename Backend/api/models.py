from django.db import models
from django.contrib.auth.models import  AbstractUser,PermissionsMixin
# Create your models here.


class CNGSTATIONS(models.Model):
    STATION_NAME=models.CharField(max_length=300,null=False,blank=False)
    STATION_ADDRESS=models.TextField(max_length=1000,null=False,blank=False)
    STATION_LATITUDE=models.CharField(max_length=30,null=False,blank=False)
    STATION_LONGITUDE=models.CharField(max_length=30,null=False,blank=False)
    STATION_STATUS=models.BooleanField(blank=False,null=False)
    STATION_STATE=models.CharField(max_length=50,blank=False,null=True)
    STATION_STATE_CODE=models.CharField(max_length=50,blank=False,null=True,default=0)
    STATION_DISTRICT=models.CharField(max_length=50,blank=False,null=True)
    STATION_CITY=models.CharField(max_length=20,null=True)
    STATION_POSTALCODE=models.CharField(max_length=20,default=0)


    def __str__(self):
        return  self.STATION_NAME


