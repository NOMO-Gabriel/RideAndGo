
import { API_URL } from './api_infos';

    const getHeaders = () => ({
    'Content-Type': 'application/json',
    });

    // Inscription
    export const register = async (userData: {
    pseudo: string;
    email: string;
    password: string;
    phoneNumber: string;
    name: string;
    surname: string;
    birthday: string;
    gender: 'MALE' | 'FEMALE';
    isDriver: boolean;
    
    }) => {
      

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData),
        
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur d\'inscription');}
    return response.json(); 
    };

 
    
    // Fonction générique pour la connexion
    export const login = async (
      identifierType: 'email' | 'phoneNumber' | 'pseudo',
      identifierValue: string,
      password: string
    ) => {
      const endpoint = `${API_URL}/loginBy${capitalize(identifierType)}`;
    
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ [identifierType]: identifierValue, password }),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Login by ${identifierType} failed`);
      }
    
      return response.json();
    };
    
    // Fonction pour capitaliser le premier caractère (utilisée pour les endpoints)
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    