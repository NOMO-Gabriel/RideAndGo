import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={icon as any} size={24} color={colors.primary} />
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: colors.tabIconDefault }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={20} color={colors.tabIconDefault} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Section utilisateur */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={[styles.userName, { color: colors.text }]}>{user?.name}</Text>
            <Text style={[styles.userEmail, { color: colors.tabIconDefault }]}>
              {user?.email}
            </Text>
          </View>
        </View>
      </View>

      {/* Section compte */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Compte</Text>
        <SettingItem
          icon="person-outline"
          title={t('myAccount')}
          subtitle="Informations personnelles"
        />
        <SettingItem
          icon="notifications-outline"
          title={t('notifications')}
          subtitle="Gérer les notifications"
        />
        <SettingItem
          icon="card-outline"
          title={t('subscriptions')}
          subtitle="Gérer vos abonnements"
        />
      </View>

      {/* Section préférences */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('preferences')}
        </Text>
        <SettingItem
          icon="moon-outline"
          title="Thème sombre"
          subtitle={`Actuellement: ${theme === 'dark' ? 'Sombre' : 'Clair'}`}
          rightElement={
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          }
        />
        <SettingItem
          icon="language-outline"
          title="Langue"
          subtitle={`Actuellement: ${language === 'fr' ? 'Français' : 'English'}`}
          onPress={toggleLanguage}
        />
      </View>

      {/* Section aide */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('help')}
        </Text>
        <SettingItem
          icon="help-circle-outline"
          title={t('help')}
          subtitle="Centre d'aide et FAQ"
        />
        <SettingItem
          icon="document-text-outline"
          title={t('terms')}
          subtitle="Consulter les conditions"
        />
        <SettingItem
          icon="shield-outline"
          title={t('privacy')}
          subtitle="Politique de confidentialité"
        />
      </View>

      {/* Section déconnexion */}
      <View style={styles.section}>
        <SettingItem
          icon="log-out-outline"
          title="Déconnexion"
          onPress={handleLogout}
          rightElement={null}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.tabIconDefault }]}>
          RideAndGo Mobile v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 14,
    marginTop: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});