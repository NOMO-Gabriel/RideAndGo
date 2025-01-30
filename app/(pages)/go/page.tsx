'use client';

import { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLng } from 'leaflet';
import { YAOUNDE_LOCATIONS, FARE_CONFIG } from '../../utils/constants';

const customIcon = new Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Driver {
  id: string;
  name: string;
  rating: number;
  price: number;
  accepted: boolean;
}

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

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

// Fonction pour calculer le tarif estimé
function calculateEstimatedFare(pickup: Location | null, destination: Location | null): number {
  if (!pickup || !destination) return 0;

  // Calculer la distance en kilomètres
  const pickupLatLng = new LatLng(pickup.lat, pickup.lng);
  const destLatLng = new LatLng(destination.lat, destination.lng);
  const distanceInMeters = pickupLatLng.distanceTo(destLatLng);
  const distanceInKm = distanceInMeters / 1000;

  // Vérifier si c'est une heure de pointe
  const currentHour = new Date().getHours();
  const isPeakHour = (currentHour >= FARE_CONFIG.PEAK_HOURS.morning.start && currentHour <= FARE_CONFIG.PEAK_HOURS.morning.end) ||
                     (currentHour >= FARE_CONFIG.PEAK_HOURS.evening.start && currentHour <= FARE_CONFIG.PEAK_HOURS.evening.end);

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
}

function calculateDistance(pickup: Location, destination: Location): number {
  const pickupLatLng = new LatLng(pickup.lat, pickup.lng);
  const destLatLng = new LatLng(destination.lat, destination.lng);
  const distanceInMeters = pickupLatLng.distanceTo(destLatLng);
  return distanceInMeters / 1000;
}

