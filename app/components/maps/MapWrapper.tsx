'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-gray-100">
      Chargement de la carte...
    </div>
  ),
});

export default Map;
