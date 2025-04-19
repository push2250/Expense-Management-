
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenses } from '@/contexts/ExpenseContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from 'recharts';
import { useState } from 'react';

// Natural color palette for the chart
const COLORS = [
  '#4f6af7', '#41b883', '#fd7e14', '#e83e8c', '#20c997', 
  '#6610f2', '#fd9843', '#17a2b8', '#6f42c1', '#28a745'
];

const CategoryDistributionChart = () => {
  const { getExpenseSummary } = useExpenses();
  const summary = getExpenseSummary();
  const [activeIndex, setActiveIndex] = useState(0);

  const data = Object.entries(summary.categories)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value);

  // Format currency for tooltips - convert to INR
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Active sector render for enhanced visual effect
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  // Calculate percentages for labels
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  
  return (
    <Card className="shadow-sm border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Spending by Category</CardTitle>
        <CardDescription>How your expenses are distributed</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No expense data available</p>
          </div>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  animationDuration={800}
                  animationBegin={100}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Amount']}
                  labelFormatter={(index) => data[index as number]?.name || ''}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend 
                  formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryDistributionChart;
