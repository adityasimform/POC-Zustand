import { useUIStore } from "../stores/uiStore";
import {SunMoon, MoonStar} from "lucide-react";

const Topbar = () => {
  const { darkMode, toggleTheme } = useUIStore();

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-800">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Zustask</h1>
      <button
        onClick={toggleTheme}
        className=" text-gray-900 dark:text-white px-4 py-2 rounded"
      >
       
         {darkMode ? <MoonStar /> :  <SunMoon />} 
      </button>
    </div>
  );
};

export default Topbar;