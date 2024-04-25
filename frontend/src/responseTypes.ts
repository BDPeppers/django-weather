import snowIcon from "./assets/snow.svg";
import rainIcon from "./assets/rain.svg";
import thunderstormIcon from "./assets/thunder.svg";
import nightClearIcon from "./assets/clear-night.svg";
import nightCloudyIcon from "./assets/cloudy-night.svg";
import dayClearIcon from "./assets/clear-day.svg";
import dayCloudyIcon from "./assets/cloudy-day.svg";

export enum ViewType {
  FiveDay = "FiveDay",
  Hourly = "Hourly",
}

export enum Weather {
  Clear = "Clear",
  Clouds = "Clouds",
  Rain = "Rain",
  Thunderstorm = "Thunderstorm",
  Snow = "Snow",
  Mist = "Mist",
}

export type WeatherDetail = {
  description: string;
  icon: string;
};

interface TemperatureData {
  temp: number;
  temp_min: number;
  temp_max: number;
}

interface PrecipitationData {
  main: string;
  description: string;
}

export interface WeatherData {
  dt: number;
  main: TemperatureData;
  weather: PrecipitationData[];
}

const isNightTime = (weather: WeatherData) => {
  const date = new Date(weather.dt * 1000);
  const hours = date.getHours();
  return hours < 7 || hours > 19;
};

export const getIcon = (precipitation: Weather, data: WeatherData) => {
  switch (precipitation) {
    case Weather.Clear:
      return isNightTime(data) ? nightClearIcon : dayClearIcon;
    case Weather.Clouds:
    case Weather.Mist:
      return isNightTime(data) ? nightCloudyIcon : dayCloudyIcon;
    case Weather.Rain:
      return rainIcon;
    case Weather.Thunderstorm:
      return thunderstormIcon;
    case Weather.Snow:
      return snowIcon;
    default:
      return undefined;
  }
};
