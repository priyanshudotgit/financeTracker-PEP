import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
        onClick={toggleTheme}
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:ring-2 hover:ring-emerald-500 transition-all duration-300"
        aria-label="Toggle Theme"
        >
        {theme === 'dark' ? (
            <Sun size={20} className="transition-all" />
        ) : (
            <Moon size={20} className="transition-all" />
        )}
        </button>
    );
};

export default ThemeToggle;