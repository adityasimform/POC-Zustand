import type { WithImmer } from "../types/immer";

export interface FilterState {
  priceRange: [number, number];
  selectedBrands: string[];
  minDiscount: number;
  setFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
}

export const createFilterSlice: WithImmer<FilterState> = (set) => ({
  priceRange: [0, 2000],
  selectedBrands: [],
  minDiscount: 0,

  setFilters: (filters) =>
    set((state) => {
      if (filters.priceRange) state.priceRange = filters.priceRange;
      if (filters.selectedBrands) state.selectedBrands = filters.selectedBrands;
      if (typeof filters.minDiscount === 'number') state.minDiscount = filters.minDiscount;
    }),

  clearFilters: () =>
    set((state) => {
      state.priceRange = [0, 2000];
      state.selectedBrands = [];
      state.minDiscount = 0;
    }),
});
