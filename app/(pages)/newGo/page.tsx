'use client';

import Header from "@/app/components/collectRideGo/Header";
import CommandForm from "@/app/components/collectRideGo/CommandForm";
import dynamic from 'next/dynamic';
import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js"; 
import HeroSection from "@/app/components/Home/HeroSection";
import Link from "next/link";

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
  const images = [
    '/images/order-taxi.png', 
    '/images/order2.png',
  ];

  const messages = {
    en: 'Discover your destination in a click, find your route in a snap',
    fr: 'Explorez votre destination en un clic, trouvez votre chemin en un instant.'
  };

  const currentContent = locale === 'en' ? content.en : content.fr;

  

  const [showMap, setShowMap] = useState(true);
  const [showInfoBoard, setShowInfoBoard] = useState(true);

  const handleToggleMap = () => setShowMap(!showMap);
  const handleToggleInfoBoard = () => setShowInfoBoard(!showInfoBoard);

  return (
    <div className="bg-gray-50">
      <HeroSection images={images} messages={messages} />
      <div className="flex flex-col items-center space-y-2">
        <Header />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center sm:justify-end px-4 sm:px-6 -mt-16 sm:-mt-20 mb-4">
          <Link
            href="#"
            className="px-3 sm:px-2 py-2 text-bleu-nuit text-sm sm:text-base hover:underline hover:text-orange-btn text-center"
            onClick={handleToggleMap}
          >
            {showMap ? currentContent.hideMap : currentContent.showMap}
          </Link>
          <Link
            href="#"
            className="px-3 sm:px-4 py-2 text-bleu-nuit text-sm sm:text-base hover:underline hover:text-orange-btn text-center"
            onClick={handleToggleInfoBoard}
          >
            {showInfoBoard ? currentContent.hideInfos : currentContent.showInfos}
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-4 px-4 sm:px-6">
          {showMap && (
            <div
              className={`transition-all duration-300 border-4 border-gray-500 rounded-lg ${
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
              style={{ zIndex: 1 }}
            >
              <CommandForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
