// components/expenses/ExpenseTable.js
import React, { useState } from 'react';
import { useExpenses } from '../../contexts/ExpenseContext';
import { format } from 'date-fns';

export default function ExpenseTable({ onEdit }) {
  const { expenses, deleteExpense, categories } = useExpenses();
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Apply filters and sorting
  let filteredExpenses = expenses;
  
  if (filterCategory !== 'all') {
    filteredExpenses = filteredExpenses.filter(exp => exp.category === filterCategory);
  }
  
  if (searchTerm) {
    filteredExpenses = filteredExpenses.filter(exp => 
      exp.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 bg-gray-700 rounded-md border border-gray-600"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 bg-gray-700 rounded-md border border-gray-600 w-48"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th 
                className="text-left p-4 cursor-pointer hover:bg-gray-700"
                onClick={() => requestSort('description')}
              >
                Description
              </th>
              <th 
                className="text-left p-4 cursor-pointer hover:bg-gray-700"
                onClick={() => requestSort('category')}
              >
                Category
              </th>
              <th 
                className="text-left p-4 cursor-pointer hover:bg-gray-700"
                onClick={() => requestSort('date')}
              >
                Date
              </th>
              <th 
                className="text-right p-4 cursor-pointer hover:bg-gray-700"
                onClick={() => requestSort('amount')}
              >
                Amount
              </th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map(expense => (
              <tr key={expense._id} className="border-t border-gray-700 hover:bg-gray-750">
                <td className="p-4">{expense.description}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-indigo-900/50 rounded-full text-xs">
                    {expense.category}
                  </span>
                </td>
                <td className="p-4">{format(new Date(expense.date), 'MMM dd, yyyy')}</td>
                <td className="p-4 text-right text-red-400 font-medium">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {sortedExpenses.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No expenses found
          </div>
        )}
      </div>
    </div>
  );
}