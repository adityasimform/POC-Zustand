import { toast } from "sonner";
import type { WithImmer } from "../types/immer";

const API_URL = import.meta.env.VITE_API_URL;

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
  deleteProduct: (id: number) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  page: number;
  hasMore: boolean;
}

export const createProductSlice: WithImmer<productsState> = (set, get) => ({
  products: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: true,

  fetchProducts: async () => {
    const { page, loading, hasMore } = get();
    if (loading || !hasMore) return;
    set((state) => {
      state.loading = true;
      state.error = null;
    });
    try {
      const nextPage = page + 1;
      const res = await fetch(`${API_URL}/products?_page=${nextPage}`);
      const data = await res.json();
      const newData: Product[] = data.data;

      set((state) => {
        state.products.push(...newData);
        state.page = nextPage;
        state.hasMore = data.next !== null;
        state.loading = false;
      });
      toast.success("Successfully fetched Products!");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load products";
      set((state) => {
        state.error = message;
        state.loading = false;
      });
      toast.error("Failed to fetch products!");
    }
  },

  deleteProduct: async (id: number) => {
    set((state) => {
      state.loading = true;
      state.error = null;
    });
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      set((state) => {
        state.products = state.products.filter((product) => product.id !== id);
        state.loading = false;
      });
      toast.success("Product deleted successfully!");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete product";
      set((state) => {
        state.error = message;
        state.loading = false;
      });
      toast.error("Product deletion failed!");
    }
  },

  updateProduct: async (updated: Product) => {
    set((state) => {
      state.loading = true;
      state.error = null;
    });
    try {
      const res = await fetch(`${API_URL}/products/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to update product");
      const data: Product = await res.json();
      set((state) => {
        const idx = state.products.findIndex((p) => p.id === data.id);
        if (idx !== -1) state.products[idx] = data;
        state.loading = false;
      });
      toast.success("Product updated successfully!");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update product";
      set((state) => {
        state.error = message;
        state.loading = false;
      });
      toast.error("Failed to update product!");
    }
  },

  addProduct: async (product: Product) => {
    set((state) => {
      state.loading = true;
      state.error = null;
    });
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to add product");
      const data: Product = await res.json();
      set((state) => {
        state.products.unshift(data);
        state.loading = false;
      });
      toast.success("Product added successfully!");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to add product";
      set((state) => {
        state.error = message;
        state.loading = false;
      });
      toast.error("Failed to add product!");
    }
  },

  resetProducts: () =>
    set((state) => {
      state.products = [];
      state.page = 0;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    }),
});
