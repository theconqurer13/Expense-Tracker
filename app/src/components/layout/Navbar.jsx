// components/layout/Navbar.js
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo or Greeting */}
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-white hidden sm:block">Welcome back, {user?.name}!</h2>
          </div>
          {/* Desktop Avatar */}
          <div className="hidden sm:flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
          {/* Mobile Hamburger and Avatar */}
          <div className="flex sm:hidden items-center">
          
            {/* Mini avatar for mobile */}
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold ml-2">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </div>
        
      </div>
    </header>
  );
}