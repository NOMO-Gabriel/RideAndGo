'use client';
import React, { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js'; // Assurez-vous que ce chemin est correct

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
    imageUrl: 'https://via.placeholder.com/50',
  },
  // Ajoute d'autres notifications ici...
];

const notificationsContent = {
  en: {
    title: "Notifications",
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
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
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

  // Fonction pour afficher le popup
  const handleShowPopup = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowPopup(true);
  };

  // Fonction pour fermer le popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedNotification(null);
  };

  // Obtenir le contenu localisé
  const localizedContent = notificationsContent[locale as "fr" | "en"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{localizedContent.title}</h2>
      <div className="mb-4">
        <select value={filter} onChange={(e) => setFilter(e.target.value as 'all' | 'alert' | 'new' | 'archived')}>
          <option value="all">{localizedContent.filter.all}</option>
          <option value="alert">{localizedContent.filter.alert}</option>
          <option value="new">{localizedContent.filter.new}</option>
          <option value="archived">{localizedContent.filter.archived}</option>
        </select>
      </div>
      <div className="flex flex-col space-y-4">
        {filteredNotifications.map(notification => (
          <div key={notification.id} className="bg-gray-200 p-4 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={notification.imageUrl} alt="Notification" className="w-12 h-12" />
              <div>
                <h3 className="font-bold">{notification.title}</h3>
                <p className="text-sm">{notification.miniDescription}</p>
                <span className="text-xs text-gray-600">{notification.time}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="text-blue-600"
                onClick={() => handleShowPopup(notification)}
              >
                Voir plus
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(notification.id)}
              >
                Supprimer
              </button>
              <button
                className="text-green-600"
                onClick={() => console.log(`Archiving notification with id: ${notification.id}`)}
              >
                Archiver
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup pour afficher le contenu complet de la notification */}
      {showPopup && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-2">{selectedNotification.title}</h3>
            <p>{selectedNotification.content}</p>
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

export default Notifications;
