import { create } from "zustand";
export const useErrorStore = create((set) => ({
  errorMessage: null,
  type: null,
  setError: (message, type) => set({ errorMessage: message, type: type }),
  clearError: () => set({ errorMessage: null, type: null }),
}));
