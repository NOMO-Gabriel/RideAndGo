'use client';

import { useLocale } from "@/app/utils/hooks/useLocale.js";
import { useDashboardContext } from "@/app/utils/contexts/DashboardContext";
import { useUser } from "@/app/utils/hooks/useUser"; // Import du hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, faBell, faCogs, faClipboard, faRoute, faChartBar,
  faWallet, faComments, faUserShield, faHandshake
} from "@fortawesome/free-solid-svg-icons";
import UpgradeBtn from "./UpgradeBtn";
import { useState } from "react"; // Importer useState

export default function Sidebar() {
  const { locale } = useLocale();
  const { updateDashboardFilter } = useDashboardContext();
  const { user, isAuthenticated } = useUser();

  const roles = user?.roles || ['ROLE_GUEST']; 
  console.log(roles);

  const content = {
    en: [
      { name: "Personal Info", icon: faUser, id: 1 },
      { name: "Notifications", icon: faBell, id: 2 },
      { name: "Preferences", icon: faCogs, id: 3 },
      { name: "My Complaints", icon: faClipboard, id: 4 },
      { name: "My Places and Itineraries", icon: faRoute, id: 5 },
      { name: "Statistics", icon: faChartBar, id: 6 },
      ...(roles.includes('ROLE_DRIVER') ? [{ name: "Subscriptions", icon: faHandshake, id: 7 },{ name: "My Documents", icon: faComments, id: 11 },  { name: "Finances", icon: faWallet, id: 8 }] : []),
     
      { name: "Chat", icon: faComments, id: 9 },
      

      ...(roles.includes('ROLE_ADMIN') ? [{ name: "Manage Users", icon: faUserShield, id: 10}, { name: "Finances", icon: faWallet, id: 8 },] : []),
    ],
    fr: [
      { name: "Informations personnelles", icon: faUser, id: 1 },
      { name: "Notifications", icon: faBell, id: 2 },
      { name: "Préférences", icon: faCogs, id: 3 },
      { name: "Mes réclamations", icon: faClipboard, id: 4 },
      { name: "Mes Lieux et itinéraires", icon: faRoute, id: 5 },
      { name: "Statistiques", icon: faChartBar, id: 6 },
      ...(roles.includes('ROLE_DRIVER') ? [{ name: "Abonnements", icon: faHandshake, id: 7 }, { name: "Mes Documents", icon: faComments, id: 11},{ name: "Finances", icon: faWallet, id: 8 }] : []),
      
      { name: "Chat", icon: faComments, id: 9 },
      
     
      ...(roles.includes('ROLE_ADMIN') ? [{ name: "Utilisateurs", icon: faUserShield, id: 10 }] : []),
    ],
  };

  const localizedContent = content[locale as "fr" | "en"] || content.en;

  // Ajout de l'état pour l'élément sélectionné
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleItemClick = (id : number ) => {
    setSelectedId(id); // Met à jour l'ID de l'élément sélectionné
    updateDashboardFilter(id); // Appelle la fonction de mise à jour
  };

  return (
    <div>
      <div className="flex flex-col p-2 space-y-10 border-x-2 border-gray-200 w-[150px] sm:w-[200px] md:w-[250px]">
        <UpgradeBtn />
        <div className="flex flex-col space-y-5">
          {localizedContent.map((item, index) => (
            <button
              key={index}
              className={`text-black cursor-pointer h-10 rounded-lg flex flex-row items-center space-x-3 px-4 
                ${selectedId === item.id ? 'bg-blue-200' : 'hover:bg-bleu-nuit'}`} // Applique bg-blue-200 si sélectionné
              onClick={() => handleItemClick(item.id)} // Utilise handleItemClick
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg sm:text-sm md:text-lg" />
              <span className="text-sm sm:text-xs md:text-sm">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
