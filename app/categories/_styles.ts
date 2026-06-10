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
    formSection: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: colors.textPrimary,
    },
    formRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 14,
    },
    input: {
      flex: 1,
      height: 54,
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
      fontSize: 16,
      color: colors.textPrimary,
    },
    cancelButton: {
      width: 54,
      height: 54,
      borderRadius: 14,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.borderStrong,
      alignItems: "center",
      justifyContent: "center",
    },
    addButton: {
      width: 54,
      height: 54,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: {
      color: colors.danger,
      fontSize: 14,
      fontWeight: "600",
      marginTop: 12,
    },
    statusTabs: {
      flexDirection: "row",
      backgroundColor: colors.surfaceMuted,
      borderRadius: 14,
      padding: 4,
      marginBottom: 22,
    },
    statusTabButton: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    statusTabButtonActive: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statusTabText: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.textMuted,
    },
    statusTabTextActive: {
      color: colors.primary,
    },
    listHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    counterText: {
      fontSize: 15,
      color: colors.textMuted,
    },
    listContent: {
      paddingBottom: 32,
    },
    categoryItem: {
      minHeight: 62,
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },
    categoryItemInactive: {
      backgroundColor: colors.inactiveSurface,
      borderColor: colors.borderStrong,
    },
    categoryIcon: {
      width: 38,
      height: 38,
      borderRadius: 999,
      backgroundColor: colors.primaryMuted,
      alignItems: "center",
      justifyContent: "center",
    },
    categoryIconInactive: {
      backgroundColor: colors.inactiveIconSurface,
    },
    categoryName: {
      flex: 1,
      fontSize: 16,
      fontWeight: "700",
      color: colors.textPrimary,
    },
    categoryNameInactive: {
      color: colors.textMuted,
    },
    emptyState: {
      backgroundColor: colors.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 20,
      alignItems: "center",
    },
    emptyStateTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 8,
    },
    emptyStateText: {
      fontSize: 14,
      color: colors.textMuted,
      textAlign: "center",
      lineHeight: 20,
    },
  });
}
