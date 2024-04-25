import React, { useState, useEffect } from "react";
import { ViewType, WeatherData } from "../responseTypes";
import ToggleButton from "./ToggleButton";
import ViewContainer from "./ViewContainer";
import { fetchWeatherData } from "../fetchData";

const titleCase = (city: string) => {
  return city
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const WeatherDisplay = () => {
  const [viewType, setViewType] = useState<ViewType>(ViewType.FiveDay);
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [city, setCity] = useState<string>("");

  // fetch weather data whenever viewType or city changes
  useEffect(() => {
    if (city) {
      // Ensure the city is not empty
      fetchWeather();
    }
  }, [viewType, city]);

  const fetchWeather = async () => {
    const data = await fetchWeatherData(city, viewType);
    setWeatherData(data || null);
  };

  const toggleView = () => {
    setViewType(
      viewType === ViewType.FiveDay ? ViewType.Hourly : ViewType.FiveDay
    );
  };

  const handleCityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchWeather();
  };

  return (
    <div>
      <div className="flex justify-center my-4 gap-2">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleCityInput}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Weather
          </button>
        </form>
        <ToggleButton currentView={viewType} toggleView={toggleView} />
      </div>
      <hr />
      <h2 className="text-center text-2xl mt-4">
        {city
          ? `Weather forecast for ${titleCase(city)}`
          : "Enter a city to get started"}
      </h2>
      <ViewContainer data={weatherData} viewType={viewType} />
    </div>
  );
};

export default WeatherDisplay;
