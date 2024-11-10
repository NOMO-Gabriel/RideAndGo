'use client';
import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faTrash, faEye,
  faPauseCircle, faBell, faTimes,
  faPlayCircle,faPlus
} from '@fortawesome/free-solid-svg-icons';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/app/utils/hooks/useUser';
import Link from 'next/link';
import CreateAdminForm from '@/app/components/Forms/CreateAdminForm';
import { getUsers, deleteUser, suspendUser,reactivateUser,setRoles, alertUser} from '@/app/utils/api/admin';
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';
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

const content = {
  en: {
    title: "Users",
    filter: "Filter by Role",
    actions: {
      view: "View", edit: "Edit", delete: "Delete", promote: "Promote",
      block: "Block", suspend: "Suspend", alert: "Send Alert", activity: "Activity",activate:"  Activate"
    },
    alt: "User avatar",
  },
  fr: {
    title: "Utilisateurs",
    filter: "Filtrer par rôle",
    actions: {
      view: "Voir", edit: "Modifier", delete: "Supprimer", promote: "Promouvoir",
      block: "Bloquer", suspend: "Suspendre", alert: "Envoyer une alerte", activity: "Activité",activate:"  Activer"
    },
    alt: "Avatar de l'utilisateur",
  },
};

const roleMapper = (role: string): string => {
  switch (role) {
      case 'ROLE_TRAVELLER':
          return 'traveller';
      case 'ROLE_DRIVER':
          return 'driver';
      case 'ROLE_ADMIN':
          return 'admin';
      case 'ROLE_SUPERADMIN':
          return 'superadmin';
      default:
          return 'unknown';
  }
};

const allRoles = ['ROLE_TRAVELLER','ROLE_DRIVER','ROLE_ADMIN','ROLE_SUPERADMIN'];


const Users: React.FC = () => {
  const { locale } = useLocale();
  const localizedContent = locale === 'en' ? content.en : content.fr;
  const { user } = useUser();
  const { showFlashMessage } = useFlashMessage(); 
  const [users, setUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
  const [isAdminCreationFormOpen,setIsAdminCreationOpen] = useState<boolean>(false);
  
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      showFlashMessage(locale === "en"?'Error to fetch all users':'Erreur lors de la récupération des utilisateurs.', "error", true);
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
      await deleteUser({ adminId: user?.id }, userToDelete?.id);

      showFlashMessage(locale === "en" ?"User deleted succefully": "Utilisateur supprimé avec succès", "info", true)

      fetchUsers(); // Recharger la liste des utilisateurs
      setIsDeletePopupOpen(false);
      setUserToDelete(null);
    } catch (error) {
      showFlashMessage(locale === "en" ? "Failed to delete User. Please try again later.":"Echec dans la suppression de l'utilisateur, veuillez reéssayer", "info", true);
    }
  };

  const filteredUsers = roleFilter === 'all'? users : users.filter((user) => {
        return user.roles.includes(roleFilter);
    });

 const handleCreationAdmin = () =>{
  setIsAdminCreationOpen(true);
 }
 const handleCloseAdminCreationForm = () =>{
  setIsAdminCreationOpen(false);
  // reinitialisation des data
 }

  const handleCloseDeletePopup = () => {
    setUserToDelete(null);
    setIsDeletePopupOpen(false);
  };


