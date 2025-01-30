'use client';

import dynamic from 'next/dynamic';
import React from 'react';

interface MapProps {
  center: [number, number];
  zoom: number;
  className?: string;
  children?: React.ReactNode;
}

// Chargement dynamique du composant Map sans SSR
const Map = dynamic<MapProps>(() => import('./Map'), {
  ssr: false, // Désactive le rendu côté serveur
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-gray-100">
      Chargement de la carte...
    </div>
  ),
});

interface DynamicMapProps {
  center: [number, number];
  zoom: number;
  className?: string;
  children?: React.ReactNode;
}

const DynamicMap: React.FC<DynamicMapProps> = ({ center, zoom, className, children }) => {
  return <Map center={center} zoom={zoom} className={className}>{children}</Map>;
};

export default DynamicMap;