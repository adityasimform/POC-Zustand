import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: 'ui-preferences' }
  )
);