// components/layout/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Expenses', href: '/expenses', icon: '💰' },
  { name: 'Reports', href: '/reports', icon: '📈' }
];

export default function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-lg z-10">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-indigo-400">ExpenseTracker</h1>
      </div>
      
      <nav className="mt-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
              location.pathname === item.href
                ? 'bg-indigo-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}