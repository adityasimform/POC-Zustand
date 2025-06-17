import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { createTaskSlice, type TaskState } from "./slices/taskSlice";
import { createUISlice, type UIState } from "./slices/uiSlice";
import { createAuthSlice, type AuthState } from "./slices/authSlice";
import { createProductSlice, type productsState } from "./slices/productsSlice";
import { createCartSlice, type CartState } from "./slices/cartSlice";

type StoreState = AuthState & UIState & TaskState & productsState & CartState;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get, store) => ({
        ...createAuthSlice(set, get, store),
        ...createUISlice(set, get, store),
        ...createTaskSlice(set, get, store),
        ...createProductSlice(set, get, store),
        ...createCartSlice(set, get, store),

      }),
      { name: "zustand-store" }
    )
  )
);
