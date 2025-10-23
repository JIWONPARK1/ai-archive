import { create } from "zustand";

export const useFilterStore = create((set) => ({
  filterOptions: {
    year: "ALL",
    type: null,
    value: null,
  },
  setFilterOptions: (options) => set({ filterOptions: options }),
}));
