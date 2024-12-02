import { API_URL } from './api_infos';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

export const getAllNotifications = async () => {
    const response = await fetch(`${API_URL}/notifications/`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des notifications');
    }
    return response.json();
};
