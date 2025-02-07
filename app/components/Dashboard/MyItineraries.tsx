'use client';
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit, faTrash, faInfoCircle, faUtensils, faSchool,
  faHospital, faStore, faHotel, faMapMarkerAlt,faRoute,faMapMarked
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';

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
  startPoint: Place;
  endPoint: Place;
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

// Données factices pour le Cameroun
const places: Place[] = [
  {
    id: "1",
    userId: 1,
    osmId: 1001,
    name: "Université de Yaoundé I",
    latitude: 3.8667,
    longitude: 11.5167,
    way: "Ngoa-Ekelle",
    description: "Principal campus universitaire de Yaoundé",
    category: "school"
  },
  {
    id: "2",
    userId: 1,
    osmId: 1002,
    name: "Hôpital Central de Yaoundé",
    latitude: 3.8608,
    longitude: 11.5175,
    way: "Rue de l'Hôpital",
    description: "Hôpital de référence de la capitale",
    category: "hospital"
  },
  {
    id: "3",
    userId: 1,
    osmId: 1003,
    name: "Marché Central de Douala",
    latitude: 4.0511,
    longitude: 9.7679,
    way: "Avenue du Marché",
    description: "Plus grand marché de Douala",
    category: "market"
  },
  {
    id: "4",
    userId: 1,
    osmId: 1004,
    name: "Hilton Yaoundé",
    latitude: 3.8667,
    longitude: 11.5167,
    way: "Boulevard du 20 Mai",
    description: "Hôtel de luxe au centre-ville",
    category: "hotel"
  },
  {
    id: "5",
    userId: 1,
    osmId: 1005,
    name: "Restaurant La Terrasse",
    latitude: 3.8680,
    longitude: 11.5190,
    way: "Avenue Kennedy",
    description: "Restaurant traditionnel camerounais",
    category: "restaurant"
  }
];

const dummyItineraries: Itinerary[] = [
  {
    id: 1,
    startPoint: places[0], // Université de Yaoundé I
    endPoint: places[1], // Hôpital Central
    description: "Trajet quotidien pour stage à l'hôpital"
  },
  {
    id: 2,
    startPoint: places[3], // Hilton Yaoundé
    endPoint: places[2], // Marché Central de Douala
    description: "Voyage d'affaires Yaoundé-Douala"
  },
  {
    id: 3,
    startPoint: places[4], // Restaurant La Terrasse
    endPoint: places[0], // Université de Yaoundé I
    description: "Retour à l'université après le déjeuner"
  }
];

export default function Itineraries() {
  const { locale } = useLocale();
  const [filter, setFilter] = useState<'places' | 'itineraries'>('places');
  const [hoveredPlace, setHoveredPlace] = useState<Place | null>(null);
  const [infoPlace, setInfoPlace] = useState<Place | null>(null);
  const [itineraries, setItineraries] = useState<Itinerary[]>(dummyItineraries);
  const [userPlaces, setUserPlaces] = useState<Place[]>(places);

  const content = {
    en: { 
      places: 'My Places', 
      itineraries: 'My Itineraries', 
      info: 'Infos', 
      showMap: 'Show on Map', 
      delete: 'Delete', 
      order: 'Order',
      noData: 'No data available'
    },
    fr: { 
      places: 'Mes Lieux', 
      itineraries: 'Mes Itinéraires', 
      info: 'Infos', 
      showMap: 'Voir sur la Carte', 
      delete: 'Supprimer', 
      order: 'Commander',
      noData: 'Aucune donnée disponible'
    },
  };
  
  const localizedText = content[locale as 'fr' | 'en'] || content.en;
  const { showFlashMessage } = useFlashMessage();

  // Simulation de la suppression
  const handleDelete = async (id: number) => {
    try {
      setItineraries(itineraries.filter(itinerary => itinerary.id !== id));
      showFlashMessage('Itinéraire supprimé avec succès', 'success', true);
    } catch (error) {
      console.error("Failed to delete itinerary:", error);
      showFlashMessage('Erreur lors de la suppression', 'error', true);
    }
  };

  // Simulation de la modification
  const handleEdit = async (id: number, updatedDescription: string) => {
    try {
      setItineraries(itineraries.map(itinerary => 
        itinerary.id === id 
          ? { ...itinerary, description: updatedDescription }
          : itinerary
      ));
      showFlashMessage('Itinéraire modifié avec succès', 'success', true);
    } catch (error) {
      console.error("Failed to update itinerary:", error);
      showFlashMessage('Erreur lors de la modification', 'error', true);
    }
  };

  // Simulation de la suppression d'un lieu
  const handleDeletePlace = async (placeId: string) => {
    try {
      setUserPlaces(userPlaces.filter(place => place.id !== placeId));
      showFlashMessage('Lieu supprimé avec succès', 'success', true);
    } catch (error) {
      console.error("Failed to delete place:", error);
      showFlashMessage('Erreur lors de la suppression du lieu', 'error', true);
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
                  {itinerary.startPoint.name}
                </span>
                →
                <span onMouseEnter={() => setHoveredPlace(itinerary.endPoint)} onMouseLeave={() => setHoveredPlace(null)}>
                  {itinerary.endPoint.name}
                </span>
              </h2>
              <p className="text-gray-600">{itinerary.description}</p>
              <div>
                {hoveredPlace?.id === itinerary.startPoint.id && renderPlace(itinerary.startPoint)}
                {hoveredPlace?.id === itinerary.endPoint.id && renderPlace(itinerary.endPoint)}
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