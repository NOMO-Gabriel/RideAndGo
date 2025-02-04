'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaMapMarkerAlt, FaClock, FaRoute, FaCalculator, FaLocationArrow, FaMoneyBillWave, FaBuilding, FaHandHoldingUsd } from 'react-icons/fa';
import Map from '../collectRideGo/DynamicMap';

interface TripDetails {
  fare: number;
  distance: number;
  time: number;
  officialPrice: number;
  duration: number;
  start: string;
  end: string
}

interface FareCalculatorProps {
  onSubmitRide?: (details: {
    startLocation: string;
    endLocation: string;
    proposedPrice: number;
    estimatedPrice: number;
  }) => void;
  mode?: 'calculator' | 'direct';
}

const FareCalculator: React.FC<FareCalculatorProps> = ({ onSubmitRide, mode = 'calculator' }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [proposedPrice, setProposedPrice] = useState('');
  const { locale } = useLocale();

  const calculateFare = () => {
    const baseFare = 1000;
    const distance = Math.random() * 20 + 5;
    const pricePerKm = 500;
    const totalFare = baseFare + distance * pricePerKm;
    const officialPrice = totalFare * 1.2;

    setTripDetails({
      fare: Number(totalFare.toFixed(2)),
      officialPrice: Number(officialPrice.toFixed(2)),
      distance: Number(distance.toFixed(1)),
      duration: Math.floor(distance * 3),
      start: startLocation,
      end: endLocation,
      time: 0
    });
  };

  const handleSubmit = () => {
    if (onSubmitRide && startLocation && endLocation && proposedPrice) {
      onSubmitRide({
        startLocation,
        endLocation,
        proposedPrice: Number(proposedPrice),
        estimatedPrice: tripDetails?.fare || 0
      });
    }
  };

  const content = {
    en: {
      startLocationPlaceholder: "Where are you?",
      endLocationPlaceholder: "Where to?",
      calculateButton: "Calculate Fare",
      distance: "Distance",
      duration: "Duration",
      estimatedFare: "Our Estimate",
      officialPrice: "Official Rate",
      makeProposal: "Name your price",
      proposalPlaceholder: "Your offer",
      submitProposal: "Request Ride",
      km: "km",
      mins: "mins"
    },
    fr: {
      startLocationPlaceholder: "D'où partez-vous ?",
      endLocationPlaceholder: "Où allez-vous ?",
      calculateButton: "Calculer",
      distance: "Distance",
      duration: "Durée",
      estimatedFare: "Notre Estimation",
      officialPrice: "Tarif Officiel",
      makeProposal: "Proposez votre prix",
      proposalPlaceholder: "Votre offre",
      submitProposal: "Commander",
      km: "km",
      mins: "min"
    }
  };

  const currentContent = locale === 'fr' ? content.fr : content.en;

  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-xl">
      <div className="space-y-3">
        <div className="space-y-2">
          <div className="relative group">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-base group-hover:text-blue-300 transition-colors" />
            <input
              type="text"
              placeholder={currentContent.startLocationPlaceholder}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-sm"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
          </div>

          <div className="relative group">
            <FaLocationArrow className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-base group-hover:text-blue-300 transition-colors" />
            <input
              type="text"
              placeholder={currentContent.endLocationPlaceholder}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-sm"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            />
          </div>

          {mode === 'calculator' && (
            <button
              onClick={calculateFare}
              className="w-full py-2 bg-gradient-to-r from-orange-200 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium shadow-lg flex items-center justify-center gap-2 transition transform hover:scale-[1.02] hover:shadow-xl text-sm"
            >
              <FaCalculator className="text-base" />
              {currentContent.calculateButton}
            </button>
          )}
        </div>

        {(tripDetails || mode === 'direct') && (
          <div className="space-y-3 animate-fade-in">
            {mode === 'calculator' && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/10 p-2 rounded-lg backdrop-blur hover:bg-white/20 transition-colors">
                    <div className="flex items-center gap-1 text-blue-200 mb-1 text-sm">
                      <FaRoute className="text-base" />
                      {currentContent.distance}
                    </div>
                    <p className="text-lg font-bold text-white">
                      {tripDetails?.distance} {currentContent.km}
                    </p>
                  </div>

                  <div className="bg-white/10 p-2 rounded-lg backdrop-blur hover:bg-white/20 transition-colors">
                    <div className="flex items-center gap-1 text-blue-200 mb-1 text-sm">
                      <FaClock className="text-base" />
                      {currentContent.duration}
                    </div>
                    <p className="text-lg font-bold text-white">
                      {tripDetails?.duration} {currentContent.mins}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/10 p-2 rounded-lg backdrop-blur hover:bg-white/20 transition-colors">
                    <div className="flex items-center gap-1 text-blue-200 mb-1 text-sm">
                      <FaMoneyBillWave className="text-base" />
                      {currentContent.estimatedFare}
                    </div>
                    <p className="text-lg font-bold text-white">
                      {tripDetails?.fare.toLocaleString()} FCFA
                    </p>
                  </div>

                  <div className="bg-white/10 p-2 rounded-lg backdrop-blur hover:bg-white/20 transition-colors">
                    <div className="flex items-center gap-1 text-blue-200 mb-1 text-sm">
                      <FaBuilding className="text-base" />
                      {currentContent.officialPrice}
                    </div>
                    <p className="text-lg font-bold text-white">
                      {tripDetails?.officialPrice.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="bg-gradient-to-r from-orange-500/30 to-orange-600/30 p-3 rounded-lg backdrop-blur">
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <FaHandHoldingUsd className="text-lg" />
                {currentContent.makeProposal}
              </h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={currentContent.proposalPlaceholder}
                  className="flex-1 px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                />
                <button 
                  onClick={handleSubmit}
                  className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium transition-all hover:shadow-lg transform hover:scale-105 text-sm"
                >
                  {currentContent.submitProposal}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FareCalculator;
