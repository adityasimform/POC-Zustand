import type { StateCreator } from "zustand";

export interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  token: null,
  isLoggedIn: false,
  login: async (username) => {
    await new Promise((res) => setTimeout(res, 1000)); // Simulate API delay
    const fakeToken = `${username}-token`;
    set({ token: fakeToken, isLoggedIn: true });
  },
  logout: () => set({ token: null, isLoggedIn: false }),
});
