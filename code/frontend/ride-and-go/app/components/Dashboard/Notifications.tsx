'use client';
import React, { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faArchive } from '@fortawesome/free-solid-svg-icons';

// Type pour les notifications
interface Notification {
  id: number;
  title: string;
  miniDescription: string;
  content: string; // Contenu complet de la notification
  time: string;
  type: 'alert' | 'new' | 'archived'; // Type de notification
  imageUrl: string; // URL de l'image
}

// Données fictives pour les notifications
const fakeNotifications: Notification[] = [
  {
    id: 1,
    title: 'Server Down Alert',
    miniDescription: 'The server is down for maintenance.',
    content: 'The server will be down for maintenance from 10:00 AM to 12:00 PM. Please plan accordingly.',
    time: '10:00 AM',
    type: 'alert',
    imageUrl: '/images/profileImage.png',
  },
  {
    id: 2,
    title: 'New Feature Available',
    miniDescription: 'Check out the new feature we just released.',
    content: 'We have released a new feature that allows you to do more with our platform.',
    time: '11:00 AM',
    type: 'new',
    imageUrl: '/images/profileImageBoy.jpeg',
  },
  {
    id: 3,
    title: 'Archived Notification',
    miniDescription: 'This notification has been archived.',
    content: 'This notification has been archived for future reference.',
    time: '12:00 AM',
    type: 'archived',
    imageUrl: '/images/profileImageGirl.jpeg',
  },
  {
    id: 4,
    title: 'Server Down Alert',
    miniDescription: 'The server is down for maintenance.',
    content: 'The server will be down for maintenance from 10:00 AM to 12:00 PM. Please plan accordingly.',
    time: '1:00 PM',
    type: 'alert',
    imageUrl: '/images/profileImage.png',
  },
  {
    id: 5,
    title: 'New Feature Available',
    miniDescription: 'Check out the new feature we just released.',
    content: 'We have released a new feature that allows you to do more with our platform.',
    time: '2:00 PM',
    type: 'new',
    imageUrl: '/images/profileImageBoy.jpeg',
  },
  {
    id: 6,
    title: 'Archived Notification',
    miniDescription: 'This notification has been archived.',
    content: 'This notification has been archived for future reference.',
    time: '3:00 PM',
    type: 'archived',
    imageUrl: '/images/profileImageGirl.jpeg',
  },
];

const content = {
  en: {
    title: "Notifications",
    alt: "picture",
    filter: {
      all: "All",
      alert: "Alerts",
      new: "New",
      archived: "Archived"
    },
    popup: {
      close: "Close",
    },
  },
  fr: {
    title: "Notifications",
    alt: "photo",
    filter: {
      all: "Tous",
      alert: "Alertes",
      new: "Nouveau",
      archived: "Archivé"
    },
    popup: {
      close: "Fermer",
    },
  },
};

const Notifications = () => {
  const [filter, setFilter] = useState<'all' | 'alert' | 'new' | 'archived'>('all');
  const [notifications, setNotifications] = useState<Notification[]>(fakeNotifications);
  const [expandedNotification, setExpandedNotification] = useState<number | null>(null);
  const { locale } = useLocale(); // Hook d'internationalisation

  // Filtrer les notifications selon le filtre sélectionné
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  // Fonction pour supprimer une notification
  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Fonction pour afficher/fermer le contenu déroulant
  const handleToggleExpand = (id: number) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  // Obtenir le contenu localisé
  const localizedContent = locale === 'en' ? content.en : content.fr;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{localizedContent.title}</h2>
      <div className="mb-4 rounded-lg">
        <select className={"p-2 w-max text-center rounded font-medium"} value={filter} onChange={(e) => setFilter(e.target.value as 'all' | 'alert' | 'new' | 'archived')}>
          <option value="all">{localizedContent.filter.all}</option>
          <option value="alert">{localizedContent.filter.alert}</option>
          <option value="new">{localizedContent.filter.new}</option>
          <option value="archived">{localizedContent.filter.archived}</option>
        </select>
      </div>
      <div className="flex flex-col space-y-4">
        {filteredNotifications.map(notification => (
          <div key={notification.id} className="bg-gray-50 p-4 rounded-xl shadow-md border flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  width={100}
                  height={100}
                  alt={localizedContent.alt}
                  className="w-12 h-12 rounded-full"
                  src={notification.imageUrl}
                />
                <div>
                  <h3 className="font-bold">{notification.title}</h3>
                  <p className="text-sm">{notification.miniDescription}</p>
                  <span className="text-xs text-blue-600">{notification.time}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-blue-600"
                  onClick={() => handleToggleExpand(notification.id)}
                >
                  <FontAwesomeIcon icon={expandedNotification === notification.id ? faMinus : faPlus} />
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(notification.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  className="text-black"
                  onClick={() => console.log(`Archiving notification with id: ${notification.id}`)}
                >
                  <FontAwesomeIcon icon={faArchive} />
                </button>
              </div>
            </div>
            {expandedNotification === notification.id && (
              <div className="mt-4 bg-white p-4 rounded shadow-lg">
                <p className='text-start text-base'>{notification.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