export default function ClientDashboard() {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [price, setPrice] = useState('');
  const [isSelectingPickup, setIsSelectingPickup] = useState(true);
  const [estimatedFare, setEstimatedFare] = useState<number>(0);
  const [drivers] = useState<Driver[]>([
    { id: '1', name: 'Ngono Jean', rating: 4.8, price: 2500, accepted: false },
    { id: '2', name: 'Nganou Pierre', rating: 4.9, price: 2800, accepted: false },
  ]);

  const handleLocationSelect = (location: Location) => {
    if (isSelectingPickup) {
      setPickup(location);
    } else {
      setDestination(location);
    }

    // Calculer le nouveau tarif estimé
    const newPickup = isSelectingPickup ? location : pickup;
    const newDestination = isSelectingPickup ? destination : location;
    const newEstimatedFare = calculateEstimatedFare(newPickup, newDestination);
    setEstimatedFare(newEstimatedFare);
  };

  const handleSubmitRide = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ride submitted:', { pickup, destination, price });
  };

  const handleAcceptDriver = (driverId: string) => {
    setDrivers(prevDrivers =>
      prevDrivers.map(driver =>
        driver.id === driverId
          ? { ...driver, accepted: true }
          : { ...driver, accepted: false }
      )
    );
  };

  const [showFareCalculator, setShowFareCalculator] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR', { style: 'currency', currency: 'XAF' });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6 bg-gradient-to-r from-orange-400 to-blue-900">
        <h1 className="text-3xl font-bold text-white">Réserver un trajet</h1>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-[600px]">
            <div className="mb-4">
              <button
                onClick={() => setIsSelectingPickup(true)}
                className={`mr-2 px-4 py-2 rounded ${
                  isSelectingPickup
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Point de départ
              </button>
              <button
                onClick={() => setIsSelectingPickup(false)}
                className={`px-4 py-2 rounded ${
                  !isSelectingPickup
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Destination
              </button>
            </div>
            <MapContainer
              center={[YAOUNDE_LOCATIONS.CENTRE.lat, YAOUNDE_LOCATIONS.CENTRE.lng]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapEvents onLocationSelect={handleLocationSelect} />
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

          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Détails du trajet</h2>
              <form onSubmit={handleSubmitRide} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Point de départ
                  </label>
                  <input
                    type="text"
                    value={pickup ? `${pickup.lat}, ${pickup.lng}` : ''}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={destination ? `${destination.lat}, ${destination.lng}` : ''}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>

                {/* Fare Calculator Section */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowFareCalculator(!showFareCalculator)}
                    className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 mb-4 font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
                  >
                    {showFareCalculator ? '↑ Masquer le calculateur' : '↓ Calculer un tarif'}
                  </button>
                  
                  {showFareCalculator && (
                    <div className="bg-white p-6 rounded-xl shadow-xl border-2 border-orange-500">
                      <h2 className="text-2xl font-bold text-orange-800 mb-6 text-center">Calculateur de tarifs</h2>
                      <div className="space-y-6">
                        <div className="relative">
                          <label className="block text-lg font-bold text-gray-900 mb-2">Point de départ</label>
                          <select
                            className="mt-1 block w-full rounded-lg border-2 border-orange-300 shadow-lg py-3 px-4 bg-white text-gray-900 text-lg font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            value={pickup?.name || ''}
                            onChange={(e) => {
                              const location = Object.values(YAOUNDE_LOCATIONS).find(
                                loc => loc.name === e.target.value
                              );
                              if (location) setPickup(location);
                            }}
                          >
                            <option value="">Sélectionnez un point de départ</option>
                            {Object.values(YAOUNDE_LOCATIONS).map(loc => (
                              <option key={loc.name} value={loc.name} className="py-2">{loc.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="relative">
                          <label className="block text-lg font-bold text-gray-900 mb-2">Destination</label>
                          <select
                            className="mt-1 block w-full rounded-lg border-2 border-orange-300 shadow-lg py-3 px-4 bg-white text-gray-900 text-lg font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            value={destination?.name || ''}
                            onChange={(e) => {
                              const location = Object.values(YAOUNDE_LOCATIONS).find(
                                loc => loc.name === e.target.value
                              );
                              if (location) setDestination(location);
                            }}
                          >
                            <option value="">Sélectionnez une destination</option>
                            {Object.values(YAOUNDE_LOCATIONS).map(loc => (
                              <option key={loc.name} value={loc.name} className="py-2">{loc.name}</option>
                            ))}
                          </select>
                        </div>

                        {estimatedFare && (
                          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-xl border-2 border-orange-400 shadow-lg">
                            <h3 className="text-2xl font-bold text-orange-900 mb-3">Estimation du tarif</h3>
                            <p className="text-3xl font-bold text-orange-800 mb-3">
                              {formatPrice(estimatedFare)}
                            </p>
                            <div className="space-y-2 text-orange-800">
                              <p className="flex items-center text-base">
                                <span className="mr-2">🚗</span>
                                <span>Distance: {calculateDistance(pickup!, destination!).toFixed(1)} km</span>
                              </p>
                              <p className="flex items-center text-base">
                                <span className="mr-2">⏰</span>
                                <span>Durée estimée: {Math.ceil(calculateDistance(pickup!, destination!) * 3)} min</span>
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-orange-700 mt-4 border-t border-orange-300 pt-4">
                              *Les prix peuvent varier selon le trafic et l'heure de la journée
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prix proposé (FCFA)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={estimatedFare.toString()}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Publier le trajet
                </button>
              </form>
            </div>

            {/* Drivers Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                Chauffeurs disponibles
              </h2>
              <div className="space-y-4">
                {drivers.map((driver) => (
                  <div
                    key={driver.id}
                    className={`border rounded-lg p-4 ${
                      driver.accepted ? 'border-green-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{driver.name}</h3>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1">{driver.rating}</span>
                        </div>
                        <p className="text-gray-600">Prix: {driver.price} FCFA</p>
                      </div>
                      <button
                        onClick={() => handleAcceptDriver(driver.id)}
                        className={`px-4 py-2 rounded ${
                          driver.accepted
                            ? 'bg-green-500 text-white'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                        disabled={driver.accepted}
                      >
                        {driver.accepted ? 'Accepté' : 'Accepter'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
