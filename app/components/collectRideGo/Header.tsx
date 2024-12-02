import { useState, useEffect } from 'react';
import { useLocale } from "@/app/utils/hooks/useLocale.js"; 
import { useSearchFilter } from "@/app/utils/hooks/useSearchFilter"; 
import { getAllPlaces } from "@/app/utils/api/places"; // Importer la fonction pour récupérer tous les lieux

// Définir l'interface pour Location
interface Location {
  id: string;
  osmId: number | null;
  name: string;
  latitude: number;
  longitude: number;
  way: string;
  description: string | null;
}

const Header: React.FC = () => {
  const { locale } = useLocale(); 
  const [isItinerary, setIsItinerary] = useState<boolean>(true); 
  const { updateSearchData } = useSearchFilter(); 

  const [startingPoint, setStartingPoint] = useState("");
  const [destinationPoint, setDestinationPoint] = useState("");
  const [places, setPlaces] = useState<Location[]>([]); // Stocker tous les lieux
  const [suggestions, setSuggestions] = useState<Location[]>([]); // Stocker les suggestions

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
  const currentContent = locale === 'en' ? content.en : content.fr;

  const handleToggle = () => {
    setIsItinerary((prev) => !prev); 
  };

  const handleSearch = () => {
    const data = isItinerary
      ? {
          isItinerary: true,
          startingPoint: startingPoint,
          destinationPoint: destinationPoint,
        }
      : {
          isItinerary: false,
          place: suggestions.find(suggestion => suggestion.name === startingPoint), // Trouver la place correspondante
        };

    updateSearchData(data); 
  };

  const fetchAllPlaces = async () => {
    try {
      const data = await getAllPlaces(); // Récupérer tous les lieux
      setPlaces(data); // Stocker les lieux dans l'état
    } catch (error) {
      console.error("Erreur lors de la récupération des lieux", error);
    }
  };

  // Appel de la fonction pour récupérer tous les lieux au chargement du composant
  useEffect(() => {
    fetchAllPlaces();
  }, []);

  // Filtre les suggestions en fonction de l'entrée de l'utilisateur
  const getFilteredSuggestions = (input: string): Location[] => {
    return places.filter((suggestion): suggestion is Location => 
      suggestion.name.toLowerCase().includes(input.toLowerCase())
    );
  };

  useEffect(() => {
    // Met à jour les suggestions lorsque l'utilisateur tape dans le champ de départ
    if (startingPoint.length > 0) {
      setSuggestions(getFilteredSuggestions(startingPoint)); // Met à jour les suggestions
    } else {
      setSuggestions([]); // Efface les suggestions si l'entrée est vide
    }
  }, [startingPoint, places]);

  useEffect(() => {
    // Met à jour les suggestions lorsque l'utilisateur tape dans le champ de destination
    if (destinationPoint.length > 0) {
      setSuggestions(getFilteredSuggestions(destinationPoint)); // Met à jour les suggestions
    } else {
      setSuggestions([]); // Efface les suggestions si l'entrée est vide
    }
  }, [destinationPoint, places]);

  return (
    <div className="text-center flex flex-col space-y-4 mt-4 justify-center">
      <div className={`flex justify-center mt-4 ${isItinerary ? '-translate-x-8' : '-translate-x-8'}`}>
        <div className="relative flex items-center justify-center">
          <button
            className={`w-24 h-12 rounded-full transition-colors duration-300 ${isItinerary ? 'bg-bleu-nuit hover:bg-orange-500 text-white' : 'bg-gray-300'}`}
            onClick={handleToggle}
            style={{ transform: isItinerary ? 'translateX(0%)' : 'translateX(100%)' }}
          >
            {currentContent.itinerary}
          </button>
          <button
            className={`absolute w-24 h-12 rounded-full transition-colors duration-300 ${!isItinerary ? 'bg-bleu-nuit text-white' : 'bg-gray-300'}`}
            style={{ transform: isItinerary ? 'translateX(100%)' : 'translateX(0%)' }} 
            onClick={handleToggle}
          >
            {currentContent.place}
          </button>
        </div>
      </div>
      
      {isItinerary ? (
        <div className="flex flex-row space-x-6 mt-4 justify-center">
          <div className="relative">
            <input
              id="starting-point"
              type="text"
              placeholder={currentContent.startingPoint} 
              className="border border-gray-300 rounded p-2"
              value={startingPoint}
              onChange={(e) => setStartingPoint(e.target.value)} // Mettre à jour l'état à chaque frappe
            />
            {startingPoint && suggestions.length > 0 && (
              <div className="absolute bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto w-full z-20">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => setStartingPoint(suggestion.name)} // Mettre à jour l'entrée avec le nom de la suggestion
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button onClick={handleSearch} className="bg-bleu-nuit hover:bg-orange-500 text-white px-4 py-2 rounded-full w-max ">
              {currentContent.search}
          </button>
          
          <div className="relative">
            <input
              id="destination-point"
              type="text"
              placeholder={currentContent.destinationPoint} 
              className="border border-gray-300 rounded p-2"
              value={destinationPoint}
              onChange={(e) => setDestinationPoint(e.target.value)} // Mettre à jour l'état à chaque frappe
            />
            {destinationPoint && suggestions.length > 0 && (
              <div className="absolute bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto w-full z-20">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => setDestinationPoint(suggestion.name)} // Mettre à jour l'entrée avec le nom de la suggestion
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-row space-x-6 justify-center">
          <input
            id="search-place"
            type="text"
            placeholder={currentContent.searchPlace} 
            className="border border-gray-300 rounded p-2"
            value={startingPoint}
            onChange={(e) => setStartingPoint(e.target.value)} // Mettre à jour l'état à chaque frappe
          />
          <button onClick={handleSearch} className="bg-bleu-nuit hover:bg-orange-500 text-white px-4 py-2 rounded-full w-max ">
              {currentContent.search}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
