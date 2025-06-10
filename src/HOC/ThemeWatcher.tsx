import { useEffect } from "react";
import { useStore } from "../stores/store";

export const ThemeWatcher = () => {
  const { darkMode } = useStore();

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return null;
};
