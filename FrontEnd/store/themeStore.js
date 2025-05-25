import { create, set } from "zustand";
export const useThemeStore = create((set) => ({
  mode: null,
  changeTheme: (theme) => {
    set({ mode: theme });
  },
}));
