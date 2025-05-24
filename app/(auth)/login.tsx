import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Erreur', 'Email ou mot de passe incorrect');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>RideAndGo</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>{t('login')}</Text>

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder={t('email')}
          placeholderTextColor={colors.tabIconDefault}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder={t('password')}
          placeholderTextColor={colors.tabIconDefault}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? t('loading') : t('loginButton')}
          </Text>
        </TouchableOpacity>

        <Link href="./register" asChild>
          <TouchableOpacity style={styles.linkContainer}>
            <Text style={[styles.linkText, { color: colors.primary }]}>
              Pas de compte ? Créer un compte
            </Text>
          </TouchableOpacity>
        </Link>

        <Text style={[styles.demoText, { color: colors.tabIconDefault }]}>
          Demo: test@example.com / password
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 16,
  },
  demoText: {
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
  },
});