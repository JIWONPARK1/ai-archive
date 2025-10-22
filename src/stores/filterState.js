import { create } from "zustand";

export const useFilterStore = create((set) => ({
  isShowFilterModal: false,
  setIsShowFilterModal: (isShow) => set({ isShowFilterModal: isShow }),
}));
