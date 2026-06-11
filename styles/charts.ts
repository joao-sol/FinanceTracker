import { StyleSheet } from "react-native";

import type { ThemeColors } from "@/theme/colors";

export function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: 110,
    },
    header: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingTop: 42,
      paddingBottom: 32,
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
    },
    headerTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 18,
      marginBottom: 30,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: colors.primaryContrast,
    },
    summaryRow: {
      flexDirection: "row",
      gap: 12,
    },
    summaryCard: {
      flex: 1,
      backgroundColor: colors.summaryOverlay,
      borderRadius: 14,
      padding: 16,
    },
    summaryTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
    },
    summaryTitle: {
      color: colors.headerMuted,
      fontSize: 14,
      fontWeight: "600",
    },
    summaryValue: {
      color: colors.primaryContrast,
      fontSize: 18,
      fontWeight: "800",
    },
    content: {
      padding: 24,
      gap: 24,
    },
    chartCard: {
      backgroundColor: colors.surface,
      borderRadius: 18,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 18,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: colors.textPrimary,
    },
    pieChartWrapper: {
      alignItems: "center",
      marginVertical: 6,
    },
    legendList: {
      marginTop: 12,
      gap: 14,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    legendLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      flex: 1,
    },
    legendDot: {
      width: 14,
      height: 14,
      borderRadius: 999,
    },
    legendName: {
      fontSize: 15,
      color: colors.textPrimary,
      fontWeight: "600",
    },
    legendRight: {
      alignItems: "flex-end",
    },
    legendAmount: {
      fontSize: 14,
      fontWeight: "800",
      color: colors.textPrimary,
    },
    legendPercentage: {
      fontSize: 12,
      color: colors.textMuted,
      marginTop: 2,
    },
    barChart: {
      borderRadius: 16,
      marginLeft: -12,
    },
    chartLegendRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      marginTop: 6,
    },
    chartLegendItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    chartLegendDot: {
      width: 13,
      height: 13,
    },
    incomeDot: {
      backgroundColor: colors.income,
    },
    expenseDot: {
      backgroundColor: colors.expense,
    },
    incomeLegendText: {
      color: colors.income,
      fontWeight: "700",
    },
    expenseLegendText: {
      color: colors.expense,
      fontWeight: "700",
    },
    averageRow: {
      flexDirection: "row",
      gap: 14,
    },
    averageCard: {
      flex: 1,
      borderRadius: 14,
      padding: 16,
    },
    averageIncomeCard: {
      backgroundColor: colors.income,
    },
    averageExpenseCard: {
      backgroundColor: colors.expense,
    },
    averageLabel: {
      color: colors.primaryContrast,
      fontSize: 14,
      marginBottom: 8,
    },
    averageValue: {
      color: colors.primaryContrast,
      fontSize: 22,
      fontWeight: "800",
    },
    averageDescription: {
      color: colors.primaryContrast,
      fontSize: 13,
      marginTop: 4,
    },
    emptyText: {
      color: colors.textMuted,
      textAlign: "center",
      paddingVertical: 24,
    },
  });
}
