'use client';
import React, { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faStar, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// Type pour les abonnements
interface Subscription {
  id: number;
  name: string; // Nom de l'abonnement
  price: string; // Prix de l'abonnement
  paymentDate: string; // Date de paiement
  details: string; // Détails supplémentaires de l'abonnement
  icon: any; // Icône de l'abonnement
}

// Données fictives pour les abonnements
const currentSubscription: Subscription = {
  id: 1,
  name: 'Élite',
  price: '1000 $/an',
  paymentDate: '2024-10-15',
  details: 'Accès illimité à toutes les fonctionnalités, support premium et mises à jour mensuelles.',
  icon: faCrown,
};

const otherSubscriptions: Subscription[] = [
  {
    id: 2,
    name: 'Standard',
    price: '500 $/an',
    paymentDate: '2024-10-01',
    details: 'Accès à des fonctionnalités standard et support par e-mail.',
    icon: faStar,
  },
  {
    id: 3,
    name: 'Basique',
    price: '100 $/an',
    paymentDate: '2024-09-25',
    details: 'Accès limité aux fonctionnalités de base, sans support.',
    icon: faCheck,
  },
  {
    id: 4,
    name: 'SUPER',
    price: '1000 $/an',
    paymentDate: '2024-09-25',
    details: 'Accès limité aux fonctionnalités de base, sans support.',
    icon: faExclamationTriangle,
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
        
    <div className='flex items-center justify-center w-full'>

      <div className='flex flex-col justify-center items-center bg-orange-100 text-black shadow-md p-6 rounded-lg mb-4 text-center w-80'>
          <div className=" ">
            <h3 className="font-bold text-xl mb-2">{localizedContent.current}</h3>
            <p className="text-base mb-1">{currentSubscription.name}</p>
            <p className="text-base mb-1">{currentSubscription.price}</p>
            <p className="text-base mb-4">{`Date de paiement : ${currentSubscription.paymentDate}`}</p>
            <button
              className="mt-2 text-yellow-600 underline text-sm"
              onClick={() => setShowPopup(true)}
            >
              {localizedContent.moreDetails}
            </button>
          </div>

        {/* Popup pour afficher les détails supplémentaires de l'abonnement actuel */}
        {showPopup && (
          <div className="  flex justify-start items-center ">
            <div className=" p-4 w-full">
            
              <p>{currentSubscription.details}</p>
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleClosePopup}
              >
                {localizedContent.popup.close}
              </button>
            </div>
          </div>
        )}
        </div>      
    </div>


      {/* Liste des autres abonnements */}
      <h3 className="text-xl font-bold my-4">{localizedContent.otherSubscriptions}</h3>
      <div className="flex flex-row space-x-16 w-max h-max justify-center items-center">
        {otherSubscriptions.map(subscription => (
          <div key={subscription.id} className="bg-gray-200 p-6 rounded-lg shadow-md text-base space-y-4 justify-start w-[240px] hover:translate-y-2 hover:shadow-lg shadow-bleu-nuit">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={subscription.icon} className="text-orange-btn text-xl" />
              <h4 className="font-bold text-xl text-center">{subscription.name}</h4>
            </div>
            <p className='text-orange-btn'>{subscription.price}</p>
            <p>{subscription.details}</p>
            <ul className='list-disc pl-4 space-y-2 text-black text-sm'>
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
