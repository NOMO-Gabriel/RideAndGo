'use client';
import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faTrash, faPen, faEye, faUserShield, faBan,faCheckCircle,
  faPauseCircle, faTasks, faBell, faTimes
} from '@fortawesome/free-solid-svg-icons';
import ConfirmationMessage from '../cards/ConfirmationMessage';
import { getAllActiveUsers } from '@/api/user';
import { useUserContext } from '@/app/context/UserContext';

const userContent = {
  en: {
    title: "Users",
    filter: "Filter by Role",
    actions: {
      view: "View", edit: "Edit", delete: "Delete", promote: "Promote",
      block: "Block", suspend: "Suspend", alert: "Send Alert", activity: "Activity"
    },
    alt: "User avatar",
  },
  fr: {
    title: "Utilisateurs",
    filter: "Filtrer par rôle",
    actions: {
      view: "Voir", edit: "Modifier", delete: "Supprimer", promote: "Promouvoir",
      block: "Bloquer", suspend: "Suspendre", alert: "Envoyer une alerte", activity: "Activité"
    },
    alt: "Avatar de l'utilisateur",
  },
};

const roleHierarchy = ['superAdmin', 'admin', 'user'];

const getHighestRole = (roles: string[]) => {
  for (const role of roleHierarchy) {
    if (roles.includes(role)) {
      return role;
    }
  }
  return 'user'; // Default role if no match is found
};

