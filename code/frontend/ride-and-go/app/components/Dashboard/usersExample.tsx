'use client';
import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faTrash, faEye,
  faPauseCircle, faTasks, faBell, faTimes, faPlus
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
  en: { title: "Users", filter: "Filter by Role", newAdmin: "New Admin" },
  fr: { title: "Utilisateurs", filter: "Filtrer par rôle", newAdmin: "Nouvel Admin" },
};

const roleHierarchy = ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DRIVER', 'ROLE_TRAVELLER'];
const roleDisplayMap: Record<string, string> = {
  ROLE_SUPER_ADMIN: "Super Admin",
  ROLE_ADMIN: "Administrateur",
  ROLE_DRIVER: "Conducteur",
  ROLE_TRAVELLER: "Voyageur",
};

const getHighestRole = (roles: string[]): string =>
  roleHierarchy.find(role => roles.includes(role)) || 'Invité';

const Users: React.FC = () => {
  const { locale } = useLocale();
  const localizedContent = locale === 'en' ? content.en : content.fr;
  const { user } = useUser();

  const [users, setUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
  const [isAdminPopupOpen, setIsAdminPopupOpen] = useState<boolean>(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', surname: '', roles: ['ROLE_ADMIN'] });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      alert('Erreur lors de la récupération des utilisateurs.');
    }
  };

  const handleDelete = (id: string | undefined) => {
    setIsDeletePopupOpen(true);
    setUserToDelete(users.find((u) => u.id === id) || null);
  };

  const handleFinalDelete = async () => {
    if (!userToDelete?.id) return;
    try {
      await deleteUser({ adminId: user?.id }, userToDelete.id);
      ConfirmationMessage({ message: 'Utilisateur supprimé avec succès!' });
      fetchUsers();
      setIsDeletePopupOpen(false);
    } catch (error) {
      alert('Erreur de suppression.');
    }
  };

  const handleNewAdmin = async () => {
    try {
      await createAdmin(newAdmin);
      alert('Nouvel administrateur créé avec succès!');
      setIsAdminPopupOpen(false);
      fetchUsers();
    } catch (error) {
      alert("Erreur lors de la création de l'administrateur.");
    }
  };

  const filteredUsers = roleFilter === 'all'
    ? users
    : users.filter((user) => user.roles.includes(roleFilter));

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
          {roleHierarchy.map((role) => (
            <option key={role} value={role}>{roleDisplayMap[role]}</option>
          ))}
        </select>

        <button
          onClick={() => setIsAdminPopupOpen(true)}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          <FontAwesomeIcon icon={faPlus} /> {localizedContent.newAdmin}
        </button>
      </div>

      <div className="flex flex-col space-y-4">
        {filteredUsers.map((currentUser) => (
          <div key={currentUser.id} className="p-4 bg-gray-50 rounded shadow-md flex items-center justify-between">
            <div>
              <h3 className="font-bold">{currentUser.name} {currentUser.surname}</h3>
              <p>{getHighestRole(currentUser.roles)}</p>
            </div>
            <div className="space-x-2">
              <Link href={`view/${currentUser.id}`} className="text-green-500">
                <FontAwesomeIcon icon={faEye} />
              </Link>
              <button className="text-red-500" onClick={() => handleDelete(currentUser.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAdminPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="mb-4 font-bold">Créer un nouvel administrateur</h3>
            <input
              type="text"
              placeholder="Nom"
              value={newAdmin.name}
              onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Prénom"
              value={newAdmin.surname}
              onChange={(e) => setNewAdmin({ ...newAdmin, surname: e.target.value })}
              className="border p-2 mb-4 w-full"
            />
            <button
              onClick={handleNewAdmin}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Créer
            </button>
            <button
              onClick={() => setIsAdminPopupOpen(false)}
              className="ml-2 text-red-500"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {userToDelete && isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>Êtes-vous sûr de vouloir supprimer {userToDelete.name} ?</p>
            <button onClick={handleFinalDelete} className="bg-red-500 text-white px-4 py-2 rounded">
              Confirmer
            </button>
            <button onClick={() => setIsDeletePopupOpen(false)} className="ml-2">
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
