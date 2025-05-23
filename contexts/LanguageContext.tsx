import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Language, TranslationKeys } from '../utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setCurrentLanguage] = useState<Language>('fr');

  // Fonction de traduction
  const t = (key: TranslationKeys): string => {
    return translations[language][key] || key;
  };

  // Changer la langue et la sauvegarder
  const setLanguage = async (lang: Language) => {
    setCurrentLanguage(lang);
    await AsyncStorage.setItem('user_language', lang);
  };

  // Charger la langue sauvegardée au démarrage
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('user_language');
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
          setCurrentLanguage(savedLanguage as Language);
        }
      } catch (error) {
        console.log('Erreur lors du chargement de la langue:', error);
      }
    };
    loadLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage doit être utilisé dans un LanguageProvider');
  }
  return context;
};