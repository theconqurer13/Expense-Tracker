// components/dashboard/ExpenseSummary.js
import React from 'react';

export default function ExpenseSummary({ expenses }) {
  // Calculate monthly and yearly totals
  const now = new Date();
  const currentMonth = expenses.filter(exp => 
    new Date(exp.date).getMonth() === now.getMonth() &&
    new Date(exp.date).getFullYear() === now.getFullYear()
  );
  
  const currentYear = expenses.filter(exp => 
    new Date(exp.date).getFullYear() === now.getFullYear()
  );
  
  const monthlyTotal = currentMonth.reduce((sum, exp) => sum + exp.amount, 0);
  const yearlyTotal = currentYear.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">Expense Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-700">
          <span className="text-gray-400">This Month</span>
          <span className="text-xl font-bold text-green-400">
            ${monthlyTotal.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400">This Year</span>
          <span className="text-xl font-bold text-green-400">
            ${yearlyTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}