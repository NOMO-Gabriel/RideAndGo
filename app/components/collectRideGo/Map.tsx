// Map.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSearchFilter } from '@/app/utils/hooks/useSearchFilter';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Routing from './Routing';

// Fix the default Leaflet icon paths for compatibility with Webpack/Vite
// delete L.Icon.Default.prototype.getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map: React.FC = () => {
  const { searchData } = useSearchFilter(); // Use the custom hook to access search data
  const { startPoint, endPoint, place, isItinerary } = searchData;

  return (
    <div className="relative flex justify-center items-center my-8 mx-auto w-full max-w-6xl h-[600px] rounded-2xl shadow-2xl overflow-hidden border border-gray-300">
      <MapContainer 
        center={[3.8480, 11.5021]} // Center of the map
        zoom={13} // Initial zoom level
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // URL for the tile layer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // Attribution for OpenStreetMap
        />

        {isItinerary ? ( // Check if the itinerary is active
          <>
            {startPoint && ( // Check if the start point is available
              <Marker position={[startPoint.latitude, startPoint.longitude]}>
                <Popup>
                  <h3 className="font-bold text-bleu-nuit">{startPoint.name}</h3>
                </Popup>
              </Marker>
            )}
            {endPoint && ( // Check if the end point is available
              <Marker position={[endPoint.latitude, endPoint.longitude]}>
                <Popup>
                  <h3 className="font-bold text-bleu-nuit">{endPoint.name}</h3>
                </Popup>
              </Marker>
            )}
            {startPoint && endPoint && ( // Ensure both start and end points are available
              <Routing
                start={[startPoint.latitude, startPoint.longitude]} // Pass start coordinates
                end={[endPoint.latitude, endPoint.longitude]} // Pass end coordinates
              />
            )}
          </>
        ) : (
          place && ( // Display a marker for a place if it's available
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
