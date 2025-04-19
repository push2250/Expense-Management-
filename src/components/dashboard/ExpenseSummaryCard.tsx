
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenses } from '@/contexts/ExpenseContext';
import { IndianRupee } from 'lucide-react';

const ExpenseSummaryCard = () => {
  const { getExpenseSummary } = useExpenses();
  const summary = getExpenseSummary();

  // Format currency - converting to INR
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="shadow-sm border-gray-200 dark:border-gray-700 overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40">
        <CardTitle className="text-xl flex items-center gap-2">
          <IndianRupee className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Expense Summary
        </CardTitle>
        <CardDescription>Overview of your spending in INR</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-lg">
            <div className="text-sm font-medium">Total Spending</div>
            <div className="text-2xl font-bold">{formatCurrency(summary.totalAmount)}</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="text-sm font-medium">Number of Expenses</div>
            <div className="text-2xl font-bold">{summary.count}</div>
          </div>
          {summary.count > 0 && (
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-sm font-medium">Average Expense</div>
              <div className="text-2xl font-bold">
                {formatCurrency(summary.totalAmount / summary.count)}
              </div>
            </div>
          )}
          
          <div className="p-4 mt-2 border border-blue-100 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium mb-2 text-blue-800 dark:text-blue-300">Top Categories</h4>
            {Object.entries(summary.categories)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([category, amount], index) => (
                <div key={category} className="flex items-center justify-between mb-2 last:mb-0">
                  <div className="text-sm">{category}</div>
                  <div className="font-medium">{formatCurrency(amount)}</div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummaryCard;