const handleSubmitForm = () =>{
  fetchUsers();
  handleCloseAdminCreationForm();
}

  const handleActivate = async (id:string | undefined) => {
    const userToActivate = users.find((user) => user.id === id);
    if(!userToActivate) return;
    try{
        await reactivateUser({ adminId: user?.id }, userToActivate.id);
        await fetchUsers();
        showFlashMessage(locale === "en" ?"User successfully deleted":"Utilisateur activé avec succes", "success", true);  
    }catch(error){
      showFlashMessage(locale === "en" ?"Failed to activate user, try again later.":"Echec dans l'activation de l'utilsateur, veuillez reéssayer", "error", true);
    }
  }
  const handleSuspend = async (id:string | undefined) => {
    const userToSuspend = users.find((user) => user.id === id);
    if(!userToSuspend) return;
    try{
        await suspendUser({ adminId: user?.id }, userToSuspend.id);
        await fetchUsers();
        showFlashMessage(locale === "en" ?"User successfully suspended":"Utilisateur suspendu avec succes.", "success", true);  
    }catch(error){
      showFlashMessage(locale === "en" ?"Failed to suspend user, try again later.":"chec dans la suspension de l'utilsateur, veuillez reéssayer", "success", true);
    }
  }
  const handleAlert = async (id:string | undefined) => {
    const userToAlert = users.find((user) => user.id === id);
    if(!userToAlert) return;
    try{
        await alertUser({ adminId: user?.id }, userToAlert.id); 
        await fetchUsers(); 
        showFlashMessage(locale === "en"? "Alert successfully sent":"Alerte envoyée avec succès", "success", true); 
    }catch(error){
      showFlashMessage(locale === "en"? "Failed to alert user, try again later.":"Échec dans l'envoi de l'alerte", "error", true);
    }
  }

  const handleToggleAdmin = async (id: string | undefined, isAdmin: boolean) => {
    const userToToggle = users.find((user) => user.id === id);
    if (!userToToggle) return;
  
    const newRoles : string[] = isAdmin
      ? userToToggle.roles.filter((role) => role !== 'ROLE_ADMIN') // Retirer le rôle admin
      : [...userToToggle.roles, 'ROLE_ADMIN']; // Ajouter le rôle admin

      const data ={
                  userId: userToToggle?.id, 
                  adminId: user?.id,

                  newRoles: newRoles 
                  };
        console.log("data :");
        console.log(data);
        try{
          const response = await setRoles(data);
      
          showFlashMessage(
            locale === "en"
              ? (isAdmin ? "Admin role removed." : "User promoted to admin.")
              : (isAdmin ? "Rôle d'administrateur retiré." : "Utilisateur promu administrateur."),
            "info",
            true
          );
          
        }catch(error ){
            if (error instanceof Error) {
              showFlashMessage(locale === "en"?"Failed to update roles, try again later.":"Echec pour la modification des roles, reéssayer plutard" + error, "error", true);
          }else
          showFlashMessage(locale === "en"?"Failed to update roles, try again later.":"Échec de la mise à jour des rôles. Veuillez réessayer plus tard.", "error", true);    
        } finally {
          await fetchUsers();
         
        }
      
      
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
          {/* <option value="ROLE_TRAVELLER">Traveller</option> */}
          <option value="ROLE_DRIVER">Driver</option>
          <option value="ROLE_ADMIN">Admin</option>
          <option value="ROLE_SUPER_ADMIN">Super Admin</option>

        </select>
        <button onClick={handleCreationAdmin} className='flex flex-row p-2 border bg-blue-400 w-max rounded-lg space-x-4 justify-center items-center text-center h-max hover:bg-orange-btn'>
                    <FontAwesomeIcon icon={faPlus} className="w-6 h-6 text-white" />
                    <p className='text-white'>{locale === "en"? "new admin" : "nouvel admin"}</p>
        </button>

      </div>

      {isAdminCreationFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center   z-200">
            <CreateAdminForm  onFormSubmit={handleSubmitForm}/>
          </div>
        )}

      <div className="flex flex-col space-y-4">
        {filteredUsers.map((currentUser) => (
          <div key={currentUser.id} className="bg-gray-50 p-4 rounded-xl shadow-md border flex items-center justify-between">
            <div className="flex items-center space-x-4 ">
              <FontAwesomeIcon icon={faUser} className="w-12 h-12 text-blue-600" />
              <div>
                <h3 className="font-bold">{currentUser.name} {currentUser.surname}</h3>
                <span className="text-xs font-bold text-bleu-nuit">pseudo: {currentUser.pseudo}</span>
                <br />
                <span className="text-xs">Created: {new Date(currentUser.createdat).toLocaleDateString()}</span>
                <br />
                <span className="text-xs">Last connection: {new Date(currentUser.updatedat).toLocaleDateString()}</span>
                <div className={"flex flex-row space-x-2 text-bleu-nuit  text-xs font-bold"}>
                    {allRoles.map((role) => (
                    currentUser.roles.includes(role) && <span key={role}>{roleMapper(role)}</span>
                    ))}
              </div>
              </div>

            </div>

            <div className="flex space-x-4 text-xl">
              <button className="text-green-600" title={localizedContent.actions.view} >
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button
                  className={currentUser.roles.includes('ROLE_ADMIN') ? "text-blue-600" : "text-gray-600"}
                  title={currentUser.roles.includes('ROLE_ADMIN') ? "Demote to User" : "Promote to Admin"}
                  onClick={() => handleToggleAdmin(currentUser?.id, currentUser.roles.includes('ROLE_ADMIN'))}
                >
                  <FontAwesomeIcon icon={currentUser.roles.includes('ROLE_ADMIN') ? faArrowDown : faArrowUp} />
              </button>

                {
                  !currentUser.isSuspend &&(
                    <button className="text-orange-600" title={localizedContent.actions.suspend} onClick={() => handleSuspend(currentUser?.id)}>
                      <FontAwesomeIcon icon={faPauseCircle} />
                    </button>
                  )}
                  {currentUser.isSuspend &&(
                    <button className="text-green-600" title={localizedContent.actions.activate} onClick={() => handleActivate(currentUser?.id)}>
                      <FontAwesomeIcon icon={faPlayCircle} />
                    </button>
                  ) 
                }
              <button className="text-purple-600" title={localizedContent.actions.alert} onClick={() => handleAlert(currentUser?.id)}>
                <FontAwesomeIcon icon={faBell} />
              </button>
              <button className="text-red-600" onClick={() => handleDelete(currentUser?.id)} title={localizedContent.actions.delete}>
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
            <p>Are you sure you want to delete {userToDelete?.name}</p>
            <button onClick={handleFinalDelete} className="mt-4 bg-red-500 text-white p-2 rounded">Confirm</button>
          </div>
        </div>
      )}
       
    </div>
  );
};

export default Users;
