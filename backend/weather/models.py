from django.db import models

class CityWeather(models.Model):
    city_name = models.CharField(max_length=100)
    temperature = models.FloatField()
    description = models.CharField(max_length=200)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.city_name} ({self.temperature}°)"
