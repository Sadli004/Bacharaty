import { useColorScheme } from "nativewind";
import { create, set } from "zustand";
const { colorScheme } = useColorScheme();
export const useThemeStore = create((set) => ({
  mode: colorScheme,
  changeTheme: (theme) => {
    set({ mode: theme });
  },
}));
