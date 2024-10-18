'use client';
import React, { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js'; // Assurez-vous que ce chemin est correct

// Type pour les plaintes
interface Complaint {
  id: number;
  title: string;
  miniDescription: string;
  content: string; // Contenu complet de la plainte
  time: string;
  status: 'pending' | 'resolved'; // Statut de la plainte
  imageUrl: string; // URL de l'image
}

// Données fictives pour les plaintes
const fakeComplaints: Complaint[] = [
  {
    id: 1,
    title: 'Service Delay',
    miniDescription: 'There was a delay in service response.',
    content: 'The service was delayed by 30 minutes. Please investigate this issue.',
    time: '10:00 AM',
    status: 'pending',
    imageUrl: 'https://via.placeholder.com/50',
  },
  // Ajoutez d'autres plaintes ici...
];

const complaintsContent = {
  en: {
    title: "Complaints",
    filter: {
      all: "All",
      pending: "Pending",
      resolved: "Resolved"
    },
    popup: {
      close: "Close",
    },
  },
  fr: {
    title: "Plaintes",
    filter: {
      all: "Tous",
      pending: "En attente",
      resolved: "Résolues"
    },
    popup: {
      close: "Fermer",
    },
  },
};

const Complaints = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  const [complaints, setComplaints] = useState<Complaint[]>(fakeComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { locale } = useLocale(); // Hook d'internationalisation

  // Filtrer les plaintes selon le filtre sélectionné
  const filteredComplaints = complaints.filter((complaint) => {
    if (filter === 'all') return true;
    return complaint.status === filter;
  });

  // Fonction pour supprimer une plainte
  const handleDelete = (id: number) => {
    setComplaints(complaints.filter(complaint => complaint.id !== id));
  };

  // Fonction pour afficher le popup
  const handleShowPopup = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setShowPopup(true);
  };

  // Fonction pour fermer le popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedComplaint(null);
  };

  // Obtenir le contenu localisé
  const localizedContent = complaintsContent[locale as "fr" | "en"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{localizedContent.title}</h2>
      <div className="mb-4">
        <select value={filter} onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'resolved')}>
          <option value="all">{localizedContent.filter.all}</option>
          <option value="pending">{localizedContent.filter.pending}</option>
          <option value="resolved">{localizedContent.filter.resolved}</option>
        </select>
      </div>
      <div className="flex flex-col space-y-4">
        {filteredComplaints.map(complaint => (
          <div key={complaint.id} className="bg-gray-200 p-4 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={complaint.imageUrl} alt="Complaint" className="w-12 h-12" />
              <div>
                <h3 className="font-bold">{complaint.title}</h3>
                <p className="text-sm">{complaint.miniDescription}</p>
                <span className="text-xs text-gray-600">{complaint.time}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="text-blue-600"
                onClick={() => handleShowPopup(complaint)}
              >
                Voir plus
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(complaint.id)}
              >
                Supprimer
              </button>
              <button
                className="text-green-600"
                onClick={() => console.log(`Archiving complaint with id: ${complaint.id}`)}
              >
                Archiver
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup pour afficher le contenu complet de la plainte */}
      {showPopup && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-2">{selectedComplaint.title}</h3>
            <p>{selectedComplaint.content}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleClosePopup}
            >
              {localizedContent.popup.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;
