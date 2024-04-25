import { ViewType, Weather, WeatherData, getIcon } from "../responseTypes";

interface ViewContainerProps {
  data: WeatherData[] | null; // Data can be null initially or if not set
  viewType: ViewType;
}

const ViewContainer = ({ data, viewType }: ViewContainerProps) => {
  // Check if data is null or empty
  const noDataAvailable = data === null;

  if (noDataAvailable) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">
          What's the weather like in your area? Enter a city to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((entry, index) => (
        <div key={index} className="p-4 rounded shadow border-2-black">
          <h2 className="font-semibold">
            {viewType === ViewType.Hourly
              ? new Date(entry.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : new Date(entry.dt * 1000).toLocaleDateString()}
          </h2>
          <p className="text-2xl">{entry.main.temp}°F</p>
          <p>
            High: {entry.main.temp_max}°F&nbsp;&nbsp;Low: {entry.main.temp_min}
            °F
          </p>
          <div className="flex flex-col items-center justify-center">
            <img
              src={getIcon(entry.weather[0].main as Weather, entry)}
              alt={entry.weather[0].description}
            />
            <p>{entry.weather[0].description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewContainer;
