'use client';
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit, faTrash, faInfoCircle, faUtensils, faSchool,
  faHospital, faStore, faHotel, faMapMarkerAlt,faRoute,faMapMarked
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';

import { fetchItineraries, deleteItinerary, updateItinerary } from "@/app/utils/api/itineraries";
import { fetchUserPlaces, deleteUserPlace } from "@/app/utils/api/userPlaces";


// Types
type Place = {
  id: string;
  userId: number;
  osmId: number;
  name: string;
  latitude: number;
  longitude: number;
  way: string;
  description: string;
  category: Category;
};

type Itinerary = {
  id: number;
  startPoint: number;
  endPoint: number;
  description: string;
};

type Category = 'school' | 'restaurant' | 'market' | 'hotel' | 'hospital';

// Mapping des icônes par catégorie
const categoryIcons: Record<Category, any> = {
  school: faSchool,
  restaurant: faUtensils,
  market: faStore,
  hotel: faHotel,
  hospital: faHospital,
};

// Données factices
const places: Place[] = [
];

const dummyItineraries: Itinerary[] = [
];

export default function Itineraries() {
  const { locale } = useLocale();
  const [filter, setFilter] = useState<'places' | 'itineraries'>('places');
  const [hoveredPlace, setHoveredPlace] = useState<Place | null>(null);
  const [infoPlace, setInfoPlace] = useState<Place | null>(null);
  const [itineraries, setItineraries] = useState<Itinerary[]>(dummyItineraries);
  const [userPlaces, setUserPlaces] = useState<Place[]>(places);

  const content = {
    en: { places: 'My Places', itineraries: 'My Itineraries', info: 'Infos', showMap: 'Show on Map', delete: 'Delete', order: 'Order' },
    fr: { places: 'Mes Lieux', itineraries: 'Mes Itinéraires', info: 'Infos', showMap: 'Voir sur la Carte', delete: 'Supprimer', order: 'Commander' },
  };
  const localizedText = content[locale as 'fr' | 'en'] || content.en;
  const { showFlashMessage } = useFlashMessage(); // Récupère la fonction pour afficher les flash messages

   // Fetch itineraries when component mounts
   useEffect(() => {
    const loadItineraries = async () => {
      try {
        const itineraries = await fetchItineraries();
        setItineraries(itineraries);
        console.log("Itineraries fetched:", itineraries);
        console.log("Itineraries :", itineraries);

      } catch (error) {
        console.error("Failed to fetch itineraries:", error);
      }
    };
    loadItineraries();
  }, []);



  // Function to handle itinerary deletion
  const handleDelete = async (id: number) => {
    try {
      await deleteItinerary(id);
      setItineraries(itineraries.filter(itinerary => itinerary.id !== id));
    } catch (error) {
      console.error("Failed to delete itinerary:", error);
    }
  };

  // Function to handle itinerary editing
  const handleEdit = async (id: number, updatedDescription: string) => {
    const updatedItinerary = { id, description: updatedDescription };
    try {
      const data = await updateItinerary(id, updatedItinerary);
      setItineraries(itineraries.map(itinerary => (itinerary.id === id ? data : itinerary)));
    } catch (error) {
      console.error("Failed to update itinerary:", error);
    }
  };
//Fetch places when component mounts
  useEffect(() => {
    const loadUserPlaces = async () => {
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
        console.log("User Places fetched:", places);
      } catch (error) {
        console.error("Failed to fetch user places:", error);
      }
    };
    loadUserPlaces();
  }, []);

  // Function to handle place deletion

