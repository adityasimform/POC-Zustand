import type { Product } from "./productsSlice";
import { toast } from "sonner";
import type { WithImmer } from "../types/immer";

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

export const createCartSlice: WithImmer<CartState> = (set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
        toast.success(`${product.title} added to cart!`);
      }
    }),

  removeFromCart: (id) =>
    set((state) => {
      state.cart = state.cart.filter((item) => item.id !== id);
    }),

  increaseQuantity: (id) =>
    set((state) => {
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      } else {
        console.error(`Product with id ${id} not found in the cart.`);
      }
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const item = state.cart.find((item) => item.id === id);
      if (!item) {
        console.error(`Product with id ${id} not found in the cart.`);
        return;
      }
      if (item.quantity === 1) {
        console.warn(`Cannot decrease quantity below 1 for product id ${id}.`);
        return;
      }
      item.quantity -= 1;
    }),

  clearCart: () =>
    set((state) => {
      state.cart = [];
    }),
});
