'use client';

import Header from "@/app/components/collectRideGo/Header";
import InfosBoard from "@/app/components/collectRideGo/InfosBoard";
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

  const handleToggleMap = () => setShowMap(!showMap);
  const handleToggleInfoBoard = () => setShowInfoBoard(!showInfoBoard);

  return (
    <div className="flex flex-col items-center  space-y-2">
      <Header />
      <div className="flex space-x-4 -translate-y-[120px] translate-x-[450px]">
        <button
          className="px-4 py-2 bg-bleu-nuit text-white rounded hover:bg-orange-500"
          onClick={handleToggleMap}
        >
          {showMap ? currentContent.hideMap : currentContent.showMap}
        </button>

        <button
          className="px-4 py-2 bg-bleu-nuit hover:bg-orange-500 text-white rounded"
          onClick={handleToggleInfoBoard}
        >
          {showInfoBoard ? currentContent.hideInfos : currentContent.showInfos}
        </button>
      </div>

      <div className="flex flex-row w-full space-x-16 ">
        {showMap && (
          <div className={`flex-1 transition-all duration-300  ${showInfoBoard ? 'w-9/12 ml-[100px]' : 'w-full'}`}>
            <Map />
          </div>
        )}

        {showInfoBoard && (
          <div className={`transition-all duration-300  flex justify-center  ${showMap ? 'flex-1 w-3/12 ml-[400px]' : 'w-full items-center'}`}>
            <InfosBoard />
          </div>
        )}
      </div>
    </div>
  );
}
