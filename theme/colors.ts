import type { ThemeMode } from "@/types/theme";

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  surfaceSoft: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  placeholder: string;
  border: string;
  borderStrong: string;
  primary: string;
  primaryMuted: string;
  primaryBorder: string;
  primaryContrast: string;
  headerMuted: string;
  income: string;
  incomeSoft: string;
  expense: string;
  expenseSoft: string;
  danger: string;
  overlay: string;
  shadowPrimary: string;
  inactiveSurface: string;
  inactiveIconSurface: string;
  summaryOverlay: string;
};

export const lightTheme: ThemeColors = {
  background: "#F5F6F8",
  surface: "#FFFFFF",
  surfaceMuted: "#EEF0F4",
  surfaceSoft: "#F8FAFC",
  textPrimary: "#0F172A",
  textSecondary: "#334155",
  textMuted: "#64748B",
  placeholder: "#94A3B8",
  border: "#E5E7EB",
  borderStrong: "#CBD5E1",
  primary: "#2F66F5",
  primaryMuted: "#EFF6FF",
  primaryBorder: "#BFDBFE",
  primaryContrast: "#FFFFFF",
  headerMuted: "#E5EDFF",
  income: "#22A745",
  incomeSoft: "#E8F6EA",
  expense: "#F25C2A",
  expenseSoft: "#FDEBE7",
  danger: "#DC2626",
  overlay: "rgba(15, 23, 42, 0.42)",
  shadowPrimary: "#2F66F5",
  inactiveSurface: "#F8FAFC",
  inactiveIconSurface: "#E2E8F0",
  summaryOverlay: "rgba(255, 255, 255, 0.14)",
};

export const darkTheme: ThemeColors = {
  background: "#0B1120",
  surface: "#111827",
  surfaceMuted: "#1E293B",
  surfaceSoft: "#162033",
  textPrimary: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",
  placeholder: "#64748B",
  border: "#253044",
  borderStrong: "#475569",
  primary: "#7AA2FF",
  primaryMuted: "#172554",
  primaryBorder: "#3156A3",
  primaryContrast: "#FFFFFF",
  headerMuted: "#DBEAFE",
  income: "#4ADE80",
  incomeSoft: "rgba(74, 222, 128, 0.16)",
  expense: "#FB7185",
  expenseSoft: "rgba(251, 113, 133, 0.16)",
  danger: "#F87171",
  overlay: "rgba(2, 6, 23, 0.72)",
  shadowPrimary: "#1D4ED8",
  inactiveSurface: "#101827",
  inactiveIconSurface: "#253044",
  summaryOverlay: "rgba(255, 255, 255, 0.1)",
};

export function getThemeColors(mode: ThemeMode) {
  return mode === "dark" ? darkTheme : lightTheme;
}
