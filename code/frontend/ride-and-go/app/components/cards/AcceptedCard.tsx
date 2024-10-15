type Offer = {
  id: number;
  startPoint: string;
  endPoint: string;
  cost: number;
  seats: number;
  baggageAllowed: boolean;
};

type AcceptedCardProps = {
  offer: Offer;
  onClose: () => void;
};

const AcceptedCard: React.FC<AcceptedCardProps> = ({ offer, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-[400px]">
        <h2 className="text-2xl font-bold text-green-700">Offre Acceptée</h2>
        
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Départ : </span> 
            {offer.startPoint}
          </p>
          <p>
            <span className="font-semibold">Arrivée : </span> 
            {offer.endPoint}
          </p>
          <p>
            <span className="font-semibold">Coût : </span> 
            {offer.cost} FCFA
          </p>
          <p>
            <span className="font-semibold">Places disponibles : </span> 
            {offer.seats}
          </p>
          <p>
            <span className="font-semibold">Bagages : </span> 
            {offer.baggageAllowed ? "Oui" : "Non"}
          </p>
        </div>

        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-bleu-nuit transition"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default AcceptedCard;
