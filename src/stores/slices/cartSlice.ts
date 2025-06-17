import type { StateCreator } from "zustand";
import type { Product } from "./productsSlice";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

export const createCartSlice: StateCreator<CartState> = (set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  increaseQuantity: (id) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === id);
      if (!existingItem) {
        console.error(`Product with id ${id} not found in the cart.`);
        return state;
      }
      return {
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === id);
      if (!existingItem) {
        console.error(`Product with id ${id} not found in the cart.`);
        return state;
      }
      if (existingItem.quantity === 1) {
        console.warn(`Cannot decrease quantity below 1 for product id ${id}.`);
        return state;
      }
      return {
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    }),

  clearCart: () => set({ cart: [] }),
});