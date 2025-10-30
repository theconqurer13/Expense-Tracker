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
            <h2 className="text-base font-semibold text-white sm:hidden">Hi, {user?.name?.split(' ')[0] || 'User'}!</h2>
          </div>
          {/* Desktop Avatar */}
          <div className="hidden sm:flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
          {/* Mobile Hamburger and Avatar */}
          <div className="flex sm:hidden items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    className="transition-all"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    className="transition-all"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            {/* Mini avatar for mobile */}
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold ml-2">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </div>
        {/* (Optional) Mobile Dropdown: Show greeting larger on mobile menu open */}
        {menuOpen && (
          <div className="sm:hidden mt-2 pb-2 text-center">
            <div className="text-white text-sm font-semibold">Welcome back, {user?.name}!</div>
          </div>
        )}
      </div>
    </header>
  );
}