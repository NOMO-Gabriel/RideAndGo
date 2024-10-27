import { useContext } from 'react';
import { UserContext } from '@/app/utils/contexts/UserContext';

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { user, ...rest } = context;

  const isAuthenticated = !!user; 
 
  return {
    ...rest,
    user,
    isAuthenticated
  };
};
