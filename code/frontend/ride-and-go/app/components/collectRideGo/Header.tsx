import { useState } from 'react';
import { useLocale } from "@/app/utils/hooks/useLocale.js"; 
import { useSearchFilter } from "@/app/utils/hooks/useSearchFilter"; 

const Header: React.FC = () => {
  const { locale } = useLocale(); 
  const [isItinerary, setIsItinerary] = useState<boolean>(true); 
  const { updateSearchData } = useSearchFilter(); 
  
  const polytechYaounde = { 
    latitude: 3.8480, 
    longitude: 11.5021, 
    description: "École Nationale Supérieure Polytechnique de Yaoundé" 
  };
  
  const posteCentrale = { 
    latitude: 3.8662, 
    longitude: 11.5160, 
    description: "Poste Centrale de Yaoundé" 
  };
  const polytech = {
    latitude: 3.8480,
    longitude: 11.5021,
    name: "École Nationale Supérieure Polytechnique ",
  };

  const content = {
    fr: {
      title: 'Page de Recherche',
      itinerary: "Itinéraire",
      place: "Lieu",
      startingPoint: "Point de départ",
      destinationPoint: "Point d'arrivée",
      searchPlace: "Rechercher un lieu",
      search: "Rechercher" 
    },
    en: {
      title: "Search Page",
      itinerary: "Itinerary",
      place: "Place",
      startingPoint: "Starting Point",
      destinationPoint: "Destination Point",
      searchPlace: "Search for a place",
      search: "Search"
    },
  };

  const getContent = (key: keyof typeof content["en"]) => {
    const validLocale = ["fr", "en"].includes(locale) ? locale : "en";
    return content[validLocale as "fr" | "en"][key];
  };
 

  const handleToggle = () => {
    setIsItinerary((prev) => !prev); 
  };

  const handleSearch = () => {
    const data = isItinerary
      ? {
          isItinerary: true,
          startingPoint: polytechYaounde,
          destinationPoint: posteCentrale,
        }
      : {
          isItinerary: false,
          place: polytech,
        };

    updateSearchData(data); 
  };

  return (
    <div className="text-center flex flex-col space-y-4 mt-4 justify-center">
      {/* <h1 className="text-3xl font-bold mt-3 text-orange-600">{getContent('title')}</h1> */}
      
      <div className={`flex justify-center mt-4 ${isItinerary ? '-translate-x-8' : '-translate-x-8'}`}>
        <div className="relative flex items-center justify-center">
          <button
            className={`w-24 h-12 rounded-full transition-colors duration-300 ${isItinerary ? 'bg-bleu-nuit hover:bg-orange-500 text-white' : 'bg-gray-300'}`}
            onClick={handleToggle}
            style={{ transform: isItinerary ? 'translateX(0%)' : 'translateX(100%)' }}
          >
            {getContent('itinerary')}
          </button>
          <button
            className={`absolute w-24 h-12 rounded-full transition-colors duration-300 ${!isItinerary ? 'bg-bleu-nuit text-white' : 'bg-gray-300'}`}
            style={{ transform: isItinerary ? 'translateX(100%)' : 'translateX(0%)' }} 
            onClick={handleToggle}
          >
            {getContent('place')}
          </button>
        </div>
      </div>
      
      {isItinerary ? (
        <div className="flex flex-row space-x-6 mt-4 justify-center">
          <input
            id="starting-point"
            type="text"
            placeholder={getContent('startingPoint')} 
            className="border border-gray-300 rounded p-2"
          />
          <button onClick={handleSearch} className="bg-bleu-nuit hover:bg-orange-500 text-white px-4 py-2  rounded-full w-max ">
              {getContent('search')}
          </button>
          <input
            id="destination-point"
            type="text"
            placeholder={getContent('destinationPoint')} 
            className="border border-gray-300 rounded p-2"
          />
        </div>
      ) : (
        <div className="mt-4 flex flex-row space-x-6 justify-center">
          <input
            id="search-place"
            type="text"
            placeholder={getContent('searchPlace')} 
            className="border border-gray-300 rounded p-2"
          />
          <button onClick={handleSearch} className="bg-bleu-nuit hover:bg-orange-500 text-white px-4 py-2  rounded-full w-max ">
              {getContent('search')}
          </button>
      </div>
     
      )}


    </div>
  );
};

export default Header;
