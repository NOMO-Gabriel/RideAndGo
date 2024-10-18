'use client';

import React from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { useState, useEffect } from 'react';
import ButtonPrimary from '../misc/ButtonPrimary';

const images = [
  '/images/heroimg.jpeg', 
  '/images/heroimg3.jpeg', 
];

const HeroSection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { locale, changeLocale } = useLocale();

  const handleLanguageChange = () => {
    changeLocale(locale === 'en' ? 'fr' : 'en');
  };

  // Gestion du carrousel d'images en arrière-plan
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change l'image toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center text-center py-20 mt-2"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div> {/* Couche semi-transparente */}
      <div className="relative z-10 container mx-auto">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">{locale==='en'?'Discover a new way to Ride and Go':'Découvrez une nouvelle façon de vous déplacer'}</h1>
        <p className="mt-4 text-lg text-gray-300 drop-shadow-lg">
        {locale==='en'?'Find the best solutions for your daily transport by exploring new options of mobility': 'Trouvez les meilleures solutions pour vos trajets quotidiens et explorez les nouvelles options de mobilité.'}
         
        </p>
        <div className="mt-8">
          <button className="bg-orange-btn text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
            {locale==='en'?'Get a ride': 'Se déplacer'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
