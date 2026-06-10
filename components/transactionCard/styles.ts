import { StyleSheet } from "react-native";

import type { ThemeColors } from "@/theme/colors";

export function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 18,
      padding: 16,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    leftContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      flex: 1,
    },
    rightContent: {
      alignItems: "flex-end",
      justifyContent: "center",
    },
    iconContainer: {
      width: 42,
      height: 42,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
    },
    incomeIconBg: {
      backgroundColor: colors.incomeSoft,
    },
    expenseIconBg: {
      backgroundColor: colors.expenseSoft,
    },
    title: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.textPrimary,
    },
    category: {
      fontSize: 14,
      color: colors.textMuted,
      marginTop: 4,
    },
    amount: {
      fontSize: 16,
      fontWeight: "700",
    },
    income: {
      color: colors.income,
    },
    expense: {
      color: colors.expense,
    },
    date: {
      fontSize: 14,
      color: colors.textMuted,
      marginTop: 4,
    },
  });
}
