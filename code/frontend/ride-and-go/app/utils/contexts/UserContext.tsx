'use client';

import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { API_URL } from '@/app/utils/api/api_infos';

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[]; 
  [key: string]: any;
}

interface UserContextType {
  users: User[];
  user: User | null;
  token: string | null;
  fetchUsers: () => Promise<void>;
  fetchUser: (id: string) => Promise<void>;
  login: (identifierType: 'email' | 'phoneNumber' | 'pseudo', identifierValue: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: string) => boolean; // Vérification du rôle
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Charger le token depuis le localStorage au montage du composant
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  // Mettre à jour l'utilisateur connecté en fonction du token
  useEffect(() => {
    if (token) fetchUserProfile();
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user profile');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout(); // Déconnecter si le token est invalide
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUser = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch user with ID: ${id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const login = async (
    identifierType: 'email' | 'phoneNumber' | 'pseudo',
    identifierValue: string,
    password: string
  ) => {
    try {
      const endpoint = `${API_URL}/loginBy${capitalize(identifierType)}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [identifierType]: identifierValue, password }),
      });

      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      
      setToken(data.token);
      localStorage.setItem('token', data.token);
      await fetchUserProfile(); // Charger les informations utilisateur après connexion
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const hasRole = (role: string): boolean => {
    return user?.roles.includes(role) || false;
  };

  // Fonction pour capitaliser le premier caractère (utilisée pour les endpoints)
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <UserContext.Provider value={{ users, user, token, fetchUsers, fetchUser, login, logout, hasRole }}>
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
