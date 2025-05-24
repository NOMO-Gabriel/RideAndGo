import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useRouter } from 'expo-router';

export default function Profile() {
  const { logout } = useAuth();
  const { colors } = useTheme();
   const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // Rediriger vers la page de connexion
    router.replace('../(auth)/login');
     
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Mon Profil</Text>
      <TouchableOpacity onPress={handleLogout} style={[styles.button, { backgroundColor: colors.primary }]}>
        <Text style={styles.buttonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 18, marginBottom: 20 },
  button: { padding: 12, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
