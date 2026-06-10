import * as SQLite from "expo-sqlite";

import type {
  Category,
  CreateTransactionInput,
  Transaction,
  TransactionType,
  UpdateTransactionInput,
} from "@/types/finance";
import type { ThemeMode } from "@/types/theme";

import { createSchema } from "./schema";

const DATABASE_NAME = "finance_tracker.db";
const INITIAL_SEED_KEY = "initial_seed_done";
const THEME_MODE_KEY = "theme_mode";

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Salário",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "2",
    name: "Alimentação",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "3",
    name: "Transporte",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "4",
    name: "Moradia",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "5",
    name: "Lazer",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

const initialTransactions: Transaction[] = [
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
];

type CategoryRow = {
  id: number;
  name: string;
  is_active: number;
  created_at: string;
};

type TransactionRow = {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
  category_id: number;
  date: string;
  created_at: string;
};

export async function getDatabase() {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }

  return databasePromise;
}

export async function initializeDatabase() {
  const database = await getDatabase();

  await createSchema(database);
  await seedInitialData(database);
}

export async function getThemeModePreference(): Promise<ThemeMode> {
  const database = await getDatabase();
  const row = await database.getFirstAsync<{ value: string }>(
    `SELECT value FROM app_metadata WHERE key = ?`,
    THEME_MODE_KEY,
  );

  return row?.value === "dark" ? "dark" : "light";
}

export async function setThemeModePreference(mode: ThemeMode) {
  const database = await getDatabase();

  await database.runAsync(
    `INSERT OR REPLACE INTO app_metadata (key, value) VALUES (?, ?)`,
    THEME_MODE_KEY,
    mode,
  );
}

export async function getCategories() {
  const database = await getDatabase();
  const rows = await database.getAllAsync<CategoryRow>(`
    SELECT id, name, is_active, created_at
    FROM categories
    ORDER BY is_active DESC, name COLLATE NOCASE ASC
  `);

  return rows.map(mapCategoryRow);
}

export async function createCategory(name: string) {
  const database = await getDatabase();
  const createdAt = new Date().toISOString();
  const result = await database.runAsync(
    `INSERT INTO categories (name, is_active, created_at) VALUES (?, ?, ?)`,
    name,
    1,
    createdAt,
  );

  return {
    id: String(result.lastInsertRowId),
    name,
    createdAt,
    isActive: true,
  } satisfies Category;
}

export async function updateCategoryName(id: string, name: string) {
  const database = await getDatabase();

  await database.runAsync(
    `UPDATE categories SET name = ? WHERE id = ?`,
    name,
    Number(id),
  );
}

export async function setCategoryActive(id: string, isActive: boolean) {
  const database = await getDatabase();

  await database.runAsync(
    `UPDATE categories SET is_active = ? WHERE id = ?`,
    isActive ? 1 : 0,
    Number(id),
  );
}

export async function getTransactions() {
  const database = await getDatabase();
  const rows = await database.getAllAsync<TransactionRow>(`
    SELECT id, title, amount, type, category_id, date, created_at
    FROM transactions
    ORDER BY date DESC, created_at DESC
  `);

  return rows.map(mapTransactionRow);
}

export async function createTransaction(data: CreateTransactionInput) {
  const database = await getDatabase();
  const createdAt = new Date().toISOString();
  const result = await database.runAsync(
    `
      INSERT INTO transactions
        (title, amount, type, category_id, date, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    data.title,
    data.amount,
    data.type,
    Number(data.categoryId),
    data.date,
    createdAt,
  );

  return {
    id: String(result.lastInsertRowId),
    title: data.title,
    amount: data.amount,
    type: data.type,
    categoryId: data.categoryId,
    date: data.date,
    createdAt,
  } satisfies Transaction;
}

export async function updateTransactionRecord(
  id: string,
  data: UpdateTransactionInput,
) {
  const database = await getDatabase();
  const updates: string[] = [];
  const values: (string | number)[] = [];

  if (data.title !== undefined) {
    updates.push("title = ?");
    values.push(data.title);
  }

  if (data.amount !== undefined) {
    updates.push("amount = ?");
    values.push(data.amount);
  }

  if (data.type !== undefined) {
    updates.push("type = ?");
    values.push(data.type);
  }

  if (data.categoryId !== undefined) {
    updates.push("category_id = ?");
    values.push(Number(data.categoryId));
  }

  if (data.date !== undefined) {
    updates.push("date = ?");
    values.push(data.date);
  }

  if (!updates.length) return;

  values.push(Number(id));

  await database.runAsync(
    `UPDATE transactions SET ${updates.join(", ")} WHERE id = ?`,
    ...values,
  );
}

export async function deleteTransactionRecord(id: string) {
  const database = await getDatabase();

  await database.runAsync(`DELETE FROM transactions WHERE id = ?`, Number(id));
}

async function seedInitialData(database: SQLite.SQLiteDatabase) {
  const seedMetadata = await database.getFirstAsync<{ value: string }>(
    `SELECT value FROM app_metadata WHERE key = ?`,
    INITIAL_SEED_KEY,
  );

  if (seedMetadata?.value === "true") return;

  await database.withTransactionAsync(async () => {
    for (const category of initialCategories) {
      await database.runAsync(
        `
          INSERT OR IGNORE INTO categories
            (id, name, is_active, created_at)
          VALUES (?, ?, ?, ?)
        `,
        Number(category.id),
        category.name,
        category.isActive ? 1 : 0,
        category.createdAt,
      );
    }

    for (const transaction of initialTransactions) {
      await database.runAsync(
        `
          INSERT OR IGNORE INTO transactions
            (id, title, amount, type, category_id, date, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        Number(transaction.id),
        transaction.title,
        transaction.amount,
        transaction.type,
        Number(transaction.categoryId),
        transaction.date,
        transaction.createdAt,
      );
    }

    await database.runAsync(
      `INSERT OR REPLACE INTO app_metadata (key, value) VALUES (?, ?)`,
      INITIAL_SEED_KEY,
      "true",
    );
  });
}

function mapCategoryRow(row: CategoryRow): Category {
  return {
    id: String(row.id),
    name: row.name,
    createdAt: row.created_at,
    isActive: row.is_active === 1,
  };
}

function mapTransactionRow(row: TransactionRow): Transaction {
  return {
    id: String(row.id),
    title: row.title,
    amount: row.amount,
    type: row.type,
    categoryId: String(row.category_id),
    date: row.date,
    createdAt: row.created_at,
  };
}
