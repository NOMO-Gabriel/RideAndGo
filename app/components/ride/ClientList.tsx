'use client';

import { Client } from '../../lib/types/ride';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClientListProps {
  clients: Client[];
  activeClient: Client | null;
  onClientSelect: (client: Client) => void;
  onRideAccept: (client: Client) => void;
  onRideComplete: (client: Client) => void;
  onRideCancel: (client: Client) => void;
}

export default function ClientList({
  clients,
  activeClient,
  onClientSelect,
  onRideAccept,
  onRideComplete,
  onRideCancel
}: ClientListProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDistance = (distance: number) => {
    return `${distance.toFixed(1)} km`;
  };

  const formatDuration = (duration: number) => {
    return `${duration} min`;
  };

  const handleClientClick = (client: Client) => {
    if (client.status === 'available') {
      setSelectedClient(client);
      setShowConfirmation(true);
    }
  };

  const handleConfirmRide = () => {
    if (selectedClient) {
      onClientSelect(selectedClient);
      setShowConfirmation(false);
    }
  };

  const getStatusBadge = (status: Client['status']) => {
    const badges = {
      available: 'bg-green-100 text-green-800',
      selected: 'bg-blue-100 text-blue-800',
      accepted: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    const labels = {
      available: 'Disponible',
      selected: 'Sélectionné',
      accepted: 'Accepté',
      in_progress: 'En cours',
      completed: 'Terminé',
      cancelled: 'Annulé'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {clients.map((client) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-white font-semibold">{client.name}</h3>
                <p className="text-blue-200 text-sm">
                  {formatDistance(client.distance)} • {formatDuration(client.estimatedDuration)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{formatPrice(client.price)}</p>
                {getStatusBadge(client.status)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0" />
                <p className="truncate">{client.pickupLocation.name}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0" />
                <p className="truncate">{client.destination.name}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {client.status === 'available' && (
                <button
                  onClick={() => handleClientClick(client)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
                >
                  <span>Select this Client</span>
                </button>
              )}
              {client.status === 'selected' && (
                <>
                  <button
                    onClick={() => onRideAccept(client)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
                  >
                    <span>Accept Ride</span>
                  </button>
                  <button
                    onClick={() => onRideCancel(client)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
                  >
                    <span>Cancel</span>
                  </button>
                </>
              )}
              {client.status === 'in_progress' && (
                <button
                  onClick={() => onRideComplete(client)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
                >
                  <span>Complete Ride</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirmation && selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A2942] p-6 rounded-xl shadow-xl max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-white mb-4">Confirm Selection</h3>
              <p className="text-blue-200 mb-6">
                Do you want to select this client? You'll have 30 seconds to accept the ride.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onClientSelect(selectedClient);
                    setShowConfirmation(false);
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
