
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryDistributionChart, ExpenseTimeChart, CategoryComparisonChart } from '@/components';
import { useExpenses } from '@/contexts/ExpenseContext';

const Reports = () => {
  const { expenses } = useExpenses();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-gray-500 mt-1">Analyze your spending patterns</p>
      </div>

      {expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-gray-50">
          <h2 className="text-xl font-medium mb-2">No Expense Data Available</h2>
          <p className="text-gray-500">Add some expenses to see your financial reports</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ExpenseTimeChart />
            <CategoryDistributionChart />
          </div>
          
          <CategoryComparisonChart />
          
          <Card>
            <CardHeader>
              <CardTitle>Expense Analysis</CardTitle>
              <CardDescription>Key insights from your spending habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  The reports above show your spending patterns across different categories and time periods.
                  Use these insights to identify areas where you might want to adjust your spending habits.
                </p>
                <div className="bg-gray-50 p-4 rounded-md border">
                  <h3 className="font-medium mb-2">Tips for Better Financial Management:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Identify your largest expense categories and look for ways to reduce spending</li>
                    <li>Track monthly trends to spot unusual spending patterns</li>
                    <li>Set budget goals based on your historical spending</li>
                    <li>Regularly review and categorize your expenses for more accurate insights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Reports;
