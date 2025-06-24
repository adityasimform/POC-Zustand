import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { createUISlice, type UIState } from "./slices/uiSlice";
import { createAuthSlice, type AuthState } from "./slices/authSlice";
import { createProductSlice, type productsState } from "./slices/productsSlice";
import { createCartSlice, type CartState } from "./slices/cartSlice";
import { createFilterSlice,type FilterState } from "./slices/filterSlice";

type StoreState = AuthState & UIState & productsState & CartState & FilterState;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get, store) => ({
        ...createAuthSlice(set, get, store),
        ...createUISlice(set, get, store),
        ...createProductSlice(set, get, store),
        ...createCartSlice(set, get, store),
        ...createFilterSlice(set, get, store),
      }),
      { name: "zustand-store" }
    )
  )
);
