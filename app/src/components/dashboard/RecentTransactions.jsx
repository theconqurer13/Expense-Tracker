// components/dashboard/RecentTransactions.js
import React from 'react';
import { format } from 'date-fns';

export default function RecentTransactions({ expenses }) {
  const recent = expenses.slice(0, 5);
  
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      
      <div className="space-y-3">
        {recent.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No transactions yet</p>
        ) : (
          recent.map(expense => (
            <div key={expense._id} className="flex justify-between items-center pb-3 border-b border-gray-700 last:border-0 last:pb-0">
              <div>
                <div className="font-medium">{expense.description}</div>
                <div className="text-sm text-gray-400">
                  {format(new Date(expense.date), 'MMM dd, yyyy')}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-red-400">-${expense.amount.toFixed(2)}</div>
                <div className="text-xs text-gray-500">{expense.category}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}