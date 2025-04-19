
export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export type ExpenseSummary = {
  totalAmount: number;
  count: number;
  categories: {
    [key: string]: number;
  };
};

export const DEFAULT_EXPENSE_CATEGORIES = [
  "Food",
  "Transportation",
  "Housing",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Shopping",
  "Education",
  "Travel",
  "Other"
];
