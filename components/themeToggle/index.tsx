import { FontAwesome } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable } from "react-native";

import { useThemeStore } from "@/store/useThemeStore";

import { createStyles } from "./styles";

export function ThemeToggle() {
  const colors = useThemeStore((state) => state.colors);
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable
      onPress={() => {
        void toggleTheme();
      }}
      style={styles.button}
      accessibilityLabel={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      <FontAwesome
        name={isDark ? "sun-o" : "moon-o"}
        size={18}
        color={colors.primary}
      />
    </Pressable>
  );
}
