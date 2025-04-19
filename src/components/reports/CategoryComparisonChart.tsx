
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenses } from '@/contexts/ExpenseContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';

// Natural looking color gradient for bars
const COLORS = [
  '#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4cc9f0', 
  '#4895ef', '#560bad', '#b5179e', '#f15bb5', '#00b4d8'
];

const CategoryComparisonChart = () => {
  const { getExpenseSummary } = useExpenses();
  const summary = getExpenseSummary();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Transform data for the chart
  const data = Object.entries(summary.categories).map(([name, value]) => ({
    name,
    value,
  }))
  // Sort by value (descending)
  .sort((a, b) => b.value - a.value)
  // Take top 10 categories
  .slice(0, 10);

  // Format currency for tooltips - convert to INR
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Handle bar hover
  const handleBarMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const handleBarMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="shadow-sm border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Category Comparison</CardTitle>
        <CardDescription>Spending by category in ₹</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No expense data available</p>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data} 
                layout="vertical" 
                margin={{ left: 20, right: 30, top: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                <XAxis 
                  type="number" 
                  tickFormatter={(value) => `₹${value}`}
                  domain={[0, 'dataMax + 500']}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={100}
                  tickFormatter={(value) => value.length > 14 ? value.substring(0, 14) + '...' : value}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(value) => `Category: ${value}`}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  name="Amount" 
                  animationDuration={1000}
                  onMouseEnter={handleBarMouseEnter}
                  onMouseLeave={handleBarMouseLeave}
                  radius={[0, 4, 4, 0]}
                >
                  {data.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      fillOpacity={activeIndex === index ? 1 : 0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryComparisonChart;
