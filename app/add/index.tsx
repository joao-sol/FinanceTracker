import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { useCategoryStore } from "@/store/useCategoryStore";

import { styles } from "./_styles";

type TransactionType = "expense" | "income";

export default function AddTransactionScreen() {
  const categories = useCategoryStore((state) => state.categories);

  const [type, setType] = useState<TransactionType>("expense");
  const [categoryId, setCategoryId] = useState("");

  const isExpense = type === "expense";

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
            onPress={() => setType("expense")}
            style={[styles.typeButton, isExpense && styles.typeButtonActive]}
          >
            <Text
              style={[styles.typeButtonText, isExpense && styles.expenseText]}
            >
              Despesa
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setType("income")}
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
            placeholder="R$ 0,00"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            placeholder="Ex: Almoço, Salário, Uber..."
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Categoria</Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={categoryId}
              onValueChange={(value) => setCategoryId(value)}
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
          <TextInput value="06/05/2026" editable={false} style={styles.input} />
        </View>

        <Pressable style={styles.saveButton}>
          <FontAwesome name="check" size={16} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Salvar Transação</Text>
        </Pressable>
      </View>
    </View>
  );
}
