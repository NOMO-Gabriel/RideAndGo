"use client";

import { createContext, ReactNode, useState, useEffect, useCallback } from 'react';

interface ThemeContextProps {
    theme: string;
    toggleTheme: (newTheme: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<string>('dark');


    useEffect(() => {
        const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light';
        setTheme(savedTheme);

    }, []);

    const toggleTheme = useCallback(() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        
        // Safely check if localStorage is available before setting
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
        }
    }, [theme]);
    return (

        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};


