// components/expenses/ExpenseList.js
import React, { useState } from 'react';
import { useExpenses } from '../../contexts/ExpenseContext';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';

export default function ExpenseList() {
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
        >
          Add Expense
        </button>
      </div>
      
      {showForm && (
        <ExpenseForm
          expense={editingExpense}
          onClose={() => {
            setShowForm(false);
            setEditingExpense(null);
          }}
        />
      )}
      
      <ExpenseTable onEdit={handleEdit} />
    </div>
  );
}