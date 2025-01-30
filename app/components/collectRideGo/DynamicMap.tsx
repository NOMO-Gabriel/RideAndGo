import dynamic from 'next/dynamic';

// Chargement dynamique du composant Map avec SSR désactivé
const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="relative flex justify-center items-center my-8 mx-auto w-full max-w-6xl h-[600px] rounded-2xl shadow-2xl overflow-hidden border border-gray-300 bg-gray-100">
      <div>Chargement de la carte...</div>
    </div>
  )
});

export default DynamicMap;