from rest_framework import serializers
from  .models import *
from django.contrib.auth import  get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
userModel =get_user_model()

class cngStationsSerializer(serializers.ModelSerializer):
    class Meta:
        model=CNGSTATIONS
        fields="__all__"


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self,validated_data):
        user = userModel.objects.create_user(username=validated_data['username'],password=validated_data['password'])
        return  user

    def to_representation(self, instance):
        # Generate access and refresh tokens for the user
        refresh = RefreshToken.for_user(instance)

        representation = super(UserSerializer, self).to_representation(instance)
        representation['refresh_token'] = str(refresh)
        representation['access_token'] = str(refresh.access_token)

        return representation

    class Meta:
        model=userModel
        fields=("id","username","password")