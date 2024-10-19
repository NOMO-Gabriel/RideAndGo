"use client";

import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import OfferCard from "@/app/components/cards/OfferCard";
import ItineraryCard from "@/app/components/cards/ItineraryCard";
import PlaceCard from "@/app/components/cards/PlaceCard";

const CommandForm: React.FC = () => {
  const { locale } = useLocale();
  const [showPopup, setShowPopup] = useState<string | null>(null); // "offer", "itinerary", or "place"
  const [formData, setFormData] = useState({
    startPoint: "",
    endPoint: "",
    cost: "",
    places: "",
    baggage: "yes",
  });


  const content = {
    fr: {
      title: "Formulaire de Commande",
      start: "Point de Départ",
      end: "Point d'Arrivée",
      places: "Nombre de Places",
      baggage: "Bagages (Oui/Non)",
      cost: "Coût",
      command: "Commander",
      save: "Enregistrer",
      place: "Gérer le Lieu",
    },
    en: {
      title: "Order Form",
      start: "Start Point",
      end: "End Point",
      places: "Number of Seats",
      baggage: "Baggage (Yes/No)",
      cost: "Cost",
      command: "Order",
      save: "Save",
      place: "Manage Place",
    },
  };

  const currentContent = locale === 'en' ? content.en : content.fr;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAction = (action: string) => setShowPopup(action);
  const closePopup = () => setShowPopup(null);

  return (
    <div className="command-form flex flex-col items-center border rounded-lg shadow-md p-6 bg-white space-y-4 w-[400px] h-max">
      <h1 className="text-2xl font-bold text-bleu-nuit">{currentContent.title}</h1>

      <input
        type="text"
        name="startPoint"
        placeholder={currentContent.start}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />
      <input
        type="text"
        name="endPoint"
        placeholder={currentContent.end}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />
      <input
        type="number"
        name="places"
        placeholder={currentContent.places}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />
      <select
        name="baggage"
        className="border p-2 rounded w-full"
        onChange={handleChange}
      >
        <option value="yes">{locale ==='en '?"Yes" :"OUI"}</option>
        <option value="no">{locale ==='en '?"NO" :"NON"}</option>
      </select>
      <input
        type="text"
        name="cost"
        placeholder={currentContent.cost}
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />

      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-bleu-nuit hover:bg-orange-500 text-white rounded-md"
          onClick={() => handleAction("offer")}
        >
          {currentContent.command}
        </button>
        <button
          className="px-4 py-2 bg-bleu-nuit hover:bg-orange-500 text-white rounded-md"
          onClick={() => handleAction("itinerary")}
        >
          {currentContent.save}
        </button>
        <button
          className="px-4 py-2 bg-bleu-nuit hover:bg-orange-500 text-white rounded-md"
          onClick={() => handleAction("place")}
        >
          {currentContent.place}
        </button>
      </div>

      {showPopup === "offer" && <OfferCard data={formData} closePopup={closePopup} />}
      {showPopup === "itinerary" && <ItineraryCard data={formData} closePopup={closePopup} />}
      {showPopup === "place" && <PlaceCard data={formData} closePopup={closePopup} />}
    </div>
  );
};

export default CommandForm;
