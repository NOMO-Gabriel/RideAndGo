'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaMapMarkerAlt, FaClock, FaRoute, FaCalculator, FaLocationArrow, FaMoneyBillWave, FaBuilding, FaHandHoldingUsd, FaAngleRight, FaAngleLeft, FaCar, FaPlane, FaTaxi, FaBus } from 'react-icons/fa';
import Map from '../collectRideGo/DynamicMap';
import { calculateCost } from '@/app/utils/api/cost';
import { calculateCostRequest,formatDuration } from '@/app/utils/api/cost';

interface TripDetails {
  fare: number;
  distance: number;
  officialPrice: number;
  duration: string;
  start: string;
  end: string
}



const HeroFareCalculator = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [proposedPrice, setProposedPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const calculateFare = async () => {
    if (!startLocation || !endLocation) {
      alert("Veuillez entrer les deux emplacements.");
      return;
    }
  
    setIsLoading(true);
    setIsCalculated(false);
  
    // Obtenir l'heure actuelle au format HH:MM
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  
    const requestData: calculateCostRequest = {
      start: startLocation,
      end: endLocation,
      // hour: formattedTime,
    };
  
    try {
      const response = await calculateCost(requestData);
      setTripDetails({
        fare: response.cost,
        officialPrice: response.min_cost,
        distance: response.distance.toFixed(3),
        duration: formatDuration(response.distance*1000/60),
        start: startLocation,
        end: endLocation,
        
      });
      setIsCalculated(true);
    } catch (error) {
      console.error("Erreur lors du calcul du coût :", error);
      alert("Une erreur est survenue lors du calcul du tarif.");
    }
  
    setIsLoading(false);
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
      makeProposal: "propose your price",
      proposalPlaceholder: "Your offer",
      submitProposal: "Order",
      km: "km",
      mins: "mins",
      trustSection: "Why Choose Ride & Go?",
      trustPoint1: "Set Your Own Price",
      trustPoint2: "Safe & Reliable",
      trustPoint3: "24/7 Support",
      order: "Order",
      needRide: "Need a ride?",
      needTravelAgency: "Need a travel agency?",
      needCarRental: "Need a car rental?"
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
      submitProposal: "Commander",
      km: "km",
      mins: "min",
      trustSection: "Pourquoi Choisir Ride & Go ?",
      trustPoint1: "Fixez Votre Prix",
      trustPoint2: "Sûr & Fiable",
      trustPoint3: "Support 24/7",
      order: "Commander",
      needRide: "Besoin d'une course?",
      needTravelAgency: "Besoin d'une agence de voyage?",
      needCarRental: "Besoin d'une location?"
    }
  };

  const currentContent = locale == 'fr' ? content.fr : content.en;

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${currentSlide === index ? 'block' : 'hidden'
              }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/90 to-[#0A1128]/70" />
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 w-full z-10 flex justify-between px-4">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length)}
          className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-all"
        >
          <FaAngleLeft className="text-white text-xl" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % backgroundImages.length)}
          className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-all"
        >
          <FaAngleRight className="text-white text-xl" />
        </button>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight animate-fade-in">
            {currentContent.heroTitle}
          </h1>
          <p className="text-base md:text-lg text-blue-200 animate-fade-in-delay">
            {currentContent.heroSubtitle}
          </p>
        </div>

        <div className={`flex flex-col lg:flex-row gap-4 transition-all duration-500 ${isCalculated ? 'h-auto' : 'h-full items-center'}`}>
          <div className={`lg:w-1/2 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-xl transition-all duration-500 ${isCalculated ? 'mb-4' : 'mb-0'}`}>
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

                <button
                  onClick={calculateFare}
                  disabled={isLoading}
                  className="w-full py-2 bg-gradient-to-r from-orange-200 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium shadow-lg flex items-center justify-center gap-2 transition transform hover:scale-[1.02] hover:shadow-xl text-sm"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <FaCalculator className="text-base" />
                      <span>{currentContent.calculateButton}</span>
                    </>
                  )}

                </button>
              </div>

              {tripDetails && (
                <div className="space-y-3 animate-fade-in flex-grow">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/10 p-2 rounded-lg backdrop-blur hover:bg-white/20 transition-colors flex-grow">
                      <div className="flex items-center gap-1 text-blue-200 mb-1 text-sm">
                        <FaRoute className="text-base" />
                        {currentContent.distance}
                      </div>
                      <p className="text-lg font-bold text-white">
                        {tripDetails.distance} {currentContent.km}
                      </p>
                    </div>

                    <div className="bg-white/10 p-2 rounded-lg backdrop-blur hover:bg-white/20 transition-colors flex-grow">
                      <div className="flex items-center gap-1 text-blue-200 mb-1 text-sm">
                        <FaClock className="text-base" />
                        {currentContent.duration}
                      </div>
                      <p className="text-lg font-bold text-white">
                        {tripDetails.duration} 
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/10 p-2 rounded-lg backdrop-blur hover:bg-white/20 transition-colors flex-grow">
                      <div className="flex items-center gap-1 text-blue-200 mb-1 text-sm">
                        <FaMoneyBillWave className="text-base" />
                        {currentContent.estimatedFare}
                      </div>
                      <p className="text-lg font-bold text-white mb-2">
                        {tripDetails.fare.toLocaleString()} FCFA
                      </p>
                      <button className="w-full py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm transition-all">
                        {currentContent.order}
                      </button>
                    </div>

                    <div className="bg-white/10 p-2 rounded-lg backdrop-blur hover:bg-white/20 transition-colors flex-grow">
                      <div className="flex items-center gap-1 text-blue-200 mb-1 text-sm">
                        <FaBuilding className="text-base" />
                        {currentContent.officialPrice}
                      </div>
                      <p className="text-lg font-bold text-white mb-2">
                      {tripDetails?.officialPrice !== undefined ? (
                            <p>Tarif officiel: {tripDetails.officialPrice} FCFA</p>
                          ) : (
                            <p>Tarif officiel: 350 FCFA</p>
                          )}
                      </p>
                      <button className="w-full py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm transition-all">
                        {currentContent.order}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500/30 to-orange-600/30 p-3 rounded-lg backdrop-blur flex-grow">
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
                      <button className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium transition-all hover:shadow-lg transform hover:scale-105 text-sm">
                        {currentContent.submitProposal}
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <a
                href="#ride"
                className="flex flex-col items-center p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all group"
              >
                <FaTaxi className="text-orange-400 group-hover:text-orange-300 text-lg mb-1" />
                <span className="text-xs text-white text-center">
                  {currentContent.needRide}
                </span>
              </a>
              <a
                href="#travel"
                className="flex flex-col items-center p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all group"
              >
                <FaBus className="text-orange-400 group-hover:text-orange-300 text-lg mb-1" />
                <span className="text-xs text-white text-center">
                  {currentContent.needTravelAgency}
                </span>
              </a>
              <a
                href="#rental"
                className="flex flex-col items-center p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all group"
              >
                <FaCar className="text-orange-400 group-hover:text-orange-300 text-lg mb-1" />
                <span className="text-xs text-white text-center">
                  {currentContent.needCarRental}
                </span>
              </a>
            </div>
          </div>


          <div className="lg:w-1/2">
            <div className="h-[450px] relative rounded-xl overflow-hidden shadow-xl">
              {Map && <Map center={[0.0, 0.0]} zoom={0} />}
              {tripDetails && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md p-2 m-3 rounded-lg">
                  <div className="flex flex-col gap-1.5 text-white text-sm">
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

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="bg-white/10 backdrop-blur p-2 rounded-lg text-center hover:bg-white/20 transition-colors">
                <h3 className="text-sm font-semibold text-white">{currentContent.trustPoint1}</h3>
              </div>
              <div className="bg-white/10 backdrop-blur p-2 rounded-lg text-center hover:bg-white/20 transition-colors">
                <h3 className="text-sm font-semibold text-white">{currentContent.trustPoint2}</h3>
              </div>
              <div className="bg-white/10 backdrop-blur p-2 rounded-lg text-center hover:bg-white/20 transition-colors">
                <h3 className="text-sm font-semibold text-white">{currentContent.trustPoint3}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFareCalculator;