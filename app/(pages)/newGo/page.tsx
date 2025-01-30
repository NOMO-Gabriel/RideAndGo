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
        <div className="flex flex-col items-center  space-y-2">
        <Header />
            <div className="flex space-x-4 -translate-y-[120px] translate-x-[750px] ">
               
                <Link href="#"
                className="px-4 py-2 text-bleu-nuit text-lg hover:underline hover:text-orange-btn"
                onClick={handleToggleMap}
                >
                {showMap ? currentContent.hideMap : currentContent.showMap}
                </Link>

                <Link href="#"
                className="px-4 py-2 text-bleu-nuit text-lg hover:underline hover:text-orange-btn"
                onClick={handleToggleInfoBoard}
                >
                {showInfoBoard ? currentContent.hideInfos : currentContent.showInfos}
                </Link>
            </div>

            <div className="flex flex-row w-full space-x-16 ">
                {showMap && (
                <div className={`flex-1 transition-all duration-300 border-4 border-gray-500 rounded-lg m-4 ${showInfoBoard ? 'w-9/12 ml-[100px]' : 'w-full'}`}
                    style={{ zIndex: 0 }} 
                >
                    <DynamicMap center={[3.8667, 11.5167]} zoom={13} />
                </div>
                )}

                {showInfoBoard && (
                <div className={`transition-all duration-300  flex justify-center mt-16  
                    ${showMap ? 'flex-1 w-3/12 ml-[400px]' : 'w-full items-center  mb-20'}`}
                    style={{ zIndex: 1 }} 
                >
                   <CommandForm/>
                </div>
                )}
            </div>
            </div>
    </div>
   
  );
}
