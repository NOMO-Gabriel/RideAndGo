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
  locale: 'fr' | 'en'; 
};

const content = {
  fr: {
    title: "Offre Acceptée",
    start: "Départ",
    end: "Arrivée",
    cost: "Coût",
    seats: "Places disponibles",
    baggage: "Bagages",
    baggageYes: "Oui",
    baggageNo: "Non",
    close: "Fermer",
  },
  en: {
    title: "Accepted Offer",
    start: "Start",
    end: "End",
    cost: "Cost",
    seats: "Available Seats",
    baggage: "Baggage",
    baggageYes: "Yes",
    baggageNo: "No",
    close: "Close",
  },
};

const AcceptedCard: React.FC<AcceptedCardProps> = ({ offer, onClose, locale }) => {
  const currentContent = locale === 'en' ? content.en : content.fr;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-[400px]">
        <h2 className="text-2xl font-bold text-green-700">{currentContent.title}</h2>
        
        <div className="space-y-2">
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
            {offer.baggageAllowed ? currentContent.baggageYes : currentContent.baggageNo}
          </p>
        </div>

        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-bleu-nuit transition"
          onClick={onClose}
        >
          {currentContent.close}
        </button>
      </div>
    </div>
  );
};

export default AcceptedCard;
