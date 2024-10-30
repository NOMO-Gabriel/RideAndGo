'use client';
import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faTrash, faEye,
  faPauseCircle, faTasks, faBell, faTimes
} from '@fortawesome/free-solid-svg-icons';
import ConfirmationMessage from '../cards/ConfirmationMessage';
import { getUsers, deleteUser, suspendUser, setRoles, createAdmin } from '@/app/utils/api/admin';
import { useUser } from '@/app/utils/hooks/useUser';
import Link from 'next/link';

type User = {
  id: string | undefined;
  name: string;
  surname: string;
  roles: string[];
  createdat: string;
  updatedat: string;
};

const content = {
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

const roleHierarchy = ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DRIVER', 'ROLE_TRAVELLER'];
const roleDisplayMap: Record<string, string> = {
  ROLE_SUPER_ADMIN: "super administrateur",
  ROLE_ADMIN: "administrateur",
  ROLE_DRIVER: "conducteur",
  ROLE_TRAVELLER: "voyageur",
  ROLE_GUEST: "invité", // Ajoutez un rôle par défaut si nécessaire
};

const getHighestRole = (roles: string[]): string => {
  for (const role of roleHierarchy) {
    if (roles.includes(role)) {
      return roleDisplayMap[role] || role; // Retourne le nom lisible
    }
  }
  return roleDisplayMap['ROLE_GUEST']; // Rôle par défaut
};

const Users: React.FC = () => {
  const { locale } = useLocale();
  const localizedContent = locale === 'en' ? content.en : content.fr;
  const { user } = useUser();

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      alert('Erreur lors de la récupération des utilisateurs.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id: string | undefined) => {
    setIsDeletePopupOpen(true);
    setUserToDelete(users.find((user) => user.id === id) || null);
  };

  const handleFinalDelete = async () => {
    if (!userToDelete?.id) return;

    try {
      await deleteUser({ adminId: user?.id }, userToDelete.id);

      ConfirmationMessage({
        icon: <FontAwesomeIcon icon={faUser} />,
        message: 'User successfully deleted!',
      });

      fetchUsers(); // Recharger la liste des utilisateurs
      setIsDeletePopupOpen(false);
      setUserToDelete(null);
    } catch (error) {
      ConfirmationMessage({
        icon: <FontAwesomeIcon icon={faUser} />,
        message: 'Error deleting user.',
      });
    }
  };

  const filteredUsers = roleFilter === 'all'
    ? users
    : users.filter((user) => user.roles.includes(roleFilter));

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  const handleCloseDeletePopup = () => {
    setUserToDelete(null);
    setIsDeletePopupOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-8 text-center">{localizedContent.title}</h2>

      <div className="mb-6 text-center">
        <label htmlFor="roleFilter" className="mr-4">{localizedContent.filter}:</label>
        <select
          id="roleFilter"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="ROLE_TRAVELLER">Traveller</option>
          <option value="ROLE_DRIVER">Driver</option>
          <option value="ROLE_ADMIN">Admin</option>

        </select>
      </div>

      <div className="flex flex-col space-y-4">
        {filteredUsers.map((currentUser) => (
          <div key={currentUser.id} className="bg-gray-50 p-4 rounded-xl shadow-md border flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faUser} className="w-12 h-12 text-blue-600" />
              <div>
                <h3 className="font-bold">{currentUser.name} {currentUser.surname}</h3>
                <p className="text-sm">{getHighestRole(currentUser.roles)}</p>
                <span className="text-xs">Created: {new Date(currentUser.createdat).toLocaleDateString()}</span>
                <br />
                <span className="text-xs">Last connection: {new Date(currentUser.updatedat).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex space-x-4 text-xl">
              <Link className="text-green-600" title={localizedContent.actions.view} href={`view/${currentUser.id}`}>
                <FontAwesomeIcon icon={faEye} />
              </Link>

              <button className="text-orange-600" title={localizedContent.actions.suspend}>
                <FontAwesomeIcon icon={faPauseCircle} />
              </button>
              <button className="text-purple-600" title={localizedContent.actions.alert}>
                <FontAwesomeIcon icon={faBell} />
              </button>
              <button className="text-red-600" onClick={() => handleDelete(currentUser.id)} title={localizedContent.actions.delete}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {userToDelete && isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[500px] h-[500px] p-10 rounded-lg shadow-lg relative">
            <button className="absolute top-2 right-2 text-red-600 focus:outline-none" onClick={handleCloseDeletePopup}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <p>Are you sure you want to delete {userToDelete.name}?</p>
            <button onClick={handleFinalDelete} className="mt-4 bg-red-500 text-white p-2 rounded">Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
