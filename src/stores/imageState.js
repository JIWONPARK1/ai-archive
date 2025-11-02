import { create } from "zustand";

export const useImageListStore = create((set) => ({
  imageList: [],
  setImageList: (imageList) => set({ imageList }),
}));
