import { create } from "zustand";
export const useErrorStore = create((set) => ({
  errorMessage: null,
  setError: (message) => set({ errorMessage: message }),
  clearError: () => set({ errorMessage: null }),
}));
