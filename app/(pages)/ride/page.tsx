'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { YAOUNDE_LOCATIONS } from '../../utils/constants';
import ProgressDashboard from '../../components/ride/ProgressDashboard';
import ClientList from '../../components/ride/ClientList';
import { useRideState } from '../../lib/hooks/useRideState';
import { Client, Location } from '../../lib/types/ride';



// Charger la carte de manière dynamique avec une suspension
const Map = dynamic(
  () => import('../../components/ride/Map'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Chargement de la carte...</div>
      </div>
    )
  }
);

const calculateDistance = (start: Location, end: Location): number => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (end.lat - start.lat) * Math.PI / 180;
  const dLon = (end.lng - start.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const getRandomLocation = () => {
  const locations = Object.values(YAOUNDE_LOCATIONS);
  return locations[Math.floor(Math.random() * locations.length)];
};

export default function DriverDashboard() {
  const {
    clients,
    setClients,
    progress,
    activeClient,
    handleClientSelect,
    handleRideAccept,
    handleRideComplete,
    handleRideCancel,
    handleUpdateDailyGoal,
  } = useRideState();

  const [driverPosition, setDriverPosition] = useState<[number, number]>([
    YAOUNDE_LOCATIONS.CENTRE.lat,
    YAOUNDE_LOCATIONS.CENTRE.lng
  ]);

  useEffect(() => {
    const generateRandomClient = () => {
      const pickupLocation = getRandomLocation();
      const destinationLocation = getRandomLocation();
      const distance = calculateDistance(pickupLocation, destinationLocation);
      const estimatedDuration = Math.ceil(distance * 3); // 3 minutes par km en moyenne
      const basePrice = 1000 + Math.round(distance * 500); // Prix de base + 500 FCFA par km
      const price = Math.round(basePrice / 100) * 100; // Arrondir aux 100 FCFA

      return {
        id: Math.random().toString(36).substr(2, 9),
        name: `Client ${Math.floor(Math.random() * 1000)}`,
        position: [pickupLocation.lat, pickupLocation.lng] as [number, number],
        currentLocation: pickupLocation,
        destination: destinationLocation,
        pickupLocation,
        price,
        status: 'available' as const,
        speed: 0,
        direction: [0, 0] as [number, number],
        requestTime: new Date(),
        estimatedDuration,
        distance,
      };
    };

    const interval = setInterval(() => {
      if (clients.length < 5) {
        setClients(prev => [...prev, generateRandomClient()]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [clients.length, setClients]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setDriverPosition(prev => {
        const angle = Math.random() * 2 * Math.PI;
        const speed = 0.0001; // Vitesse de déplacement
        const newLat = prev[0] + Math.cos(angle) * speed;
        const newLng = prev[1] + Math.sin(angle) * speed;
        return [newLat, newLng];
      });
    }, 2000);

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-[#0A1128]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/90 to-[#0A1128]/70" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="p-4">
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight animate-fade-in">
              Driver Dashboard
            </h1>
            <p className="text-base md:text-lg text-blue-200 animate-fade-in-delay">
              Find and accept rides in your area
            </p>
          </div>
        </div>

        <div className="flex-1 flex gap-4 p-4 h-[calc(100vh-140px)]">
          <div className="w-1/3 flex flex-col gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-4">
              <ProgressDashboard 
                progress={progress}
                onUpdateDailyGoal={handleUpdateDailyGoal}
              />
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-4 flex-1 overflow-hidden">
              <div className="h-[calc(100vh-400px)] overflow-y-auto custom-scrollbar pr-2">
                <ClientList
                  clients={clients}
                  activeClient={activeClient}
                  onClientSelect={handleClientSelect}
                  onRideAccept={handleRideAccept}
                  onRideComplete={handleRideComplete}
                  onRideCancel={handleRideCancel}
                />
              </div>
            </div>
          </div>

          <div className="w-2/3 flex flex-col gap-4">
            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
              <Map
                driverPosition={driverPosition}
                clients={clients}
                onClientSelect={handleClientSelect}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur p-4 rounded-xl text-center hover:bg-white/20 transition-colors">
                <h3 className="text-sm font-semibold text-white">Real-time Updates</h3>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-xl text-center hover:bg-white/20 transition-colors">
                <h3 className="text-sm font-semibold text-white">Smart Routing</h3>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-xl text-center hover:bg-white/20 transition-colors">
                <h3 className="text-sm font-semibold text-white">24/7 Support</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
