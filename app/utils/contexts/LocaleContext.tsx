'use client';

import { createContext, ReactNode, useState, useEffect } from 'react';

interface LocaleContextProps {
    locale: string;
    changeLocale: (newLocale: string) => void;
}

export const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<string>('en');

    useEffect(() => {
        // Vérifie si on est bien dans un environnement client avant d'accéder à localStorage
        if (typeof window !== "undefined") {
            const savedLocale = localStorage.getItem('locale');
            if (savedLocale) {
                setLocale(savedLocale);
            }
        }
    }, []);

    const changeLocale = (newLocale: string) => {
        setLocale(newLocale);
        if (typeof window !== "undefined") {
            localStorage.setItem('locale', newLocale);
        }
    };

    return (
        <LocaleContext.Provider value={{ locale, changeLocale }}>
            {children}
        </LocaleContext.Provider>
    );
};
