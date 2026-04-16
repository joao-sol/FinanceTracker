import { FlatList, Text, View } from "react-native";

import { TransactionCard } from "@/components/transactionCard";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useTransactionStore } from "@/store/useTransactionStore";

import { styles } from "./styles";

export default function HomeScreen() {
  const transactions = useTransactionStore((state) => state.transactions);
  const getBalance = useTransactionStore((state) => state.getBalance);
  const getTotalIncome = useTransactionStore((state) => state.getTotalIncome);
  const getTotalExpense = useTransactionStore((state) => state.getTotalExpense);
  const categories = useCategoryStore((state) => state.categories);

  const balance = getBalance();
  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();

  function getCategoryName(categoryId: string) {
    const category = categories.find((item) => item.id === categoryId);
    return category ? category.name : "Sem categoria";
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.balanceLabel}>Saldo Total</Text>
        <Text style={styles.balanceValue}>R$ {balance.toFixed(2)}</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Receitas</Text>
            <Text style={styles.summaryValue}>R$ {totalIncome.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Despesas</Text>
            <Text style={styles.summaryValue}>
              R$ {totalExpense.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transações Recentes</Text>
          <Text style={styles.sectionCount}>{transactions.length} itens</Text>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TransactionCard
              title={item.title}
              category={getCategoryName(item.categoryId)}
              amount={item.amount}
              date={item.date}
              type={item.type}
            />
          )}
        />
      </View>
    </View>
  );
}
