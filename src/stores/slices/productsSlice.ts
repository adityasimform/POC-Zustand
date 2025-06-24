import type { StateCreator } from "zustand";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  brand: string;
  model?: string;
  color?: string;
  category?: string;
  discount: number;
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
  page: number;
  hasMore: boolean;
}

export const createProductSlice: StateCreator<productsState> = (set, get) => ({
  products: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: true,

  fetchProducts: async () => {
    const { page, loading, hasMore } = get();
    if (loading || !hasMore) return;
    set({ loading: true, error: null });
    try {
      const nextPage = page + 1;
      const res = await fetch(
        `http://localhost:5000/products?_page=${nextPage}`
      );
      const data = await res.json();
      const newData: Product[] = data.data;

      set({
        products: [...get().products, ...newData],
        page: nextPage,
        hasMore: data.next !== null,
        loading: false,
      });
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
  resetProducts: () =>
    set(() => ({
      products: [],
      page: 0,
      hasMore: true,
      loading: false,
      error: null,
    })),
});
