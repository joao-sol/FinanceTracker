import { create } from "zustand";

import {
  createCategory,
  getCategories,
  setCategoryActive,
  updateCategoryName,
} from "@/database";
import type { Category } from "@/types/finance";

export type { Category } from "@/types/finance";

type CategoryStore = {
  categories: Category[];
  loadCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  deactivateCategory: (id: string) => Promise<void>;
  activateCategory: (id: string) => Promise<void>;
  updateCategory: (id: string, name: string) => Promise<void>;
  getCategoryById: (id: string) => Category | undefined;
};

function sortCategories(categories: Category[]) {
  return [...categories].sort((first, second) => {
    if (first.isActive !== second.isActive) {
      return first.isActive ? -1 : 1;
    }

    return first.name.localeCompare(second.name, "pt-BR", {
      sensitivity: "base",
    });
  });
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],

  loadCategories: async () => {
    const categories = await getCategories();

    set({ categories });
  },

  addCategory: async (name) => {
    const normalized = name.trim();

    if (!normalized) return;

    const alreadyExists = get().categories.some(
      (category) => category.name.toLowerCase() === normalized.toLowerCase(),
    );

    if (alreadyExists) return;

    const newCategory = await createCategory(normalized);

    set((state) => ({
      categories: sortCategories([...state.categories, newCategory]),
    }));
  },

  deactivateCategory: async (id) => {
    await setCategoryActive(id, false);

    set((state) => ({
      categories: sortCategories(
        state.categories.map((category) =>
          category.id === id ? { ...category, isActive: false } : category,
        ),
      ),
    }));
  },

  activateCategory: async (id) => {
    await setCategoryActive(id, true);

    set((state) => ({
      categories: sortCategories(
        state.categories.map((category) =>
          category.id === id ? { ...category, isActive: true } : category,
        ),
      ),
    }));
  },

  updateCategory: async (id, name) => {
    const normalized = name.trim();

    if (!normalized) return;

    const alreadyExists = get().categories.some(
      (category) =>
        category.id !== id &&
        category.name.toLowerCase() === normalized.toLowerCase(),
    );

    if (alreadyExists) return;

    await updateCategoryName(id, normalized);

    set((state) => ({
      categories: sortCategories(
        state.categories.map((category) =>
          category.id === id ? { ...category, name: normalized } : category,
        ),
      ),
    }));
  },

  getCategoryById: (id) =>
    get().categories.find((category) => category.id === id),
}));
