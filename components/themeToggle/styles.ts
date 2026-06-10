import { StyleSheet } from "react-native";

import type { ThemeColors } from "@/theme/colors";

export function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    button: {
      width: 42,
      height: 42,
      borderRadius: 999,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.primaryBorder,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
