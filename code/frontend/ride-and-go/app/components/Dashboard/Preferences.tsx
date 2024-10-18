'use client';
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import React, { useState } from 'react';

// Types pour une option de préférence
type Option = {
  value: string | number;
  label: { en: string; fr: string };
};

// Génération des fuseaux horaires GMT-12 à GMT+12
const timezones: Option[] = Array.from({ length: 25 }, (_, i) => ({
  value: i - 12,
  label: { en: `GMT${i - 12 >= 0 ? `+${i - 12}` : i - 12}`, fr: `GMT${i - 12 >= 0 ? `+${i - 12}` : i - 12}` },
}));

export default function Preferences() {
  const { locale, changeLocale } = useLocale();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [timezone, setTimezone] = useState<number>(0);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(!false);

  const preferences = [
    {
      key: 'language',
      label: { en: 'Language', fr: 'Langue' },
      value: locale,
      options: [
        { value: 'en', label: { en: 'English', fr: 'Anglais' } },
        { value: 'fr', label: { en: 'French', fr: 'Français' } },
      ],
      onChange: (value: string) => changeLocale(value as 'en' | 'fr'),
    },
    {
      key: 'theme',
      label: { en: 'Theme', fr: 'Thème' },
      value: theme,
      options: [
        { value: 'light', label: { en: 'Light', fr: 'Clair' } },
        { value: 'dark', label: { en: 'Dark', fr: 'Sombre' } },
      ],
      onChange: (value: string) => setTheme(value as 'light' | 'dark'),
    },
    {
      key: 'timezone',
      label: { en: 'Time Zone', fr: 'Fuseau horaire' },
      value: timezone,
      options: timezones,
      onChange: (value: string) => setTimezone(Number(value)),
    },
  ];

  return (
    <div className="flex flex-col p-4 space-y-6">
      <div className="text-bleu-nuit font-bold text-xl">
        {locale === 'en' ? 'Preferences' : 'Préférences'}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {preferences.map(({ key, label, value, options, onChange }) => (
          <div key={key} className="flex flex-col space-y-2">
            <div className="text-bleu-nuit font-bold">
              {label[locale as 'en' | 'fr']} :
            </div>
            <div className="border-2 border-gray-200 p-2 text-center text-bleu-nuit w-[300px]">
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white text-center"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label[locale as 'en' | 'fr']}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle Switch for Location */}
      <div className="flex justify-start items-center border-2 border-gray-200 p-2 text-center text-bleu-nuit w-[300px]">
        <div className="flex flex-row items-center justify-between space-x-16">
          <span className={`text-bleu-nuit font-bold ${locale==='fr'?"text-sm":""}`} >
            {locale === 'en' ? 'Enable Location' : 'Activer Localisation'} 
          </span>
          <div
            className={`w-20 h-8 flex items-center rounded-full p-1 cursor-pointer ${
              locationEnabled ? 'bg-bleu-nuit' : 'bg-gray-400'
            }`}
            onClick={() => setLocationEnabled(!locationEnabled)}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                locationEnabled ? 'translate-x-12' : 'translate-x-0'
              }` }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
