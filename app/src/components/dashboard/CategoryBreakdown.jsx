// components/dashboard/CategoryBreakdown.js
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function CategoryBreakdown({ expenses }) {
  // Calculate category totals
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});
  
  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));
  
  const COLORS = ['#4f46e5', '#818cf8', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1'];

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
      
      <div className="h-64">
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