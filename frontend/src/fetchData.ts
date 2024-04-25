import { ViewType, Weather, WeatherData } from "./responseTypes";

const weatherEndpoints: Record<ViewType, string> = {
  [ViewType.FiveDay]: "http://127.0.0.1:8000/five-day-forecast/",
  [ViewType.Hourly]: "http://127.0.0.1:8000/hourly-forecast/",
};

export const fetchWeatherData = async (city: string, viewType: ViewType) => {
  // Construct URL based on viewType and city, removing any spaces from the city name if present
  const url = `${weatherEndpoints[viewType]}${encodeURIComponent(city)}/`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Ensure that data.list is present and is an array
    if (!data || !Array.isArray(data.list)) {
      throw new Error("Invalid data structure returned from the API");
    }

    const weather: WeatherData[] = data.list.map((entry: any) => {
      return {
        dt: entry.dt,
        main: {
          temp: Math.round(entry.main.temp),
          temp_min: Math.round(entry.main.temp_min),
          temp_max: Math.round(entry.main.temp_max),
        },
        weather: [
          {
            main: entry.weather[0].main as Weather,
            description: entry.weather[0].description,
          },
        ],
      };
    });
    console.log("Fetched weather data:", weather);

    return weather;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
};
