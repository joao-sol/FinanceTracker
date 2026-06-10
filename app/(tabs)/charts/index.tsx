import { FontAwesome } from "@expo/vector-icons";
import { useMemo } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";

import { useCategoryStore } from "@/store/useCategoryStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useTransactionStore } from "@/store/useTransactionStore";

import { createStyles } from "./_styles";

const screenWidth = Dimensions.get("window").width;

const categoryColors = [
  "#3B82F6",
  "#EF4444",
  "#22C55E",
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
];

export default function ChartsScreen() {
  const colors = useThemeStore((state) => state.colors);
  const styles = useMemo(() => createStyles(colors), [colors]);
  const transactions = useTransactionStore((state) => state.transactions);
  const getTotalIncome = useTransactionStore((state) => state.getTotalIncome);
  const getTotalExpense = useTransactionStore((state) => state.getTotalExpense);
  const categories = useCategoryStore((state) => state.categories);

  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();

  function getCategoryName(categoryId: string) {
    const category = categories.find((item) => item.id === categoryId);
    return category ? category.name : "Sem categoria";
  }

  const expenseByCategory = useMemo(() => {
    const expenses = transactions.filter(
      (transaction) => transaction.type === "expense",
    );

    const grouped = expenses.reduce<Record<string, number>>(
      (acc, transaction) => {
        const categoryName = getCategoryName(transaction.categoryId);

        if (!acc[categoryName]) {
          acc[categoryName] = 0;
        }

        acc[categoryName] += transaction.amount;

        return acc;
      },
      {},
    );

    return Object.entries(grouped)
      .map(([category, amount], index) => ({
        name: category,
        amount,
        population: amount,
        color: categoryColors[index % categoryColors.length],
        legendFontColor: colors.textPrimary,
        legendFontSize: 13,
        percentage:
          totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions, categories, totalExpense, colors.textPrimary]);

  const monthlyChartData = {
    labels: ["Out", "Nov", "Dez", "Jan", "Fev", "Mar"],
    datasets: [
      {
        data: [4400, 5200, 6000, 5500, 4900, 5800],
      },
    ],
  };

  const averageIncome = 5333;
  const averageExpense = 3650;

  const chartConfig = useMemo(
    () => ({
      backgroundGradientFrom: colors.surface,
      backgroundGradientTo: colors.surface,
      decimalPlaces: 0,
      color: () => colors.expense,
      labelColor: () => colors.textMuted,
      barPercentage: 0.45,
      propsForBackgroundLines: {
        strokeDasharray: "4",
        stroke: colors.border,
      },
      propsForLabels: {
        fontSize: 12,
      },
    }),
    [colors],
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <FontAwesome
            name="arrow-left"
            size={18}
            color={colors.primaryContrast}
          />
          <Text style={styles.headerTitle}>Análise Financeira</Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryTitleRow}>
              <FontAwesome
                name="line-chart"
                size={13}
                color={colors.primaryContrast}
              />
              <Text style={styles.summaryTitle}>Receitas</Text>
            </View>

            <Text style={styles.summaryValue}>R$ {totalIncome.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryTitleRow}>
              <FontAwesome
                name="line-chart"
                size={13}
                color={colors.primaryContrast}
              />
              <Text style={styles.summaryTitle}>Despesas</Text>
            </View>

            <Text style={styles.summaryValue}>
              R$ {totalExpense.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.chartCard}>
          <View style={styles.cardTitleRow}>
            <FontAwesome name="pie-chart" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Despesas por Categoria</Text>
          </View>

          {expenseByCategory.length > 0 ? (
            <>
              <View style={styles.pieChartWrapper}>
                <PieChart
                  data={expenseByCategory}
                  width={screenWidth - 72}
                  height={220}
                  chartConfig={chartConfig}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="12"
                  absolute={false}
                />
              </View>

              <View style={styles.legendList}>
                {expenseByCategory.map((item) => (
                  <View key={item.name} style={styles.legendItem}>
                    <View style={styles.legendLeft}>
                      <View
                        style={[
                          styles.legendDot,
                          { backgroundColor: item.color },
                        ]}
                      />
                      <Text style={styles.legendName}>{item.name}</Text>
                    </View>

                    <View style={styles.legendRight}>
                      <Text style={styles.legendAmount}>
                        R$ {item.amount.toFixed(2)}
                      </Text>
                      <Text style={styles.legendPercentage}>
                        {item.percentage}%
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <Text style={styles.emptyText}>
              Nenhuma despesa cadastrada para análise.
            </Text>
          )}
        </View>

        <View style={styles.chartCard}>
          <View style={styles.cardTitleRow}>
            <FontAwesome name="line-chart" size={18} color={colors.primary} />
            <Text style={styles.cardTitle}>Visão Mensal</Text>
          </View>

          <BarChart
            data={monthlyChartData}
            width={screenWidth - 72}
            height={245}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            style={styles.barChart}
            fromZero
            showValuesOnTopOfBars={false}
          />

          <View style={styles.chartLegendRow}>
            <View style={styles.chartLegendItem}>
              <View style={[styles.chartLegendDot, styles.incomeDot]} />
              <Text style={styles.incomeLegendText}>Receitas</Text>
            </View>

            <View style={styles.chartLegendItem}>
              <View style={[styles.chartLegendDot, styles.expenseDot]} />
              <Text style={styles.expenseLegendText}>Despesas</Text>
            </View>
          </View>
        </View>

        <View style={styles.averageRow}>
          <View style={[styles.averageCard, styles.averageIncomeCard]}>
            <Text style={styles.averageLabel}>Média Mensal</Text>
            <Text style={styles.averageValue}>R$ {averageIncome}</Text>
            <Text style={styles.averageDescription}>Receitas</Text>
          </View>

          <View style={[styles.averageCard, styles.averageExpenseCard]}>
            <Text style={styles.averageLabel}>Média Mensal</Text>
            <Text style={styles.averageValue}>R$ {averageExpense}</Text>
            <Text style={styles.averageDescription}>Despesas</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
