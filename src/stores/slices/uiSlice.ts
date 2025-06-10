import type { StateCreator } from "zustand";

export interface UIState {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const createUISlice: StateCreator<UIState> = (set) => ({
  darkMode: false,
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
});
