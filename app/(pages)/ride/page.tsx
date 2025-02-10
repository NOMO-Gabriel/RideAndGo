'use client';
import BecomeDriverContainer from "@/app/components/Dashboard/BecomeDriverContainer";
import DashBoardBody from "@/app/components/Dashboard/DashBoardBody";
import Sidebar from "@/app/components/Dashboard/Sidebar";
import { DashboardProvider } from "@/app/utils/contexts/DashboardContext";

<<<<<<< HEAD
export default function Page() {
  return (
    <DashboardProvider>
      <div className="flex flex-row px-4 sm:px-2 md:px-20 bg-gray-100 mt-2 min-h-screen">
        {/* Sidebar */}
        <div className="flex flex-col w-22 sm:w-10 md:w-40 lg:w-60 bg-white">
          <Sidebar />
        </div>
  
        {/* Right-side content */}
        <div className="flex flex-col flex-grow bg-white">
          <div>
            <BecomeDriverContainer />
          </div>
          <div>
            <DashBoardBody />
          </div>
        </div>
=======
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
    <div className="flex mt-20 flex-col mt:flex-row items-center space-y-2 m:flex-row sm:space-y-0 sm:space-x-4">
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

      <div className="flex flex-col sm:flex-row w-full space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Carte avec zIndex à 0 et ajustement de largeur */}
        {showMap && (
          <div
            className={`flex-1 transition-all duration-300 rounded-lg m-4 ${showInfoBoard ? 'w-9/12 ml-[100px]' : 'w-full'}`}
            style={{ zIndex: 0 }}
          >
            <DynamicMap center={[3.8667, 11.5167]} zoom={13} />
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
>>>>>>> origin/folongtz
      </div>
    </DashboardProvider>
  );
<<<<<<< HEAD
  
}  
=======
}
>>>>>>> origin/folongtz
