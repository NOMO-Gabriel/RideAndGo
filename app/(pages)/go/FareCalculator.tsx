import { useEffect } from 'react';
import { FARE_CONFIG } from '../../utils/constants';
import { Location } from './types';
import { LatLng } from 'leaflet';

interface FareCalculatorProps {
  pickup: Location | null;
  destination: Location | null;
  setEstimatedFare: (fare: number) => void;
}

export default function FareCalculator({
  pickup,
  destination,
  setEstimatedFare,
}: FareCalculatorProps) {
  useEffect(() => {
    const newEstimatedFare = calculateEstimatedFare(pickup, destination);
    setEstimatedFare(newEstimatedFare);
  }, [pickup, destination]);

  const calculateEstimatedFare = (pickup: Location | null, destination: Location | null): number => {
    if (!pickup || !destination) return 0;
    const pickupLatLng = new LatLng(pickup.lat, pickup.lng);
    const destLatLng = new LatLng(destination.lat, destination.lng);
    const distanceInMeters = pickupLatLng.distanceTo(destLatLng);
    const distanceInKm = distanceInMeters / 1000;
    const currentHour = new Date().getHours();
    const isPeakHour = (currentHour >= FARE_CONFIG.PEAK_HOURS.morning.start && currentHour <= FARE_CONFIG.PEAK_HOURS.morning.end) ||
                       (currentHour >= FARE_CONFIG.PEAK_HOURS.evening.start && currentHour <= FARE_CONFIG.PEAK_HOURS.evening.end);

    let fare = FARE_CONFIG.BASE_FARE + (distanceInKm * FARE_CONFIG.PER_KM_RATE);
    if (isPeakHour) fare *= FARE_CONFIG.PEAK_HOUR_MULTIPLIER;
    fare = Math.max(fare, FARE_CONFIG.MIN_FARE);
    return Math.ceil(fare / 100) * 100;
  };

  return null;
}
