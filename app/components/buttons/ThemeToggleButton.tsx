'use client';
import { useTheme } from '@/app/utils/hooks/useTheme.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    const handleThemeChange = () => {
        toggleTheme(theme === 'light' ? 'dark' : 'light');
    };

    const backgroundClass = theme === 'light' ? 'bg-gray-100' : 'bg-gray-800';
    const switchClass = theme === 'light' ? 'bg-white' : 'bg-gray-900';

    return (
        <div
          onClick={handleThemeChange}
          className={`relative flex items-center justify-between w-20 md:w-24 h-10 md:h-12 p-2 
          ${backgroundClass} rounded-full cursor-pointer transition-all duration-300`}
        >
          <FontAwesomeIcon icon={faSun} className="text-yellow-500 text-sm md:text-lg" />
          <FontAwesomeIcon icon={faMoon} className="text-gray-500 dark:text-gray-300 text-sm md:text-lg" />
          <span
            className={`absolute left-1 top-1 w-8 md:w-10 h-8 md:h-10 ${switchClass} rounded-full 
            transform transition-transform duration-300 ease-in-out 
            ${theme === 'light' ? 'translate-x-0' : 'translate-x-10 md:translate-x-12'}`}
          />
        </div>
      );
    };
    
export default ThemeToggleButton;
