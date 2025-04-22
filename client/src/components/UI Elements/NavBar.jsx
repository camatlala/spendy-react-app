import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [activeLink, setActiveLink] = useState('Dashboard');
  const navigate = useNavigate();

  const navItems = ['Dashboard', 'Settings'];

  const handleNavLinkClick = (itemName) => {
    setActiveLink(itemName);
    navigate(itemName === 'Dashboard' ? '/' : `/${itemName.toLowerCase()}`);
  };

  return (
    <div className="bg-gray-900">
      <br />
      <br />

      <div className="flex flex-row pointer-events-auto absolute inset-y-10 right-10 gap-4 bg-gray-800 w-fit h-20 justify-evenly items-center rounded-full px-6">
        {navItems.map((item) => (
          <div
            key={item}
            onClick={() => handleNavLinkClick(item)}
            className={`
              cursor-pointer
              ${
                activeLink === item
                  ? 'bg-amber-900 text-gray-900 ring-indigo-200 dark:bg-white dark:text-gray-800 dark:ring-indigo-900'
                  : 'bg-gray-800 hover:bg-white text-white hover:text-gray-700'
              }
              flex items-center justify-evenly px-6 py-2 rounded-full transition text-sm font-medium
            `}
          >
            {item}
          </div>
        ))}

        <button
          onClick={() => {
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            navigate('/'); // useNavigate here now
          }}
          className="flex items-center justify-evenly px-6 py-2 rounded-full bg-gray-800 text-white hover:text-red-400 hover:bg-white transition text-sm font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
