'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface MapProps {
  pickup: Location | null;
  destination: Location | null;
  onLocationSelect: (location: Location) => void;
  isSelectingPickup: boolean;
}

const customIcon = new Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapEvents({ onLocationSelect }: { onLocationSelect: (location: Location) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}

export default function Map({ pickup, destination, onLocationSelect, isSelectingPickup }: MapProps) {
  return (
    <MapContainer
      center={[3.8667, 11.5167]}
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
  );
}


