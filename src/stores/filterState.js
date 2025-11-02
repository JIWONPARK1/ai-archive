import { create } from "zustand";

export const useFilterStore = create((set) => ({
  filterOptions: {
    year: "ALL",
    type: null,
    value: null,
  },
  selectedArchive: "all",
  tab: null,
  mode: "modal" | "tab",
  setTab: (type, value) => set({ tab: { type, value } }),
  setFilterMode: (mode) => set({ mode }),
  setSelectedArchive: (selectedArchive) => set({ selectedArchive }),
  setFilterOptions: (options) => set({ filterOptions: options }),
}));
