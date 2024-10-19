'use client';
import React, { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js'; 

// Type pour les abonnements
interface Subscription {
  id: number;
  name: string; // Nom de l'abonnement
  price: string; // Prix de l'abonnement
  paymentDate: string; // Date de paiement
  details: string; // Détails supplémentaires de l'abonnement
}

// Données fictives pour les abonnements
const currentSubscription: Subscription = {
  id: 1,
  name: 'Élite',
  price: '1000 $/an',
  paymentDate: '2024-10-15',
  details: 'Accès illimité à toutes les fonctionnalités, support premium et mises à jour mensuelles.',
};

const otherSubscriptions: Subscription[] = [
  {
    id: 2,
    name: 'Standard',
    price: '500 $/an',
    paymentDate: '2024-10-01',
    details: 'Accès à des fonctionnalités standard et support par e-mail.',
  },
  {
    id: 3,
    name: 'Basique',
    price: '100 $/an',
    paymentDate: '2024-09-25',
    details: 'Accès limité aux fonctionnalités de base, sans support.',
  },
  
  {
    id: 4,
    name: 'SUPER',
    price: '1000 $/an',
    paymentDate: '2024-09-25',
    details: 'Accès limité aux fonctionnalités de base, sans support.',
  },

];

const subscriptionContent = {
  en: {
    title: "Subscription",
    current: "CURRENT SUBSCRIPTION",
    moreDetails: "See more details",
    otherSubscriptions: "Other Subscriptions",
    subscribe: "Subscribe",
    popup: {
      close: "Close",
    },
  },
  fr: {
    title: "Abonnement",
    current: "ABONNEMENT ACTUEL",
    moreDetails: "Voir plus de détails",
    otherSubscriptions: "Autres Abonnements",
    subscribe: "S'abonner",
    popup: {
      close: "Fermer",
    },
  },
};

const Subscription = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { locale } = useLocale(); // Hook d'internationalisation

  // Fonction pour fermer le popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Obtenir le contenu localisé
  const localizedContent = subscriptionContent[locale as "fr" | "en"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{localizedContent.title}</h2>
      
      {/* Rectangle pour l'abonnement actuel */}
      <div className='flex justify-center items-center'>
        <div className="bg-orange-200 text-black p-4 rounded-lg mb-4 text-center w-80 h-max">
          <h3 className="font-bold">{localizedContent.current}</h3>
          <p>{currentSubscription.name}</p>
          <p>{currentSubscription.price}</p>
          <p>{`Date de paiement : ${currentSubscription.paymentDate}`}</p>
          <button
            className="mt-2 text-yellow-300 underline"
            onClick={() => setShowPopup(true)}
          >
            {localizedContent.moreDetails}
          </button>
        </div>
      </div>
      
      {/* Popup pour afficher les détails supplémentaires de l'abonnement actuel */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-2">{currentSubscription.name}</h3>
            <p>{currentSubscription.details}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleClosePopup}
            >
              {localizedContent.popup.close}
            </button>
          </div>
        </div>
      )}

      {/* Liste des autres abonnements */}
      <h3 className="text-xl font-bold my-4">{localizedContent.otherSubscriptions}</h3>
      <div className="flex flex-row space-x-16 w-max h-max justify-center items-center">
        {otherSubscriptions.map(subscription => (
          <div key={subscription.id} className="bg-gray-200 p-6 rounded-lg shadow-md text-2xl space-y-4 justify-start w-[240px] hover:translate-y-2 hover:shadow-lg shadow-bleu-nuit">
            <h4 className="font-bold text-3xl text-center">{subscription.name}</h4>
            <p className='text-orange-btn'>{subscription.price}</p>
            <p>{subscription.details}</p>
            <ul className='flex flex-col space-y-2 text-black text-xl p-2'>
              <li>{locale === 'en' ? 'Faster service' : 'Service plus rapide'}</li>
              <li>{locale === 'en' ? 'More clients' : 'Plus de clients'}</li>
              <li>{locale === 'en' ? 'More storage' : 'Plus de stockage'}</li>
              <li>{locale === 'en' ? 'More visibility' : 'Plus de visibilité'}</li>
            </ul>
            <button
              className="w-full h-14 bg-bleu-nuit text-white font-extrabold rounded-lg hover:bg-blue-900 mt-4"
              onClick={() => console.log(`Subscribing to ${subscription.name}`)}
            >
              {localizedContent.subscribe}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
