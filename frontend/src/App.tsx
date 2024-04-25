import "./App.css";

import Header from "./components/Header";
import WeatherDisplay from "./components/WeatherDisplay";

function App() {
  return (
    // space three sections for best ux
    // section 1: header
    // section 2: input component
    // section 3: view container

    <main className="w-full h-full">
      <Header />
      <WeatherDisplay />
    </main>
  );
}

export default App;
