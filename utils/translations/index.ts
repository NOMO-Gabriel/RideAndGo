import { en } from './en';
import { fr } from './fr';

// Configuration i18n simple
export const translations = {
  en,
  fr,
};

export type Language = keyof typeof translations;
export type TranslationKeys = keyof typeof en;