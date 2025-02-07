'use client';
import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faStar } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/app/utils/hooks/useUser';
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';
import { mockSubscriptions, mockUserSubscriptions, Subscription } from '@/app/utils/mocks/mockSubscriptions';

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
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [otherSubscriptions, setOtherSubscriptions] = useState<Subscription[]>([]);
  const { locale } = useLocale();
  const { user } = useUser();
  const { showFlashMessage } = useFlashMessage();
  const localizedContent = subscriptionContent[locale as "fr" | "en"];

  // Charger l'abonnement actuel de l'utilisateur
  useEffect(() => {
    if (user?.id) {
      const userSubLabel = mockUserSubscriptions[user.id];
      const subscription = mockSubscriptions.find(sub => sub.label === userSubLabel);
      if (subscription) {
        setCurrentSubscription(subscription);
      }
    }
  }, [user?.id]);

  // Charger les autres abonnements
  useEffect(() => {
    const filteredSubscriptions = mockSubscriptions.filter(
      sub => sub.label !== currentSubscription?.label
    );
    setOtherSubscriptions(filteredSubscriptions);
  }, [currentSubscription]);

  // Changer l'abonnement de l'utilisateur
  const handleSubscriptionChange = async (subscriptionLabel: string) => {
    if (user?.id) {
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Trouver le nouvel abonnement
        const newSubscription = mockSubscriptions.find(sub => sub.label === subscriptionLabel);
        if (newSubscription) {
          setCurrentSubscription(newSubscription);
          showFlashMessage(`Abonnement changé pour ${subscriptionLabel}`, "success", true);
        }
      } catch (error) {
        console.error("Erreur lors du changement d'abonnement:", error);
        showFlashMessage("Erreur lors du changement d'abonnement", "error", true);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{localizedContent.title}</h2>

      {/* Abonnement actuel */}
      {currentSubscription && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{localizedContent.current}</h3>
            <FontAwesomeIcon icon={faCrown} className="text-yellow-500 text-2xl" />
          </div>
          <div className="mb-4">
            <h4 className="text-xl font-bold mb-2">{currentSubscription.label}</h4>
            <p className="text-gray-600">{currentSubscription.price}</p>
          </div>
          <ul className="list-disc list-inside mb-4">
            {currentSubscription.features.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Autres abonnements */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{localizedContent.otherSubscriptions}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherSubscriptions.map((subscription) => (
            <div key={subscription.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold">{subscription.label}</h4>
                <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-xl" />
              </div>
              <p className="text-gray-600 mb-4">{subscription.price}</p>
              <ul className="list-disc list-inside mb-4">
                {subscription.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscriptionChange(subscription.label)}
                className="w-full bg-bleu-nuit text-white py-2 px-4 rounded hover:bg-orange-btn transition-colors"
              >
                {localizedContent.subscribe}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
