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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg space-y-3 md:space-y-4 w-full max-w-[400px] mx-4">
        <h2 className="text-xl md:text-2xl font-bold text-green-700">{currentContent.title}</h2>
        <div className="space-y-2">
          {[
            { label: currentContent.start, value: offer.startPoint },
            { label: currentContent.end, value: offer.endPoint },
            { label: currentContent.cost, value: `${offer.cost} FCFA` },
            { label: currentContent.seats, value: offer.seats },
            { label: currentContent.baggage, value: offer.baggageAllowed ? currentContent.baggageYes : currentContent.baggageNo }
          ].map((item, index) => (
            <p key={index} className="text-sm md:text-base">
              <span className="font-semibold">{item.label}: </span>
              {item.value}
            </p>
          ))}
        </div>
        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-bleu-nuit 
          transition-colors text-sm md:text-base"
          onClick={onClose}
        >
          {currentContent.close}
        </button>
      </div>
    </div>
  );
};

export default AcceptedCard;
