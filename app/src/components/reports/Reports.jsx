// components/reports/Reports.js
import React, { useEffect, useMemo, useState } from 'react';
import { useExpenses } from '../../contexts/ExpenseContext';
import { useAuth } from '../../contexts/AuthContext';
import MonthlyChart from './MonthlyChart';
import CategoryChart from './CategoryChart';
import ExportButton from './ExportButton';
import api from '../../services/api';

export default function Reports() {
  const { expenses } = useExpenses();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('year');
  const [stats, setStats] = useState({ monthly: [], categories: [] });
  const [loading, setLoading] = useState(false);

  const startDate = useMemo(() => {
    const now = new Date();
    const start = new Date();
    if (timeRange === 'month') {
      start.setMonth(now.getMonth() - 1);
    } else if (timeRange === 'quarter') {
      start.setMonth(now.getMonth() - 3);
    } else {
      start.setFullYear(now.getFullYear(), 0, 1);
    }
    return start.toISOString();
  }, [timeRange]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) {
        setStats({ monthly: [], categories: [] });
        return;
      }
      setLoading(true);
      try {
        const { data } = await api.get(`/transactions/stats`, {
          params: { start: startDate },
        });
        setStats(data);
      } catch (e) {
        setStats({ monthly: [], categories: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [startDate, user]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2 bg-gray-800 rounded-md border border-gray-700"
          >
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 3 Months</option>
            <option value="year">This Year</option>
          </select>
          <ExportButton expenses={expenses} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyChart expenses={expenses} timeRange={timeRange} data={stats.monthly} loading={loading} />
        <CategoryChart expenses={expenses} timeRange={timeRange} data={stats.categories} loading={loading} />
      </div>
    </div>
  );
}