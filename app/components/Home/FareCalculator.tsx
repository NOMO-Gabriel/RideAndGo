'use client';

import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('../collectRideGo/DynamicMap'), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full flex items-center justify-center bg-gray-100">
      Chargement de la carte...
    </div>
  ),
});

const CompactFareCalculator: React.FC = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const { locale } = useLocale();

  const handleCalculate = () => {
    // Logique de calcul du tarif
    const mockFare = Math.floor(Math.random() * 3000) + 2000;
    setEstimatedFare(mockFare);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-white rounded-lg shadow-lg">
      {/* Section du calculateur à gauche */}
      <div className="md:w-2/3 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {locale === 'fr' ? 'Calculateur de tarif' : 'Fare Calculator'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'fr' ? 'Point de départ' : 'Starting Point'}
            </label>
            <input
              type="text"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder={locale === 'fr' ? 'Entrez le point de départ' : 'Enter starting point'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {locale === 'fr' ? 'Destination' : 'Destination'}
            </label>
            <input
              type="text"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder={locale === 'fr' ? 'Entrez la destination' : 'Enter destination'}
            />
          </div>
          <button
            onClick={handleCalculate}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
          >
            {locale === 'fr' ? 'Calculer le tarif' : 'Calculate Fare'}
          </button>
          {estimatedFare && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <p className="text-lg font-semibold text-orange-800">
                {locale === 'fr' ? 'Tarif estimé' : 'Estimated Fare'}:
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {formatPrice(estimatedFare)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section de la carte à droite */}
      <div className="md:w-1/3 h-64 rounded-lg shadow-lg flex flex-col justify-between relative mt-5 md:mt-0 p-5">
        <DynamicMap center={[3.8667, 11.5167]} zoom={13} className="h-full w-full rounded-lg" />
        <div className="text-center text-gray-800">
          <p className="mt-4">
            {startLocation && <span>📍 {startLocation}</span>}
            {startLocation && endLocation && <span> ➡️ </span>}
            {endLocation && <span>🎯 {endLocation}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompactFareCalculator;
