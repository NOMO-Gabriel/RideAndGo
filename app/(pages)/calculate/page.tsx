'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { calculateCost, calculateCostRequest, formatDuration } from '@/app/utils/api/cost';
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

// Import dynamique de la carte pour éviter les erreurs de rendu côté serveur
const Map = dynamic(() => import('@/app/components/collectRideGo/Map'), {
  ssr: false
});

// Interface pour les détails de coût
interface CostDetails {
  distance: number;
  duration: string;
  estimatedCost: number;
  officialCost: number;
  startLocation: string;
  endLocation: string;
}

// Interface pour les témoignages
interface Testimonial {
  text: string;
  rating: number;
}

// Interface pour les services
interface Service {
  title: string;
  description: string;
  link: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// Interface pour le contenu localisé
interface LocalizedContent {
  heroTitle: string;
  heroSubtitle: string;
  startLocationPlaceholder: string;
  endLocationPlaceholder: string;
  calculateButton: string;
  distance: string;
  duration: string;
  estimatedCost: string;
  officialCost: string;
  orderButton: string;
  tripDetails: string;
  departure: string;
  arrival: string;
  routeDetails: string;
  servicesTitle: string;
  testimonialsTitle: string;
  learnMore: string;
  makeProposal: string;
  proposalPlaceholder: string;
  submitProposal: string;
  selectedPrice: string;
  services: {
    title: string;
    description: string;
    link: string;
  }[];
  testimonials: Testimonial[];
}

// Interface pour le contenu disponible dans chaque langue
interface ContentByLocale {
  en: LocalizedContent;
  fr: LocalizedContent;
}

// Composants réutilisables
const InputField: React.FC<{
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ icon: Icon, placeholder, value, onChange }) => (
  <div className="relative group">
    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 group-hover:text-blue-800 transition-colors" />
    <input
      type="text"
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-300 text-blue-900 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const ServiceCard: React.FC<{
  service: Service;
  learnMoreText: string;
}> = ({ service, learnMoreText }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5 transform hover:scale-105 transition">
    <div className="flex flex-col items-center text-center">
      <div className="bg-blue-100 p-3 rounded-full mb-3">
        <service.icon className="text-blue-600 text-2xl" />
      </div>
      <h3 className="text-lg font-semibold text-blue-900 mb-2">{service.title}</h3>
      <p className="text-blue-700 mb-3 text-sm">{service.description}</p>
      <a href={service.link} className="text-blue-500 hover:text-blue-700 font-medium text-sm">
        {learnMoreText} →
      </a>
    </div>
  </div>
);

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
}> = ({ testimonial }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-md p-4">
    <div className="flex gap-1 mb-3">
      {[...Array(testimonial.rating)].map((_, i) => (
        <FaStar key={i} className="text-yellow-500" />
      ))}
    </div>
    <p className="text-blue-700 italic text-sm">&quot;{testimonial.text}&quot;</p>
  </div>
);

