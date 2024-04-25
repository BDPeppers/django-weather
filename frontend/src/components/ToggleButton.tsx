import { ViewType } from "../responseTypes";

interface ToggleButtonProps {
  currentView: ViewType;
  toggleView: () => void;
}

const ToggleButton = ({ currentView, toggleView }: ToggleButtonProps) => {
  return (
    <button
      className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
      onClick={toggleView}
    >
      {currentView === ViewType.Hourly ? "Hourly" : "Five Day"} Forecast
    </button>
  );
};

export default ToggleButton;
