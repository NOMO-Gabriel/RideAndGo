import { API_URL } from './api_infos';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

// get data of a user
export const getUser = async (id: string) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur de récupération des données');
  }
  return response.json();
};


// update infos of a user
export const UpdateUsersInfo = async (
    userData:{  
        id: string | undefined, 
        personnalInfos :{
                name: string;
                surname: string;
                phoneNumber: string;
                pseudo:string;
                email: string;
                birthday:string;
                gender: 'MALE' | 'FEMALE';}
            }) => {
    const response = await fetch(`${API_URL}/users/updatePersonnalInfos`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur de mise a jour des infos');
    }
    return response.json();
  };

  // Changer le mot de passe
export const changePassword = async (
    passwordChangeRequest: {
                  id: string | undefined;
                  currentPassword: string;    
                  newPassword: string;
                }
) => {
  const response = await fetch(`${API_URL}/users/changePassword`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(passwordChangeRequest),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors du changement de mot de passe');
  }
  return response.json();
};

 // Changer les preferences
 export const updateUserPreferences = async (
  updatePreferencesRequest: {
                id: string | undefined;
                preferences:{
                language:string;
                theme: string;
                timeZone: number;
                isLocationEnabled: boolean;

                }
              }
) => {
const response = await fetch(`${API_URL}/users/updatePreferences`, {
  method: 'PUT',
  headers: getHeaders(),
  body: JSON.stringify(updatePreferencesRequest),
});

if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.message || 'Erreur lors de la mise a jour des preferences');
}
return response.json();
};



