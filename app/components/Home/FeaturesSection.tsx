'use client';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import React, { useEffect, useState } from 'react';

// Données des fonctionnalités
const features = [
  {
    titleFr: "Rechercher un taxi",
    titleEn: "Search a taxi",
    icon: "🚕",
    image: "/images/rechercher.jpeg",
    buttonTextFr: "Essayer maintenant",
    buttonTextEn: "Try now"

  },
  {
    titleFr: "Planifier votre trajet",
    titleEn: "Planify tour trip",
    icon: "🗺️",
    image: "/images/planifier.jpg",
    buttonTextFr: "Essayer maintenant",
    buttonTextEn: "Try now"

  },
  {
    titleFr: "Suivi en temps réel",
    titleEn: "Real time assistance",

    icon: "🕒",
    image: "/images/suivi.png",
    buttonTextFr: "Essayer maintenant",
    buttonTextEn: "Try now"

  },
  {
    titleFr: "Options de paiement flexibles",
    titleEn: "Flexible method of payments",

    icon: "💳",
    image: "/images/paiement.jpeg",
    buttonTextFr: "Essayer maintenant",
    buttonTextEn: "Try now"

  },
  {
    title: "Support 24/7",
    icon: "📞",
    image: "/images/support.jpg",
    buttonTextFr: "Essayer maintenant",
    buttonTextEn: "Try now"

  },
  {
    title: "Programmer vos courses",
    icon: "📅",
    image: "/images/programmer.jpg",
    buttonTextFr: "Essayer maintenant",
    buttonTextEn: "Try now"

  }
];

const FeaturesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuresPerView = 4;
  const { locale, changeLocale } = useLocale();

  const handleLanguageChange = () => {
    changeLocale(locale === 'en' ? 'fr' : 'en');
  };

  // Fonction pour passer à la fonctionnalité suivante
  const nextFeatures = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + featuresPerView < features.length ? prevIndex + featuresPerView : 0
    );
  };

  // Fonction pour revenir à la fonctionnalité précédente
  const prevFeatures = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - featuresPerView >= 0 ? prevIndex - featuresPerView : Math.max(features.length - featuresPerView, 0)
    );
  };
  //useEffect(() => {
  //  const interval = setInterval(() => {
  //    nextFeatures();
    //}, 5000); 
    //return () => clearInterval(interval);
  //}, [currentIndex]);
  

  
  return (
<<<<<<< HEAD
    <div className="py-16 bg-blanc-casse mb-16 mt-16 ">
      <div className="container mx-auto text-center sm:w-4/3">
        <h2 className="text-4xl font-bold text-bleu-nuit mb-8">{locale==='en'?'Our features': 'Nos Fonctionnalités'}</h2>
        <div className="flex items-center justify-center">
          <button
            onClick={prevFeatures}
            className="bg-bleu-nuit text-white px-4 py-2 rounded-lg mr-4 hover:bg-orange-600 transition duration-300"
          >
            &lt; 
          </button>

          {/* Grille pleine largeur */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {features.slice(currentIndex, currentIndex + featuresPerView).map((feature, index) => (
              <div
              key={index}
              className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 relative overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              style={{
                backgroundImage: `url(${feature.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
=======
    <section className="py-12 sm:py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-bleu-nuit mb-6 sm:mb-8">
          {locale === 'en' ? 'Our Value Propositions' : 'Nos Valeurs Ajoutées'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="text-center p-6 sm:p-8 bg-white shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
>>>>>>> origin/folongtz
            >
              <div className="bg-bleu-nuit text-white w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-xl sm:text-2xl">{feature.icon}</span>
              </div>
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-bleu-nuit">{feature.title}</h3>
              <h3 className="text-2xl font-semibold mb-2">{feature.titleEn} </h3>
                <button className="bg-orange-btn text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300">
                {feature.buttonTextEn}
                </button>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
