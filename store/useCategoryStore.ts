import { create } from "zustand";

export type Category = {
  id: string;
  name: string;
  createdAt: string;
};

type CategoryStore = {
  categories: Category[];
  addCategory: (name: string) => void;
  removeCategory: (id: string) => void;
  updateCategory: (id: string, name: string) => void;
  getCategoryById: (id: string) => Category | undefined;
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [
    {
      id: "1",
      name: "Salário",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Alimentação",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Transporte",
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Moradia",
      createdAt: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Lazer",
      createdAt: new Date().toISOString(),
    },
  ],

  addCategory: (name) =>
    set((state) => {
      const normalized = name.trim();

      if (!normalized) return state;

      const alreadyExists = state.categories.some(
        (category) => category.name.toLowerCase() === normalized.toLowerCase(),
      );

      if (alreadyExists) return state;

      const newCategory: Category = {
        id: Date.now().toString(),
        name: normalized,
        createdAt: new Date().toISOString(),
      };

      return {
        categories: [...state.categories, newCategory],
      };
    }),

  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),

  updateCategory: (id, name) =>
    set((state) => {
      const normalized = name.trim();

      if (!normalized) return state;

      const alreadyExists = state.categories.some(
        (category) =>
          category.id !== id &&
          category.name.toLowerCase() === normalized.toLowerCase(),
      );

      if (alreadyExists) return state;

      return {
        categories: state.categories.map((category) =>
          category.id === id ? { ...category, name: normalized } : category,
        ),
      };
    }),

  getCategoryById: (id) =>
    get().categories.find((category) => category.id === id),
}));
