'use client';
import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faStar } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/app/utils/hooks/useUser';
import { getSubscriptions, getUserSubscription, changeUserSubscription } from '@/app/utils/api/suscribtion';

// Type pour les abonnements
interface Subscription {
  id: string | undefined;
  label: string;
  price: string;
  features: string[];
}

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

  // Obtenir le contenu localisé
  const localizedContent = subscriptionContent[locale as "fr" | "en"];

  // Charger l'abonnement actuel de l'utilisateur
  useEffect(() => {
    const fetchCurrentSubscription = async () => {
      if (user?.id) {
        try {
          const subscription = await getUserSubscription(user?.id);
          setCurrentSubscription(subscription);
        } catch (error) {
          console.error("Failed to load current subscription:", error);
        }
      }
    };
    fetchCurrentSubscription();
  }, [user?.id]);

  // Charger les autres abonnements
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const allSubscriptions = await getSubscriptions();
        const filteredSubscriptions = allSubscriptions.filter(
          (sub: Subscription) => sub.label !== currentSubscription?.label
        );
        setOtherSubscriptions(filteredSubscriptions);
      } catch (error) {
        console.error("Failed to load subscriptions:", error);
        alert("Failed to load subscriptions");
      }
    };
    fetchSubscriptions();
  }, [currentSubscription]);

  // Changer l'abonnement de l'utilisateur
  const handleSubscriptionChange = async (subscriptionLabel: string) => {
    if (user?.id) {
      try {
        await changeUserSubscription(subscriptionLabel, user.id);
        alert(`Subscription changed to ${subscriptionLabel}`);
        setCurrentSubscription(await getUserSubscription(user.id)); // Refresh current subscription
      } catch (error) {
        console.error("Failed to change subscription:", error);
        alert("Failed to change subscription");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{localizedContent.title}</h2>

      {/* Abonnement actuel */}
      {currentSubscription && (
        <div className="flex flex-col items-center bg-orange-100 text-black shadow-md p-6 rounded-lg mb-4 w-80 text-center">
          <div className="flex space-x-1 items-center mb-2">
            <FontAwesomeIcon icon={faCrown} className="text-orange-btn text-xl" />
            <h3 className="font-bold text-xl">{localizedContent.current}</h3>
          </div>
          <p className="text-base mb-1">{currentSubscription.label}</p>
          <p className="text-base mb-4">{currentSubscription.price}</p>
          <button
            className="mt-2 text-yellow-600 underline text-sm"
            onClick={() => setShowPopup(true)}
          >
            {localizedContent.moreDetails}
          </button>
          {showPopup && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h4 className="text-lg font-bold mb-2">{currentSubscription.label}</h4>
                <ul className="list-disc list-inside">
                  {currentSubscription.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => setShowPopup(false)}
                >
                  {localizedContent.popup.close}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Autres abonnements */}
      <h3 className="text-xl font-bold my-4">{localizedContent.otherSubscriptions}</h3>
      <div className="flex flex-wrap gap-4">
        {otherSubscriptions.map((subscription) => (
          <div key={subscription.id} className="bg-gray-200 p-6 rounded-lg shadow-md w-80">
            <div className="flex items-center space-x-2 mb-2">
              <FontAwesomeIcon icon={faStar} className="text-orange-btn text-xl" />
              <h4 className="font-bold text-xl">{subscription.label}</h4>
            </div>
            <p className="text-orange-btn mb-2">{subscription.price}</p>
            <ul className="list-disc list-inside">
              {subscription.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button
              className="w-full bg-blue-600 text-white font-bold rounded-lg py-2 mt-4 hover:bg-blue-700"
              onClick={() => handleSubscriptionChange(subscription.label)}
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
