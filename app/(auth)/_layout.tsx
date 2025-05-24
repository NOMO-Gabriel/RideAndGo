import { Redirect, Stack, useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return null;
  if (isAuthenticated) { 
    router.replace('../tabs/home');
    // return <Redirect href="../tabs/home" />; 
  } 

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}