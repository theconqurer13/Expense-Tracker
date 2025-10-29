// components/layout/Navbar.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold">Welcome back, {user?.name}!</h2>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}