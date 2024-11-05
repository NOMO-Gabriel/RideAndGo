// context/FlashMessageContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface FlashMessageType {
  msg: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface FlashMessageContextType {
  message: FlashMessageType | null;
  showFlashMessage: (msg: string, type: FlashMessageType['type'], persistent?: boolean) => void;
}

export const FlashMessageContext = createContext<FlashMessageContextType | undefined>(undefined);

export const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<FlashMessageType | null>(null);

  const showFlashMessage = (msg: string, type: FlashMessageType['type'] = 'info', persistent = false) => {
    setMessage({ msg, type });

    if (!persistent) {
      setTimeout(() => setMessage(null), 3000); // Supprime le message après 3 secondes, sauf s'il est persistant
    }
  };

  return (
    <FlashMessageContext.Provider value={{ message, showFlashMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};
