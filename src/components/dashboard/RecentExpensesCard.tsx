
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenses } from '@/contexts/ExpenseContext';
import { Expense } from '@/types/expense';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const RecentExpensesCard = () => {
  const { expenses } = useExpenses();
  
  // Get the 5 most recent expenses
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Format currency to INR
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date as relative time
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <Card className="shadow-sm border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Recent Expenses</CardTitle>
        <CardDescription>Your latest transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-60">
          {recentExpenses.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">No recent expenses</p>
              <Link to="/expenses/new" className="text-blue-600 hover:underline mt-2 block">
                Add your first expense
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentExpenses.map((expense: Expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{expense.description}</span>
                      <Badge variant="outline">{expense.category}</Badge>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(expense.date)}</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(expense.amount)}</span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <div className="mt-4 text-center">
          <Link
            to="/expenses"
            className="text-sm text-blue-600 hover:underline"
          >
            View all expenses
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentExpensesCard;
