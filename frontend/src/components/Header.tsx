import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import tailwindLogo from "../assets/tailwindcss.svg";

const Header = () => {
  return (
    <header className="w-full mb-20">
      <h1 className="">Vite/React + Tailwind + Django Weather App</h1>
      <div className="flex items-center justify-center w-full">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <p className="text-4xl">+</p>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <p className="text-4xl">+</p>
        <a href="https://tailwindcss.com" target="_blank">
          <img src={tailwindLogo} className="logo" alt="Tailwind logo" />
        </a>
        <p className="text-4xl">+</p>
        <a href="https://www.djangoproject.com/" target="_blank">
          <img
            src="https://www.djangoproject.com/m/img/logos/django-logo-negative.png"
            className="logo"
            alt="Django logo"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
