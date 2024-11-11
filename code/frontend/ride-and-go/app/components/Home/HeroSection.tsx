'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';

interface HeroSectionProps {
  images: string[]; // Prop pour les images
  messages: { en: string; fr: string }; // Prop pour les messages
}

const HeroSection: React.FC<HeroSectionProps> = ({ images, messages }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { locale, changeLocale } = useLocale();

  const handleLanguageChange = () => {
    changeLocale(locale === 'en' ? 'fr' : 'en');
  };

  // Gestion du carrousel d'images en arrière-plan
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change l'image toutes les 3 secondes
    return () => clearInterval(interval);
  }, [images.length]); // Utilise les images passées en props

  return (
    <section
  className="relative bg-cover bg-center text-center py-20 mt-2 parallax"
  style={{ backgroundImage: `url(${images[currentImage]})`, backgroundAttachment: 'fixed' }}
>

      <div className="absolute inset-0 bg-black bg-opacity-40"></div> {/* Couche semi-transparente */}
      <div className="relative z-10 container mx-auto">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          {locale === 'en' ? messages.en : messages.fr} {/* Utilise les messages des props */}
        </h1>
        <p className="mt-4 text-lg text-gray-300 drop-shadow-lg">
          {locale === 'en'
            ? 'Find the best solutions for your daily transport by exploring new options of mobility'
            : 'Trouvez les meilleures solutions pour vos trajets quotidiens et explorez les nouvelles options de mobilité.'}
        </p>
        <div className="mt-8">
          <button
            className="bg-orange-btn text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
            onClick={handleLanguageChange}
          >
            {locale === 'en' ? 'Get a ride' : 'Se déplacer'}
          </button>

        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;
