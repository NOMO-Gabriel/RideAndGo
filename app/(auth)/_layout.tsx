import { Stack } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';

export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Connexion',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Inscription',
          headerShown: false,
        }} 
      />
    </Stack>
  );
}