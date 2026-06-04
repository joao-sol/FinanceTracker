import { create } from "zustand";

import {
  createTransaction,
  deleteTransactionRecord,
  getTransactions,
  updateTransactionRecord,
} from "@/database";
import type {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "@/types/finance";

export type { Transaction, TransactionType } from "@/types/finance";

type TransactionStore = {
  transactions: Transaction[];
  loadTransactions: () => Promise<void>;
  addTransaction: (data: CreateTransactionInput) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
  updateTransaction: (
    id: string,
    data: UpdateTransactionInput,
  ) => Promise<void>;
  getTransactionById: (id: string) => Transaction | undefined;
  getBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpense: () => number;
};

function sortTransactions(transactions: Transaction[]) {
  return [...transactions].sort((first, second) => {
    const dateComparison = second.date.localeCompare(first.date);

    if (dateComparison !== 0) return dateComparison;

    return second.createdAt.localeCompare(first.createdAt);
  });
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],

  loadTransactions: async () => {
    const transactions = await getTransactions();

    set({ transactions });
  },

  addTransaction: async (data) => {
    const title = data.title.trim();

    if (!title || data.amount <= 0) return;

    const newTransaction = await createTransaction({
      ...data,
      title,
    });

    set((state) => ({
      transactions: sortTransactions([...state.transactions, newTransaction]),
    }));
  },

  removeTransaction: async (id) => {
    await deleteTransactionRecord(id);

    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== id,
      ),
    }));
  },

  updateTransaction: async (id, data) => {
    const normalizedData: UpdateTransactionInput = { ...data };

    if (data.title !== undefined) {
      normalizedData.title = data.title.trim();
    }

    if (normalizedData.title !== undefined && !normalizedData.title) return;
    if (normalizedData.amount !== undefined && normalizedData.amount <= 0) {
      return;
    }

    await updateTransactionRecord(id, normalizedData);

    set((state) => ({
      transactions: sortTransactions(
        state.transactions.map((transaction) =>
          transaction.id === id
            ? {
                ...transaction,
                ...normalizedData,
              }
            : transaction,
        ),
      ),
    }));
  },

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
