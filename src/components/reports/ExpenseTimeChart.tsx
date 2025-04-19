
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenses } from '@/contexts/ExpenseContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { useState } from 'react';

const ExpenseTimeChart = () => {
  const { expenses } = useExpenses();
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);
  
  // Generate data for the last 6 months
  const today = new Date();
  const sixMonthsAgo = subMonths(today, 6);
  const monthData: { [key: string]: number } = {};
  
  // Initialize each month with zero
  for (let i = 0; i <= 6; i++) {
    const monthDate = subMonths(today, i);
    const monthKey = format(monthDate, 'MMM yyyy');
    monthData[monthKey] = 0;
  }
  
  // Sum expenses by month
  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);
    
    // Only include expenses from last 6 months
    if (expenseDate >= sixMonthsAgo) {
      const monthKey = format(expenseDate, 'MMM yyyy');
      if (monthData[monthKey] !== undefined) {
        monthData[monthKey] += expense.amount;
      }
    }
  });
  
  // Convert data for chart
  const chartData = Object.entries(monthData)
    .map(([month, total], index) => ({
      month,
      total,
      index
    }))
    .reverse();
  
  // Format currency for tooltip - convert to INR
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Custom dot component for the line chart
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isHovered = payload.index === hoveredMonthIndex;

    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={isHovered ? 6 : 4}
        stroke="#4361ee" 
        strokeWidth={2}
        fill={isHovered ? "#4361ee" : "#fff"}
        style={{ 
          transition: "all 0.3s ease",
          filter: isHovered ? "drop-shadow(0 0 3px rgba(67, 97, 238, 0.6))" : "none" 
        }}
      />
    );
  };
  
  return (
    <Card className="shadow-sm border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Expense Trend</CardTitle>
        <CardDescription>Monthly spending over time in ₹</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {expenses.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No expense data available</p>
          </div>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 15,
                  right: 20,
                  left: 20,
                  bottom: 5,
                }}
                onMouseMove={(data) => {
                  if (data.activeTooltipIndex !== undefined) {
                    setHoveredMonthIndex(data.activeTooltipIndex);
                  }
                }}
                onMouseLeave={() => setHoveredMonthIndex(null)}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4361ee" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4361ee" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => `₹${value}`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Total']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#4361ee"
                  strokeWidth={3}
                  name="Monthly Total"
                  dot={<CustomDot />}
                  activeDot={{ r: 8, fill: "#4361ee", stroke: "#fff" }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  fillOpacity={0.3}
                  fill="url(#colorTotal)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseTimeChart;
