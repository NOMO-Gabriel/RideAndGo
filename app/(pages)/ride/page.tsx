'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { Icon } from 'leaflet';
import { YAOUNDE_LOCATIONS } from '@/app/utils/constants';

const Map = dynamic(() => import('../../components/maps/LeafletMap'), {
  ssr: false, // Disable server-side rendering
  loading: () => <p>Chargement de la carte...</p>
});

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
  pickupLocation: Location;
  destination: Location;
  price: number;
  status: 'available' | 'selected' | 'in_progress';
}

export default function DriverDashboard() {
  const [driverPosition, setDriverPosition] = useState<[number, number]>([
    YAOUNDE_LOCATIONS.CENTRE.lat,
    YAOUNDE_LOCATIONS.CENTRE.lng,
  ]);

  const [clients, setClients] = useState<Client[]>([
    // ... vos données de clients existantes
  ]);

  const [driverIcon, setDriverIcon] = useState<Icon | undefined>(undefined);
  const [clientIcon, setClientIcon] = useState<Icon | undefined>(undefined);

  useEffect(() => {
    // Import Leaflet dynamically
    import('leaflet').then((L) => {
      setDriverIcon(
        new L.Icon({
          iconUrl: '/driver-marker.svg',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        })
      );
      setClientIcon(
        new L.Icon({
          iconUrl: '/client-marker.svg',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        })
      );
    });
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
    }).format(price);
  };

  const handleBid = (clientId: string) => {
    setClients(
      clients.map((client) =>
        client.id === clientId
          ? { ...client, status: 'selected' as const }
          : client
      )
    );
  };

  const acceptRide = (client: Client) => {
    // Logique pour accepter une course
  };

  const markers = [
    ...(driverIcon ? [{
      position: driverPosition,
      icon: driverIcon,
      popup: (
        <div className="text-center">
          <p className="font-bold">Votre position</p>
          <p>{YAOUNDE_LOCATIONS.CENTRE.name}</p>
        </div>
      )
    }] : []),
    ...clients.flatMap((client) => 
      clientIcon ? [{
        position: client.position,
        icon: clientIcon,
        popup: (
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
        )
      }] : []
    )
  ];

  const polylines = clients.flatMap((client) => 
    client.status !== 'available' ? [
      {
        positions: [
          [client.currentLocation.lat, client.currentLocation.lng] as [number, number],
          [client.pickupLocation.lat, client.pickupLocation.lng] as [number, number]
        ] as [number, number][],
        color: 'orange',
        dashArray: '5, 10'
      },
      {
        positions: [
          [client.pickupLocation.lat, client.pickupLocation.lng] as [number, number],
          [client.destination.lat, client.destination.lng] as [number, number]
        ] as [number, number][],
        color: 'blue'
      }
    ] : []
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord du chauffeur</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section des statistiques */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Courses effectuées</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div>
                  <p className="text-gray-600">Revenus du jour</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatPrice(25000)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Note moyenne</p>
                  <p className="text-2xl font-bold text-yellow-500">4.8/5</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="col-span-2">
            <Map
              center={driverPosition}
              zoom={13}
              className="h-[600px] rounded-lg shadow-lg"
              markers={markers}
              polylines={polylines}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
