// components/dashboard/Dashboard.js
import React from 'react';
import { useExpenses } from '../../contexts/ExpenseContext';
import ExpenseSummary from './ExpenseSummary';
import CategoryBreakdown from './CategoryBreakdown';
import RecentTransactions from './RecentTransactions';

export default function Dashboard() {
  const { expenses } = useExpenses();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseSummary expenses={expenses} />
        <CategoryBreakdown expenses={expenses} />
      </div>
      
      <RecentTransactions expenses={expenses} />
    </div>
  );
}