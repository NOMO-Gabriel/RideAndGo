'use client';

import { FARE_CONFIG } from '../../utils/constants';
import { LatLng } from 'leaflet';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface FareEstimatorProps {
  pickup: Location | null;
  destination: Location | null;
}

export default function FareEstimator({ pickup, destination }: FareEstimatorProps) {
  const calculateEstimatedFare = (): number => {
    if (!pickup || !destination) return 0;

    // Calculer la distance en kilomètres
    const pickupLatLng = new LatLng(pickup.lat, pickup.lng);
    const destLatLng = new LatLng(destination.lat, destination.lng);
    const distanceInMeters = pickupLatLng.distanceTo(destLatLng);
    const distanceInKm = distanceInMeters / 1000;

    // Vérifier si c'est une heure de pointe
    const currentHour = new Date().getHours();
    const isPeakHour = (currentHour >= FARE_CONFIG.PEAK_HOURS.MORNING.START && currentHour <= FARE_CONFIG.PEAK_HOURS.MORNING.END) ||
                       (currentHour >= FARE_CONFIG.PEAK_HOURS.EVENING.START && currentHour <= FARE_CONFIG.PEAK_HOURS.EVENING.END);

    // Calculer le tarif de base
    let fare = FARE_CONFIG.BASE_FARE + (distanceInKm * FARE_CONFIG.PER_KM_RATE);

    // Appliquer le multiplicateur des heures de pointe si nécessaire
    if (isPeakHour) {
      fare *= FARE_CONFIG.PEAK_HOUR_MULTIPLIER;
    }

    // Appliquer le tarif minimum
    fare = Math.max(fare, FARE_CONFIG.MIN_FARE);

    // Arrondir au multiple de 100 FCFA le plus proche
    return Math.ceil(fare / 100) * 100;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price);
  };

  const estimatedFare = calculateEstimatedFare();

  if (!pickup || !destination) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Estimation du tarif</h2>
      <div className="text-2xl font-bold text-green-600">
        {formatPrice(estimatedFare)}
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {new Date().getHours() >= FARE_CONFIG.PEAK_HOURS.MORNING.START && 
         new Date().getHours() <= FARE_CONFIG.PEAK_HOURS.MORNING.END ? 
         "Tarif heure de pointe (matin)" : 
         new Date().getHours() >= FARE_CONFIG.PEAK_HOURS.EVENING.START && 
         new Date().getHours() <= FARE_CONFIG.PEAK_HOURS.EVENING.END ? 
         "Tarif heure de pointe (soir)" : 
         "Tarif standard"}
      </p>
    </div>
  );
}
