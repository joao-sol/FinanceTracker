import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useMemo, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

import { FilterChip } from "@/components/filter";
import { TransactionCard } from "@/components/transactionCard";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useTransactionStore } from "@/store/useTransactionStore";

import { styles } from "./_styles";

type TypeFilter = "all" | "income" | "expense";

export default function HomeScreen() {
  const transactions = useTransactionStore((state) => state.transactions);
  const getBalance = useTransactionStore((state) => state.getBalance);
  const getTotalIncome = useTransactionStore((state) => state.getTotalIncome);
  const getTotalExpense = useTransactionStore((state) => state.getTotalExpense);
  const categories = useCategoryStore((state) => state.categories);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");

  const balance = getBalance();
  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();

  function getCategoryName(categoryId: string) {
    const category = categories.find((item) => item.id === categoryId);
    return category ? category.name : "Sem categoria";
  }

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesType =
        typeFilter === "all" ? true : transaction.type === typeFilter;

      const matchesCategory =
        selectedCategoryId === "all"
          ? true
          : transaction.categoryId === selectedCategoryId;

      const categoryName = getCategoryName(transaction.categoryId);

      const matchesSearch =
        transaction.title.toLowerCase().includes(search.toLowerCase()) ||
        categoryName.toLowerCase().includes(search.toLowerCase());

      return matchesType && matchesCategory && matchesSearch;
    });
  }, [transactions, typeFilter, selectedCategoryId, search, categories]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.balanceLabel}>Saldo Total</Text>
        <Text style={styles.balanceValue}>R$ {balance.toFixed(2)}</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Receitas</Text>
            <Text style={[styles.summaryValue, styles.incomeText]}>
              R$ {totalIncome.toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Despesas</Text>
            <Text style={[styles.summaryValue, styles.expenseText]}>
              R$ {totalExpense.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar transações..."
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />

        <View style={styles.typeFilterSection}>
          <View style={styles.typeFilterRow}>
            <FilterChip
              label="Todas"
              active={typeFilter === "all"}
              onPress={() => setTypeFilter("all")}
            />
            <FilterChip
              label="Receitas"
              active={typeFilter === "income"}
              onPress={() => setTypeFilter("income")}
            />
            <FilterChip
              label="Despesas"
              active={typeFilter === "expense"}
              onPress={() => setTypeFilter("expense")}
            />
          </View>
        </View>

        <View style={styles.categoryFilterSection}>
          <View style={styles.categoryFilterContainer}>
            <Feather name="filter" size={20} color="#64748B" />
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedCategoryId}
                onValueChange={(itemValue) => setSelectedCategoryId(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Todas as categorias" value="all" />
                {categories.map((category) => (
                  <Picker.Item
                    key={category.id}
                    label={category.name}
                    value={category.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transações Recentes</Text>
          <Text style={styles.sectionCount}>
            {filteredTransactions.length} itens
          </Text>
        </View>

        <FlatList
          data={filteredTransactions}
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
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>
                Nenhuma transação encontrada
              </Text>
              <Text style={styles.emptyStateText}>
                Tente ajustar os filtros ou cadastrar novas transações.
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}
