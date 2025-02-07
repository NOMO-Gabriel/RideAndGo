'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaMapMarkerAlt, FaClock, FaRoute, FaCalculator, FaLocationArrow, FaMoneyBillWave, FaBuilding, FaHandHoldingUsd, FaAngleRight, FaAngleLeft } from 'react-icons/fa';
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

const HeroFareCalculator = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [proposedPrice, setProposedPrice] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);
  const { locale } = useLocale();

  const backgroundImages = [
    '/images/heroimg.jpeg',
    '/images/heroimg3.jpeg',
    '/images/hero5.jpg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

    setIsCalculated(true);
  };

  const content = {
    en: {
      heroTitle: "Discover a new way to ride and go",
      heroSubtitle: "Experience the freedom of setting your own fare",
      startLocationPlaceholder: "Where are you?",
      endLocationPlaceholder: "Where to?",
      calculateButton: "Calculate Fare",
      distance: "Distance",
      duration: "Duration",
      estimatedFare: "Our Estimate",
      officialPrice: "Official Rate",
      makeProposal: "Name your price",
      proposalPlaceholder: "Your offer",
      submitProposal: "Propose",
      km: "km",
      mins: "mins",
      trustSection: "Why Choose Ride & Go?",
      trustPoint1: "Set Your Own Price",
      trustPoint2: "Safe & Reliable",
      trustPoint3: "24/7 Support"
    },
    fr: {
      heroTitle: "Decouvrez une nouvelle maniere de vous deplacer",
      heroSubtitle: "La liberté de fixer votre propre tarif",
      startLocationPlaceholder: "D'où partez-vous ?",
      endLocationPlaceholder: "Où allez-vous ?",
      calculateButton: "Calculer",
      distance: "Distance",
      duration: "Durée",
      estimatedFare: "Notre Estimation",
      officialPrice: "Tarif Officiel",
      makeProposal: "Proposez votre prix",
      proposalPlaceholder: "Votre offre",
      submitProposal: "Proposer",
      km: "km",
      mins: "min",
      trustSection: "Pourquoi Choisir Ride & Go ?",
      trustPoint1: "Fixez Votre Prix",
      trustPoint2: "Sûr & Fiable",
      trustPoint3: "Support 24/7"
    }
  };

  const currentContent = locale == 'fr' ? content.fr : content.en;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${currentSlide === index ? 'block' : 'hidden'}`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/90 to-[#0A1128]/70" />
          </div>
        ))}
      </div>
  
      <div className="absolute top-1/2 -translate-y-1/2 z-10 flex w-full justify-between px-4 sm:px-6">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length)}
          className="rounded-full bg-white/20 p-2 transition-all hover:bg-white/30"
        >
          <FaAngleLeft className="text-xl text-white sm:text-2xl" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % backgroundImages.length)}
          className="rounded-full bg-white/20 p-2 transition-all hover:bg-white/30"
        >
          <FaAngleRight className="text-xl text-white sm:text-2xl" />
        </button>
      </div>
  
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight animate-fade-in">
            {currentContent.heroTitle}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-200 animate-fade-in-delay max-w-2xl mx-auto">
            {currentContent.heroSubtitle}
          </p>
        </div>
  
        <div className={`flex flex-col lg:flex-row gap-6 transition-all duration-500 ${
          isCalculated ? 'h-auto' : 'h-full items-center'
        }`}>
          <div className={`w-full lg:w-1/2 bg-white/10 backdrop-blur-md rounded-xl shadow-xl transition-all duration-500 p-4 sm:p-6 ${
            isCalculated ? 'mb-4 lg:mb-0' : 'mb-0'
          }`}>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="relative group">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-base group-hover:text-blue-300 transition-colors" />
                  <input
                    type="text"
                    placeholder={currentContent.startLocationPlaceholder}
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-sm sm:text-base"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                  />
                </div>
  
                <div className="relative group">
                  <FaLocationArrow className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-base group-hover:text-blue-300 transition-colors" />
                  <input
                    type="text"
                    placeholder={currentContent.endLocationPlaceholder}
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-sm sm:text-base"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                  />
                </div>
  
                <button
                  onClick={calculateFare}
                  className="w-full py-3 bg-gradient-to-r from-orange-200 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium shadow-lg flex items-center justify-center gap-2 transition transform hover:scale-[1.02] hover:shadow-xl text-sm sm:text-base"
                >
                  <FaCalculator className="text-base sm:text-lg" />
                  {currentContent.calculateButton}
                </button>
              </div>
  
              {tripDetails && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur hover:bg-white/20 transition-colors">
                      <div className="flex items-center gap-2 text-blue-200 mb-1.5 text-sm">
                        <FaRoute className="text-base sm:text-lg" />
                        {currentContent.distance}
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-white">
                        {tripDetails.distance} {currentContent.km}
                      </p>
                    </div>
  
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur hover:bg-white/20 transition-colors">
                      <div className="flex items-center gap-2 text-blue-200 mb-1.5 text-sm">
                        <FaClock className="text-base sm:text-lg" />
                        {currentContent.duration}
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-white">
                        {tripDetails.duration} {currentContent.mins}
                      </p>
                    </div>
                  
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur hover:bg-white/20 transition-colors">
                      <div className="flex items-center gap-2 text-blue-200 mb-1.5 text-sm">
                        <FaMoneyBillWave className="text-base sm:text-lg" />
                        {currentContent.estimatedFare}
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-white">
                        {tripDetails.fare.toLocaleString()} FCFA
                      </p>
                    </div>
  
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur hover:bg-white/20 transition-colors">
                      <div className="flex items-center gap-2 text-blue-200 mb-1.5 text-sm">
                        <FaBuilding className="text-base sm:text-lg" />
                        {currentContent.officialPrice}
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-white">
                        {tripDetails.officialPrice.toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>
  
                  <div className="bg-gradient-to-r from-orange-500/30 to-orange-600/30 p-4 rounded-lg backdrop-blur">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FaHandHoldingUsd className="text-lg sm:text-xl" />
                      {currentContent.makeProposal}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="number"
                        placeholder={currentContent.proposalPlaceholder}
                        className="w-full sm:flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm sm:text-base"
                        value={proposedPrice}
                        onChange={(e) => setProposedPrice(e.target.value)}
                      />
                      <button className="w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all hover:shadow-lg transform hover:scale-105 text-sm sm:text-base">
                        {currentContent.submitProposal}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
  
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="h-[300px] sm:h-[400px] lg:h-[450px] relative rounded-xl overflow-hidden shadow-xl">
              {Map && <Map center={[0.0, 0.0]} zoom={0} />}
              {tripDetails && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md p-3 m-3 rounded-lg">
                  <div className="flex flex-col gap-2 text-white text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-green-400" />
                      <span>{tripDetails.start}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaLocationArrow className="text-orange-400" />
                      <span>{tripDetails.end}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur p-3 rounded-lg text-center hover:bg-white/20 transition-colors">
                <h3 className="text-sm sm:text-base font-semibold text-white">{currentContent.trustPoint1}</h3>
              </div>
              <div className="bg-white/10 backdrop-blur p-3 rounded-lg text-center hover:bg-white/20 transition-colors">
                <h3 className="text-sm sm:text-base font-semibold text-white">{currentContent.trustPoint2}</h3>
              </div>
              <div className="bg-white/10 backdrop-blur p-3 rounded-lg text-center hover:bg-white/20 transition-colors">
                <h3 className="text-sm sm:text-base font-semibold text-white">{currentContent.trustPoint3}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroFareCalculator;
