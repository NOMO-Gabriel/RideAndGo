'use client';
import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faTrash, faEye,
  faPauseCircle, faBell, faTimes,
  faPlayCircle, faUserPlus, faExchangeAlt
} from '@fortawesome/free-solid-svg-icons';
import ConfirmationMessage from '../cards/ConfirmationMessage';
import { getUsers, deleteUser, suspendUser, activateUser, setRoles, createAdmin, alertUser } from '@/app/utils/api/admin';
import { useUser } from '@/app/utils/hooks/useUser';
import Link from 'next/link';

// Typage de l'utilisateur
type User = {
  id: string | undefined;
  name: string;
  surname: string;
  pseudo: string;
  isSuspend: boolean;
  roles: string[];
  createdat: string;
  updatedat: string;
};

// Contenu traduit en plusieurs langues
const content = {
  en: { /* ...comme avant... */ },
  fr: { /* ...comme avant... */ },
};

// Mappage et hiérarchie des rôles
const roleHierarchy = ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DRIVER', 'ROLE_TRAVELLER'];
const roleDisplayMap: Record<string, string> = { /* ...comme avant... */ };

// Fonction pour obtenir le rôle principal
const getRoles = (roles: string[]): string => { /* ...comme avant... */ };

const Users: React.FC = () => {
  const { locale } = useLocale();
  const localizedContent = locale === 'en' ? content.en : content.fr;
  const { user } = useUser();

  const [users, setUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
  
  const fetchUsers = async () => { /* ...comme avant... */ };
  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = (id: string | undefined) => { /* ...comme avant... */ };
  const handleFinalDelete = async () => { /* ...comme avant... */ };
  const handleActivate = async (id: string | undefined) => { /* ...comme avant... */ };
  const handleSuspend = async (id: string | undefined) => { /* ...comme avant... */ };
  const handleAlert = async (id: string | undefined) => { /* ...comme avant... */ };

  // Fonction pour ajouter le rôle admin à un utilisateur
  const handleCreateAdmin = async (id: string | undefined) => {
    if (!id) return;
    try {
      await createAdmin({ adminId: user?.id }, id);
      ConfirmationMessage({
        icon: <FontAwesomeIcon icon={faUserPlus} />,
        message: 'User successfully promoted to admin!',
      });
      fetchUsers();
    } catch (error) {
      alert('Failed to create admin. Please try again later.');
    }
  };

  // Fonction pour changer les rôles d'un utilisateur
  const handleChangeRole = async (id: string | undefined) => {
    if (!id) return;
    const newRole = prompt('Enter the new role (e.g., ROLE_ADMIN, ROLE_DRIVER):');
    if (newRole && roleHierarchy.includes(newRole)) {
      try {
        await setRoles({ adminId: user?.id, role: newRole }, id);
        ConfirmationMessage({
          icon: <FontAwesomeIcon icon={faExchangeAlt} />,
          message: 'User role successfully updated!',
        });
        fetchUsers();
      } catch (error) {
        alert('Failed to update role. Please try again later.');
      }
    } else {
      alert('Invalid role. Please enter a valid role.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-8 text-center">{localizedContent.title}</h2>

      <div className="mb-6 text-center">
        {/* Filtrage par rôle */}
        <label htmlFor="roleFilter" className="mr-4">{localizedContent.filter}:</label>
        <select
          id="roleFilter"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="ROLE_DRIVER">Driver</option>
          <option value="ROLE_ADMIN">Admin</option>
          <option value="ROLE_SUPER_ADMIN">Super Admin</option>
        </select>
      </div>

      <div className="flex flex-col space-y-4">
        {users.map((currentUser) => (
          <div key={currentUser.id} className="bg-gray-50 p-4 rounded-xl shadow-md border flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faUser} className="w-12 h-12 text-blue-600" />
              <div>
                <h3 className="font-bold">{currentUser.name} {currentUser.surname}</h3>
                <span className="text-xs font-bold text-bleu-nuit">pseudo: {currentUser.pseudo}</span>
                <br />
                <span className="text-xs">Created: {new Date(currentUser.createdat).toLocaleDateString()}</span>
                <br />
                <span className="text-xs">Last connection: {new Date(currentUser.updatedat).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex space-x-4 text-xl">
              <Link className="text-green-600" title={localizedContent.actions.view} href={`view-activity/${currentUser.id}`}>
                <FontAwesomeIcon icon={faEye} />
              </Link>
              {
                !currentUser.isSuspend ? (
                  <button className="text-orange-600" title={localizedContent.actions.suspend} onClick={() => handleSuspend(currentUser.id)}>
                    <FontAwesomeIcon icon={faPauseCircle} />
                  </button>
                ) : (
                  <button className="text-green-600" title={localizedContent.actions.activate} onClick={() => handleActivate(currentUser.id)}>
                    <FontAwesomeIcon icon={faPlayCircle} />
                  </button>
                )
              }
              <button className="text-purple-600" title={localizedContent.actions.alert} onClick={() => handleAlert(currentUser.id)}>
                <FontAwesomeIcon icon={faBell} />
              </button>
              <button className="text-blue-600" title="Promote to Admin" onClick={() => handleCreateAdmin(currentUser.id)}>
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
              <button className="text-yellow-600" title="Change Role" onClick={() => handleChangeRole(currentUser.id)}>
                <FontAwesomeIcon icon={faExchangeAlt} />
              </button>
              <button className="text-red-600" onClick={() => handleDelete(currentUser.id)} title={localizedContent.actions.delete}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup de confirmation de suppression */}
      {userToDelete && isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[500px] h-[500px] p-10 rounded-lg shadow-lg relative">
            <button className="absolute top-2 right-2 text-red-600 focus:outline-none" onClick={handleCloseDeletePopup}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <p>Are you sure you want to delete {userToDelete?.name}?</p>
            <button onClick={handleFinalDelete} className="mt-4 bg-red-500 text-white p-2 rounded">Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
