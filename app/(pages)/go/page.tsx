'use client';

import { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import  { Location } from '@/app/components/go/Map';
import FareCalculator from '@/app/components/go/FareCalculator';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/app/components/go/Map'), {
  ssr: false // This will disable server-side rendering for this component
});

export default function ClientDashboard() {
  const [mode, setMode] = useState<'calculator' | 'direct'>('calculator');
  const { locale } = useLocale();

  const handleRideSubmit = (details: {
    startLocation: string;
    endLocation: string;
    proposedPrice: number;
    estimatedPrice: number;
  }) => {
    // TODO: Implement ride request submission
    console.log('Ride details:', details);
  };

  const content = {
    en: {
      title: "Request a Ride",
      subtitle: "Choose your preferred way to request a ride",
      calculatorMode: "Calculate First",
      directMode: "Direct Request",
      calculatorDescription: "Get a fare estimate before making your request",
      directDescription: "Make a direct request with your own price"
    },
    fr: {
      title: "Commander une Course",
      subtitle: "Choisissez votre mode de commande préféré",
      calculatorMode: "Calculer d'abord",
      directMode: "Commande Directe",
      calculatorDescription: "Obtenez une estimation avant de commander",
      directDescription: "Faites une commande directe avec votre prix"
    }
  };

  const currentContent = locale === 'fr' ? content.fr : content.en;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A1128]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/90 to-[#0A1128]/70" />
      </div>
      <div className="relative z-10 h-full flex flex-col">
        <div className="p-4 sm:p-6">
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-tight animate-fade-in">
              {currentContent.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-blue-200 animate-fade-in-delay max-w-2xl mx-auto">
              {currentContent.subtitle}
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 h-[calc(100vh-140px)]">
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setMode('calculator')}
                  className={`flex-1 py-2 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-all ${
                    mode === 'calculator'
                      ? 'bg-orange-500 text-white'
                      : 'text-blue-200 hover:bg-white/10'
                  }`}
                >
                  {currentContent.calculatorMode}
                </button>
                <div className="px-2">
                  <FaExchangeAlt className="text-blue-200" />
                </div>
                <button
                  onClick={() => setMode('direct')}
                  className={`flex-1 py-2 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-all ${
                    mode === 'direct'
                      ? 'bg-orange-500 text-white'
                      : 'text-blue-200 hover:bg-white/10'
                  }`}
                >
                  {currentContent.directMode}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-blue-200 text-center mb-4">
                {mode === 'calculator'
                  ? currentContent.calculatorDescription
                  : currentContent.directDescription}
              </p>
            </div>
            <div className="flex-1">
              <FareCalculator mode={mode} onSubmitRide={handleRideSubmit} />
            </div>
          </div>
          <div className="w-full lg:w-2/3 h-[400px] lg:h-auto bg-white/10 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
            <Map
              pickup={null}
              destination={null}
              onLocationSelect={(location: Location): void => {
                throw new Error('Function not implemented.');
              }}
              isSelectingPickup={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
