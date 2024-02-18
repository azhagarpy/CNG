from django.shortcuts import render,HttpResponse
from  rest_framework.response import Response
from  rest_framework import status
from .models import CNGSTATIONS
from rest_framework import permissions
from rest_framework.generics import RetrieveUpdateDestroyAPIView,ListCreateAPIView,CreateAPIView
from rest_framework.decorators import api_view
from .serializer import *
from django.http import JsonResponse
from math import radians, sin, cos, sqrt, atan2
from rest_framework_simplejwt.tokens import RefreshToken
import json
# Create your views here.


class Station(RetrieveUpdateDestroyAPIView):
    queryset = CNGSTATIONS.objects.all()
    serializer_class = cngStationsSerializer


class Stations(ListCreateAPIView):
    queryset = CNGSTATIONS.objects.all()
    serializer_class = cngStationsSerializer

def home(request):
    return  HttpResponse("<h1>Azhagar</h1>")


@api_view(['GET'])
def filterStations(request):
    state=request.GET.get('state',0)
    district=request.GET.get('district',0)
    data = CNGSTATIONS.objects.all()
    if state:
        data = data.filter(STATION_STATE=state)

    if district:
        data = data.filter(STATION_DISTRICT=district)

    serializer = cngStationsSerializer(data,many=True)

    return Response(serializer.data)



class RegisterUser(CreateAPIView):
    model = get_user_model()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()

        # Generate access and refresh tokens for the user
        refresh = RefreshToken.for_user(user)

        response_data = {
            "id": user.id,
            "username": user.username,
            "refresh_tosken": str(refresh),
            "access_token": str(refresh.access_token),
        }

        return JsonResponse({"t":str(refresh)})


@api_view(['POST'])
def getNearByStations(request):
    user_latitude = float(request.data.get('lat'))
    user_longitude = float(request.data.get('long'))
    max_distance_km = float(request.data.get('range', 0))  # Set a default value if 'range' is not provided

    stations = CNGSTATIONS.objects.all()
    nearby_station_ids = []

    for station in stations:
        station_lat = float(station.STATION_LATITUDE)
        station_lon = float(station.STATION_LONGITUDE)
        distance = haversine(user_latitude, user_longitude, station_lat, station_lon)
        if distance is not None and distance <= max_distance_km:
            nearby_station_ids.append(station.id)

    # Convert the queryset to a list of dictionaries
    nearby_stations = list(CNGSTATIONS.objects.filter(id__in=nearby_station_ids).values())

    serializer = cngStationsSerializer(data=nearby_stations, many=True)

    # Check if the serializer data is valid before returning the response
    if serializer.is_valid():
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




def haversine(lat1, lon1, lat2, lon2):
    # Convert latitude and longitude from degrees to radians
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = 6371 * c  # Radius of the Earth in kilometers (you can use 3958.8 for miles)

    return distance


"""
def store_json_data(request):
    with open('C:/Users/Azhagar/OneDrive/Desktop/CNGNAVGATI/CNG/api/data.json', 'r') as file:
        json_data = json.load(file)
    count =0
    for key, obj in json_data.items():
        print(count)
        count = count +1
        name = obj['name']
        address = obj['address']
        latitude = float(obj['latitude'])
        longitude = float(obj['longitude'])
        status = obj['status']
        state = obj['state']
        state_code = obj.get('state_code','')
        district = obj['district']
        city = obj['city']

        # Create a new instance of the model and save it to the database
        instance = CNGSTATIONS(
            STATION_NAME=name,
            STATION_ADDRESS=address,
            STATION_LATITUDE=latitude,
            STATION_LONGITUDE=longitude,
            STATION_STATUS=status,
            STATION_STATE=state,
            STATION_STATE_CODE=state_code,
            STATION_DISTRICT=district,
            STATION_CITY=city,
        )
        instance.save()

"""
