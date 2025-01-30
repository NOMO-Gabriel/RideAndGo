'use client';

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
