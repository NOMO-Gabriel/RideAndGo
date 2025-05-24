import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function GoScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>
        {t('go')}
      </Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        Recherche de taxis
      </Text>
      <Text style={[styles.description, { color: colors.text }]}>
        Cette section permettra de rechercher et réserver des taxis.
        Fonctionnalité en cours de développement.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});