const Users = () => {
  const { locale } = useLocale(); // Gestion de l'internationalisation
  const localizedContent = userContent[locale as 'fr' | 'en'];
  const { users, fetchUsers, fetchUser, user } = useUserContext();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  const [uusers, setUsers] = useState([
    {"name":"eleo",
      "roles":["user"]
    },
    {"name":"eleo2",
      "roles":["admin"]

    }

  ]);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchUsers = async () => {
          try {
              const data = await getAllActiveUsers();
              setUsers(data);
              console.log("Yo");
              console.log(users);

          } catch (error) {
              setError(error.message);
              console.log("Erorrr");
              
          }
      };

      fetchUsers();
  }, []);
  

  const [roleFilter, setRoleFilter] = useState<'all' | 'customer' | 'driver' | 'admin'>('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // Gestion de la suppression d'un utilisateur
  const handleDelete = (id: string) => {
    // Implement the delete logic here, e.g., call an API to delete the user
    try{
      setIsDeletePopupOpen(true);
      console.log('deleting user with ID:', id); // Log for debugging
      fetchUser(id);
      setUserToDelete(id);
    }catch(error){
      console.error('Error fetching uer:', error);
    } 
  };
  
  const handleFinalDelete = (id: string) => {
    // Implement the delete logic here, e.g., call an API to delete the user
    try{
      console.log('Final deleting user with ID:', id); // Log for debugging
      ConfirmationMessage({
        icon: <FontAwesomeIcon icon={faUser} />,
        message: 'Action successful!',
      });
      setIsDeletePopupOpen(false);

    }catch(error){
      ConfirmationMessage({
        icon: <FontAwesomeIcon icon={faUser} />,
        message: 'Action successful!',
      });
      console.error('Error fetching user:', error);
    } 
  };

  // Gestion du filtrage par rôle
  const filteredUsers = roleFilter === 'all' ? users : users.filter(user => user.roles.includes(roleFilter));

  const handleView = (id: string) => {
    try{
          console.log('VIEWING user with ID:', id); // Log for debugging
          fetchUser(id);
          setSelectedUser(id);
    }catch(error){
      console.error('Error fetching uer:', error);
    }
    
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };
  const handleCloseDeletePopup = () => {
    setUserToDelete(null);
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-8 text-center">{localizedContent.title}</h2>

      {/* Filtre des rôles */}
      <div className="mb-6 text-center">
        <label htmlFor="roleFilter" className="mr-4">{localizedContent.filter}:</label>
        <select
          id="roleFilter"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as 'all' | 'customer' | 'driver' | 'admin')}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Liste des utilisateurs */}
      <div className="flex flex-col space-y-4">
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-gray-50 p-4 rounded-xl shadow-md border flex items-center justify-between">
            {/* Informations de l'utilisateur */}
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faUser} className="w-12 h-12 text-blue-600" />
              <div>
                <h3 className="font-bold"></h3>
                <h3 className="font-bold">{user.name} {user.surname} {user.averagerating}</h3>
                <p className="text-sm">{getHighestRole(user.roles)}</p>
                <span className="text-xs">Created: {new Date(user.createdat).toLocaleDateString()}</span>
                <br />
                <span className="text-xs">Last connection: {new Date(user.updatedat).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 text-xl">
              <button className="text-green-600" title={localizedContent.actions.view} onClick={() => handleView(user.id)}>
                <FontAwesomeIcon icon={faEye} />
              </button>

              <button className="text-gray-600" title={localizedContent.actions.activity}>
                <FontAwesomeIcon icon={faTasks} />
              </button>
              <button className="text-orange-600" title={localizedContent.actions.suspend}>
                <FontAwesomeIcon icon={faPauseCircle} />
              </button>

              <button className="text-purple-600" title={localizedContent.actions.alert}>
                <FontAwesomeIcon icon={faBell} />
              </button>
              <button className="text-red-600" onClick={() => handleDelete(user.id)} title={localizedContent.actions.delete}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup affiche infos de l'utilisateur*/}
      {selectedUser && user && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white w-[500px] h-[500px] p-10 rounded-lg shadow-lg relative">
      <button className="absolute top-2 right-2 text-red-600 focus:outline-none" onClick={handleClosePopup}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="flex items-center space-x-6">
        {/*<img src={user.avatar[0]} alt={localizedContent.alt} className="w-16 h-16 rounded-full object-cover" />*/}
        <FontAwesomeIcon icon={faUser} className="w-12 h-12 text-blue-600" />
        
        <div>
          <h3 className="text-2xl font-bold">{user.name} {user.surname}</h3>
          <p className="text-lg">{getHighestRole(user.roles)}</p>
          <div className="flex items-center space-x-4">
            <span className="text-gray-500 text-sm">Created:</span>
            <span className="text-sm">{new Date(user.createdat).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-500 text-sm">Last connection:</span>
            <span className="text-sm">{new Date(user.updatedat).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
{/* Popup suppression de l'utilisateur*/}
{userToDelete && user && isDeletePopupOpen &&( // Show user info and delete button only if user is selected
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white w-[500px] h-[500px] p-10 rounded-lg shadow-lg relative">
      <button className="absolute top-2 right-2 text-red-600 focus:outline-none" onClick={handleCloseDeletePopup}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this user?</h3>
      <div className="flex items-center space-x-6">
        {/*<img src={user.avatar[0]} alt={localizedContent.alt} className="w-16 h-16 rounded-full object-cover" />*/}
        <FontAwesomeIcon icon={faUser} className="w-12 h-12 text-blue-600" />
        
        <div>
          <h3 className="text-2xl font-bold">{user.name} {user.surname}</h3>
          <p className="text-lg">{getHighestRole(user.roles)}</p>
          <div className="flex items-center space-x-4">
            <span className="text-gray-500 text-sm">Created:</span>
            <span className="text-sm">{new Date(user.createdat).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-500 text-sm">Last connection:</span>
            <span className="text-sm">{new Date(user.updatedat).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <button className="text-red-600 ml-4" onClick={() => handleFinalDelete(user.id)}> {/* Delete button */}
        <FontAwesomeIcon icon={faTrash} /> {localizedContent.actions.delete}
      </button>
      <button className="text-red-600 ml-4" onClick={() => setIsDeletePopupOpen(false)}> {/* Delete button */}
        <FontAwesomeIcon icon={faTrash} /> Abandon
      </button>
      
      
    </div>
  </div>


)}
    </div>
  );
};

export default Users;
