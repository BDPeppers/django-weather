from django.urls import path
from .views import CityWeatherList, CityWeatherDetail, home, five_day_forecast, hourly_forecast

urlpatterns = [
    path('weather/', CityWeatherList.as_view(), name='cityweather-list'),
    path('weather/<int:pk>/', CityWeatherDetail.as_view(), name='cityweather-detail'),
    path('five-day-forecast/<str:city_name>/', five_day_forecast, name='five-day-forecast'),
    path('hourly-forecast/<str:city_name>/', hourly_forecast, name='hourly-forecast'),
    path('', home, name='home'),  # Root URL of the app
]
