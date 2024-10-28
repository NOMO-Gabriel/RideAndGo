import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { API_URL } from '@/app/utils/api/api_infos';
import Cookies from 'js-cookie';

interface User {
  id: string;
  pseudo: string;
  email: string;
  roles: string[];
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  login: (
    identifierType: 'email' | 'phoneNumber' | 'pseudo',
    identifierValue: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Charger les informations utilisateur depuis le cookie au montage du composant
  useEffect(() => {
    const savedUser = Cookies.get('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Charger l'utilisateur si le cookie est présent
    }
  }, []);

  const login = async (
    identifierType: 'email' | 'phoneNumber' | 'pseudo',
    identifierValue: string,
    password: string
  ): Promise<void> => {
    try {
      const endpoint = `${API_URL}/loginBy${capitalize(identifierType)}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [identifierType]: identifierValue, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur de connexion.');
      }

      const data = await response.json();
      const userData = {
        id: data.user.id,
        pseudo: data.user.pseudo,
        email: data.user.email,
        roles: data.user.roles || ['ROLE_GUEST'],
      };

      Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // Stocker l'utilisateur dans un cookie
      setUser(userData); // Mettre à jour l'état
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null); // Réinitialiser l'utilisateur dans l'état local
    Cookies.remove('user'); // Supprimer le cookie utilisateur
  };

  // Fonction pour capitaliser le premier caractère (utilisée pour les endpoints)
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
