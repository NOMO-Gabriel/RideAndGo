'use client';

import Header from "@/app/components/collectRideGo/Header";
import OffersBoard from "@/app/components/collectRideGo/OffersBoard";
import Map from "@/app/components/collectRideGo/DynamicMap";
import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js"; 

export default function Page() {
  const { locale } = useLocale();

  const content = {
    fr: {
      hideMap: "Masquer la carte",
      showMap: "Afficher la carte",
      hideInfos: "Masquer les infos",
      showInfos: "Afficher les infos",
    },
    en: {
      hideMap: "Hide Map",
      showMap: "Show Map",
      hideInfos: "Hide Infos",
      showInfos: "Show Infos",
    },
  };

  const currentContent = locale === 'en' ? content.en : content.fr;

  const [showMap, setShowMap] = useState(true);
  const [showInfoBoard, setShowInfoBoard] = useState(true);
  
  // Simulate season (e.g., boolean flag that can be determined dynamically)
  const isWinter = true; // Replace with actual logic if needed

  const handleToggleMap = () => setShowMap(!showMap);
  const handleToggleInfoBoard = () => setShowInfoBoard(!showInfoBoard);

  const linkStyle = `text-2xl text-bleu-nuit underline hover:text-orange-500`;

  return (
    <div className="flex mt-20 flex-col items-center space-y-2">
      {/* Liens pour afficher/masquer la carte et les infos */}
      <div className={`flex ${showMap && showInfoBoard ? 'space-x-10' : 'space-x-0'} justify-center mb-4`}>
        {/* Si la carte est visible, on affiche le lien pour la masquer */}
        {showMap && showInfoBoard && (
          <a className={linkStyle} onClick={handleToggleMap}>
            {currentContent.hideMap}
          </a>
        )}

        {/* Si la carte est masquée, afficher le lien pour la montrer */}
        {!showMap && (
          <a className={linkStyle} onClick={handleToggleMap}>
            {currentContent.showMap}
          </a>
        )}

        {/* Si les infos sont visibles, on affiche le lien pour les masquer */}
        {showMap && showInfoBoard && (
          <a className={linkStyle} onClick={handleToggleInfoBoard}>
            {currentContent.hideInfos}
          </a>
        )}

        {/* Si les infos sont masquées, afficher le lien pour les montrer */}
        {!showInfoBoard && (
          <a className={linkStyle} onClick={handleToggleInfoBoard}>
            {currentContent.showInfos}
          </a>
        )}
      </div>

      <div className="flex flex-row w-full space-x-16">
        {/* Carte avec zIndex à 0 et ajustement de largeur */}
        {showMap && (
          <div
            className={`flex-1 transition-all duration-300 rounded-lg m-4 ${showInfoBoard ? 'w-9/12 ml-[100px]' : 'w-full'}`}
            style={{ zIndex: 0 }}
          >
            <Map />
          </div>
        )}

        {/* Board des offres avec ajustement dynamique */}
        {showInfoBoard && (
          <div
            className={`transition-all duration-300 mt-20 flex justify-center ${showMap ? 'flex-1 w-3/12 ml-[400px]' : 'w-full items-center'}`}
          >
            <OffersBoard />
          </div>
        )}
      </div>
    </div>
  );
}

