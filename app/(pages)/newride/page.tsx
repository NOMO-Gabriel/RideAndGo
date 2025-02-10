'use client';

import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import Header from "@/app/components/collectRideGo/Header";
import OffersBoard from "@/app/components/collectRideGo/OffersBoard";
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/app/components/collectRideGo/DynamicMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-gray-100">
      Chargement de la carte...
    </div>
  ),
});

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
    <div className="flex mt-16 sm:mt-20 flex-col items-center space-y-4">
      <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-4 px-4`}>
        {showMap && showInfoBoard && (
          <a className={`${linkStyle} text-center`} onClick={handleToggleMap}>
            {currentContent.hideMap}
          </a>
        )}
        {!showMap && (
          <a className={`${linkStyle} text-center`} onClick={handleToggleMap}>
            {currentContent.showMap}
          </a>
        )}
        {showMap && showInfoBoard && (
          <a className={`${linkStyle} text-center`} onClick={handleToggleInfoBoard}>
            {currentContent.hideInfos}
          </a>
        )}
        {!showInfoBoard && (
          <a className={`${linkStyle} text-center`} onClick={handleToggleInfoBoard}>
            {currentContent.showInfos}
          </a>
        )}
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4 px-4 sm:px-6">
        {showMap && (
          <div
            className={`transition-all duration-300 rounded-lg ${
              showInfoBoard ? 'w-full lg:w-2/3' : 'w-full'
            }`}
            style={{ zIndex: 0 }}
          >
            <DynamicMap center={[3.8667, 11.5167]} zoom={13} />
          </div>
        )}
        {showInfoBoard && (
          <div
            className={`transition-all duration-300 flex justify-center ${
              showMap ? 'w-full lg:w-1/3' : 'w-full'
            }`}
          >
            <OffersBoard />
          </div>
        )}
      </div>
    </div>
  );
};
