pour corriger cette erreur voici ce qu'un ami a fiat sur un projet:
Dynamic Map"import dynamic from 'next/dynamic';

// Chargement dynamique du composant Map avec SSR désactivé
const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="relative flex justify-center items-center my-8 mx-auto w-full max-w-6xl h-[600px] rounded-2xl shadow-2xl overflow-hidden border border-gray-300 bg-gray-100">
      <div>Chargement de la carte...</div>
    </div>
  )
});

export default DynamicMap;"
map:
"import React from 'react';
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

export default Map;"
mainteant je peux implementer ce style de solution ici sur mon projet:
voici go "'use client';

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
"
et ride:
"'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLng } from 'leaflet';
import dynamic from 'next/dynamic';

// Custom marker icons
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

// Points d'intérêt à Yaoundé
const YAOUNDE_LOCATIONS = {
  CENTRE: { lat: 3.8667, lng: 11.5167, name: 'Centre-ville' },
  BASTOS: { lat: 3.8833, lng: 11.5167, name: 'Bastos' },
  MVOG_MBI: { lat: 3.8544, lng: 11.5189, name: 'Mvog-Mbi' },
  MVAN: { lat: 3.8236, lng: 11.4954, name: 'Mvan' },
  NSAM: { lat: 3.8347, lng: 11.5153, name: 'Nsam' },
  NGOUSSO: { lat: 3.9089, lng: 11.5375, name: 'Ngousso' },
  CITE_VERTE: { lat: 3.8894, lng: 11.4919, name: 'Cité Verte' },
  BIYEM_ASSI: { lat: 3.8514, lng: 11.4889, name: 'Biyem-Assi' },
  MIMBOMAN: { lat: 3.8667, lng: 11.5417, name: 'Mimboman' },
  OMNISPORT: { lat: 3.8833, lng: 11.5333, name: 'Omnisport' }
};

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface Client {
  id: string;
  name: string;
  position: [number, number];
  currentLocation: Location;
  destination: Location;
  pickupLocation: Location;
  price: number;
  status: 'available' | 'selected' | 'in_progress';
  speed: number;
  direction: [number, number];
}

interface ProgressData {
  dailyGoal: number;
  earnedToday: number;
  completedRides: number;
}

const calculateNewPosition = (
  currentPos: [number, number],
  direction: [number, number],
  speed: number
): [number, number] => {
  const speedInDegrees = speed / (111 * 3600);
  const newLat = currentPos[0] + direction[0] * speedInDegrees;
  const newLng = currentPos[1] + direction[1] * speedInDegrees;
  return [newLat, newLng];
};

const generateRandomDirection = (): [number, number] => {
  const angle = Math.random() * 2 * Math.PI;
  return [Math.cos(angle), Math.sin(angle)];
};

const getRandomLocation = () => {
  const locations = Object.values(YAOUNDE_LOCATIONS);
  return locations[Math.floor(Math.random() * locations.length)];
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0
  }).format(price);
};

