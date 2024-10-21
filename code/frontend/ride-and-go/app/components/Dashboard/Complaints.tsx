'use client';
import React, { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faArchive } from '@fortawesome/free-solid-svg-icons';

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
    imageUrl: '/images/profileImageGirl.jpeg',
  },
  {
    id: 2,
    title: 'Billing Issue',
    miniDescription: 'There was an error in the billing process.',
    content: 'The billing process had an error. Please check the details.',
    time: '11:00 AM',
    status: 'pending',
    imageUrl: '/images/profileImageGirl.jpeg',
  },
  {
    id: 3,
    title: 'Support Request',
    miniDescription: 'Need assistance with a support request.',
    content: 'Please provide assistance with the support request.',
    time: '12:00 PM',
    status: 'resolved',
    imageUrl: '/images/profileImageGirl.jpeg',
  },
  {
    id: 4,
    title: 'Service Delay',
    miniDescription: 'There was a delay in service response.',
    content: 'The service was delayed by 30 minutes. Please investigate this issue.',
    time: '1:00 PM',
    status: 'pending',
    imageUrl: '/images/profileImageGirl.jpeg',
  },
  {
    id: 5,
    title: 'Billing Issue',
    miniDescription: 'There was an error in the billing process.',
    content: 'The billing process had an error. Please check the details.',
    time: '2:00 PM',
    status: 'pending',
    imageUrl: '/images/profileImageGirl.jpeg',
  },
  {
    id: 6,
    title: 'Support Request',
    miniDescription: 'Need assistance with a support request.',
    content: 'Please provide assistance with the support request.',
    time: '3:00 PM',
    status: 'resolved',
    imageUrl: '/images/profileImageGirl.jpeg',
  },
];

const complaintsContent = {
  en: {
    title: "Complaints",
    alt: "picture",
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
    alt: "photo",
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
  const [expandedComplaint, setExpandedComplaint] = useState<number | null>(null);
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

  // Fonction pour afficher/fermer le contenu déroulant
  const handleToggleExpand = (id: number) => {
    setExpandedComplaint(expandedComplaint === id ? null : id);
  };

  // Obtenir le contenu localisé
  const localizedContent = complaintsContent[locale as "fr" | "en"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{localizedContent.title}</h2>
      <div className="mb-4">
        <select className={"p-2 w-max text-center rounded font-medium"} value={filter} onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'resolved')}>
          <option value="all">{localizedContent.filter.all}</option>
          <option value="pending">{localizedContent.filter.pending}</option>
          <option value="resolved">{localizedContent.filter.resolved}</option>
        </select>
      </div>
      <div className="flex flex-col space-y-4">
        {filteredComplaints.map(complaint => (
          <div key={complaint.id} className="bg-gray-50 p-4 rounded-xl shadow-md border flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  width={100}
                  height={100}
                  alt={localizedContent.alt}
                  className="w-12 h-12 rounded-full"
                  src={complaint.imageUrl}
                />
                <div>
                  <h3 className="font-bold">{complaint.title}</h3>
                  <p className="text-sm">{complaint.miniDescription}</p>
                  <span className="text-xs text-blue-600">{complaint.time}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-blue-600"
                  onClick={() => handleToggleExpand(complaint.id)}
                >
                  <FontAwesomeIcon icon={expandedComplaint === complaint.id ? faMinus : faPlus} />
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(complaint.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  className="text-green-600"
                  onClick={() => console.log(`Archiving complaint with id: ${complaint.id}`)}
                >
                  <FontAwesomeIcon icon={faArchive} />
                </button>
              </div>
            </div>
            {expandedComplaint === complaint.id && (
              <div className="mt-4 bg-white p-4 rounded shadow-lg">
                <p className='text-start text-base'>{complaint.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;
