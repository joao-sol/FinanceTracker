import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { useCategoryStore } from "@/store/useCategoryStore";
import { useTransactionStore } from "@/store/useTransactionStore";

import { styles } from "./_styles";

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

function parseAmount(value: string) {
  const sanitizedValue = value.trim().replace(/[^\d,.]/g, "");
  const normalizedValue = sanitizedValue.includes(",")
    ? sanitizedValue.replace(/\./g, "").replace(",", ".")
    : sanitizedValue;
  const amount = Number(normalizedValue);

  return Number.isFinite(amount) ? amount : 0;
}

export default function AddTransactionScreen() {
  const categories = useCategoryStore((state) => state.categories);
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date] = useState(getTodayDate);
  const [error, setError] = useState("");

  const isExpense = type === "expense";
  const formattedDate = formatDateToBrazilian(date);

  function clearError() {
    if (error) {
      setError("");
    }
  }

  function handleSave() {
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

    if (!categoryId) {
      setError("Selecione uma categoria.");
      return;
    }

    addTransaction({
      title: normalizedTitle,
      amount: parsedAmount,
      type,
      categoryId,
      date,
    });

    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#334155" />
        </Pressable>

        <Text style={styles.headerTitle}>Nova Transação</Text>

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
            placeholderTextColor="#64748B"
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
            placeholderTextColor="#94A3B8"
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
              <FontAwesome name="plus" size={12} color="#2F66F5" />
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

        <View style={styles.field}>
          <Text style={styles.label}>Data</Text>
          <TextInput
            value={formattedDate}
            editable={false}
            style={styles.input}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable onPress={handleSave} style={styles.saveButton}>
          <FontAwesome name="check" size={16} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Salvar Transação</Text>
        </Pressable>
      </View>
    </View>
  );
}
