import type { StateCreator } from "zustand";

export interface FilterState {
  priceRange: [number, number]; // e.g., [0, 2000]
  selectedBrands: string[];
  minDiscount: number;
  setFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
}

export const createFilterSlice: StateCreator<FilterState> = (
  set
): FilterState => ({
  priceRange: [0, 2000],
  selectedBrands: [],
  minDiscount: 0,

  setFilters: (filters) =>
    set((state) => ({
      ...state,
      ...filters,
    })),

  clearFilters: () => {
    set(() => ({
      priceRange: [0, 2000],
      selectedBrands: [],
      minDiscount: 0,
    }));
  },
});
