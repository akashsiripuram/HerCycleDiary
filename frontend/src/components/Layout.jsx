import React from 'react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../Contexts/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  return (
    <div className={`min-h-screen min-w-full transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
       <header className="bg-fuchsia-700 dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to={"/"} className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            HerCycleDiary
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/profile')}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 transition-colors"
            >
              Profile
            </button>
            <ThemeToggle />
            
          </div>
        </div>
      </header>
      <main className="w-full">
        {children}
      </main>
      
    </div>
  );
};

export default Layout;