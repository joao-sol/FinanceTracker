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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionHeader: {
    marginBottom: 18,
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
    paddingBottom: 24,
  },
});
