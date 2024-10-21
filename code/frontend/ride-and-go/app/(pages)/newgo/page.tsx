'use client';

import Header from "@/app/components/collectRideGo/Header";
import CommandForm from "@/app/components/collectRideGo/CommandForm";
import Map from "@/app/components/collectRideGo/Map";
import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js"; 
import HeroSection from "@/app/components/Home/HeroSection";
import Link from "next/link";

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

  const images = [
    '/images/go.jpeg'
  ]
  const messages = {
    en: 'Manage your travelling journey more easily',
    fr: 'Gérez vos déplacements plus facilement'
  }

  return (
    <div className="bg-gray-50">
         <HeroSection images={images} messages={messages} />
        <div className="flex flex-col items-center  space-y-2">
        <Header />
        
        <div className="flex space-x-4 -translate-y-[120px] translate-x-[450px]">
            <Link
                href="#"
                className="px-4 py-2 bg-bleu-nuit text-white rounded hover:bg-orange-500"
                onClick={handleToggleMap}
            >
                {showMap ? currentContent.hideMap : currentContent.showMap}
            </Link>

            <button
            className="px-4 py-2 bg-bleu-nuit hover:bg-orange-500 text-white rounded"
            onClick={handleToggleInfoBoard}
            >
            {showInfoBoard ? currentContent.hideInfos : currentContent.showInfos}
            </button>
        </div>

        <div className="flex flex-row w-full space-x-16 ">
            {showMap && (
                <div
                    className={`transition-all duration-300 ${
                        showInfoBoard ? 'flex-1 w-[70%]' : 'w-full mb-40 '
                    }`}
                    style={{ zIndex: 0 }} // Ajout du z-index pour la map
                >
                    <Map />
               </div>
            )}

            {showInfoBoard && (
            <div className={`transition-all duration-300  flex justify-center  ${showMap ? 'flex-1 w-3/12 ml-[400px]' : 'w-full items-center'}`}>
                <CommandForm />
            </div>
            )}
        </div>
        </div>
    </div>
   
  );
}
