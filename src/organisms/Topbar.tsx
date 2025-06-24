import { SunMoon, MoonStar } from "lucide-react";
import { useStore } from "../stores/store";
import { Link, useLocation } from "react-router";

const Topbar = () => {
  const darkMode = useStore(state => state.darkMode);
  const toggleTheme = useStore(state => state.toggleTheme);

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md rounded-b-2xl border-b border-indigo-100 dark:border-gray-800">
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight drop-shadow">
          Zustask
        </h1>
      </div>
      <nav className="flex space-x-4">
        <Link
          to="/products"
          className={`px-4 py-2 rounded-lg text-base font-semibold transition-all duration-150 ${
            isActive("/products")
              ? "bg-indigo-600 text-white shadow"
              : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-gray-800"
          }`}
        >
          Products
        </Link>
      </nav>
      <button
        onClick={toggleTheme}
        className="text-indigo-700 dark:text-indigo-300 p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
        title="Toggle theme"
        type="button"
      >
        {darkMode ? <MoonStar className="w-6 h-6" /> : <SunMoon className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default Topbar;
