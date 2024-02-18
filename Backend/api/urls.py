from django.urls import path
from  .views import *
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView,TokenVerifyView

urlpatterns = [
    path('home',home,name="index"),
    path('stations',Stations.as_view()),
    path('station/<int:pk>',Station.as_view()),
    path('filter',filterStations),
    path('register',RegisterUser.as_view()),
    path('get',TokenObtainPairView.as_view()),
    path('validate',TokenVerifyView.as_view()),
    path('getnearbystations',getNearByStations),



]
