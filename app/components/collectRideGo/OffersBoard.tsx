import { useState } from "react";
// import AcceptedCard from "@/app/components/cards/AcceptedCard";
import RejectConfirmation from "@/app/components/cards/RejectConfirmation"; // Import du composant
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import { FaCheckCircle, FaTimesCircle, FaUser } from "react-icons/fa";

type Offer = {
  id: number;
  startPoint: string;
  endPoint: string;
  cost: number;
  seats: number;
  baggageIncluded: boolean;
};

const destinations = ["Bastos", "Ekounou", "Ngousso", "Essos", "Nkolbisson", "Etoudi", "Melen"];

const generateOffers = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: i,
    startPoint: destinations[Math.floor(Math.random() * destinations.length)],
    endPoint: destinations[Math.floor(Math.random() * destinations.length)],
    cost: Math.floor(Math.random() * 5000) + 1000,
    seats: Math.floor(Math.random() * 5) + 1,
    baggageIncluded: Math.random() > 0.5,
  }));
};

const OffersBoard: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>(generateOffers());
  const [showAcceptedCard, setShowAcceptedCard] = useState(false);
  const [acceptedOffer, setAcceptedOffer] = useState<Offer | null>(null);
  const [offerToReject, setOfferToReject] = useState<Offer | null>(null); // État pour l'offre à rejeter
  const { locale } = useLocale();

  const content = {
    fr: {
      title: "Offres Disponibles",
      start: "Départ",
      end: "Arrivée",
      cost: "Coût (FCFA)",
      seats: "Places",
      baggage: "Bagages",
      confirm: "Confirmer",
      reject: "Refuser",
      yes: "Oui",
      no: "Non",
    },
    en: {
      title: "Available Offers",
      start: "Start Point",
      end: "End Point",
      cost: "Cost (FCFA)",
      seats: "Seats",
      baggage: "Baggage",
      confirm: "Confirm",
      reject: "Reject",
      yes: "Yes",
      no: "No",
    },
  };

  const currentContent = locale === 'en' ? content.en : content.fr;

  const handleReject = (id: number) => {
    setOffers((prev) => prev.filter((offer) => offer.id !== id));
    setOfferToReject(null); // Masquer le pop-up après suppression
  };

  const handleAccept = (offer: Offer) => {
    setAcceptedOffer(offer);
    setShowAcceptedCard(true);
  };

  const openRejectConfirmation = (offer: Offer) => {
    setOfferToReject(offer); // Afficher le pop-up de confirmation
  };

  return (
    <div className="offers-board flex flex-col items-center border rounded-lg shadow-md p-6 bg-white w-[800px]">
      <h1 className="text-2xl font-bold text-bleu-nuit mb-4">
        {currentContent.title}
      </h1>

      <table className="table-auto border-collapse border w-full text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">{currentContent.start}</th>
            <th className="border px-4 py-2">{currentContent.end}</th>
            <th className="border px-4 py-2">{currentContent.cost}</th>
            <th className="border px-4 py-2">{currentContent.seats}</th>
            <th className="border px-4 py-2">{currentContent.baggage}</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td className="border px-4 py-2 flex items-center justify-center">
                <FaUser className="mr-2" /> User{offer.id}
              </td>
              <td className="border px-4 py-2">{offer.startPoint}</td>
              <td className="border px-4 py-2">{offer.endPoint}</td>
              <td className="border px-4 py-2">{offer.cost}</td>
              <td className="border px-4 py-2">{offer.seats}</td>
              <td className="border px-4 py-2 text-center">
                {offer.baggageIncluded ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
              </td>
              <td className="border px-4 py-2">
                <a
                  href="#"
                  className="text-green-600 underline hover:text-green-800"
                  onClick={() => handleAccept(offer)}
                >
                  {currentContent.confirm}
                </a>
                {" | "}
                <a
                  href="#"
                  className="text-red-500 underline hover:text-red-700"
                  onClick={() => openRejectConfirmation(offer)}
                >
                  {currentContent.reject}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {showAcceptedCard && acceptedOffer && (
        <AcceptedCard offer={acceptedOffer} onClose={() => setShowAcceptedCard(false)} locale={locale} />
      )}

      {offerToReject && (
        <RejectConfirmation
          offer={offerToReject}
          onConfirm={() => handleReject(offerToReject.id)}
          onCancel={() => setOfferToReject(null)}
          locale={locale}
        />
      )} */}
    </div>
  );
};

export default OffersBoard;