// components/layout/Sidebar.js
import React, { useState } from 'react';
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
  const [open, setOpen] = useState(false);

  // Overlay for mobile sidebar
  const mobileSidebar = (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-200 ${open ? 'block' : 'hidden'}`}
        onClick={() => setOpen(false)}
        aria-label="Sidebar overlay"
      />
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-lg z-50 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} sm:hidden`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-400">ExpenseTracker</h1>
          <button
            className="text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${location.pathname === item.href
                  ? 'bg-indigo-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
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
    </>
  );

  return (
    <>
      {/* Hamburger menu for small screens only */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 shadow-md rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
        style={{ display: open ? 'none' : undefined }}
      >
        <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Standard sidebar for desktop */}
      <div className="hidden sm:fixed sm:top-0 sm:left-0 sm:h-full sm:w-64 sm:bg-gray-800 sm:shadow-lg sm:z-10 sm:flex sm:flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-indigo-400">ExpenseTracker</h1>
        </div>
        <nav className="mt-4 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${location.pathname === item.href
                  ? 'bg-indigo-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay (drawer) */}
      {mobileSidebar}
    </>
  );
}