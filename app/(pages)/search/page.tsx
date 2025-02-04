'use client';

import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
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

export default function Page() {
  const { locale } = useLocale();
  const [showInfoBoard, setShowInfoBoard] = useState(false);
  const [showMap, setShowMap] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">
            {locale === 'fr' ? 'Rechercher un trajet' : 'Search for a ride'}
          </h1>
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setShowMap(!showMap)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {showMap ? (
                  locale === 'fr' ? 'Masquer la carte' : 'Hide map'
                ) : (
                  locale === 'fr' ? 'Afficher la carte' : 'Show map'
                )}
              </button>
              <button
                onClick={() => setShowInfoBoard(!showInfoBoard)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {showInfoBoard ? (
                  locale === 'fr' ? 'Masquer les infos' : 'Hide info'
                ) : (
                  locale === 'fr' ? 'Afficher les infos' : 'Show info'
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full space-x-16 ">
          {showMap && (
            <div className={`flex-1 transition-all duration-300  ${showInfoBoard ? 'w-9/12 ml-[100px]' : 'w-full'}`}>
              <DynamicMap center={[3.8667, 11.5167]} zoom={13} />
            </div>
          )}
          {showInfoBoard && <InfosBoard />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
