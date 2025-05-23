/**
 * Couleurs pour les thèmes dark et light
 */

const tintColorLight = '#2563eb'; // Bleu
const tintColorDark = '#3b82f6';  // Bleu plus clair

export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    primary: '#2563eb',
    secondary: '#f59e0b',
    surface: '#f8f9fa',
    border: '#e5e7eb',
  },
  dark: {
    text: '#fff',
    background: '#151718',
    tint: tintColorDark,
    tabIconDefault: '#9ba1a6',
    tabIconSelected: tintColorDark,
    primary: '#3b82f6',
    secondary: '#fbbf24',
    surface: '#1f2937',
    border: '#374151',
  },
};

export type Theme = keyof typeof Colors;