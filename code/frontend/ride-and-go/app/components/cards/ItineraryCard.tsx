import { useLocale } from '@/app/utils/hooks/useLocale.js'; // Importer le hook useLocale

interface ItineraryCardProps {
  data: {
    startPoint: string;
    endPoint: string;
  };
  closePopup: () => void;
}

const content = {
  en: {
    title: "Save Itinerary",
    startPoint: "Start Point",
    endPoint: "End Point",
    save: "Save",
  },
  fr: {
    title: "Enregistrer l'itinéraire",
    startPoint: "Point de départ",
    endPoint: "Point d'arrivée",
    save: "Enregistrer",
  },
};

const ItineraryCard: React.FC<ItineraryCardProps> = ({ data, closePopup }) => {
  const {locale} = useLocale(); 

  const currentTranslation = locale === 'en' ? content.en : content.fr;
  
  return (
    <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-center">
        <h2 className="text-xl font-bold">{currentTranslation.title}</h2>
        <p>{currentTranslation.startPoint}: {data.startPoint}</p>
        <p>{currentTranslation.endPoint}: {data.endPoint}</p>
        <button className="bg-blue-500 p-2 rounded-md" onClick={closePopup}>
          {currentTranslation.save}
        </button>
      </div>
    </div>
  );
};

export default ItineraryCard;
