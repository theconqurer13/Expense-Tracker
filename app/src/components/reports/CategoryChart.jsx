// components/reports/CategoryChart.js
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function CategoryChart({ expenses, timeRange, data: dataOverride, loading }) {
  // Filter expenses based on time range (same logic as MonthlyChart)
  const now = new Date();
  let startDate = new Date();
  
  if (timeRange === 'month') {
    startDate.setMonth(now.getMonth() - 1);
  } else if (timeRange === 'quarter') {
    startDate.setMonth(now.getMonth() - 3);
  } else {
    startDate.setFullYear(now.getFullYear(), 0, 1);
  }
  
  let data = dataOverride;
  if (!dataOverride || (Array.isArray(dataOverride) && dataOverride.length === 0)) {
    const filteredExpenses = expenses.filter(exp => 
      new Date(exp.date) >= startDate
    );
    const categoryTotals = filteredExpenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    data = Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2))
    }));
  }
  
  const COLORS = ['#4f46e5', '#818cf8', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1'];

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}