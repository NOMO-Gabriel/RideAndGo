'use client';
import React, { useState } from 'react';

// Données des fonctionnalités
const features = [
  {
    title: "Rechercher un taxi",
    icon: "🚕",
    image: "/images/rechercher.jpeg",
    buttonText: "Essayer maintenant"
  },
  {
    title: "Planifier votre trajet",
    icon: "🗺️",
    image: "/images/planifier.jpg",
    buttonText: "Essayer maintenant"
  },
  {
    title: "Suivi en temps réel",
    icon: "🕒",
    image: "/images/suivi.png",
    buttonText: "Essayer maintenant"
  },
  {
    title: "Options de paiement flexibles",
    icon: "💳",
    image: "/images/paiement.jpeg",
    buttonText: "Essayer maintenant"
  },
  {
    title: "Support 24/7",
    icon: "📞",
    image: "/images/support.jpg",
    buttonText: "Essayer maintenant"
  },
  {
    title: "Programmer vos courses",
    icon: "📅",
    image: "/images/programmer.jpg",
    buttonText: "Essayer maintenant"
  }
];

const FeaturesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuresPerView = 4;

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

  return (
    <section className="py-16 bg-blanc-casse mb-16 mt-16">
      <div className="container mx-auto text-center ">
        <h2 className="text-4xl font-bold text-bleu-nuit mb-8">Nos Fonctionnalités</h2>
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
                className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 relative overflow-hidden"
                style={{
                  backgroundImage: `url(${feature.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'black',
                  minHeight: '350px', // Hauteur augmentée
                  borderRadius: '10px',
                  padding: '20px',
                }}
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <button className="bg-orange-btn text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300">
                  {feature.buttonText}
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={nextFeatures}
            className="bg-bleu-nuit text-white px-4 py-2 rounded-lg ml-4 hover:bg-orange-600 transition duration-300"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
