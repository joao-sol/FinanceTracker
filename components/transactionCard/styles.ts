import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
    backgroundColor: "#E8F6EA",
  },
  expenseIconBg: {
    backgroundColor: "#FDEBE7",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  category: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
  },
  income: {
    color: "#4CAF50",
  },
  expense: {
    color: "#F25C2A",
  },
  date: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
});