export default function DriverDashboard() {
  const [progress, setProgress] = useState<ProgressData>({
    dailyGoal: 50000, // 50,000 FCFA par défaut
    earnedToday: 0,
    completedRides: 0,
  });
  
  const [clients, setClients] = useState<Client[]>([]);
  const [driverPosition, setDriverPosition] = useState<[number, number]>([YAOUNDE_LOCATIONS.CENTRE.lat, YAOUNDE_LOCATIONS.CENTRE.lng]);
  const moveIntervalRef = useRef<NodeJS.Timeout>();

  // Initialiser les clients avec des positions aléatoires à Yaoundé
  useEffect(() => {
    const initialClients: Client[] = Array.from({ length: 5 }, (_, i) => {
      const currentLocation = getRandomLocation();
      const pickupLocation = getRandomLocation();
      const destination = getRandomLocation();
      
      return {
        id: `client-${i + 1}`,
        name: `Client ${i + 1}`,
        position: [currentLocation.lat, currentLocation.lng],
        currentLocation,
        pickupLocation,
        destination,
        price: Math.floor(Math.random() * 3000) + 2000, // Prix entre 2000 et 5000 FCFA
        status: 'available',
        speed: Math.random() * 30 + 20,
        direction: generateRandomDirection(),
      };
    });
    setClients(initialClients);

    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
    };
  }, []);

  // Mettre à jour les positions des clients
  useEffect(() => {
    const updateClientPositions = () => {
      setClients(prevClients =>
        prevClients.map(client => {
          if (client.status === 'available') {
            const newPos = calculateNewPosition(
              client.position,
              client.direction,
              client.speed
            );

            const shouldChangeDirection = Math.random() < 0.1;
            const newDirection = shouldChangeDirection
              ? generateRandomDirection()
              : client.direction;

            // Garder les clients dans les limites de Yaoundé
            const withinBounds = (pos: number, min: number, max: number) =>
              Math.max(min, Math.min(max, pos));

            return {
              ...client,
              position: [
                withinBounds(newPos[0], 3.8236, 3.9089), // Limites de Yaoundé
                withinBounds(newPos[1], 11.4889, 11.5417)
              ],
              direction: newDirection,
            };
          }
          return client;
        })
      );
    };

    moveIntervalRef.current = setInterval(updateClientPositions, 1000);

    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
    };
  }, []);

  const handleBid = useCallback((clientId: string) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === clientId
          ? { ...client, status: client.status === 'available' ? 'selected' : 'available' }
          : client
      )
    );
  }, []);

  const acceptRide = useCallback((client: Client) => {
    const rideTimeout = setTimeout(() => {
      setClients(prevClients =>
        prevClients.filter(c => c.id !== client.id)
      );
    }, 10000);

    setProgress(prev => ({
      ...prev,
      earnedToday: prev.earnedToday + client.price,
      completedRides: prev.completedRides + 1,
    }));

    setClients(prevClients =>
      prevClients.map(c =>
        c.id === client.id
          ? { ...c, status: 'in_progress' }
          : c
      )
    );

    return () => clearTimeout(rideTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6 bg-gradient-to-r from-orange-400 to-blue-900">
        <h1 className="text-3xl font-bold text-white">Tableau de bord Chauffeur</h1>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Progress Section */}
          <div className="col-span-1 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Objectif Journalier</h2>
            <div className="mb-4">
              <input
                type="number"
                value={progress.dailyGoal}
                onChange={(e) => setProgress(prev => ({ ...prev, dailyGoal: Number(e.target.value) }))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-900 bg-blue-200">
                    Progression
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-900">
                    {Math.round((progress.earnedToday / progress.dailyGoal) * 100)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${(progress.earnedToday / progress.dailyGoal) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                ></div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Gains: {formatPrice(progress.earnedToday)}</p>
                <p>Courses complétées: {progress.completedRides}</p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="col-span-2 bg-white rounded-lg shadow-lg p-6 h-[600px]">
            <MapContainer
              center={driverPosition}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Driver Marker */}
              <Marker position={driverPosition} icon={driverIcon}>
                <Popup>
                  <div className="text-center">
                    <p className="font-bold">Votre position</p>
                    <p>{YAOUNDE_LOCATIONS.CENTRE.name}</p>
                  </div>
                </Popup>
              </Marker>

              {/* Client Markers */}
              {clients.map((client) => (
                <div key={client.id}>
                  <Marker
                    position={client.position}
                    icon={clientIcon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold">{client.name}</h3>
                        <p className="text-sm">Prix: {formatPrice(client.price)}</p>
                        <div className="mt-2">
                          <p className="font-semibold">Détails du trajet:</p>
                          <p>Position actuelle: {client.currentLocation.name}</p>
                          <p>Lieu de départ: {client.pickupLocation.name}</p>
                          <p>Destination: {client.destination.name}</p>
                        </div>
                        {client.status === 'available' && (
                          <button
                            onClick={() => handleBid(client.id)}
                            className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                          >
                            Proposer mes services
                          </button>
                        )}
                        {client.status === 'selected' && (
                          <button
                            onClick={() => acceptRide(client)}
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                          >
                            Commencer la course
                          </button>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                  
                  {/* Trajet du client */}
                  {client.status !== 'available' && (
                    <>
                      <Polyline
                        positions={[
                          [client.currentLocation.lat, client.currentLocation.lng],
                          [client.pickupLocation.lat, client.pickupLocation.lng]
                        ]}
                        color="orange"
                        dashArray="5, 10"
                      />
                      <Polyline
                        positions={[
                          [client.pickupLocation.lat, client.pickupLocation.lng],
                          [client.destination.lat, client.destination.lng]
                        ]}
                        color="blue"
                      />
                    </>
                  )}
                </div>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Client List */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Clients à proximité</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                  client.status === 'selected' ? 'border-orange-500' : 
                  client.status === 'in_progress' ? 'border-green-500' : ''
                }`}
              >
                <h3 className="font-semibold">{client.name}</h3>
                <p className="text-gray-600">Prix proposé: {formatPrice(client.price)}</p>
                <div className="mt-2 text-sm">
                  <p><span className="font-semibold">Position:</span> {client.currentLocation.name}</p>
                  <p><span className="font-semibold">Départ:</span> {client.pickupLocation.name}</p>
                  <p><span className="font-semibold">Destination:</span> {client.destination.name}</p>
                </div>
                <p className="text-gray-600 mt-2">
                  Distance: {Math.round(
                    new LatLng(client.position[0], client.position[1])
                      .distanceTo(new LatLng(driverPosition[0], driverPosition[1])) / 1000
                  )} km
                </p>
                {client.status === 'available' && (
                  <button
                    onClick={() => handleBid(client.id)}
                    className="mt-2 w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  >
                    Proposer mes services
                  </button>
                )}
                {client.status === 'selected' && (
                  <button
                    onClick={() => acceptRide(client)}
                    className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Commencer la course
                  </button>
                )}
                {client.status === 'in_progress' && (
                  <div className="mt-2 text-center text-green-600 font-semibold">
                    Course en cours...
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
"
comment corriger l'erreur d'acces a l'objet window is not defined ?