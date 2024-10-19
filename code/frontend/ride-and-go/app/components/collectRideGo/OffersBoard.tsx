import { useState } from "react";
import AcceptedCard from "@/app/components/cards/AcceptedCard";
import { useLocale } from "@/app/utils/hooks/useLocale.js";

type Offer = {
  id: number;
  startPoint: string;
  endPoint: string;
  cost: number;
  seats: number;     
  baggageAllowed: boolean;
};

const destinations = [
  "Bastos", "Ekounou", "Ngousso", "Essos", "Nkolbisson", "Etoudi", "Melen",
];

// Génère 5 offres aléatoires avec places et option bagages
const generateOffers = () => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: i,
    startPoint: destinations[Math.floor(Math.random() * destinations.length)],
    endPoint: destinations[Math.floor(Math.random() * destinations.length)],
    cost: Math.floor(Math.random() * 5000) + 1000,
    seats: Math.floor(Math.random() * 5) + 1,
    baggageAllowed: Math.random() > 0.5,
  }));
};

const OffersBoard: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>(generateOffers());
  const [showAcceptedCard, setShowAcceptedCard] = useState(false);
  const [acceptedOffer, setAcceptedOffer] = useState<Offer | null>(null);
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
  };

  const handleAccept = (offer: Offer) => {
    setAcceptedOffer(offer);
    setShowAcceptedCard(true);
  };

  return (
    <div className="offers-board flex flex-col items-center border rounded-lg shadow-md p-6 bg-white w-[700px]">
      <h1 className="text-2xl font-bold bg-bleu-nuit mb-4">
        {currentContent.title}
      </h1>

      <table className="table-auto border-collapse border w-full">
        <thead>
          <tr>
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
              <td className="border px-4 py-2">{offer.startPoint}</td>
              <td className="border px-4 py-2">{offer.endPoint}</td>
              <td className="border px-4 py-2">{offer.cost}</td>
              <td className="border px-4 py-2">{offer.seats}</td>
              <td className="border px-4 py-2">
                {offer.baggageAllowed ? currentContent.yes : currentContent.no}
              </td>
              <td className="border px-4 py-2 flex space-x-2">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-800 transition"
                  onClick={() => handleAccept(offer)}
                >
                  {currentContent.confirm}
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition"
                  onClick={() => handleReject(offer.id)}
                >
                  {currentContent.reject}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAcceptedCard && acceptedOffer && (
        <AcceptedCard offer={acceptedOffer} onClose={() => setShowAcceptedCard(false)} />
      )}
    </div>
  );
};

export default OffersBoard;
