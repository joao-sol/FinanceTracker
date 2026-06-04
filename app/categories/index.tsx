import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, Pressable, Text, TextInput, View } from "react-native";

import { type Category, useCategoryStore } from "@/store/useCategoryStore";
import { useTransactionStore } from "@/store/useTransactionStore";

import { styles } from "./_styles";

type CategoryStatusFilter = "active" | "inactive";

function isCategoryActive(category: Category) {
  return category.isActive !== false;
}

export default function CategoriesScreen() {
  const categories = useCategoryStore((state) => state.categories);
  const addCategory = useCategoryStore((state) => state.addCategory);
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const deactivateCategory = useCategoryStore(
    (state) => state.deactivateCategory,
  );
  const activateCategory = useCategoryStore((state) => state.activateCategory);
  const transactions = useTransactionStore((state) => state.transactions);

  const [name, setName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null,
  );
  const [statusFilter, setStatusFilter] =
    useState<CategoryStatusFilter>("active");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const activeCategories = categories.filter(isCategoryActive);
  const inactiveCategories = categories.filter(
    (category) => !isCategoryActive(category),
  );
  const visibleCategories =
    statusFilter === "active" ? activeCategories : inactiveCategories;
  const isEditing = Boolean(editingCategoryId);

  function clearError() {
    if (error) {
      setError("");
    }
  }

  function resetForm() {
    setName("");
    setEditingCategoryId(null);
    setError("");
  }

  async function handleSaveCategory() {
    if (isSaving) return;

    const normalizedName = name.trim();

    if (!normalizedName) {
      setError("Informe o nome da categoria.");
      return;
    }

    const existingCategory = categories.find(
      (category) =>
        category.id !== editingCategoryId &&
        category.name.toLowerCase() === normalizedName.toLowerCase(),
    );

    if (existingCategory) {
      setError(
        isCategoryActive(existingCategory)
          ? "Essa categoria já existe."
          : "Essa categoria já existe na aba Inativas.",
      );
      return;
    }

    setIsSaving(true);

    try {
      if (editingCategoryId) {
        await updateCategory(editingCategoryId, normalizedName);
      } else {
        await addCategory(normalizedName);
      }

      resetForm();
    } catch {
      setError("Não foi possível salvar a categoria.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleEditCategory(category: Category) {
    setEditingCategoryId(category.id);
    setName(category.name);
    setStatusFilter(isCategoryActive(category) ? "active" : "inactive");
    setError("");
  }

  async function handleDeactivateCategory(category: Category) {
    try {
      await deactivateCategory(category.id);

      if (editingCategoryId === category.id) {
        resetForm();
      }
    } catch {
      Alert.alert("Erro", "Não foi possível inativar a categoria.");
    }
  }

  async function handleActivateCategory(category: Category) {
    try {
      await activateCategory(category.id);
      setStatusFilter("active");
    } catch {
      Alert.alert("Erro", "Não foi possível reativar a categoria.");
    }
  }

  function confirmDeactivateCategory(category: Category) {
    const linkedTransactions = transactions.filter(
      (transaction) => transaction.categoryId === category.id,
    ).length;
    const transactionLabel =
      linkedTransactions === 1 ? "transação" : "transações";
    const linkedMessage = linkedTransactions
      ? ` Ela continuará associada a ${linkedTransactions} ${transactionLabel} antiga${
          linkedTransactions === 1 ? "" : "s"
        }.`
      : "";

    Alert.alert(
      "Inativar categoria",
      `Deseja inativar "${category.name}"? Ela não aparecerá em novas transações.${linkedMessage}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Inativar",
          style: "destructive",
          onPress: () => {
            void handleDeactivateCategory(category);
          },
        },
      ],
    );
  }

  function confirmActivateCategory(category: Category) {
    Alert.alert(
      "Reativar categoria",
      `Deseja reativar "${category.name}" para novas transações?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Reativar",
          onPress: () => {
            void handleActivateCategory(category);
          },
        },
      ],
    );
  }

  function handleCategoryLongPress(category: Category) {
    if (isCategoryActive(category)) {
      Alert.alert(category.name, "O que deseja fazer?", [
        {
          text: "Editar",
          onPress: () => handleEditCategory(category),
        },
        {
          text: "Inativar",
          style: "destructive",
          onPress: () => confirmDeactivateCategory(category),
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]);
      return;
    }

    Alert.alert(category.name, "O que deseja fazer?", [
      {
        text: "Editar",
        onPress: () => handleEditCategory(category),
      },
      {
        text: "Reativar",
        onPress: () => confirmActivateCategory(category),
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
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#334155" />
        </Pressable>

        <Text style={styles.headerTitle}>Categorias</Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>
            {isEditing ? "Editar categoria" : "Nova categoria"}
          </Text>

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

            {isEditing ? (
              <Pressable
                onPress={resetForm}
                style={styles.cancelButton}
                accessibilityLabel="Cancelar edição"
              >
                <FontAwesome name="times" size={18} color="#64748B" />
              </Pressable>
            ) : null}

            <Pressable
              onPress={handleSaveCategory}
              disabled={isSaving}
              style={styles.addButton}
              accessibilityLabel={
                isEditing ? "Salvar categoria" : "Adicionar categoria"
              }
            >
              <FontAwesome
                name={isEditing ? "check" : "plus"}
                size={18}
                color="#FFFFFF"
              />
            </Pressable>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.statusTabs}>
          <Pressable
            onPress={() => setStatusFilter("active")}
            style={[
              styles.statusTabButton,
              statusFilter === "active" && styles.statusTabButtonActive,
            ]}
          >
            <Text
              style={[
                styles.statusTabText,
                statusFilter === "active" && styles.statusTabTextActive,
              ]}
            >
              Ativas ({activeCategories.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setStatusFilter("inactive")}
            style={[
              styles.statusTabButton,
              statusFilter === "inactive" && styles.statusTabButtonActive,
            ]}
          >
            <Text
              style={[
                styles.statusTabText,
                statusFilter === "inactive" && styles.statusTabTextActive,
              ]}
            >
              Inativas ({inactiveCategories.length})
            </Text>
          </Pressable>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>
            {statusFilter === "active"
              ? "Categorias ativas"
              : "Categorias inativas"}
          </Text>
          <Text style={styles.counterText}>
            {visibleCategories.length} itens
          </Text>
        </View>

        <FlatList
          data={visibleCategories}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isActive = isCategoryActive(item);

            return (
              <Pressable
                onLongPress={() => handleCategoryLongPress(item)}
                delayLongPress={350}
                style={[
                  styles.categoryItem,
                  !isActive && styles.categoryItemInactive,
                ]}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    !isActive && styles.categoryIconInactive,
                  ]}
                >
                  <FontAwesome
                    name="tag"
                    size={16}
                    color={isActive ? "#2F66F5" : "#64748B"}
                  />
                </View>

                <Text
                  style={[
                    styles.categoryName,
                    !isActive && styles.categoryNameInactive,
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>
                {statusFilter === "active"
                  ? "Nenhuma categoria ativa"
                  : "Nenhuma categoria inativa"}
              </Text>
              <Text style={styles.emptyStateText}>
                {statusFilter === "active"
                  ? "Crie categorias para organizar suas transações."
                  : "Categorias inativadas aparecerão aqui."}
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}
