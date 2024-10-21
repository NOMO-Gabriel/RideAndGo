'use client'

import React from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';

const PlusValue: React.FC = () => {
  const { locale, changeLocale } = useLocale();

  const handleLanguageChange = () => {
    changeLocale(locale === 'en' ? 'fr' : 'en');
  };

  const features = [
    {
      title: locale === 'en' ? 'Speed' : 'Rapidité',
      description: locale === 'en' ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      icon: '⚡', // Remplace par l'icône que tu souhaites
    },
    {
      title: locale === 'en' ? 'Convenience' : 'Plus vague',
      description: locale === 'en' ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      icon: '🌍', // Remplace par l'icône que tu souhaites
    },
    {
      title: locale === 'en' ? 'User-Friendly' : 'Icône',
      description: locale === 'en' ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      icon: '🖥️', // Remplace par l'icône que tu souhaites
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-bleu-nuit mb-8">
          {locale === 'en' ? 'Our Value Propositions' : 'Nos Valeurs Ajoutées'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center p-8 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <div className="bg-bleu-nuit text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">{feature.icon}</span> {/* Icône */}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-bleu-nuit">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlusValue;
