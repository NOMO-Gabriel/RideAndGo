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
    <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bleu-nuit mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto">
          {locale === 'en' ? 'Our Value Propositions' : 'Nos Valeurs Ajoutées'}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="text-center p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg 
                       transition-transform duration-300 ease-in-out
                       hover:scale-105 hover:shadow-xl
                       flex flex-col items-center"
            >
              <div className="bg-bleu-nuit text-white w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
                            rounded-full flex items-center justify-center mb-3 sm:mb-4
                            transform transition-transform duration-300 hover:rotate-6">
                <span className="text-xl sm:text-2xl">{feature.icon}</span>
              </div>
              
              <h3 className="mt-2 sm:mt-3 md:mt-4 
                           text-lg sm:text-xl md:text-2xl 
                           font-semibold text-bleu-nuit">
                {feature.title}
              </h3>
              
              <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-600
                          max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

}

export default PlusValue;
