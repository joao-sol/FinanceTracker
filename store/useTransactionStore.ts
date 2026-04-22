import { create } from "zustand";

export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string;
  createdAt: string;
};

type CreateTransactionInput = {
  title: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string;
};

type UpdateTransactionInput = {
  title?: string;
  amount?: number;
  type?: TransactionType;
  categoryId?: string;
  date?: string;
};

type TransactionStore = {
  transactions: Transaction[];
  addTransaction: (data: CreateTransactionInput) => void;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, data: UpdateTransactionInput) => void;
  getTransactionById: (id: string) => Transaction | undefined;
  getBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpense: () => number;
};

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [
    {
      id: "1",
      title: "Salário",
      amount: 5000,
      type: "income",
      categoryId: "1",
      date: "2026-04-01",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Supermercado",
      amount: 350,
      type: "expense",
      categoryId: "2",
      date: "2026-04-10",
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Aluguel",
      amount: 1200,
      type: "expense",
      categoryId: "4",
      date: "2026-04-05",
      createdAt: new Date().toISOString(),
    },
    {
      id: "5",
      title: "Bar",
      amount: 80,
      type: "expense",
      categoryId: "5",
      date: "2026-04-21",
      createdAt: new Date().toISOString(),
    },
  ],

  addTransaction: (data) =>
    set((state) => {
      const title = data.title.trim();

      if (!title || data.amount <= 0) return state;

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        title,
        amount: data.amount,
        type: data.type,
        categoryId: data.categoryId,
        date: data.date,
        createdAt: new Date().toISOString(),
      };

      return {
        transactions: [...state.transactions, newTransaction],
      };
    }),

  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== id,
      ),
    })),

  updateTransaction: (id, data) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) => {
        if (transaction.id !== id) return transaction;

        return {
          ...transaction,
          ...data,
          title:
            data.title !== undefined ? data.title.trim() : transaction.title,
        };
      }),
    })),

  getTransactionById: (id) =>
    get().transactions.find((transaction) => transaction.id === id),

  getBalance: () =>
    get().transactions.reduce((total, transaction) => {
      return transaction.type === "income"
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0),

  getTotalIncome: () =>
    get()
      .transactions.filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0),

  getTotalExpense: () =>
    get()
      .transactions.filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0),
}));
