// RejectConfirmation.tsx
import React from "react";

type Offer = {
  id: number;
  startPoint: string;
  endPoint: string;
  cost: number;
  seats: number;
  baggageIncluded: boolean;
};

type RejectConfirmationProps = {
  offer: Offer;
  onConfirm: () => void;
  onCancel: () => void;
  locale: 'fr' | 'en';
};

const content = {
  fr: {
    title: "Confirmation de rejet",
    username: "Nom d'utilisateur",
    start: "Départ",
    end: "Arrivée",
    cost: "Coût",
    seats: "Places disponibles",
    baggage: "Bagages",
    baggageYes: "Oui",
    baggageNo: "Non",
    message: "Êtes-vous sûr de vouloir refuser cette offre ?",
    confirm: "Confirmer",
    cancel: "Annuler",
  },
  en: {
    title: "Reject Confirmation",
    username: "Username",
    start: "Start",
    end: "End",
    cost: "Cost",
    seats: "Available Seats",
    baggage: "Baggage",
    baggageYes: "Yes",
    baggageNo: "No",
    message: "Are you sure you want to reject this offer?",
    confirm: "Confirm",
    cancel: "Cancel",
  },
};

const RejectConfirmation: React.FC<RejectConfirmationProps> = ({ offer, onConfirm, onCancel, locale }) => {
  const currentContent = locale === 'en' ? content.en : content.fr;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-[400px]">
        <h2 className="text-2xl font-bold text-red-700">{currentContent.title}</h2>
        
        <p>{currentContent.message}</p>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">{currentContent.username} : </span> 
            User{offer.id}
          </p>
          <p>
            <span className="font-semibold">{currentContent.start} : </span> 
            {offer.startPoint}
          </p>
          <p>
            <span className="font-semibold">{currentContent.end} : </span> 
            {offer.endPoint}
          </p>
          <p>
            <span className="font-semibold">{currentContent.cost} : </span> 
            {offer.cost} FCFA
          </p>
          <p>
            <span className="font-semibold">{currentContent.seats} : </span> 
            {offer.seats}
          </p>
          <p>
            <span className="font-semibold">{currentContent.baggage} : </span> 
            {offer.baggageIncluded ? currentContent.baggageYes : currentContent.baggageNo}
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
            onClick={onConfirm}
          >
            {currentContent.confirm}
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            {currentContent.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectConfirmation;
