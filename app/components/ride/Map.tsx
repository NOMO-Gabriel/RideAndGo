'use client';

import { useMemo, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Client } from '../../lib/types/ride';

interface MapProps {
  driverPosition: [number, number];
  clients: Client[];
  onClientSelect?: (client: Client) => void;
}

// Définir les icônes en dehors du composant pour éviter les recréations
const clientIcon = new Icon({
  iconUrl: '/client-marker.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const driverIcon = new Icon({
  iconUrl: '/driver-marker.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0
  }).format(price);
};

function RideMap({ driverPosition, clients, onClientSelect }: MapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mémoiser le TileLayer pour éviter les re-renders inutiles
  const tileLayer = useMemo(() => (
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
  ), []);

  // Mémoiser le marqueur du conducteur
  const driverMarker = useMemo(() => (
    <Marker position={driverPosition} icon={driverIcon}>
      <Popup>
        <div className="text-center">
          <p className="font-bold">Votre position</p>
        </div>
      </Popup>
    </Marker>
  ), [driverPosition]);

  // Mémoiser le rendu des clients
  const clientMarkers = useMemo(() => (
    clients.map((client) => (
      <Marker
        key={client.id}
        position={client.position}
        icon={clientIcon}
        eventHandlers={{
          click: () => onClientSelect && onClientSelect(client),
        }}
      >
        <Popup>
          <div className="p-2">
            <h3 className="font-bold">{client.name}</h3>
            <p className="text-sm">Prix: {formatPrice(client.price)}</p>
            <div className="mt-2">
              <p className="font-semibold">Détails du trajet:</p>
              <p>Position actuelle: {client.currentLocation.name}</p>
              <p>Destination: {client.destination.name}</p>
              <p>Distance: {client.distance.toFixed(1)} km</p>
              <p>Durée estimée: {client.estimatedDuration} min</p>
            </div>
          </div>
        </Popup>
      </Marker>
    ))
  ), [clients, onClientSelect]);

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Chargement de la carte...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[3.8667, 11.5167]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
        key="map"
      >
        {tileLayer}
        {driverMarker}
        {clientMarkers}
      </MapContainer>
    </div>
  );
}

export default RideMap;
