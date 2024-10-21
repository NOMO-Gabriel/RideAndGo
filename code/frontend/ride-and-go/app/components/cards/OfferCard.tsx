import { useLocale } from '@/app/utils/hooks/useLocale.js'; // Importer le hook useLocale

interface OfferCardProps {
  data: {
    startPoint: string;
    endPoint: string;
    cost: number;
    places: number;
    baggage: boolean;
  };
  closePopup: () => void;
}

const translations = {
  en: {
    title: "Confirm Your Order",
    startPoint: "Start Point",
    endPoint: "End Point",
    cost: "Cost",
    places: "Places",
    baggage: "Baggage",
    confirm: "Confirm",
    baggageAllowed: "Yes",
    baggageNotAllowed: "No",
  },
  fr: {
    title: "Confirmez votre commande",
    startPoint: "Point de départ",
    endPoint: "Point d'arrivée",
    cost: "Coût",
    places: "Places",
    baggage: "Bagages",
    confirm: "Confirmer",
    baggageAllowed: "Oui",
    baggageNotAllowed: "Non",
  },
};

const OfferCard: React.FC<OfferCardProps> = ({ data, closePopup }) => {
  const{ locale }= useLocale(); 
  const t = locale === 'en' ? translations.en : translations.fr;

  return (
    <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
        <h2 className="text-xl font-bold">{t.title}</h2>
        <p>{t.startPoint}: {data.startPoint}</p>
        <p>{t.endPoint}: {data.endPoint}</p>
        <p>{t.cost}: {data.cost} FCFA</p>
        <p>{t.places}: {data.places}</p>
        <p>
          {t.baggage}: {data.baggage ? t.baggageAllowed : t.baggageNotAllowed}
        </p>
        <button className="bg-green-500 p-2 rounded-md" onClick={closePopup}>
          {t.confirm}
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
