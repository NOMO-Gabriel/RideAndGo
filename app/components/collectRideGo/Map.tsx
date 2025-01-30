import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSearchFilter } from '@/app/utils/hooks/useSearchFilter';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Routing from './Routing';

// Configuration des icônes Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map: React.FC = () => {
  const { searchData } = useSearchFilter();
  const { startPoint, endPoint, place, isItinerary } = searchData;

  return (
    <div className="relative flex justify-center items-center my-8 mx-auto w-full max-w-6xl h-[600px] rounded-2xl shadow-2xl overflow-hidden border border-gray-300">
      <MapContainer
        center={[3.8480, 11.5021]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {isItinerary ? (
          <>
            {startPoint && (
              <Marker position={[startPoint.latitude, startPoint.longitude]}>
                <Popup>
                  <h3 className="font-bold text-bleu-nuit">{startPoint.name}</h3>
                </Popup>
              </Marker>
            )}
            {endPoint && (
              <Marker position={[endPoint.latitude, endPoint.longitude]}>
                <Popup>
                  <h3 className="font-bold text-bleu-nuit">{endPoint.name}</h3>
                </Popup>
              </Marker>
            )}
            {startPoint && endPoint && (
              <Routing
                start={[startPoint.latitude, startPoint.longitude]}
                end={[endPoint.latitude, endPoint.longitude]}
              />
            )}
          </>
        ) : (
          place && (
            <Marker position={[place.latitude, place.longitude]}>
              <Popup>
                <h3 className="font-bold text-bleu-nuit">{place.name}</h3>
              </Popup>
            </Marker>
          )
        )}
      </MapContainer>
    </div>
  );
};

export default Map;