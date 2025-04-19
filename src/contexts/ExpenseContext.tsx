
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { Expense, ExpenseSummary, DEFAULT_EXPENSE_CATEGORIES } from '@/types/expense';
import { useAuth } from './AuthContext';
import { format, subDays, subMonths } from 'date-fns';

interface ExpenseContextType {
  expenses: Expense[];
  isLoading: boolean;
  addExpense: (expense: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  updateExpense: (id: string, expense: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  getExpenseById: (id: string) => Expense | undefined;
  getExpenseSummary: () => ExpenseSummary;
}

const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  isLoading: false,
  addExpense: async () => {},
  updateExpense: async () => {},
  deleteExpense: async () => {},
  getExpenseById: () => undefined,
  getExpenseSummary: () => ({ totalAmount: 0, count: 0, categories: {} }),
});

interface ExpenseProviderProps {
  children: ReactNode;
}

// Sample expense data generator
const generateSampleExpenses = (userId: string): Expense[] => {
  const sampleExpenses: Expense[] = [];
  
  // Current date as reference
  const now = new Date();
  
  // Create some expenses from the last 6 months
  for (let i = 0; i < 30; i++) {
    // Random date within the last 180 days
    const randomDaysAgo = Math.floor(Math.random() * 180);
    const date = subDays(now, randomDaysAgo);
    
    // Random category
    const category = DEFAULT_EXPENSE_CATEGORIES[Math.floor(Math.random() * DEFAULT_EXPENSE_CATEGORIES.length)];
    
    // Random amount (between 100 and 5000 INR)
    const amount = Math.floor(Math.random() * 4900) + 100;
    
    // Generate descriptions based on categories
    let description = '';
    switch(category) {
      case 'Food':
        description = ['Grocery shopping', 'Restaurant dinner', 'Lunch with colleagues', 'Coffee and snacks'][Math.floor(Math.random() * 4)];
        break;
      case 'Transportation':
        description = ['Bus tickets', 'Uber ride', 'Fuel for car', 'Train tickets'][Math.floor(Math.random() * 4)];
        break;
      case 'Housing':
        description = ['Rent payment', 'Electricity bill', 'Internet bill', 'Water bill'][Math.floor(Math.random() * 4)];
        break;
      case 'Entertainment':
        description = ['Movie tickets', 'Book purchase', 'Concert tickets', 'Game subscription'][Math.floor(Math.random() * 4)];
        break;
      default:
        description = `${category} expense`;
    }
    
    sampleExpenses.push({
      id: `expense-sample-${i}`,
      userId,
      amount,
      category,
      description,
      date: format(date, 'yyyy-MM-dd'),
      createdAt: format(date, 'yyyy-MM-dd\'T\'HH:mm:ss')
    });
  }
  
  // Sort by date (newest first)
  return sampleExpenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load expenses from localStorage on mount or create sample data
  useEffect(() => {
    if (isAuthenticated && user) {
      setIsLoading(true);
      try {
        let storedExpenses = localStorage.getItem(`expenses-${user.id}`);
        
        // If no expenses found or it's empty, create sample data
        if (!storedExpenses || JSON.parse(storedExpenses).length === 0) {
          const sampleExpenses = generateSampleExpenses(user.id);
          localStorage.setItem(`expenses-${user.id}`, JSON.stringify(sampleExpenses));
          storedExpenses = JSON.stringify(sampleExpenses);
        }
        
        setExpenses(JSON.parse(storedExpenses));
      } catch (error) {
        console.error('Error loading expenses:', error);
        toast.error('Failed to load your expenses');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Clear expenses if not authenticated
      setExpenses([]);
    }
  }, [isAuthenticated, user]);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && user && expenses.length > 0) {
      try {
        localStorage.setItem(`expenses-${user.id}`, JSON.stringify(expenses));
      } catch (error) {
        console.error('Storage error:', error);
      }
    }
  }, [expenses, isAuthenticated, user]);

  const addExpense = async (expenseData: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      // This would normally be a call to Supabase
      const newExpense: Expense = {
        ...expenseData,
        id: `expense-${Date.now()}`,
        userId: user?.id || 'unknown',
        createdAt: new Date().toISOString(),
      };
      
      setExpenses((prev) => [newExpense, ...prev]);
      toast.success('Expense added successfully');
    } catch (error) {
      console.error('Add expense error:', error);
      toast.error('Failed to add expense');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateExpense = async (id: string, expenseData: Partial<Expense>) => {
    setIsLoading(true);
    try {
      // This would normally be a call to Supabase
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === id ? { ...expense, ...expenseData } : expense
        )
      );
      toast.success('Expense updated successfully');
    } catch (error) {
      console.error('Update expense error:', error);
      toast.error('Failed to update expense');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteExpense = async (id: string) => {
    setIsLoading(true);
    try {
      // This would normally be a call to Supabase
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      toast.success('Expense deleted successfully');
    } catch (error) {
      console.error('Delete expense error:', error);
      toast.error('Failed to delete expense');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getExpenseById = (id: string) => {
    return expenses.find((expense) => expense.id === id);
  };

  const getExpenseSummary = (): ExpenseSummary => {
    const summary: ExpenseSummary = {
      totalAmount: 0,
      count: expenses.length,
      categories: {},
    };

    expenses.forEach((expense) => {
      // Update total amount
      summary.totalAmount += expense.amount;

      // Update category totals
      if (!summary.categories[expense.category]) {
        summary.categories[expense.category] = 0;
      }
      summary.categories[expense.category] += expense.amount;
    });

    return summary;
  };

  const value = {
    expenses,
    isLoading,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    getExpenseSummary,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  return useContext(ExpenseContext);
};
