// components/reports/MonthlyChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonthlyChart({ expenses, timeRange, data: dataOverride, loading }) {
  // Process data based on time range
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
    const monthlyData = {};
    filteredExpenses.forEach(exp => {
      const month = new Date(exp.date).toLocaleString('default', { month: 'short', year: 'numeric' });
      monthlyData[month] = (monthlyData[month] || 0) + exp.amount;
    });
    data = Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount: parseFloat(amount.toFixed(2))
    }));
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">Monthly Spending</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Amount']}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
            />
            <Bar dataKey="amount" fill="#818cf8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}