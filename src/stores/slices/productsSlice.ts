import type { StateCreator } from "zustand";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  brand?: string;
  model?: string;
  color?: string;
  category?: string;
  discount?: number;
  [key: string]: unknown;
}

export interface productsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (start?: number, end?: number) => Promise<void>;
  deleteProduct: (id: number) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
}

export const createProductSlice: StateCreator<productsState> = (set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async (start = 0, end = 10) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `http://localhost:5000/products?_start=${start}&_end=${end}`
      );
      const products: Product[] = await res.json();
      console.log("Fetched products:", products);
      set({ products: products, loading: false });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load products";
      console.error("Error fetching products:", message);
      set({ error: message, loading: false });
    }
  },

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),

  updateProduct: (updated) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === updated.id ? updated : p)),
    })),

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
});