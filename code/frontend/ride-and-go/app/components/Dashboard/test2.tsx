'use client'

import { useLocale } from "@/app/utils/hooks/useLocale.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faMapMarkerAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

// Types
type Place = {
  id: number;
  name: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
};

type Itinerary = {
  id: number;
  startPoint: Place;
  endPoint: Place;
  description: string;
};

// Fake Data
const places: Place[] = [
  { id: 1, name: "Ecole Nationale", description: "Une école de référence.", category: "Ecole", latitude: 3.864, longitude: 11.502 },
  { id: 2, name: "Restaurant Le Gourmet", description: "Cuisine délicieuse.", category: "Restaurant", latitude: 3.855, longitude: 11.515 },
  { id: 3, name: "Marché Central", description: "Un grand marché local.", category: "Marché", latitude: 3.865, longitude: 11.500 },
  { id: 4, name: "Hôtel Hilton", description: "Hôtel de luxe.", category: "Hôtel", latitude: 3.867, longitude: 11.514 },
  { id: 5, name: "Hôpital Général", description: "Hôpital moderne.", category: "Hôpital", latitude: 3.870, longitude: 11.508 },
];

const itineraries: Itinerary[] = [
  { id: 1, startPoint: places[0], endPoint: places[1], description: "De l'école au restaurant." },
  { id: 2, startPoint: places[0], endPoint: places[2], description: "De l'école au marché." },
  { id: 3, startPoint: places[0], endPoint: places[3], description: "De l'école à l'hôtel." },
  { id: 4, startPoint: places[0], endPoint: places[4], description: "De l'école à l'hôpital." },
];

// Composant principal
export default function Itineraries() {
  const { locale } = useLocale();
  const [filter, setFilter] = useState<"places" | "itineraries">("places");

  // Contenu localisé
  const content = {
    en: { places: "My Places", itineraries: "My Itineraries", info: "Info", edit: "Edit", showMap: "Show on Map", delete: "Delete", order: "Order" },
    fr: { places: "Mes Lieux", itineraries: "Mes Itinéraires", info: "Infos", edit: "Modifier", showMap: "Voir sur la Carte", delete: "Supprimer", order: "Commander" },
  };
  const localizedText = content[locale as "fr" | "en"] || content.en;

  return (
    <div className="p-6">
      {/* Titre Dynamique */}
      <h1 className="text-2xl font-bold mb-4">
        {filter === "places" ? localizedText.places : localizedText.itineraries}
      </h1>

      {/* Boutons de filtre */}
      <div className="space-x-4 mb-6">
        <button onClick={() => setFilter("places")} className="px-4 py-2 bg-blue-500 text-white rounded">
          {localizedText.places}
        </button>
        <button onClick={() => setFilter("itineraries")} className="px-4 py-2 bg-green-500 text-white rounded">
          {localizedText.itineraries}
        </button>
      </div>

      {/* Contenu Dynamique */}
      {filter === "places" ? (
        <div className="space-y-6">
          {places.map((place) => (
            <div key={place.id} className="p-4 border rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{place.name}</h2>
                <button>
                  <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                </button>
              </div>
              <p className="text-gray-600">{place.description}</p>
              <button
                className="mt-2 text-sm text-blue-600 flex items-center"
                onClick={() => alert(`Latitude: ${place.latitude}, Longitude: ${place.longitude}`)}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                {localizedText.info}
              </button>
              <div className="flex space-x-4 mt-4">
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  {localizedText.showMap}
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">
                  {localizedText.delete}
                </button>
              </div>
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
              <div className="flex space-x-4 mt-4">
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  {localizedText.showMap}
                </button>
                <button className="px-3 py-1 bg-green-500 text-white rounded">
                  {localizedText.order}
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">
                  {localizedText.delete}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
