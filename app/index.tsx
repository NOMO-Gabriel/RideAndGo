import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import {  Link, useRouter } from 'expo-router';
export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Utilisateur connecté, rediriger vers les tabs
        router.replace('/(tabs)');
      } else {
        // Utilisateur non connecté, rediriger vers l'authentification
        router.replace('/(auth)/login');
      }
    }
  }, [isLoading, isAuthenticated]);

  // Écran de chargement
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>RideAndGo</Text>
      <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      <Text style={[styles.loadingText, { color: colors.text }]}>{t('loading')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
  },
});