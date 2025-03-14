"use client";

import React, { createContext, ReactNode, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import du module js-cookie
import { mockUsers } from "../mocks/mockUsers";

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
    identifierType: "email" | "phoneNumber" | "pseudo",
    identifierValue: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (
    identifierType: "email" | "phoneNumber" | "pseudo",
    identifierValue: string,
    password: string
  ): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = mockUsers.find(user => {
      switch (identifierType) {
        case "email":
          return user.email === identifierValue;
        case "phoneNumber":
          return user.phoneNumber === identifierValue;
        case "pseudo":
          return user.pseudo === identifierValue;
        default:
          return false;
      }
    });

    if (!mockUser) {
      throw new Error("Utilisateur non trouvé");
    }

    if (mockUser.password !== password) {
      throw new Error("Mot de passe incorrect");
    }

    if (mockUser.isSuspend) {
      throw new Error("Votre compte est suspendu");
    }

    const userData = {
      id: mockUser.id,
      pseudo: mockUser.pseudo,
      email: mockUser.email,
      roles: mockUser.roles,
      name: mockUser.name,
      surname: mockUser.surname,
      phoneNumber: mockUser.phoneNumber,
    };

    Cookies.set("user", JSON.stringify(userData), {
      expires: 1, // Expire en 1 jour
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
