import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Theme } from '../constants/Colors';

interface ThemeContextType {
  theme: Theme;
  colors: typeof Colors.light;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setCurrentTheme] = useState<Theme>('light');

  const colors = Colors[theme];

  const setTheme = async (newTheme: Theme) => {
    setCurrentTheme(newTheme);
    await AsyncStorage.setItem('user_theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Charger le thème sauvegardé au démarrage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('user_theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setCurrentTheme(savedTheme as Theme);
        }
      } catch (error) {
        console.log('Erreur lors du chargement du thème:', error);
      }
    };
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  return context;
};