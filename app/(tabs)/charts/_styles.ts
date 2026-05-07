import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  scrollContent: {
    paddingBottom: 110,
  },
  header: {
    backgroundColor: "#2F66F5",
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
    color: "#FFFFFF",
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
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
    color: "#E5EDFF",
    fontSize: 14,
    fontWeight: "600",
  },
  summaryValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  content: {
    padding: 24,
    gap: 24,
  },
  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
    color: "#0F172A",
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
    color: "#0F172A",
    fontWeight: "600",
  },
  legendRight: {
    alignItems: "flex-end",
  },
  legendAmount: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  legendPercentage: {
    fontSize: 12,
    color: "#64748B",
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
    backgroundColor: "#22C55E",
  },
  expenseDot: {
    backgroundColor: "#EF4444",
  },
  incomeLegendText: {
    color: "#22C55E",
    fontWeight: "700",
  },
  expenseLegendText: {
    color: "#EF4444",
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
    backgroundColor: "#5DBB46",
  },
  averageExpenseCard: {
    backgroundColor: "#F04B25",
  },
  averageLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 8,
  },
  averageValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },
  averageDescription: {
    color: "#FFFFFF",
    fontSize: 13,
    marginTop: 4,
  },
  emptyText: {
    color: "#64748B",
    textAlign: "center",
    paddingVertical: 24,
  },
});
