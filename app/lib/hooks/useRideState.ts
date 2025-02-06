'use client';

import { useState, useCallback } from 'react';
import { Client, ProgressData } from '../types/ride';

// État initial pour le suivi de la progression
const initialProgress: ProgressData = {
  dailyGoal: 50000,
  earnedToday: 0,
  completedRides: 0,
  totalDistance: 0,
  averageRating: 0,
  ridesHistory: [],
};

// Hook personnalisé pour gérer l'état des courses
export function useRideState() {
  const [clients, setClients] = useState<Client[]>([]);
  const [progress, setProgress] = useState<ProgressData>(() => {
    // Récupérer l'objectif sauvegardé dans le localStorage s'il existe
    const savedGoal = typeof window !== 'undefined' ? localStorage.getItem('dailyGoal') : null;
    return {
      ...initialProgress,
      dailyGoal: savedGoal ? parseInt(savedGoal) : initialProgress.dailyGoal,
    };
  });
  const [activeClient, setActiveClient] = useState<Client | null>(null);

  // Gestionnaire de sélection de client
  const handleClientSelect = useCallback((selectedClient: Client) => {
    if (selectedClient.status !== 'available') {
      return;
    }

    setClients(prevClients =>
      prevClients.map(client =>
        client.id === selectedClient.id
          ? { ...client, status: 'selected' }
          : client
      )
    );

    setActiveClient(selectedClient);
  }, []);

  // Gestionnaire d'acceptation de course
  const handleRideAccept = useCallback((client: Client) => {
    setClients(prevClients =>
      prevClients.map(c =>
        c.id === client.id
          ? { ...c, status: 'accepted' }
          : c
      )
    );

    // Démarrer un timer pour la simulation de la course
    setTimeout(() => {
      setClients(prevClients =>
        prevClients.map(c =>
          c.id === client.id
            ? { ...c, status: 'in_progress' }
            : c
        )
      );
    }, 3000);
  }, []);

  // Gestionnaire de fin de course
  const handleRideComplete = useCallback((client: Client) => {
    // Calculer le rating aléatoire entre 4 et 5
    const rating = 4 + Math.random();

    // Mettre à jour la progression
    setProgress(prev => {
      const newHistory = [
        ...prev.ridesHistory,
        {
          date: new Date(),
          earnings: client.price,
          distance: client.distance,
          rating: rating,
        },
      ];

      const totalRatings = newHistory.reduce((acc, ride) => acc + ride.rating, 0);
      const newAverageRating = totalRatings / newHistory.length;

      return {
        ...prev,
        earnedToday: prev.earnedToday + client.price,
        completedRides: prev.completedRides + 1,
        totalDistance: prev.totalDistance + client.distance,
        averageRating: newAverageRating,
        ridesHistory: newHistory,
      };
    });

    // Retirer le client de la liste après un délai
    setTimeout(() => {
      setClients(prev => prev.filter(c => c.id !== client.id));
      setActiveClient(null);
    }, 3000);

    setClients(prevClients =>
      prevClients.map(c =>
        c.id === client.id
          ? { ...c, status: 'completed' }
          : c
      )
    );
  }, []);

  // Gestionnaire d'annulation de course
  const handleRideCancel = useCallback((client: Client) => {
    setClients(prevClients =>
      prevClients.map(c =>
        c.id === client.id
          ? { ...c, status: 'cancelled' }
          : c
      )
    );

    setTimeout(() => {
      setClients(prev => prev.filter(c => c.id !== client.id));
      setActiveClient(null);
    }, 3000);
  }, []);

  // Gestionnaire de mise à jour de l'objectif journalier
  const handleUpdateDailyGoal = useCallback((newGoal: number) => {
    setProgress(prev => ({ ...prev, dailyGoal: newGoal }));
    localStorage.setItem('dailyGoal', newGoal.toString());
  }, []);

  return {
    clients,
    setClients,
    progress,
    activeClient,
    handleClientSelect,
    handleRideAccept,
    handleRideComplete,
    handleRideCancel,
    handleUpdateDailyGoal,
  };
}
