'use client';
import React, { useEffect, useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faArchive } from '@fortawesome/free-solid-svg-icons';
import { getAllNotifications } from '@/app/utils/api/notifications';
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';
//Type pour les notifications
// interface Notification {
//   id: number;
//   title: string;
//   miniDescription: string;
//   content: string; // Contenu complet de la notification
//   time: string;
//   type: 'alert' | 'new' | 'archived'; // Type de notification
//   imageUrl: string; // URL de l'image
// }

interface Notification {
  id: number;
  title: string;
  message: string;
  date: Date;
  state: string;
}



//Données fictives pour les notifications
const fakeNotifications: Notification[] = [
  {
      id: 1,
      title: "Nouveau trajet disponible",
      message: "Un conducteur propose un trajet Paris-Lyon pour le 15 février",
      date: new Date("2024-02-07T10:30:00"),
      state: "unread"
  },
  {
      id: 2,
      title: "Réservation confirmée",
      message: "Votre réservation pour le trajet Marseille-Nice a été confirmée",
      date: new Date("2024-02-07T09:15:00"),
      state: "read"
  },
  {
      id: 3,
      title: "Modification d'itinéraire",
      message: "Le conducteur a légèrement modifié l'heure de départ (+15 min)",
      date: new Date("2024-02-06T18:45:00"),
      state: "unread"
  },
  {
      id: 4,
      title: "Nouveau message",
      message: "Vous avez reçu un message de votre conducteur concernant le trajet",
      date: new Date("2024-02-06T15:20:00"),
      state: "read"
  },
  {
      id: 5,
      title: "Rappel de trajet",
      message: "Votre trajet pour Bordeaux est prévu dans 2 heures",
      date: new Date("2024-02-06T14:00:00"),
      state: "read"
  },
  {
      id: 6,
      title: "Évaluation en attente",
      message: "N'oubliez pas d'évaluer votre dernier trajet avec Jean D.",
      date: new Date("2024-02-06T10:30:00"),
      state: "unread"
  },
  {
      id: 7,
      title: "Promotion spéciale",
      message: "Profitez de -20% sur votre prochain trajet ce weekend!",
      date: new Date("2024-02-05T16:45:00"),
      state: "read"
  },
  {
      id: 8,
      title: "Mise à jour de l'application",
      message: "Une nouvelle version de RideAndGo est disponible",
      date: new Date("2024-02-05T11:20:00"),
      state: "read"
  }
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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [expandedNotification, setExpandedNotification] = useState<number | null>(null);
  const { locale } = useLocale(); // Hook d'internationalisation
  const { showFlashMessage } = useFlashMessage(); 
  const fetchNotifications = async () => {
    try {
        // Utiliser les données mockées en développement
        if (process.env.NODE_ENV === 'development') {
            setNotifications(fakeNotifications);
            return;
        }
        // En production, utiliser l'API réelle
        const data = await getAllNotifications();
        setNotifications(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des notifications:', error);
        showFlashMessage('Erreur lors de la récupération des notifications.', "error", true);
    }
};

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Filtrer les notifications selon le filtre sélectionné
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    return notification.state  === filter;
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
                <div>
                  <h3 className="font-bold">{notification.title}</h3>
                  <p className="text-sm">{notification.message}</p>
                  <span className="text-xs text-blue-600">{notification.date.toString()}</span>
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
                <p className='text-start text-base'>{notification.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
