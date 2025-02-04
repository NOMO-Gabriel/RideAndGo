import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from './types';

// Chargement dynamique du composant MapContainer pour éviter l'erreur window not defined
const DynamicMapContainer = dynamic(() => import('./MapComponent'), {
  ssr: false, // Désactive le SSR pour ce composant
  loading: () => (
    <div className="relative flex justify-center items-center my-8 mx-auto w-full max-w-6xl h-[600px] rounded-2xl shadow-2xl overflow-hidden border border-gray-300">
      <div>Chargement de la carte...</div>
    </div>
  )
});

interface MapProps {
  pickup: Location | null;
  destination: Location | null;
  onLocationSelect: (location: Location) => void;
}

const MapComponent: React.FC<MapProps> = ({ pickup, destination, onLocationSelect }) => {
  return (
    <div className="relative flex justify-center items-center my-8 mx-auto w-full max-w-6xl h-[600px] rounded-2xl shadow-2xl overflow-hidden border border-gray-300">
      <DynamicMapContainer
        pickup={pickup}
        destination={destination}
        onLocationSelect={onLocationSelect}
      />
    </div>
  );
};

export default MapComponent;
