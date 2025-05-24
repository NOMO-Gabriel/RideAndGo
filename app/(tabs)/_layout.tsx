import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function TabLayout() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="go"
        options={{
          title: t('go'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'car' : 'car-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ride"
        options={{
          title: t('ride'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: t('calculator'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calculator' : 'calculator-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}