import { useLocale } from '@/app/utils/hooks/useLocale.js'; // Importer le hook useLocale

interface PlaceCardProps {
  data: {
    startPoint?: string;
  };
  closePopup: () => void;
}

const translations = {
  en: {
    title: "Manage Place",
    place: "Place",
    noPlaceSelected: "No place selected",
    close: "Close",
  },
  fr: {
    title: "Gérer le lieu",
    place: "Lieu",
    noPlaceSelected: "Aucun lieu sélectionné",
    close: "Fermer",
  },
};

const PlaceCard: React.FC<PlaceCardProps> = ({ data, closePopup }) => {
  const {locale }= useLocale(); 
  const t = locale === 'en' ? translations.en : translations.fr;

  return (
    <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
        <h2 className="text-xl font-bold">{t.title}</h2>
        <p>
          {t.place}: {data.startPoint || t.noPlaceSelected}
        </p>
        <button className="bg-red-500 p-2 rounded-md" onClick={closePopup}>
          {t.close}
        </button>
      </div>
    </div>
  );
};

export default PlaceCard;
