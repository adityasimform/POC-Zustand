import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,
      login: async (username) => {
        // Simulate API delay
        await new Promise((res) => setTimeout(res, 1000));
        const fakeToken = `${username}-token`;
        set({ token: fakeToken, isLoggedIn: true });
      },
      logout: () => set({ token: null, isLoggedIn: false })
    }),
    {
      name: 'auth-store',
    }
  )
);