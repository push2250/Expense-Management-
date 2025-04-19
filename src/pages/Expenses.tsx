
import { Button } from '@/components/ui/button';
import { ExpensesList } from '@/components';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Expenses = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight dark:text-white">Expenses</h1>
        <Button asChild>
          <Link to="/expenses/new">
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Link>
        </Button>
      </div>
      
      <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-4 rounded-md mb-6">
        <p className="text-green-800 dark:text-green-300 flex items-center">
          <span className="bg-green-200 dark:bg-green-500 w-2 h-2 rounded-full mr-2"></span>
          Database connection setup successfully.
        </p>
      </div>
      
      <ExpensesList />
    </div>
  );
};

export default Expenses;
