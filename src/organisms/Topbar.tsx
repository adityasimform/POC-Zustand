import { SunMoon, MoonStar } from "lucide-react";
import { useStore } from "../stores/store";
import { Link, useLocation } from "react-router";

const Topbar = () => {
  const darkMode = useStore(state => state.darkMode);
  const toggleTheme = useStore(state => state.toggleTheme);

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-800 shadow-md">
      <div className="flex items-center space-x-8">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Zustask</h1>
      </div>
        <nav className="flex space-x-4">
          <Link
            to="/products"
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              isActive("/products")
                ? "bg-indigo-600 text-white"
                : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
            }`}
          >
            Products
          </Link>
        </nav>
      <button
        onClick={toggleTheme}
        className="text-gray-900 dark:text-white p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {darkMode ? <MoonStar /> : <SunMoon />}
      </button>
    </div>
  );
};

export default Topbar;
