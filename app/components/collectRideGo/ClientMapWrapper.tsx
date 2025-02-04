'use client';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <p>Chargement de la carte...</p>
    </div>
  ),
});

export default function ClientMapWrapper(props: PropsWithChildren<{}>) {
  return <DynamicMap center={[0,0]} zoom={0} {...props} />;
}
