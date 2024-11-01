import { API_URL } from './api_infos';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

//get all users
export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users/`, {
      method: 'GET',
      headers: getHeaders(),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur de récupération des utilisateurs');
    }
    return response.json();
  };
  
// suspendre l'utilisateur
export const suspendUser = async (admin: {adminId:string | undefined}, id: string | undefined) => {
    const response = await fetch(`${API_URL}/users/suspendUser/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(admin),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la suspension du user');
    }
    return response.json();
    };
  export const reactivateUser = async (admin: {adminId:string | undefined}, id: string | undefined) => {
    const response = await fetch(`${API_URL}/users/reactivateUser/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(admin),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la suspension du user');
    }
    return response.json();
    };  
  
  // changer les roles
  export const setRoles = async (
      setRolesRequest: {
          adminId:string | undefined;
          userId: string | undefined;
          newRoles:string[];
      }) => {
    const response = await fetch(`${API_URL}/admin/setRoles`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(setRolesRequest),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la mise a jour du role du user');
    }
    return response.json();
      
 }
  
  // creer un admin
  export const createAdmin = async (
        createAdminRequest: {
            superAdminId:string | undefined,
            adminToCreate: {
                pseudo: string;
                email: string;
                password: string;
                phoneNumber: string;
                name: string;
                surname: string;
                birthday: string;
                gender: 'MALE' | 'FEMALE';
            
                }

        }) => {
    const response = await fetch(`${API_URL}/admin/createAdmin`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(createAdminRequest),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la suppression du user');
    }
    return response.json();
    };
    
    // supprimer l'utilisateur
export const deleteUser = async (admin: {adminId:string | undefined}, id: string | undefined) => {
  const response = await fetch(`${API_URL}/users/delete/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(admin),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors de la suppression du user');
  }
  return response.json();
  };
  
  // alerter l'utilisateur
export const alertUser = async (admin: {adminId:string | undefined}, id: string | undefined) => {
  const response = await fetch(`${API_URL}/users/reactivateUser/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(admin),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors de la suspension du user');
  }
  return response.json();
  };