const CostCalculator: React.FC = () => {
  // États
  const [startLocation, setStartLocation] = useState<string>('');
  const [endLocation, setEndLocation] = useState<string>('');
  const [costDetails, setCostDetails] = useState<CostDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [proposedPrice, setProposedPrice] = useState<string>('');
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<'estimated' | 'official'>('estimated'); // 'estimated' ou 'official'
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const { locale } = useLocale();

  // Textes localisés
  const content: ContentByLocale = {
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
      submitProposal: "Order",
      selectedPrice: "Selected Price",
      services: [
        {
          title: "Need a ride?",
          description: "Book your taxi in just a few clicks",
          link: "#"
        },
        {
          title: "Need a travel agency?",
          description: "Plan your next trip",
          link: "#"
        },
        {
          title: "Vehicle rental",
          description: "Wide range of vehicles available",
          link: "#"
        }
      ],
      testimonials: [
        { text: "The most accurate calculator I've used!", rating: 5 },
        { text: "Great tool for planning my trips", rating: 5 },
        { text: "Estimation very close to the final price", rating: 4 }
      ]
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
      submitProposal: "Commander",
      selectedPrice: "Prix Sélectionné",
      services: [
        {
          title: "Besoin d'une course ?",
          description: "Réservez votre taxi en quelques clics",
          link: "#"
        },
        {
          title: "Besoin d'une agence de voyage ?",
          description: "Planifiez votre prochain voyage",
          link: "#"
        },
        {
          title: "Location de véhicule",
          description: "Large gamme de véhicules disponibles",
          link: "#"
        }
      ],
      testimonials: [
        { text: "Le calculateur le plus précis que j'ai utilisé !", rating: 5 },
        { text: "Super outil pour planifier mes déplacements", rating: 5 },
        { text: "Estimation très proche du prix final", rating: 4 }
      ]
    }
  };

  const currentContent: LocalizedContent = locale === 'fr' ? content.fr : content.en;

  // Association des icônes aux services
  const serviceIcons: React.ComponentType<React.SVGProps<SVGSVGElement>>[] = [FaTaxi, FaPlane, FaCar];
  
  // Création des services avec leurs icônes
  const servicesWithIcons: Service[] = currentContent.services.map((service, index) => ({
    ...service,
    icon: serviceIcons[index]
  }));

  // Gestion du calcul de coût
  const handleCalculateCost = async (): Promise<void> => {
    if (!startLocation || !endLocation) {
      alert(locale === 'fr' ? "Veuillez entrer les deux emplacements." : "Please enter both locations.");
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
        officialCost: response.min_cost || 350, // Valeur par défaut si undefined
        distance: Number(response.distance.toFixed(3)),
        duration: formatDuration(response.distance*1000/60),
        startLocation: startLocation,
        endLocation: endLocation,
      });
      setIsCalculated(true);
    } catch (error) {
      console.error("Erreur lors du calcul du coût :", error);
      alert(locale === 'fr' ? "Une erreur est survenue lors du calcul du tarif." : "An error occurred while calculating the fare.");
    }
  
    setIsLoading(false);
  };

  // Déterminer le prix affiché dans les détails du trajet en fonction de l'option sélectionnée
  const getSelectedPrice = (): string | null => {
    if (!costDetails) return null;
    return selectedPaymentOption === 'estimated' 
      ? `${costDetails.estimatedCost.toLocaleString()} FCFA` 
      : `${costDetails.officialCost.toLocaleString()} FCFA`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* En-tête */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue-900">
            {currentContent.heroTitle}
          </h1>
          <p className="text-blue-700 text-lg">
            {currentContent.heroSubtitle}
          </p>
        </div>

        {/* Zone principale avec formulaire et carte côte à côte */}
        <div className="grid md:grid-cols-2 gap-5 mb-8 relative">
          {/* Formulaire à gauche - hauteur réduite */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-5 z-10">
            <div className="space-y-4">
              <InputField 
                icon={FaMapMarkerAlt} 
                placeholder={currentContent.startLocationPlaceholder}
                value={startLocation}
                onChange={setStartLocation}
              />

              <InputField 
                icon={FaLocationArrow} 
                placeholder={currentContent.endLocationPlaceholder}
                value={endLocation}
                onChange={setEndLocation}
              />

              <button
                onClick={handleCalculateCost}
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg font-medium shadow-lg flex items-center justify-center gap-2 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaCalculator className="text-lg" />
                    <span>{currentContent.calculateButton}</span>
                  </>
                )}
              </button>
            </div>

            {/* Résultats du calcul - compacté */}
            {costDetails && (
              <div className="mt-5 space-y-3">
                <h2 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
                  <FaMoneyBillWave className="text-blue-600" />
                  {currentContent.estimatedCost}
                </h2>
                
                {/* Métriques */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700 text-sm mb-1">
                      <FaRoute />
                      {currentContent.distance}
                    </div>
                    <p className="text-xl font-bold text-blue-900">
                      {costDetails.distance} km
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700 text-sm mb-1">
                      <FaClock />
                      {currentContent.duration}
                    </div>
                    <p className="text-xl font-bold text-blue-900">
                      {costDetails.duration}
                    </p>
                  </div>
                </div>

                {/* Options de tarification - plus compactes */}
                <div className="space-y-2">
                  <div 
                    className={`p-3 rounded-lg border-2 cursor-pointer transition ${
                      selectedPaymentOption === 'estimated' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedPaymentOption('estimated')}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-blue-800 font-medium text-sm">{currentContent.estimatedCost}</span>
                      <span className="text-blue-900 font-bold">{costDetails.estimatedCost.toLocaleString()} FCFA</span>
                    </div>
                    <button className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm">
                      {currentContent.orderButton}
                    </button>
                  </div>

                  <div 
                    className={`p-3 rounded-lg border-2 cursor-pointer transition ${
                      selectedPaymentOption === 'official' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedPaymentOption('official')}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-blue-800 font-medium text-sm">{currentContent.officialCost}</span>
                      <span className="text-blue-900 font-bold">{costDetails.officialCost.toLocaleString()} FCFA</span>
                    </div>
                    <button className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm">
                      {currentContent.orderButton}
                    </button>
                  </div>
                </div>

                {/* Section "Proposez votre prix" - compactée */}
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-semibold text-blue-900 mb-1 flex items-center gap-1.5">
                    <FaHandHoldingUsd className="text-blue-700" />
                    {currentContent.makeProposal}
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder={currentContent.proposalPlaceholder}
                      className="flex-1 px-3 py-1.5 rounded-md bg-white border border-gray-300 text-blue-900 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      value={proposedPrice}
                      onChange={(e) => setProposedPrice(e.target.value)}
                    />
                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition text-sm">
                      {currentContent.submitProposal}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Carte et détails à droite - z-index corrigé */}
          <div className="space-y-5 z-10">
            {/* Carte agrandie avec z-index approprié */}
            <div className="h-[450px] bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <Map center={[0.0, 0.0]} zoom={10} />
            </div>

            {/* Détails du trajet */}
            {costDetails && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4">
                <h2 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <FaRoute className="text-blue-600" />
                  {currentContent.tripDetails}
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-1.5 rounded-md">
                      <FaMapMarkerAlt className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-blue-500 text-xs">{currentContent.departure}</p>
                      <p className="text-blue-900 font-medium text-sm">{costDetails.startLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 p-1.5 rounded-md">
                      <FaLocationArrow className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-blue-500 text-xs">{currentContent.arrival}</p>
                      <p className="text-blue-900 font-medium text-sm">{costDetails.endLocation}</p>
                    </div>
                  </div>
                  
                  {/* Affichage du prix sélectionné */}
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-blue-500 text-xs">{currentContent.selectedPrice}</p>
                    <p className="text-blue-900 font-bold text-lg mt-1">{getSelectedPrice()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Services annexes (rapprochés du contenu principal) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            {currentContent.servicesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {servicesWithIcons.map((service, index) => (
              <ServiceCard 
                key={index} 
                service={service} 
                learnMoreText={currentContent.learnMore} 
              />
            ))}
          </div>
        </div>

        {/* Témoignages */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            {currentContent.testimonialsTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {currentContent.testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;