import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { useCategoryStore } from "@/store/useCategoryStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useTransactionStore } from "@/store/useTransactionStore";

import { createStyles } from "./_styles";

type TransactionType = "expense" | "income";

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDateToBrazilian(date: string) {
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

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

function parseAmount(value: string) {
  const sanitizedValue = value.trim().replace(/[^\d,.]/g, "");
  const normalizedValue = sanitizedValue.includes(",")
    ? sanitizedValue.replace(/\./g, "").replace(",", ".")
    : sanitizedValue;
  const amount = Number(normalizedValue);

  return Number.isFinite(amount) ? amount : 0;
}

function isCategoryActive(category: { isActive?: boolean }) {
  return category.isActive !== false;
}

export default function AddTransactionScreen() {
  const colors = useThemeStore((state) => state.colors);
  const styles = useMemo(() => createStyles(colors), [colors]);
  const categories = useCategoryStore((state) => state.categories);
  const transactions = useTransactionStore((state) => state.transactions);
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction,
  );
  const { transactionId } = useLocalSearchParams();

  const editingTransactionId = Array.isArray(transactionId)
    ? transactionId[0]
    : transactionId;

  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [dateInput, setDateInput] = useState(() =>
    formatDateToBrazilian(getTodayDate()),
  );
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const editingTransaction = editingTransactionId
    ? transactions.find((item) => item.id === editingTransactionId)
    : undefined;
  const activeCategories = categories.filter(isCategoryActive);
  const currentCategory = categories.find(
    (category) => category.id === categoryId,
  );
  const inactiveCurrentCategory =
    editingTransaction &&
    currentCategory &&
    editingTransaction.categoryId === currentCategory.id &&
    !isCategoryActive(currentCategory)
      ? currentCategory
      : undefined;
  const selectableCategories = inactiveCurrentCategory
    ? [inactiveCurrentCategory, ...activeCategories]
    : activeCategories;
  const isExpense = type === "expense";
  const isEditing = Boolean(editingTransactionId);

  function clearError() {
    if (error) {
      setError("");
    }
  }

  useEffect(() => {
    if (!editingTransactionId) return;

    const transaction = transactions.find(
      (item) => item.id === editingTransactionId,
    );

    if (!transaction) {
      setError("Transação não encontrada.");
      return;
    }

    setType(transaction.type);
    setAmount(transaction.amount.toFixed(2).replace(".", ","));
    setTitle(transaction.title);
    setCategoryId(transaction.categoryId);
    setDateInput(formatDateToBrazilian(transaction.date));
    setError("");
  }, [editingTransactionId, transactions]);

  useEffect(() => {
    if (!categoryId) return;

    const selectedCategory = categories.find(
      (category) => category.id === categoryId,
    );
    const canKeepInactiveCategory =
      editingTransaction?.categoryId === categoryId &&
      selectedCategory &&
      !isCategoryActive(selectedCategory);

    if (
      !selectedCategory ||
      (!isCategoryActive(selectedCategory) && !canKeepInactiveCategory)
    ) {
      setCategoryId("");
    }
  }, [categories, categoryId, editingTransaction?.categoryId]);

  async function handleSave() {
    if (isSaving) return;

    const parsedAmount = parseAmount(amount);
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setError("Informe uma descrição para a transação.");
      return;
    }

    if (parsedAmount <= 0) {
      setError("Informe um valor maior que zero.");
      return;
    }

    const transactionDate = parseBrazilianDate(dateInput);

    if (!transactionDate) {
      setError("Informe uma data válida no formato dd/mm/aaaa.");
      return;
    }

    const selectedCategory = categories.find(
      (category) => category.id === categoryId,
    );
    const isOriginalInactiveCategory =
      editingTransaction?.categoryId === categoryId &&
      selectedCategory &&
      !isCategoryActive(selectedCategory);

    if (
      !categoryId ||
      !selectedCategory ||
      (!isCategoryActive(selectedCategory) && !isOriginalInactiveCategory)
    ) {
      setError("Selecione uma categoria ativa.");
      return;
    }

    const transactionData = {
      title: normalizedTitle,
      amount: parsedAmount,
      type,
      categoryId,
      date: transactionDate,
    };

    if (
      editingTransactionId &&
      !transactions.some(
        (transaction) => transaction.id === editingTransactionId,
      )
    ) {
      setError("Transação não encontrada.");
      return;
    }

    setIsSaving(true);

    try {
      if (editingTransactionId) {
        await updateTransaction(editingTransactionId, transactionData);
      } else {
        await addTransaction(transactionData);
      }

      router.back();
    } catch {
      setError("Não foi possível salvar a transação.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome
            name="arrow-left"
            size={20}
            color={colors.textSecondary}
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          {isEditing ? "Editar Transação" : "Nova Transação"}
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.typeSelector}>
          <Pressable
            onPress={() => {
              setType("expense");
              clearError();
            }}
            style={[styles.typeButton, isExpense && styles.typeButtonActive]}
          >
            <Text
              style={[styles.typeButtonText, isExpense && styles.expenseText]}
            >
              Despesa
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setType("income");
              clearError();
            }}
            style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
          >
            <Text
              style={[styles.typeButtonText, !isExpense && styles.incomeText]}
            >
              Receita
            </Text>
          </Pressable>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Valor</Text>
          <TextInput
            value={amount}
            onChangeText={(value) => {
              setAmount(value);
              clearError();
            }}
            placeholder="R$ 0,00"
            placeholderTextColor={colors.placeholder}
            keyboardType="decimal-pad"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            value={title}
            onChangeText={(value) => {
              setTitle(value);
              clearError();
            }}
            placeholder="Ex: Almoço, Salário, Uber..."
            placeholderTextColor={colors.placeholder}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <View style={styles.labelRow}>
            <Text style={[styles.label, styles.labelInRow]}>Categoria</Text>

            <Pressable
              onPress={() => router.push("/categories" as never)}
              style={styles.categoryLinkButton}
            >
              <FontAwesome name="plus" size={12} color={colors.primary} />
              <Text style={styles.categoryLinkText}>Nova</Text>
            </Pressable>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={categoryId}
              onValueChange={(value) => {
                setCategoryId(value);
                clearError();
              }}
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma categoria" value="" />

              {selectableCategories.map((category) => (
                <Picker.Item
                  key={category.id}
                  label={
                    isCategoryActive(category)
                      ? category.name
                      : `${category.name} (inativa)`
                  }
                  value={category.id}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Data</Text>
          <TextInput
            value={dateInput}
            onChangeText={(value) => {
              setDateInput(formatDateInput(value));
              clearError();
            }}
            placeholder="dd/mm/aaaa"
            placeholderTextColor={colors.placeholder}
            keyboardType="number-pad"
            maxLength={10}
            style={styles.input}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          onPress={handleSave}
          disabled={isSaving}
          style={styles.saveButton}
        >
          <FontAwesome name="check" size={16} color={colors.primaryContrast} />
          <Text style={styles.saveButtonText}>
            {isSaving
              ? "Salvando..."
              : isEditing
                ? "Salvar Alterações"
                : "Salvar Transação"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
