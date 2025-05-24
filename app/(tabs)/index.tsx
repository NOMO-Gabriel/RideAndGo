import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>
        Bienvenue {user?.name}!
      </Text>
      
      <Text style={[styles.subtitle, { color: colors.text }]}>
        RideAndGo Mobile
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.secondary }]}
        onPress={toggleLanguage}
      >
        <Text style={styles.buttonText}>
          Langue: {language === 'fr' ? 'Français' : 'English'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>
          Fonctionnalités disponibles:
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          • {t('go')}: Recherche de taxis
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          • {t('ride')}: Recherche de clients
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          • {t('calculator')}: Calcul de tarifs
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          • {t('settings')}: Paramètres
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
});