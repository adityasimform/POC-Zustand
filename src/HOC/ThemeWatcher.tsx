import { useEffect } from "react";
import { useUIStore } from "../stores/uiStore";

export const ThemeWatcher = () => {
  const darkMode = useUIStore((s) => s.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return null;
};
