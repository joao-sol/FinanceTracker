import { StyleSheet } from "react-native";

import type { ThemeColors } from "@/theme/colors";

export function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      height: 72,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    headerSpacer: {
      width: 44,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: colors.textPrimary,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    typeSelector: {
      flexDirection: "row",
      backgroundColor: colors.surfaceMuted,
      borderRadius: 14,
      padding: 4,
      marginBottom: 26,
    },
    typeButton: {
      flex: 1,
      height: 50,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    typeButtonActive: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    typeButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.textSecondary,
    },
    expenseText: {
      color: colors.expense,
    },
    incomeText: {
      color: colors.income,
    },
    field: {
      marginBottom: 22,
    },
    label: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.textSecondary,
      marginBottom: 10,
    },
    labelRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    labelInRow: {
      marginBottom: 0,
    },
    categoryLinkButton: {
      minHeight: 32,
      paddingHorizontal: 12,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.primaryBorder,
      backgroundColor: colors.primaryMuted,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    categoryLinkText: {
      fontSize: 13,
      fontWeight: "700",
      color: colors.primary,
    },
    input: {
      height: 54,
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
      fontSize: 16,
      color: colors.textPrimary,
    },
    pickerWrapper: {
      height: 54,
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: "center",
      overflow: "hidden",
    },
    picker: {
      color: colors.textPrimary,
    },
    saveButton: {
      height: 58,
      backgroundColor: colors.primary,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 10,
      marginTop: 4,
      shadowColor: colors.shadowPrimary,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 6,
    },
    errorText: {
      color: colors.danger,
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 14,
      textAlign: "center",
    },
    saveButtonText: {
      color: colors.primaryContrast,
      fontSize: 16,
      fontWeight: "800",
    },
  });
}
