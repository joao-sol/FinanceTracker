import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  header: {
    backgroundColor: "#2F66F5",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  balanceLabel: {
    color: "#E5EDFF",
    fontSize: 18,
    marginBottom: 10,
  },
  balanceValue: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
  },
  summaryTitle: {
    fontSize: 16,
    color: "#334155",
    marginBottom: 12,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  incomeText: {
    color: "#6CC24A",
  },
  expenseText: {
    color: "#F25C2A",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  searchInput: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#0F172A",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 18,
  },
  typeFilterSection: {
    marginBottom: 18,
  },

  typeFilterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  categoryFilterSection: {
    marginBottom: 26,
  },

  categoryFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    overflow: "hidden",
    justifyContent: "center",
    height: 52,
  },
  picker: {
    color: "#0F172A",
  },
  sectionHeader: {
    marginBottom: 18,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  sectionCount: {
    fontSize: 15,
    color: "#64748B",
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 20,
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
  },
});
