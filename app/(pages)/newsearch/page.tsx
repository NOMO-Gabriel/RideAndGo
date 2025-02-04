'use client';

import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import Header from "@/app/components/Header";
import InfosBoard from "@/app/components/collectRideGo/InfosBoard";
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/app/components/collectRideGo/DynamicMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-gray-100">
      Chargement de la carte...
    </div>
  ),
});

import { useSearchFilter } from "@/app/utils/hooks/useSearchFilter";
import Link from "next/link";
import HeroSection from "@/app/components/Home/HeroSection";

export default function Page() {
  const { locale } = useLocale();

  const content = {
    fr: {
      hideMap: "Masquer la carte",
      showMap: "Afficher la carte",
      hideInfos: "Masquer les infos",
      showInfos: "Afficher les infos",
      search: "Rechercher",
    },
    en: {
      hideMap: "Hide Map",
      showMap: "Show Map",
      hideInfos: "Hide Infos",
      showInfos: "Show Infos",
      search: "Search",
    },
  };

  const images = [
    '/images/find.png', 
    '/images/find1.png',
  ];

  const messages = {
    en: 'Discover your destination in a click, find your route in a snap',
    fr: 'Explorez votre destination en un clic, trouvez votre chemin en un instant.'
  };

  const currentContent = locale === 'en' ? content.en : content.fr;

  const [showMap, setShowMap] = useState(true); // La carte est visible par défaut et ne peut pas être masquée au départ
  const [showInfoBoard, setShowInfoBoard] = useState(false); // Infoboard masqué par défaut

  // État pour les données de recherche fictives
  const [searchData, setSearchData] = useState({
    startPoint: {
      latitude: 3.8480,
      longitude: 11.5021,
      name: "Point de Départ",
    },
    endPoint: {
      latitude: 3.8500,
      longitude: 11.5050,
      name: "Point d'Arrivée",
    },
    place: null,
    isItinerary: true, // Simule un itinéraire actif
  });

  const handleToggleMap = () => {
    // La carte ne peut pas être masquée
    if (showMap) {
      return;
    } else {
      setShowMap(true);
    }
  };

  const handleToggleInfoBoard = () => {
    if (showInfoBoard) {
      setShowInfoBoard(false);
      // Si l'infoboard est masqué, la carte doit être visible
      setShowMap(true);
    } else {
      setShowInfoBoard(true);
      // Si on affiche l'infoboard, on vérifie la carte
      if (!showMap) {
        setShowMap(true);
      }
    }
  };

  const handleSearchClick = () => {
    setShowInfoBoard(true); // Afficher l'infoboard lors du clic sur "Search"
  };

  return (
    <div className="bg-gray-50">
      <HeroSection images={images} messages={messages} />
      <div className="flex flex-col items-center space-y-2">
        <Header />
        <div className="flex space-x-4 -translate-y-[120px] translate-x-[750px] ">
          <Link href="#" onClick={handleSearchClick} className="px-4 py-2 text-bleu-nuit text-lg hover:underline hover:text-orange-btn">
            {currentContent.search}
          </Link>

          {showInfoBoard && (
            <Link 
              href="#" 
              onClick={handleToggleInfoBoard} 
              className="px-4 py-2 text-bleu-nuit text-lg hover:underline hover:text-orange-btn"
            >
              {showInfoBoard ? currentContent.hideInfos : currentContent.showInfos}
            </Link>
          )}
        </div>

        <div className="flex flex-row w-full space-x-4 items-start">
          {showMap && (
            <div
              className={`transition-all duration-300 ${
                showInfoBoard ? 'flex-1 w-[70%]' : 'w-full mb-40 '
              }`}
              style={{ zIndex: 0 }} // Ajout du z-index pour la map
            >
              <DynamicMap center={[0.3, 0.3]} zoom={0} />   {/* Passer les données de recherche au composant Map */}
            </div>
          )}

          {showInfoBoard && (
            <div
              className={`transition-all duration-300 flex justify-center mt-16 ${
                showMap ? 'w-[30%]' : 'w-full items-center mb-20'
              }`}
              style={{ zIndex: 1 }} // Z-index pour le board d'infos
            >
              <InfosBoard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
