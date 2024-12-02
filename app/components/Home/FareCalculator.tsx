'use client';

import React, { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaUser } from 'react-icons/fa'; // Icône pour le personnage pensif
import Map from '../collectRideGo/Map'; // Remplacer par le bon import si nécessaire

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
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-bleu-nuit to-bleu-200 p-8 text-white rounded-lg shadow-lg w-full">
      {/* Icône du bonhomme pensif */}
      <div className="flex justify-center items-center w-16 h-16 rounded-full bg-white text-orange-btn shadow-lg transform -translate-y-8">
        <FaUser className="text-4xl" />
      </div>

      <div className="flex-1 mb-4 md:mb-0 md:ml-8 md:max-w-5/8">
        {/* Titre et phrase motivante */}
        <h3 className="text-4xl font-bold mb-2">{currentContent.title}</h3>
        <p className="text-lg italic mb-6">{currentContent.prompt}</p>

        {/* Champs de texte pour les localisations */}
        <input
          type="text"
          placeholder={currentContent.startLocationPlaceholder}
          className="w-full mb-4 px-5 py-3 border border-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 transform hover:scale-105 bg-opacity-70 backdrop-filter backdrop-blur-lg"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder={currentContent.endLocationPlaceholder}
          className="w-full mb-6 px-5 py-3 border border-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 transform hover:scale-105 bg-opacity-70 backdrop-filter backdrop-blur-lg"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
        />

        {/* Bouton de calcul */}
        <button
          onClick={calculateFare}
          className="bg-orange-btn text-white w-full py-3 rounded-md shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
        >
          {currentContent.calculateButton}
        </button>

        {/* Affichage du tarif */}
        {fare !== null && (
          <div className="mt-4">
            <p className="text-3xl font-bold">{fare.toLocaleString()} FCFA</p>
            <p className="text-lg">{currentContent.estimatedFare}</p>
          </div>
        )}
      </div>

      {/* Carte statique à droite */}
      <div className="md:w-1/3 h-64  rounded-lg shadow-lg flex flex-col justify-between relative mt-5 md:mt-0 p-5">
       
        <Map />
        <div className="text-center text-gray-800">
          <p className="mt-4">
            {startLocation && <span>📍 {startLocation}</span>}
            {startLocation && endLocation && <br />}
            {endLocation && <span>📍 {endLocation}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompactFareCalculator;
