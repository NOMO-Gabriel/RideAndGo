import { useState } from "react";
import AcceptedCard from "@/app/components/cards/AcceptedCard";

type Offer = {
  id: number;
  startPoint: string;
  endPoint: string;
  cost: number;
  seats: number;      // Nombre de places
  baggageAllowed: boolean; // Bagages : Oui ou Non
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
    seats: Math.floor(Math.random() * 5) + 1, // 1 à 5 places
    baggageAllowed: Math.random() > 0.5,      // Oui/Non aléatoire
  }));
};

const OffersBoard: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>(generateOffers());
  const [showAcceptedCard, setShowAcceptedCard] = useState(false);
  const [acceptedOffer, setAcceptedOffer] = useState<Offer | null>(null);

  const handleReject = (id: number) => {
    setOffers((prev) => prev.filter((offer) => offer.id !== id));
  };

  const handleAccept = (offer: Offer) => {
    setAcceptedOffer(offer);
    setShowAcceptedCard(true);
  };

  return (
    <div className="offers-board flex flex-col items-center border rounded-lg shadow-md p-6 bg-white w-[700px]">
      <h1 className="text-2xl font-bold bg-bleu-nuit mb-4">Offres Disponibles</h1>

      <table className="table-auto border-collapse border w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Départ</th>
            <th className="border px-4 py-2">Arrivée</th>
            <th className="border px-4 py-2">Coût (FCFA)</th>
            <th className="border px-4 py-2">Places</th>
            <th className="border px-4 py-2">Bagages</th>
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
                {offer.baggageAllowed ? "Oui" : "Non"}
              </td>
              <td className="border px-4 py-2 flex space-x-2">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-800 transition"
                  onClick={() => handleAccept(offer)}
                >
                  Confirmer
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition"
                  onClick={() => handleReject(offer.id)}
                >
                  Refuser
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
