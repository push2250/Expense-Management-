
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpenseForm } from '@/components';
import { useExpenses } from '@/contexts/ExpenseContext';

const NewExpense = () => {
  const { addExpense } = useExpenses();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      await addExpense({
        amount: parseFloat(values.amount),
        category: values.category,
        description: values.description,
        date: values.date.toISOString(),
      });
      navigate('/expenses');
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Add New Expense</h1>
        <p className="text-gray-500 mt-1">Enter the details of your expense</p>
      </div>
      <div className="bg-white p-6 rounded-lg border">
        <ExpenseForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default NewExpense;
