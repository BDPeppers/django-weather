from api import get_five_day_forecast, get_hourly_forecast
from rest_framework import generics
from django.http import HttpResponse
from .models import CityWeather
from .serializers import CityWeatherSerializer
from django.http import JsonResponse

class CityWeatherList(generics.ListCreateAPIView):
    queryset = CityWeather.objects.all()
    serializer_class = CityWeatherSerializer

class CityWeatherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CityWeather.objects.all()
    serializer_class = CityWeatherSerializer

# Root URL
def home(request):
    return HttpResponse("Hello, Weather App. You're at the home page.")


def five_day_forecast(request, city_name):
    data = get_five_day_forecast(city_name)
    return JsonResponse(data)

def hourly_forecast(request, city_name):
    data = get_hourly_forecast(city_name)
    return JsonResponse(data)