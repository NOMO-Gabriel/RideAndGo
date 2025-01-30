import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLng, Icon } from 'leaflet';
import { YAOUNDE_LOCATIONS } from '../../utils/constants';
import { Location } from './types';

const customIcon = new Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapContainerProps {
  pickup: Location | null;
  destination: Location | null;
  onLocationSelect: (location: Location) => void;
}

export default function MapContainerComponent({
  pickup,
  destination,
  onLocationSelect,
}: MapContainerProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-[600px]">
      <MapContainer
        center={[YAOUNDE_LOCATIONS.CENTRE.lat, YAOUNDE_LOCATIONS.CENTRE.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents onLocationSelect={onLocationSelect} />
        {pickup && (
          <Marker position={[pickup.lat, pickup.lng]} icon={customIcon}>
            <Popup>Point de départ</Popup>
          </Marker>
        )}
        {destination && (
          <Marker position={[destination.lat, destination.lng]} icon={customIcon}>
            <Popup>Destination</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

function MapEvents({ onLocationSelect }: { onLocationSelect: (location: Location) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          id: '',
          name: ''
      });
    },
  });
  return null;
}
