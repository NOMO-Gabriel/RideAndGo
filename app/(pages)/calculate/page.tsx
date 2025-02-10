'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import {calculateCost ,calculateCostRequest,formatDuration} from '@/app/utils/api/cost';
import {
  FaCalculator,
  FaMoneyBillWave,
  FaClock,
  FaRoute,
  FaMapMarkerAlt,
  FaLocationArrow,
  FaCar,
  FaPlane,
  FaTaxi,
  FaStar,
  FaHandHoldingUsd
} from 'react-icons/fa';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/app/components/collectRideGo/Map'), {
  ssr: false // This will disable server-side rendering for this component
});


interface CostDetails {
  distance: number;
  duration: string;
  estimatedCost: number;
  officialCost: number;
  startLocation: string;
  endLocation: string;
  // mapDetails: string;
}


const CostCalculator = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [costDetails, setCostDetails] = useState<CostDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPriceAnimation, setShowPriceAnimation] = useState(false);
  const [proposedPrice, setProposedPrice] = useState('');
  const [isFormCentered, setIsFormCentered] = useState(true);
    const [isCalculated, setIsCalculated] = useState(false);
  const { locale } = useLocale();

  const testimonials = [
    { text: "Le calculateur le plus précis que j'ai utilisé !", rating: 5 },
    { text: "Super outil pour planifier mes déplacements", rating: 5 },
    { text: "Estimation très proche du prix final", rating: 4 }
  ];

  const services = [
    {
      title: "Besoin d'une course ?",
      icon: FaTaxi,
      description: "Réservez votre taxi en quelques clics",
      link: "#"
    },
    {
      title: "Besoin d'une agence de voyage ?",
      icon: FaPlane,
      description: "Planifiez votre prochain voyage",
      link: "#"
    },
    {
      title: "Location de véhicule",
      icon: FaCar,
      description: "Large gamme de véhicules disponibles",
      link: "#"
    }
  ];

    const handleCalculateCost = async () => {
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
        hour: formattedTime,
      };
    
      try {
        const response = await calculateCost(requestData);
        setCostDetails({
          estimatedCost: response.cost,
          officialCost: response.min_cost,
          distance: response.distance.toFixed(3),
          duration: formatDuration(response.distance*1000/60),
          startLocation: startLocation,
          endLocation: endLocation,

        });
        setIsCalculated(true);
      } catch (error) {
        console.error("Erreur lors du calcul du coût :", error);
        alert("Une erreur est survenue lors du calcul du tarif.");
      }
    
      setIsLoading(false);
    };
    
  useEffect(() => {
    if (showPriceAnimation) {
      const timer = setTimeout(() => setShowPriceAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showPriceAnimation]);

  const content = {
    en: {
      heroTitle: "Calculate Your Trip Cost",
      heroSubtitle: "Get an instant estimate for your journey with our smart calculator",
      startLocationPlaceholder: "Starting point",
      endLocationPlaceholder: "Destination",
      calculateButton: "Calculate Cost",
      distance: "Distance",
      duration: "Duration",
      estimatedCost: "Our Estimate",
      officialCost: "Official Rate",
      orderButton: "Order",
      tripDetails: "Trip Details",
      departure: "Departure",
      arrival: "Arrival",
      routeDetails: "Route Details",
      servicesTitle: "Our Services",
      testimonialsTitle: "What Our Users Say",
      learnMore: "Learn More",
      makeProposal: "Propose your price",
      proposalPlaceholder: "Your offer",
      submitProposal: "Order"
    },
    fr: {
      heroTitle: "Calculez le Coût de Votre Trajet",
      heroSubtitle: "Obtenez une estimation instantanée pour votre voyage avec notre calculateur intelligent",
      startLocationPlaceholder: "Point de départ",
      endLocationPlaceholder: "Destination",
      calculateButton: "Calculer le Coût",
      distance: "Distance",
      duration: "Durée",
      estimatedCost: "Notre Estimation",
      officialCost: "Tarif Officiel",
      orderButton: "Commander",
      tripDetails: "Détails du Trajet",
      departure: "Départ",
      arrival: "Arrivée",
      routeDetails: "Détails de l'Itinéraire",
      servicesTitle: "Nos Services",
      testimonialsTitle: "Ce que Disent Nos Utilisateurs",
      learnMore: "En Savoir Plus",
      makeProposal: "Proposez votre prix",
      proposalPlaceholder: "Votre offre",
      submitProposal: "Commander"
    }
  };

  const currentContent = locale === 'fr' ? content.fr : content.en;

  return (
    <div className="min-h-screen bg-[url('/path-to-your-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-bleu-nuit backdrop-blur-md p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-orange-600">
              {currentContent.heroTitle}
            </h1>
            <p className="text-blue-200 text-xl font-light">
              {currentContent.heroSubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Colonne de gauche */}
            <div className={`space-y-8 transition-transform duration-500 ${isFormCentered ? 'translate-y-1/4' : 'translate-y-0'}`}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="relative group">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      <input
                        type="text"
                        placeholder={currentContent.startLocationPlaceholder}
                        className="w-full pl-10 pr-4 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                      />
                    </div>

                    <div className="relative group">
                      <FaLocationArrow className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      <input
                        type="text"
                        placeholder={currentContent.endLocationPlaceholder}
                        className="w-full pl-10 pr-4 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        value={endLocation}
                        onChange={(e) => setEndLocation(e.target.value)}
                      />
                    </div>

                    <button
                      onClick={handleCalculateCost}
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-orange-200 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium shadow-lg flex items-center justify-center gap-3 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <FaCalculator className="text-xl" />
                          <span>{currentContent.calculateButton}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {costDetails && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                      <FaMoneyBillWave className="text-blue-400" />
                      {currentContent.estimatedCost}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 p-4 rounded-lg transform hover:scale-105 transition">
                        <div className="flex items-center gap-2 text-blue-200 mb-2">
                          <FaRoute />
                          {currentContent.distance}
                        </div>
                        <p className="text-3xl font-bold text-white">
                          {costDetails.distance} km
                        </p>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg transform hover:scale-105 transition">
                        <div className="flex items-center gap-2 text-blue-200 mb-2">
                          <FaClock />
                          {currentContent.duration}
                        </div>
                        <p className="text-3xl font-bold text-white">
                          {costDetails.duration} 
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <div className="flex justify-between items-center text-blue-200 mb-2">
                          <span>{currentContent.estimatedCost}</span>
                          <span className="text-white font-medium">{costDetails.estimatedCost.toLocaleString()} FCFA</span>
                        </div>
                        <button className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
                          {currentContent.orderButton}
                        </button>
                      </div>

                      <div className="bg-white/5 p-4 rounded-lg">
                        <div className="flex justify-between items-center text-blue-200 mb-2">
                          <span>{currentContent.officialCost}</span>
                          <span className="text-white font-medium">{costDetails?.officialCost !== undefined ? (
                            <p>Tarif officiel: {costDetails.officialCost} FCFA</p>
                          ) : (
                            <p>Tarif officiel: 350 FCFA</p>
                          )}</span>
                        </div>
                        <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                          {currentContent.orderButton}
                        </button>
                      </div>
                    </div>

                    {/* Section "Proposez votre prix" */}
                    <div className="bg-gradient-to-r from-orange-500/30 to-orange-600/30 p-3 rounded-lg backdrop-blur flex-grow mt-4">
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
                </div>
              )}
            </div>

            {/* Colonne de droite */}
            <div className="space-y-8">
              <div className="h-[600px] bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl">
                <div className="w-full h-full bg-gray-800/50 flex items-center justify-center text-white">
                  <Map center={[0.0, 0.0]} zoom={0} />
                </div>
              </div>

              {costDetails && (
                <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg">
                    <div className="p-4">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        {currentContent.tripDetails}
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                        <div className="bg-green-400/20 p-1.5 rounded-md">
                            <FaMapMarkerAlt className="text-green-400 text-lg" />
                        </div>
                        <div>
                            <p className="text-blue-200 text-xs">{currentContent.departure}</p>
                            <p className="text-white text-base">{costDetails.startLocation}</p>
                        </div>
                        </div>
                        <div className="flex items-start gap-3">
                        <div className="bg-orange-400/20 p-1.5 rounded-md">
                            <FaLocationArrow className="text-orange-400 text-lg" />
                        </div>
                        <div>
                            <p className="text-blue-200 text-xs">{currentContent.arrival}</p>
                            <p className="text-white text-base">{costDetails.endLocation}</p>
                        </div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-md">
                        {/* <p className="text-blue-200 text-xs">{currentContent.routeDetails}</p> */}
                        {/* <p className="text-white mt-1 text-sm">{costDetails.mapDetails}</p> */}
                        </div>
                    </div>
                    </div>
                </div>
            )}

            </div>
          </div>

          {/* Services annexes */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {currentContent.servicesTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 transform hover:scale-105 transition">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-400/20 p-4 rounded-full mb-4">
                      <service.icon className="text-blue-400 text-3xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-blue-200 mb-4">{service.description}</p>
                    <a href={service.link} className="text-blue-400 hover:text-blue-300 font-medium">
                      {currentContent.learnMore} →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {currentContent.testimonialsTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-blue-200 italic">&quot;{testimonial.text}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
