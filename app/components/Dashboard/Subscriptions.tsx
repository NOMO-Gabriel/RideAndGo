'use client';
import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/app/utils/hooks/useUser';
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';
import type { Subscription } from '@/app/utils/mocks/mockSubscriptions';
import { mockSubscriptions, mockUserSubscriptions } from '@/app/utils/mocks/mockSubscriptions';

const subscriptionContent = {
  en: {
    title: "Subscription Plans",
    current: "CURRENT PLAN",
    moreDetails: "See more details",
    otherSubscriptions: "Available Plans",
    subscribe: "Subscribe",
    monthly: "monthly",
    features: "Features included",
    popup: {
      close: "Close",
    },
  },
  fr: {
    title: "Plans d'Abonnement",
    current: "PLAN ACTUEL",
    moreDetails: "Voir plus de détails",
    otherSubscriptions: "Plans Disponibles",
    subscribe: "S'abonner",
    monthly: "par mois",
    features: "Fonctionnalités incluses",
    popup: {
      close: "Fermer",
    },
  },
};

const SubscriptionComponent = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [otherSubscriptions, setOtherSubscriptions] = useState<Subscription[]>([]);
  const { locale } = useLocale();
  const { user } = useUser();
  const { showFlashMessage } = useFlashMessage();
  const localizedContent = subscriptionContent[locale as "fr" | "en"];

  useEffect(() => {
    if (user?.id) {
      const userSubLabel = mockUserSubscriptions[user.id];
      const subscription = mockSubscriptions.find(sub => sub.label === userSubLabel);
      if (subscription) {
        setCurrentSubscription(subscription);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    const filteredSubscriptions = mockSubscriptions.filter(
      sub => sub.label !== currentSubscription?.label
    );
    setOtherSubscriptions(filteredSubscriptions);
  }, [currentSubscription]);

  const handleSubscriptionChange = async (subscriptionLabel: string) => {
    if (user?.id) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
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

  const formatPrice = (price: string) => {
    const [amount, period] = price.split('/');
    return (
      <div className="flex flex-col items-center mb-6">
        <span className="text-3xl font-bold">{amount}</span>
        {period && <span className="text-gray-500 text-sm">{localizedContent.monthly}</span>}
      </div>
    );
  };

  return (
    <div className="p-4 bg-gray-50 h-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{localizedContent.title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Plan actuel */}
        {currentSubscription && (
          <div className="bg-bleu-nuit rounded-lg shadow-md p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">{localizedContent.current}</h3>
              <FontAwesomeIcon icon={faCrown} className="text-yellow-300 text-2xl" />
            </div>
            <div className="mb-3">
              <h4 className="text-xl font-bold">{currentSubscription.label}</h4>
              {formatPrice(currentSubscription.price)}
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <h5 className="text-base font-semibold mb-2">{localizedContent.features}</h5>
              <ul className="space-y-2 text-sm">
                {currentSubscription.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-yellow-300 mr-2 text-xs" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Autres plans */}
        {otherSubscriptions.map((subscription) => (
          <div 
            key={subscription.id} 
            className="bg-white rounded-lg shadow-md p-4 flex flex-col border border-gray-100"
          >
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xl font-bold text-gray-800">{subscription.label}</h4>
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xl" />
              </div>
              {formatPrice(subscription.price)}
              <div className="bg-gray-50 rounded-lg p-3">
                <h5 className="text-base font-semibold mb-2 text-gray-700">{localizedContent.features}</h5>
                <ul className="space-y-2 text-sm">
                  {subscription.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2 text-xs" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              onClick={() => handleSubscriptionChange(subscription.label)}
              className="w-full mt-3 bg-bleu-nuit text-white py-2 px-4 rounded hover:bg-orange-btn transition-colors focus:outline-none focus:ring-2 focus:ring-orange-btn focus:ring-opacity-50"
            >
              {localizedContent.subscribe}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionComponent;
