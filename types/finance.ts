export type Category = {
  id: string;
  name: string;
  createdAt: string;
  isActive: boolean;
};

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

export type CreateTransactionInput = {
  title: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string;
};

export type UpdateTransactionInput = {
  title?: string;
  amount?: number;
  type?: TransactionType;
  categoryId?: string;
  date?: string;
};
