import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { FilterChip } from "@/components/filter";
import { ThemeToggle } from "@/components/themeToggle";
import { TransactionCard } from "@/components/transactionCard";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useThemeStore } from "@/store/useThemeStore";
import {
  type Transaction,
  useTransactionStore,
} from "@/store/useTransactionStore";

import { createStyles } from "@/styles/tabs";

type TypeFilter = "all" | "income" | "expense";

function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function parseBrazilianDate(value: string) {
  const [day, month, year] = value.split("/").map(Number);

  if (!day || !month || !year || year < 1900) return null;

  const date = new Date(year, month - 1, day);
  const isValidDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isValidDate) return null;

  return [
    String(year).padStart(4, "0"),
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");
}

function getDateFilterError(startDateInput: string, endDateInput: string) {
  const startDate = startDateInput ? parseBrazilianDate(startDateInput) : null;
  const endDate = endDateInput ? parseBrazilianDate(endDateInput) : null;

  if (startDateInput && startDateInput.length < 10) {
    return "Complete a data inicial.";
  }

  if (startDateInput && !startDate) {
    return "Informe uma data inicial válida.";
  }

  if (endDateInput && endDateInput.length < 10) {
    return "Complete a data final.";
  }

  if (endDateInput && !endDate) {
    return "Informe uma data final válida.";
  }

  if (startDate && endDate && startDate > endDate) {
    return "A data inicial não pode ser maior que a final.";
  }

  return "";
}

