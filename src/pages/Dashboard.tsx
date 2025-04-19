
import { ExpenseSummaryCard, CategoryDistributionChart, RecentExpensesCard } from '@/components';
import { useExpenses } from '@/contexts/ExpenseContext';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { expenses } = useExpenses();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Link to="/expenses/new">
          <Button className="mt-2 sm:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </Link>
      </div>

      {expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-gray-50">
          <h2 className="text-xl font-medium mb-2">Welcome to ExpenseTrack</h2>
          <p className="text-gray-500 mb-6">Start tracking your expenses by adding your first entry</p>
          <Link to="/expenses/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Expense
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2 h-full">
              <ExpenseSummaryCard />
            </div>
            <div>
              <RecentExpensesCard />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <CategoryDistributionChart />
            <div className="bg-gray-50 border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-2">Quick Tips</h3>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Categorize your expenses for better insights</li>
                <li>Add detailed descriptions for future reference</li>
                <li>Review your spending patterns regularly</li>
                <li>Check the Reports section for detailed analysis</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
