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
  name: 'Premium Plan',
  price: '$30/month',
  paymentDate: '2024-10-15',
  details: 'Includes unlimited access to all features and premium support.',
};

const otherSubscriptions: Subscription[] = [
  {
    id: 2,
    name: 'Basic Plan',
    price: '$10/month',
    paymentDate: '2024-10-01',
    details: 'Includes access to basic features.',
  },
  {
    id: 3,
    name: 'Pro Plan',
    price: '$20/month',
    paymentDate: '2024-09-25',
    details: 'Includes access to advanced features and priority support.',
  },
];

const subscriptionContent = {
  en: {
    title: "Subscription",
    current: "Current Subscription",
    moreDetails: "See more details",
    otherSubscriptions: "Other Subscriptions",
    subscribe: "Subscribe",
    popup: {
      close: "Close",
    },
  },
  fr: {
    title: "Abonnement",
    current: "Abonnement Actuel",
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
  const {locale} = useLocale(); // Hook d'internationalisation

  // Fonction pour fermer le popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Obtenir le contenu localisé
  const localizedContent = subscriptionContent[locale as "fr" | "en"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{localizedContent.title}</h2>
      
      {/* Rectangle vert pour l'abonnement actuel */}
      <div className="bg-green-500 text-white p-4 rounded-lg mb-4 text-center">
        <h3 className="font-bold">{localizedContent.current}</h3>
        <p>{currentSubscription.name}</p>
        <p>{currentSubscription.price}</p>
        <p>{`Payment Date: ${currentSubscription.paymentDate}`}</p>
        <button
          className="mt-2 text-yellow-300 underline"
          onClick={() => setShowPopup(true)}
        >
          {localizedContent.moreDetails}
        </button>
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
      <div className="flex flex-col space-y-4">
        {otherSubscriptions.map(subscription => (
          <div key={subscription.id} className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h4 className="font-bold">{subscription.name}</h4>
            <p>{subscription.price}</p>
            <p>{`Payment Date: ${subscription.paymentDate}`}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
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