const handleDeletePlace = async (id: string) => {
  try {
    await deleteUserPlace(id); // Call the delete function from the API
    setUserPlaces(userPlaces.filter(place => place.id !== id)); // Update the state to remove the deleted place
  } catch (error) {
    console.error("Failed to delete user place:", error);
  }
};

  
  const renderPlace = (place: Place) => (
    <div className=" w-max h-max bg-gray-200 bg-opacity-90 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-extrabold text-orange-btn">{place.name}</h2>
      <p><strong>{locale ==="en" ? "Category :" :"Categorie : "}</strong>{place.category}</p>
      <p><strong>Description: </strong> {place.description}</p>
      <p><strong>Latitude: </strong> {place.latitude}</p>
      <p><strong>Longitude: </strong> {place.longitude}</p>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {filter === 'places' ? localizedText.places : localizedText.itineraries}
      </h1>

      <div className="space-x-4 mb-6 flex flex-row">
        <p className="text-bleu-nuit text-sm mt-2">{locale === "en"? "filter :":"filtre :"}</p>
        <button onClick={() => {setFilter('places') ;showFlashMessage(locale==="en"? "Only places": "Uniquement mes lieux", 'info', true)} }title={localizedText.places} className="flex items-center px-4 py-2 bg-bleu-nuit hover:bg-blue-900 text-white rounded text-sm">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
        </button>
        <button onClick={() => {setFilter('itineraries'); showFlashMessage(locale==="en"? "Only Itineraries": "Uniquement mes itinéraires", 'info', true)}} title = {localizedText.itineraries} className="flex items-center px-4 py-2 bg-bleu-nuit hover:bg-blue-900 text-white rounded text-sm">
          <FontAwesomeIcon icon={faRoute} className="mr-2" />
          
        </button>
      </div>

      {filter === 'places' ? (
        <div className="space-y-6">
          {userPlaces.map((place) => (
            <div key={place.id} className="p-4 border rounded-lg shadow-md relative">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={categoryIcons[place.category]} className="text-orange-btn text-xl" />
                <h2 className="text-lg font-semibold">{place.name}</h2>
              </div>
              <p className="mt-2 text-bleu-nuit"><strong>Description:</strong> {place.description}</p>


              {infoPlace?.id === place.id && (
                <div className="mt-4 bg-gray-100 p-4 rounded flex flex-col justify-center w-max space-y-2">
                  <div className="flex flex-col items-start space-y-2 justify-start">
                    <p><strong>Latitude:</strong> {place.latitude}</p>
                    <p><strong>Longitude:</strong> {place.longitude}</p>
                  </div>
                  <button className="px-4 py-1 bg-red-500 hover:bg-red-700 text-white rounded mt-2 w-max ml-8" onClick={() => setInfoPlace(null)}>
                    {locale === "en" ? "Hide" : "Fermer"}
                  </button>
                </div>
              )}
              <div className="flex space-x-4 mt-4">
                <button className="px-3 py-1 bg-bleu-nuit hover:bg-blue-800 text-white rounded" title={localizedText.info} onClick={() => setInfoPlace(place)}>
                  <FontAwesomeIcon icon={faInfoCircle}  />
                </button>
                <button className="px-3 py-1 bg-bleu-nuit hover:bg-blue-800 text-white rounded" title={localizedText.showMap}>
                  <FontAwesomeIcon icon={faMapMarked} />
                </button>
                <button className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded" title={localizedText.delete} onClick={() => {handleDeletePlace(place.id); showFlashMessage(locale==="en"? "Place successfully deleted":"Lieu supprimé avec succès", "success", true)}}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {itineraries.map((itinerary) => (
            <div key={itinerary.id} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">
                <span onMouseEnter={() => setHoveredPlace(itinerary.startPoint)} onMouseLeave={() => setHoveredPlace(null)}>
                  {itinerary.startPoint}
                </span>
                →
                <span onMouseEnter={() => setHoveredPlace(itinerary.endPoint)} onMouseLeave={() => setHoveredPlace(null)}>
                  {itinerary.endPoint}
                </span>
              </h2>
              <p className="text-gray-600">{itinerary.description}</p>
              <div>
                {hoveredPlace?.id === itinerary.startPoint && renderPlace(itinerary.startPoint)}
                {hoveredPlace?.id === itinerary.endPoint && renderPlace(itinerary.endPoint)}
              </div> 
              <div className="flex space-x-4 mt-4">
                <button className="px-3 py-1 bg-bleu-nuit hover:bg-blue-800 text-white rounded" title={localizedText.showMap}>
                  <FontAwesomeIcon icon={faMapMarked} />
                </button>
                <button className="flex items-center px-3 py-1 bg-orange-500 hover:bg-orange-700 text-white rounded" title={localizedText.order}>
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
              
                </button>
                <button className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded" title={localizedText.delete} onClick={() => {handleDelete(itinerary.id); showFlashMessage(locale==="en"? "Itinerary successfully deleted":"Itinéraire supprimé avec succès", "success", true)}}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}                