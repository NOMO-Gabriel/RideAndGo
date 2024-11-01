import { API_URL } from './api_infos';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

// Get all the places
export const getAllPlaces = async () => {
  const response = await fetch(`${API_URL}/places/`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors de la récupération des lieux');
  }
  return response.json();
};

//Search places by name
export const searchPlacesByName = async (name: string) => {
  const response = await fetch(`${API_URL}/places/search?name=${name}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors de la rcherche des lieux');
  }
  return response.json();
};

//Create a place
export const createPlace = async (placeData:{
        mapName: String;
        currentName: String;
        description: String;
    }) => {
        const response = await fetch(`${API_URL}/places/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(placeData),
    });
}

export const updatePlace = async (updatedPlaceData:{
        currentName: String;
        description: String;
    }) => {
        const response = await fetch(`${API_URL}/places/`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updatedPlaceData),
    });
}