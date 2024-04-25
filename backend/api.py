import requests
from django.conf import settings
from datetime import datetime, timedelta

## 5 day forecast
def get_five_day_forecast(city):
    """Fetch weather data from OpenWeatherMap for the specified city."""
    api_url = f"http://api.openweathermap.org/data/2.5/forecast?units=imperial&q={city}&appid={settings.OPENWEATHER_API_KEY}"
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        filtered_forecast = []
        seen_dates = set()

        for entry in data['list']:
            # convert the timestamp to a date
            date = datetime.fromtimestamp(entry['dt']).date()
            if date not in seen_dates:
                seen_dates.add(date)
                # round the temperature values
                entry['main']['temp'] = round(entry['main']['temp'])
                entry['main']['temp_min'] = round(entry['main']['temp_min'])
                entry['main']['temp_max'] = round(entry['main']['temp_max'])
                filtered_forecast.append(entry)

        # replace original data with the filtered forecast
        data['list'] = filtered_forecast
        return data

    else:
        return {
            "message": "Unable to fetch data from OpenWeatherMap API :("
        }

def get_hourly_forecast(city):
    """Faking the data for the hourly forecast - don't have the pro plan :("""
    """Simulate hourly weather data based on current weather data."""
    api_url = f"http://api.openweathermap.org/data/2.5/weather?units=imperial&q={city}&appid={settings.OPENWEATHER_API_KEY}"
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        current_time = datetime.now()
        hourly_data = []

        for i in range(24 - current_time.hour):  # Generate data for each hour left in the day
            hour_time = current_time + timedelta(hours=i)
            temp_variation = (i % 4 - 2) * 0.5  # Slight variation in temperature to simulate change

            hourly_data.append({
                "dt": int(hour_time.timestamp()),
                "main": {
                    # round the temperature values
                    "temp": round(data['main']['temp'] + temp_variation),  
                    "feels_like": round(data['main']['feels_like'] + temp_variation),
                    "temp_min": round(data['main']['temp_min']), 
                    "temp_max": round(data['main']['temp_max']),
                    "pressure": data['main']['pressure'],
                    "humidity": data['main']['humidity']
                },
                "weather": data['weather'],
                "clouds": {"all": 0},
                "wind": {"speed": 0, "deg": 0},
                "visibility": 10000,
                "dt_txt": hour_time.strftime('%Y-%m-%d %H:00:00')
            })

        return {
            "city": data['name'],
            "list": hourly_data
        }

    else:
        return {
            "message": "Unable to fetch data from OpenWeatherMap API."
        }

