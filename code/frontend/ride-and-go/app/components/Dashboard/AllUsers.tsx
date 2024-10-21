'use client';
import React, { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faTrash, faPen, faEye, faUserShield, faBan, 
  faPauseCircle, faTasks, faBell
} from '@fortawesome/free-solid-svg-icons';

// Type pour l'utilisateur
interface User {
  id: number;
  username: string;
  role: 'customer' | 'driver' | 'admin';
  createdAt: string;
  lastConnection: string;
  status: 'active' | 'inactive';
}

// Données fictives des utilisateurs
const fakeUsers: User[] = [
  { id: 1, username: 'Alice', role: 'customer', createdAt: '2024-01-15', lastConnection: '2024-10-21', status: 'active' },
  { id: 2, username: 'Bob', role: 'driver', createdAt: '2024-02-20', lastConnection: '2024-10-20', status: 'inactive' },
  { id: 3, username: 'Charlie', role: 'customer', createdAt: '2024-03-10', lastConnection: '2024-10-19', status: 'active' },
  { id: 4, username: 'Admin', role: 'admin', createdAt: '2024-04-01', lastConnection: '2024-10-18', status: 'active' },
];

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

const Users = () => {
  const { locale } = useLocale(); // Gestion de l'internationalisation
  const localizedContent = userContent[locale as 'fr' | 'en'];

  const [users, setUsers] = useState<User[]>(fakeUsers);
  const [roleFilter, setRoleFilter] = useState<'all' | 'customer' | 'driver' | 'admin'>('all');

  // Gestion de la suppression d'un utilisateur
  const handleDelete = (id: number) => setUsers(users.filter(user => user.id !== id));

  // Gestion du filtrage par rôle
  const filteredUsers = roleFilter === 'all' ? users : users.filter(user => user.role === roleFilter);

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
                <h3 className="font-bold">{user.username}</h3>
                <p className="text-sm">{user.role}</p>
                <span className="text-xs">Created: {user.createdAt}</span>
                <br />
                <span className="text-xs">Last connection: {user.lastConnection}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 text-xl">
              <button className="text-green-600" title={localizedContent.actions.view}>
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button className="text-blue-600" title={localizedContent.actions.edit}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button className="text-yellow-600" title={localizedContent.actions.promote}>
                <FontAwesomeIcon icon={faUserShield} />
              </button>
              <button className="text-gray-600" title={localizedContent.actions.activity}>
                <FontAwesomeIcon icon={faTasks} />
              </button>
              <button className="text-orange-600" title={localizedContent.actions.suspend}>
                <FontAwesomeIcon icon={faPauseCircle} />
              </button>
              <button className="text-red-600" title={localizedContent.actions.block}>
                <FontAwesomeIcon icon={faBan} />
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
    </div>
  );
};

export default Users;
