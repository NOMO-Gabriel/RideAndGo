'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { Icon } from 'leaflet';
import { YAOUNDE_LOCATIONS, FARE_CONFIG } from '@/app/utils/constants';

const Map = dynamic(() => import('../../components/maps/LeafletMap'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>
});

export default function Go() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [estimatedFare, setEstimatedFare] = useState<number>(0);
  const [customIcon, setCustomIcon] = useState<Icon | undefined>(undefined);

  useEffect(() => {
    // Import Leaflet dynamically
    import('leaflet').then((L) => {
      setCustomIcon(
        new L.Icon({
          iconUrl: '/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        })
      );
    });
  }, []);

  interface Location {
    lat: number;
    lng: number;
    name: string;
  }

  const handleMapClick = (lat: number, lng: number) => {
    const newLocation = {
      lat,
      lng,
      name: 'Position sélectionnée',
    };
    
    if (!selectedLocation) {
      setSelectedLocation(newLocation);
    } else if (!destination) {
      setDestination(newLocation);
      calculatePrice(selectedLocation, newLocation);
    }
  };

  const calculatePrice = (start: Location, end: Location) => {
    const R = 6371;
    const dLat = (end.lat - start.lat) * Math.PI / 180;
    const dLon = (end.lng - start.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    const now = new Date();
    const hour = now.getHours();
    const isPeakHour = hour >= FARE_CONFIG.PEAK_HOURS.START && hour <= FARE_CONFIG.PEAK_HOURS.END;

    let price = FARE_CONFIG.BASE_FARE + (distance * FARE_CONFIG.DISTANCE_RATE);
    if (isPeakHour) {
      price *= FARE_CONFIG.PEAK_HOUR_MULTIPLIER;
    }
    price = Math.max(price, FARE_CONFIG.MIN_FARE);

    setEstimatedFare(Math.round(price));
  };

  const resetLocations = () => {
    setSelectedLocation(null);
    setDestination(null);
    setEstimatedFare(0);
  };

  const markers = [
    ...(selectedLocation ? [{
      position: [selectedLocation.lat, selectedLocation.lng] as [number, number],
      icon: customIcon,
      popup: `Départ: ${selectedLocation.name}`
    }] : []),
    ...(destination ? [{
      position: [destination.lat, destination.lng] as [number, number],
      icon: customIcon,
      popup: `Destination: ${destination.name}`
    }] : [])
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Planifier votre trajet</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <p className="text-gray-600">
              1. Cliquez sur la carte pour sélectionner votre point de départ<br />
              2. Cliquez à nouveau pour sélectionner votre destination<br />
              3. Le prix estimé sera calculé automatiquement
            </p>
          </div>

          {estimatedFare > 0 && (
            <div className="mb-6 p-4 bg-orange-100 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800">Prix estimé</h3>
              <p className="text-2xl font-bold text-orange-600">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'XAF',
                  minimumFractionDigits: 0,
                }).format(estimatedFare)}
              </p>
              <button
                onClick={resetLocations}
                className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <Map
            center={[3.8667, 11.5167]}
            zoom={13}
            className="h-[600px] rounded-lg shadow-lg"
            markers={markers}
            onMapClick={handleMapClick}
          />
        </div>
      </div>
    </div>
  );
}
