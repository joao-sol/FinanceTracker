import { StyleSheet } from "react-native";

import type { ThemeColors } from "@/theme/colors";

export function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    chip: {
      minHeight: 44,
      paddingHorizontal: 18,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
    },
    chipActive: {
      backgroundColor: colors.primary,
    },
    chipInactive: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    chipText: {
      fontSize: 14,
      fontWeight: "600",
    },
    chipTextActive: {
      color: colors.primaryContrast,
    },
    chipTextInactive: {
      color: colors.textMuted,
    },
  });
}
