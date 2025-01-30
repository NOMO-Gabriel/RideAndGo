'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique de la carte avec désactivation du SSR
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-gray-100">
      Chargement de la carte...
    </div>
  ),
});

interface ClientSideMapProps {
  children?: React.ReactNode;
  center: [number, number];
  zoom: number;
  className?: string;
}

export default function ClientSideMap({ children, center, zoom, className }: ClientSideMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`${className || ''} flex items-center justify-center bg-gray-100`}>
        Chargement de la carte...
      </div>
    );
  }

  return (
    <MapComponent center={center} zoom={zoom} className={className}>
      {children}
    </MapComponent>
  );
}
