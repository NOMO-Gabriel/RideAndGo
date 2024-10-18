'use client';

import { useLocale } from "@/app/utils/hooks/useLocale.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit, faTrash, faInfoCircle, faUtensils, faSchool,
  faHospital, faStore, faHotel, faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

// Types
type Place = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
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

// Données factices
const places: Place[] = [
  { id: 1, name: 'Ecole Nationale', description: 'Une école de référence.', latitude: 3.864, longitude: 11.502, category: 'school' },
  { id: 2, name: 'Restaurant Le Gourmet', description: 'Cuisine délicieuse.', latitude: 3.855, longitude: 11.515, category: 'restaurant' },
  { id: 3, name: 'Marché Central', description: 'Grand marché local.', latitude: 3.865, longitude: 11.500, category: 'market' },
  { id: 4, name: 'Hôtel Hilton', description: 'Hôtel de luxe.', latitude: 3.867, longitude: 11.514, category: 'hotel' },
  { id: 5, name: 'Hôpital Général', description: 'Hôpital moderne.', latitude: 3.870, longitude: 11.508, category: 'hospital' },
];

const itineraries: Itinerary[] = [
  { id: 1, startPoint: places[0], endPoint: places[1], description: 'De l\'école au restaurant.' },
  { id: 2, startPoint: places[0], endPoint: places[2], description: 'De l\'école au marché.' },
  { id: 3, startPoint: places[0], endPoint: places[3], description: 'De l\'école à l\'hôtel.' },
  { id: 4, startPoint: places[0], endPoint: places[4], description: 'De l\'école à l\'hôpital.' },
];

export default function Itineraries() {
  const { locale } = useLocale();
  const [filter, setFilter] = useState<'places' | 'itineraries'>('places');
  const [hoveredPlace, setHoveredPlace] = useState<Place | null>(null);
  const [infoPlace, setInfoPlace] = useState<Place | null>(null);

  // Contenu localisé
  const content = {
    en: { places: 'My Places', itineraries: 'My Itineraries', info: 'Info', showMap: 'Show on Map', delete: 'Delete' },
    fr: { places: 'Mes Lieux', itineraries: 'Mes Itinéraires', info: 'Infos', showMap: 'Voir sur la Carte', delete: 'Supprimer' },
  };
  const localizedText = content[locale as 'fr' | 'en'] || content.en;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {filter === 'places' ? localizedText.places : localizedText.itineraries}
      </h1>

      <div className="space-x-4 mb-6">
        <button onClick={() => setFilter('places')} className="px-4 py-2 bg-blue-500 text-white rounded">
          {localizedText.places}
        </button>
        <button onClick={() => setFilter('itineraries')} className="px-4 py-2 bg-green-500 text-white rounded">
          {localizedText.itineraries}
        </button>
      </div>

      {filter === 'places' ? (
        <div className="space-y-6">
          {places.map((place) => (
            <div
              key={place.id}
              className="p-4 border rounded-lg shadow-md relative"
              onMouseEnter={() => setHoveredPlace(place)}
              onMouseLeave={() => setHoveredPlace(null)}
            >
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={categoryIcons[place.category]} className="text-blue-500" />
                <h2 className="text-xl font-semibold">{place.name}</h2>
              </div>
              <button
                className="mt-2 text-sm text-blue-600 flex items-center"
                onClick={() => setInfoPlace(place)}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                {localizedText.info}
              </button>

              {infoPlace?.id === place.id && (
                <div className="mt-4 bg-gray-100 p-4 rounded">
                  <p><strong>Description:</strong> {place.description}</p>
                  <p><strong>Latitude:</strong> {place.latitude}</p>
                  <p><strong>Longitude:</strong> {place.longitude}</p>
                </div>
              )}

              {hoveredPlace?.id === place.id && (
                <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
                  <h2 className="text-lg font-bold">{place.name}</h2>
                  <p>{place.description}</p>
                  <p><strong>Latitude:</strong> {place.latitude}</p>
                  <p><strong>Longitude:</strong> {place.longitude}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {itineraries.map((itinerary) => (
            <div key={itinerary.id} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">
                {itinerary.startPoint.name} → {itinerary.endPoint.name}
              </h2>
              <p className="text-gray-600">{itinerary.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
