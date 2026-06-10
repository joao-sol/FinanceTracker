import { create } from "zustand";

import { getThemeModePreference, setThemeModePreference } from "@/database";
import { getThemeColors, type ThemeColors } from "@/theme/colors";
import type { ThemeMode } from "@/types/theme";

type ThemeStore = {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
  loadTheme: () => Promise<void>;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
};

function getThemeState(mode: ThemeMode) {
  return {
    mode,
    colors: getThemeColors(mode),
    isDark: mode === "dark",
  };
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  ...getThemeState("light"),

  loadTheme: async () => {
    const mode = await getThemeModePreference();

    set(getThemeState(mode));
  },

  setThemeMode: async (mode) => {
    await setThemeModePreference(mode);

    set(getThemeState(mode));
  },

  toggleTheme: async () => {
    const nextMode = get().mode === "dark" ? "light" : "dark";

    await get().setThemeMode(nextMode);
  },
}));
