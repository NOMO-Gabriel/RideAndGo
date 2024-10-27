
import { useContext } from 'react';
import { UserContext } from '@/app/utils/contexts/UserContext';


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { user, token, ...rest } = context;

  const isAuthenticated = !!token;
  const userRole = user?.roles[0] || 'ROLE_GUEST';

  const hasRole = (role: string) => user?.roles.includes(role);

  return {
    ...rest,
    user,
    token,
    isAuthenticated,
    userRole,
    hasRole,
  };
};
