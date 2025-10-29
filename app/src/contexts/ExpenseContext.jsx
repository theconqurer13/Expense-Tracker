// contexts/ExpenseContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories] = useState([
    'Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare'
  ]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user) {
        setExpenses([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data } = await api.get('/transactions');
        setExpenses(data);
      } catch (e) {
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [user]);

  const addExpense = async (expense) => {
    const payload = {
      ...expense,
      type: expense.type || 'expense',
      date: new Date(expense.date).toISOString(),
    };
    const { data } = await api.post('/transactions', payload);
    setExpenses((prev) => [data, ...prev]);
  };

  const updateExpense = async (id, updatedExpense) => {
    const payload = { ...updatedExpense };
    if (payload.date) {
      payload.date = new Date(payload.date).toISOString();
    }
    const { data } = await api.put(`/transactions/${id}`, payload);
    setExpenses((prev) => prev.map((exp) => (exp._id === id ? data : exp)));
  };

  const deleteExpense = async (id) => {
    await api.delete(`/transactions/${id}`);
    setExpenses((prev) => prev.filter((exp) => exp._id !== id));
  };

  const value = {
    expenses,
    categories,
    addExpense,
    updateExpense,
    deleteExpense,
    loading,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}