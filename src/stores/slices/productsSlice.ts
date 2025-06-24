import { toast } from "sonner";
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
  deleteProduct: (id: number) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
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
      toast.success("Successfully fetched Products!");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load products";
      console.error("Error fetching products:", message);
      set({ error: message, loading: false });
      toast.error("Failed to fetch products!");
    }
  },
  deleteProduct: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        loading: false,
      }));
       toast.success("Product deleted successfully!");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete product";
      set({ error: message, loading: false });
       toast.error("Product deletion failed!");
    }
  },


  updateProduct: async (updated: Product) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`http://localhost:5000/products/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to update product");
      const data: Product = await res.json();
      set((state) => ({
        products: state.products.map((p) => (p.id === data.id ? data : p)),
        loading: false,
      }));
      toast.success("Product updated successfully!");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update product";
      set({ error: message, loading: false });
       toast.error("Failed to update product!");
    }
  },

  addProduct: async (product: Product) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`http://localhost:5000/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to add product");
      const data: Product = await res.json();
      set((state) => ({
        products: [...state.products, data],
        loading: false,
      }));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to add product";
      set({ error: message, loading: false });
       toast.error("Failed to add product!");
    }
  },
  resetProducts: () =>
    set(() => ({
      products: [],
      page: 0,
      hasMore: true,
      loading: false,
      error: null,
    })),
});
