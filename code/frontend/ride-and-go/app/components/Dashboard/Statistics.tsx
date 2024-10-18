'use client';

import { useLocale } from "@/app/utils/hooks/useLocale.js";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMapMarkerAlt, 
  faUsers, 
  faCar, 
  faRoute, 
  faDollarSign, 
  faClock 
} from "@fortawesome/free-solid-svg-icons";

const generateRandomTrips = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    depart: `Lieu ${i + 1}`,
    arrivee: `Lieu ${i + 2}`,
    conducteur: `Chauffeur ${i + 1}`,
    voyageur: `Voyageur ${i + 1}`,
    date: new Date().toLocaleDateString(),
    avis: `${Math.floor(Math.random() * 5) + 1} ★`
  }));
};

export default function Statistics() {
  const { locale } = useLocale();
  const [tripData] = useState(generateRandomTrips());
  const [stats, setStats] = useState({
    users: 0,
    drivers: 0,
    trips: 0,
    vehicles: 0,
    amount: 0,
    itineraries: 0,
    places: 0,
  });

  const content = {
    en: {
      mostVisited: "Most Visited Places",
      stats: ["Users", "Drivers", "Trips"],
      details: ["Vehicles Used", "Amount Spent", "Itineraries Taken", "Places Visited"],
      recentTrips: "Recent Trips",
    },
    fr: {
      mostVisited: "Lieux les plus visités",
      stats: ["Utilisateurs", "Chauffeurs", "Voyages"],
      details: ["Véhicules empruntés", "Montant dépensé", "Itinéraires empruntés", "Lieux visités"],
      recentTrips: "Voyages récents",
    }
  };

  const localizedContent = content[locale] || content.en;

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) => ({
        users: Math.min(prevStats.users + 10, 1000),
        drivers: Math.min(prevStats.drivers + 5, 500),
        trips: Math.min(prevStats.trips + 15, 1500),
        vehicles: Math.min(prevStats.vehicles + 3, 300),
        amount: Math.min(prevStats.amount + 100, 10000),
        itineraries: Math.min(prevStats.itineraries + 8, 800),
        places: Math.min(prevStats.places + 4, 400),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 p-6">
      {/* Première Section */}
      <div className="flex space-x-8">
        <div className="w-1/2">
          <h2 className="text-xl font-bold">{localizedContent.mostVisited}</h2>
          <div className="relative">
            {/* Diagramme circulaire */}
            <div className="w-40 h-40 rounded-full bg-blue-400 mx-auto"></div>
            {/* Légende */}
            <div className="mt-4 space-y-2">
              <div>Lieu 1 - 40%</div>
              <div>Lieu 2 - 30%</div>
              <div>Lieu 3 - 20%</div>
              <div>Lieu 4 - 10%</div>
            </div>
          </div>
        </div>

        <div className="w-1/2 space-y-4">
          {localizedContent.stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faUsers} />
              <span className="text-lg">{stat}: {stats[stat.toLowerCase()]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deuxième Section */}
      <div className="grid grid-cols-4 gap-6">
        {localizedContent.details.map((detail, index) => (
          <div key={index} className="p-4 border rounded-lg text-center">
            <h3 className="text-lg font-semibold">{detail}</h3>
            <p className="text-2xl">{Object.values(stats)[index + 3]}</p>
          </div>
        ))}
      </div>

      {/* Troisième Section */}
      <div>
        <h2 className="text-xl font-bold">{localizedContent.recentTrips}</h2>
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Départ</th>
              <th className="border px-4 py-2">Arrivée</th>
              <th className="border px-4 py-2">Conducteur</th>
              <th className="border px-4 py-2">Voyageur</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Avis</th>
            </tr>
          </thead>
          <tbody>
            {tripData.map((trip) => (
              <tr key={trip.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{trip.depart}</td>
                <td className="border px-4 py-2">{trip.arrivee}</td>
                <td className="border px-4 py-2">{trip.conducteur}</td>
                <td className="border px-4 py-2">{trip.voyageur}</td>
                <td className="border px-4 py-2">{trip.date}</td>
                <td className="border px-4 py-2">{trip.avis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
