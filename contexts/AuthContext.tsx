import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState } from '../types/User';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utilisateurs fictifs pour les tests
const mockUsers: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'Utilisateur Test',
  },
  {
    id: '2', 
    email: 'admin@rideandgo.com',
    name: 'Admin RideAndGo',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Fonction de connexion fictive
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulation d'un délai de connexion
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Vérifier si l'utilisateur existe (authentification fictive)
      const user = mockUsers.find(u => u.email === email);
      
      if (user && password === 'password') { // Mot de passe fictif
        await AsyncStorage.setItem('user_token', JSON.stringify(user));
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.log('Erreur de connexion:', error);
      return false;
    }
  };

  // Fonction d'inscription fictive
  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Simulation d'un délai d'inscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Créer un nouvel utilisateur
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
      };
      
      // Sauvegarder et connecter l'utilisateur
      await AsyncStorage.setItem('user_token', JSON.stringify(newUser));
      setAuthState({
        user: newUser,
        isLoading: false,
        isAuthenticated: true,
      });
      
      return true;
    } catch (error) {
      console.log('Erreur d\'inscription:', error);
      return false;
    }
  };

  // Fonction de déconnexion
  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('user_token');
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.log('Erreur de déconnexion:', error);
    }
  };

  // Vérifier si l'utilisateur est connecté au démarrage
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const userToken = await AsyncStorage.getItem('user_token');
        if (userToken) {
          const user = JSON.parse(userToken);
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        console.log('Erreur lors de la vérification de l\'état d\'authentification:', error);
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    checkAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};