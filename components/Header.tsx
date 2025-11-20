
import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
    toggleTheme: () => void;
    theme: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme }) => {
    return (
        <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Be!Myn Studio</h1>
                <div className="flex items-center space-x-4">
                    <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
                </div>
            </div>
        </header>
    );
};

export default Header;