export default function HomeScreen() {
  const colors = useThemeStore((state) => state.colors);
  const styles = useMemo(() => createStyles(colors), [colors]);
  const transactions = useTransactionStore((state) => state.transactions);
  const getBalance = useTransactionStore((state) => state.getBalance);
  const getTotalIncome = useTransactionStore((state) => state.getTotalIncome);
  const getTotalExpense = useTransactionStore((state) => state.getTotalExpense);
  const removeTransaction = useTransactionStore(
    (state) => state.removeTransaction,
  );
  const categories = useCategoryStore((state) => state.categories);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [draftCategoryId, setDraftCategoryId] = useState<string>("all");
  const [draftStartDateInput, setDraftStartDateInput] = useState("");
  const [draftEndDateInput, setDraftEndDateInput] = useState("");
  const [filterError, setFilterError] = useState("");

  const balance = getBalance();
  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const startDate = startDateInput ? parseBrazilianDate(startDateInput) : null;
  const endDate = endDateInput ? parseBrazilianDate(endDateInput) : null;
  const hasDateFilter = Boolean(startDateInput || endDateInput);
  const hasCategoryFilter = selectedCategoryId !== "all";
  const activeFilterCount =
    (hasCategoryFilter ? 1 : 0) + (hasDateFilter ? 1 : 0);
  const draftDateFilterError = getDateFilterError(
    draftStartDateInput,
    draftEndDateInput,
  );

  useEffect(() => {
    const categoryStillExists = categories.some(
      (category) => category.id === selectedCategoryId,
    );

    if (selectedCategoryId !== "all" && !categoryStillExists) {
      setSelectedCategoryId("all");
    }
  }, [categories, selectedCategoryId]);

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

      const matchesStartDate = startDate
        ? transaction.date >= startDate
        : true;
      const matchesEndDate = endDate ? transaction.date <= endDate : true;
      const matchesDate = matchesStartDate && matchesEndDate;

      return matchesType && matchesCategory && matchesSearch && matchesDate;
    });
  }, [
    transactions,
    typeFilter,
    selectedCategoryId,
    search,
    categories,
    startDate,
    endDate,
  ]);

  function openFilterModal() {
    setDraftCategoryId(selectedCategoryId);
    setDraftStartDateInput(startDateInput);
    setDraftEndDateInput(endDateInput);
    setFilterError("");
    setIsFilterModalVisible(true);
  }

  function closeFilterModal() {
    setFilterError("");
    setIsFilterModalVisible(false);
  }

  function clearFilters() {
    setSelectedCategoryId("all");
    setStartDateInput("");
    setEndDateInput("");
    setDraftCategoryId("all");
    setDraftStartDateInput("");
    setDraftEndDateInput("");
    setFilterError("");
    setIsFilterModalVisible(false);
  }

  function applyFilters() {
    if (draftDateFilterError) {
      setFilterError(draftDateFilterError);
      return;
    }

    setSelectedCategoryId(draftCategoryId);
    setStartDateInput(draftStartDateInput);
    setEndDateInput(draftEndDateInput);
    closeFilterModal();
  }

  async function handleRemoveTransaction(transaction: Transaction) {
    try {
      await removeTransaction(transaction.id);
    } catch {
      Alert.alert("Erro", "Não foi possível excluir a transação.");
    }
  }

  function confirmRemoveTransaction(transaction: Transaction) {
    Alert.alert(
      "Excluir transação",
      `Deseja excluir "${transaction.title}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            void handleRemoveTransaction(transaction);
          },
        },
      ],
    );
  }

  function handleTransactionLongPress(transaction: Transaction) {
    Alert.alert(transaction.title, "O que deseja fazer?", [
      {
        text: "Editar",
        onPress: () =>
          router.push({
            pathname: "/add",
            params: { transactionId: transaction.id },
          }),
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => confirmRemoveTransaction(transaction),
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.balanceLabel}>Saldo Total</Text>
          <ThemeToggle />
        </View>

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
          placeholderTextColor={colors.placeholder}
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

        <View style={styles.filterButtonSection}>
          <Pressable
            onPress={openFilterModal}
            style={[
              styles.filterButton,
              activeFilterCount > 0 && styles.filterButtonActive,
            ]}
          >
            <Feather
              name="filter"
              size={18}
              color={
                activeFilterCount > 0 ? colors.primaryContrast : colors.primary
              }
            />
            <Text
              style={[
                styles.filterButtonText,
                activeFilterCount > 0 && styles.filterButtonTextActive,
              ]}
            >
              Filtros
            </Text>

            {activeFilterCount > 0 ? (
              <View style={styles.filterCountBadge}>
                <Text style={styles.filterCountText}>{activeFilterCount}</Text>
              </View>
            ) : null}
          </Pressable>
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
              onLongPress={() => handleTransactionLongPress(item)}
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
      <Modal
        animationType="fade"
        transparent
        visible={isFilterModalVisible}
        onRequestClose={closeFilterModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>Filtros</Text>

              <Pressable
                onPress={closeFilterModal}
                style={styles.filterModalCloseButton}
                accessibilityLabel="Fechar filtros"
              >
                <Feather name="x" size={20} color={colors.textMuted} />
              </Pressable>
            </View>

            <View style={styles.filterField}>
              <Text style={styles.filterLabel}>Categoria</Text>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={draftCategoryId}
                  onValueChange={(itemValue) => setDraftCategoryId(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Todas as categorias" value="all" />
                  {categories.map((category) => (
                    <Picker.Item
                      key={category.id}
                      label={
                        category.isActive === false
                          ? `${category.name} (inativa)`
                          : category.name
                      }
                      value={category.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <Pressable
              onPress={() => {
                closeFilterModal();
                router.push("/categories" as never);
              }}
              style={styles.manageCategoriesButton}
            >
              <Feather name="plus" size={16} color={colors.primary} />
              <Text style={styles.manageCategoriesText}>
                Gerenciar categorias
              </Text>
            </Pressable>

            <View style={styles.filterField}>
              <Text style={styles.filterLabel}>Período</Text>

              <View style={styles.dateFilterRow}>
                <TextInput
                  value={draftStartDateInput}
                  onChangeText={(value) => {
                    setDraftStartDateInput(formatDateInput(value));
                    setFilterError("");
                  }}
                  placeholder="Início"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="number-pad"
                  maxLength={10}
                  style={styles.dateInput}
                />

                <TextInput
                  value={draftEndDateInput}
                  onChangeText={(value) => {
                    setDraftEndDateInput(formatDateInput(value));
                    setFilterError("");
                  }}
                  placeholder="Fim"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="number-pad"
                  maxLength={10}
                  style={styles.dateInput}
                />
              </View>

              {filterError ? (
                <Text style={styles.dateFilterError}>{filterError}</Text>
              ) : null}
            </View>

            <View style={styles.filterActions}>
              <Pressable onPress={clearFilters} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Limpar</Text>
              </Pressable>

              <Pressable onPress={applyFilters} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Aplicar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
