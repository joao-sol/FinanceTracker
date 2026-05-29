import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

import { useCategoryStore } from "@/store/useCategoryStore";

import { styles } from "./_styles";

export default function CategoriesScreen() {
  const categories = useCategoryStore((state) => state.categories);
  const addCategory = useCategoryStore((state) => state.addCategory);

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function clearError() {
    if (error) {
      setError("");
    }
  }

  function handleAddCategory() {
    const normalizedName = name.trim();

    if (!normalizedName) {
      setError("Informe o nome da categoria.");
      return;
    }

    const alreadyExists = categories.some(
      (category) =>
        category.name.toLowerCase() === normalizedName.toLowerCase(),
    );

    if (alreadyExists) {
      setError("Essa categoria já existe.");
      return;
    }

    addCategory(normalizedName);
    setName("");
    setError("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#334155" />
        </Pressable>

        <Text style={styles.headerTitle}>Categorias</Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Nova categoria</Text>

          <View style={styles.formRow}>
            <TextInput
              value={name}
              onChangeText={(value) => {
                setName(value);
                clearError();
              }}
              placeholder="Ex: Saúde, Estudos, Mercado..."
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />

            <Pressable
              onPress={handleAddCategory}
              style={styles.addButton}
              accessibilityLabel="Adicionar categoria"
            >
              <FontAwesome name="plus" size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Categorias existentes</Text>
          <Text style={styles.counterText}>{categories.length} itens</Text>
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <FontAwesome name="tag" size={16} color="#2F66F5" />
              </View>

              <Text style={styles.categoryName}>{item.name}</Text>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>
                Nenhuma categoria cadastrada
              </Text>
              <Text style={styles.emptyStateText}>
                Crie categorias para organizar suas transações.
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}
