import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-900">
      <br />
      <br />
      <div className="flex flex-row pointer-events-auto absolute inset-y-10 right-10 gap-4 bg-gray-800 w-80 h-20 justify-evenly items-center rounded-full px-4">
        
        {/* ✅ Dashboard Button */}
        <Link
          to="/dashboard"
          className={`flex items-center justify-evenly w-60 h-15 rounded-full transition cursor-pointer ${
            location.pathname === '/dashboard'
              ? 'bg-amber-900 text-gray-900 ring-indigo-200'
              : 'bg-gray-800 hover:bg-white text-white hover:text-gray-700'
          }`}
        >
          Dashboard
        </Link>

        {/* ✅ Settings Button */}
        <Link
          to="/settings"
          className={`flex items-center justify-evenly w-60 h-15 rounded-full transition cursor-pointer ${
            location.pathname === '/settings'
              ? 'bg-amber-900 text-gray-900 ring-indigo-200'
              : 'bg-gray-800 hover:bg-white text-white hover:text-gray-700'
          }`}
        >
          Settings
        </Link>

        {/* ✅ Sign Out */}
        <button
          onClick={() => {
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            window.location.href = '/';
          }}
          className="flex items-center justify-evenly w-40 h-15 rounded-full bg-gray-800 text-white hover:text-red-400 hover:bg-white transition cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
