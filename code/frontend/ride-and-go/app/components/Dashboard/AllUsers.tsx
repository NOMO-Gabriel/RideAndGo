'use client'

import { useLocale } from "@/app/utils/hooks/useLocale.js";
import { useEffect, useState } from "react";
const dummyUsers= [
  {
    id:1, 
    name: "Eléonor Cassin",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, veritatis",
    date: "04/01/2024"
  },
  {
    id:2, 
    name: "Eléonor Cassin",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, veritatis",
    date: "04/01/2024"

  },
  {
    id:3, 
    name: "Eléonor Cassin",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, veritatis",
    date: "04/01/2024"

  }];
export default function Component() {
  const [filter, setFilter] = useState<'all' | 'alert' | 'new' | 'archived'>('all');
  const [users, setUsers] = useState(dummyUsers);
  const [selecteduser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);



  
  // Fonction pour supprimer un utilisateur
  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };


  const content = {
    en: {
     
    },
    fr: {
      
    }
  };
  const { locale } = useLocale();
  const localizedContent = content[locale as "en" | "fr"] || content.en;


    return (
      <div>
          <div className="flex flex-col space-y-4">
        {users.map(user => (
          <div key={user.id} className="bg-gray-50 p-4 rounded-xl shadow-md flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={user.imageUrl} alt="Avatar" className="w-12 h-12" />
              <div>
                <h3 className="font-bold">{user.name}</h3>
                <p className="text-sm">{user.description}</p>
                <span className="text-xs text-gray-600">{user.date}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="text-blue-600"
                onClick={() => handleShowPopup(user)}
              >
                Voir plus
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(user.id)}
              >
                Supprimer
              </button>
              <button
                className="text-green-600"
                onClick={() => console.log(`Archiving notification with id: ${user.id}`)}
              >
                Archiver
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    );
}
