
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExpenseForm } from '@/components';
import { useExpenses } from '@/contexts/ExpenseContext';

const EditExpense = () => {
  const { id } = useParams<{ id: string }>();
  const { getExpenseById, updateExpense } = useExpenses();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expense, setExpense] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const expenseData = getExpenseById(id);
      if (expenseData) {
        setExpense(expenseData);
      } else {
        navigate('/expenses', { replace: true });
      }
    }
    setIsLoading(false);
  }, [id, getExpenseById, navigate]);

  const handleSubmit = async (values: any) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      await updateExpense(id, {
        amount: parseFloat(values.amount),
        category: values.category,
        description: values.description,
        date: values.date.toISOString(),
      });
      navigate('/expenses');
    } catch (error) {
      console.error('Error updating expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (!expense) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium">Expense not found</h2>
        <p className="text-gray-500 mt-2">The requested expense could not be found.</p>
      </div>
    );
  }

  const defaultValues = {
    amount: String(expense.amount),
    category: expense.category,
    description: expense.description,
    date: new Date(expense.date),
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Edit Expense</h1>
        <p className="text-gray-500 mt-1">Update the details of your expense</p>
      </div>
      <div className="bg-white p-6 rounded-lg border">
        <ExpenseForm 
          defaultValues={defaultValues}
          expense={expense}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditExpense;
