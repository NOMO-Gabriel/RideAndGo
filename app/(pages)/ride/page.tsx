'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ProgressDashboard from '../../components/ride/ProgressDashboard';
import ClientList from '../../components/ride/ClientList';
import NotificationManager from "../../components/flash_message/NotificationManager";

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

const YAOUNDE_LOCATIONS = {
  CENTRE: { lat: 3.848032, lng: 11.502075 },
  MOKOLO: { lat: 3.863032, lng: 11.499075 },
  MVAN: { lat: 3.833032, lng: 11.497075 }
};

const PREDEFINED_CLIENTS = [
  {
    id: '1',
    name: 'Thomas Manga',
    position: [YAOUNDE_LOCATIONS.CENTRE.lat, YAOUNDE_LOCATIONS.CENTRE.lng] as [number, number],
    currentLocation: YAOUNDE_LOCATIONS.CENTRE,
    destination: YAOUNDE_LOCATIONS.MOKOLO,
    pickupLocation: YAOUNDE_LOCATIONS.CENTRE,
    price: 1500,
    status: 'available' as const,
    speed: 0,
    direction: [0, 0] as [number, number],
    requestTime: new Date(),
    estimatedDuration: 15,
    distance: 2.5,
  },
  {
    id: '2',
    name: 'Marie Fouda',
    position: [YAOUNDE_LOCATIONS.MOKOLO.lat, YAOUNDE_LOCATIONS.MOKOLO.lng] as [number, number],
    currentLocation: YAOUNDE_LOCATIONS.MOKOLO,
    destination: YAOUNDE_LOCATIONS.MVAN,
    pickupLocation: YAOUNDE_LOCATIONS.MOKOLO,
    price: 2000,
    status: 'available' as const,
    speed: 0,
    direction: [0, 0] as [number, number],
    requestTime: new Date(),
    estimatedDuration: 20,
    distance: 3.2,
  },
  {
    id: '3',
    name: 'Jean Ebogo',
    position: [YAOUNDE_LOCATIONS.MVAN.lat, YAOUNDE_LOCATIONS.MVAN.lng] as [number, number],
    currentLocation: YAOUNDE_LOCATIONS.MVAN,
    destination: YAOUNDE_LOCATIONS.CENTRE,
    pickupLocation: YAOUNDE_LOCATIONS.MVAN,
    price: 1800,
    status: 'available' as const,
    speed: 0,
    direction: [0, 0] as [number, number],
    requestTime: new Date(),
    estimatedDuration: 18,
    distance: 2.8,
  }
];

export default function DriverDashboard() {
  const [clients, setClients] = useState<typeof PREDEFINED_CLIENTS>([]);
  const [activeClient, setActiveClient] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  //const notificationManager = useRef(null);
  const notificationManager = useRef<{ addNotification: (message: string) => void } | null>(null);

  const currentClientIndex = useRef(0);
  const [progress, setProgress] = useState({
    dailyGoal: 10,
    completedRides: 0,
    totalEarnings: 0,
  });

  const [driverPosition, setDriverPosition] = useState<[number, number]>([
    YAOUNDE_LOCATIONS.CENTRE.lat,
    YAOUNDE_LOCATIONS.CENTRE.lng
  ]);

  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} mètres`;
    }
    return `${distance.toFixed(1)} kilomètres`;
  };

  const handleEvent = (clientName: string, distance: number) => {
    if (voiceEnabled) {
      const formattedDistance = formatDistance(distance);
      notificationManager.current?.addNotification(
        `Nouveau client ${clientName} disponible à ${formattedDistance} de votre position`
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentClientIndex.current < PREDEFINED_CLIENTS.length) {
        const newClient = PREDEFINED_CLIENTS[currentClientIndex.current];
        setClients(prev => [...prev, newClient]);
        handleEvent(newClient.name, newClient.distance);
        currentClientIndex.current += 1;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setDriverPosition(prev => {
        const angle = Math.random() * 2 * Math.PI;
        const speed = 0.0001;
        const newLat = prev[0] + Math.cos(angle) * speed;
        const newLng = prev[1] + Math.sin(angle) * speed;
        return [newLat, newLng];
      });
    }, 2000);

    return () => clearInterval(moveInterval);
  }, []);

  const handleClientSelect = (client) => {
    setActiveClient(client);
  };

  const handleRideAccept = (client) => {
    setClients(prev => 
      prev.map(c => 
        c.id === client.id 
          ? { ...c, status: 'accepted' } 
          : c
      )
    );
  };

  const handleRideComplete = (client) => {
    setClients(prev => prev.filter(c => c.id !== client.id));
    setActiveClient(null);
    setProgress(prev => ({
      ...prev,
      completedRides: prev.completedRides + 1,
      totalEarnings: prev.totalEarnings + client.price,
    }));
  };

  const handleRideCancel = (client) => {
    setClients(prev => prev.filter(c => c.id !== client.id));
    setActiveClient(null);
  };

  const handleUpdateDailyGoal = (goal: number) => {
    setProgress(prev => ({ ...prev, dailyGoal: goal }));
  };

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
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="voiceToggle"
                  checked={voiceEnabled}
                  onChange={(e) => setVoiceEnabled(e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="voiceToggle" className="text-white text-sm">
                  Activer les notifications vocales
                </label>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-4 flex-1 overflow-hidden">
              <div className="h-[calc(100vh-400px)] overflow-y-auto custom-scrollbar pr-2">
                <NotificationManager ref={notificationManager} />
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