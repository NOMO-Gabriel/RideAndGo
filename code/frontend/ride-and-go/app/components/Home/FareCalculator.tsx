'use client';

import React, { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaUser } from 'react-icons/fa'; // Icône pour le personnage pensif

const CompactFareCalculator: React.FC = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [fare, setFare] = useState<number | null>(null);
  const { locale } = useLocale();

  // Fonction de calcul du tarif
  const calculateFare = () => {
    const baseFare = 1000; // Tarif de base en FCFA
    const distance = Math.random() * 20 + 5; // Distance simulée (5-25 km)
    const pricePerKm = 500; // Prix par km en FCFA
    const totalFare = baseFare + distance * pricePerKm;

    setFare(Number(totalFare.toFixed(2)));
  };

  // Contenu multilingue
  const content = {
    en: {
      title: 'Fare Calculator',
      prompt: 'Would you like to calculate your fare?',
      startLocationPlaceholder: 'Start location',
      endLocationPlaceholder: "End location",
      calculateButton: 'Calculate Fare',
      estimatedFare: 'Estimated Fare',
    },
    fr: {
      title: 'Calculateur de Tarif',
      prompt: 'Souhaitez-vous calculer votre tarif ?',
      startLocationPlaceholder: 'Lieu de départ',
      endLocationPlaceholder: "Lieu d'arrivée",
      calculateButton: 'Calculer le Tarif',
      estimatedFare: 'Tarif estimé',
    },
  };

  const currentContent = content[locale]; // Sélection du contenu selon la langue

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xs mx-auto text-center relative">
      {/* Icône du bonhomme pensif */}
      <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-orange-btn text-white flex items-center justify-center transform -translate-y-1/2 -translate-x-1/2">
        <FaUser className="text-3xl" />
      </div>

      {/* Titre et phrase motivante */}
      <h3 className="text-bleu-nuit text-2xl font-bold mb-2">
        {currentContent.title}
      </h3>
      <p className="text-gray-600 italic mb-4">
        {currentContent.prompt}
      </p>

      {/* Champs de texte pour les localisations */}
      <input
        type="text"
        placeholder={currentContent.startLocationPlaceholder}
        className="w-full mb-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-btn"
        value={startLocation}
        onChange={(e) => setStartLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder={currentContent.endLocationPlaceholder}
        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-btn"
        value={endLocation}
        onChange={(e) => setEndLocation(e.target.value)}
      />

      {/* Bouton de calcul */}
      <button
        onClick={calculateFare}
        className="bg-orange-btn text-white w-full py-2 rounded-md hover:bg-orange-600 transition-all duration-300"
      >
        {currentContent.calculateButton}
      </button>

      {/* Affichage du tarif */}
      {fare !== null && (
        <div className="mt-4">
          <p className="text-xl font-bold text-bleu-nuit">
            {fare.toLocaleString()} FCFA
          </p>
          <p className="text-gray-600 text-sm">
            {currentContent.estimatedFare}
          </p>
        </div>
      )}
    </div>
  );
};

export default CompactFareCalculator;
