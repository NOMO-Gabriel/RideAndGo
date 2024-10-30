import { API_URL } from './api_infos';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

// Récupérer tous les utilisateurs actifs
export const getAllActiveUsers = async () => {
  const response = await fetch(`${API_URL}/`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors de la récupération des utilisateurs');
  }
  return response.json();
};

// Récupérer un utilisateur par ID
export const getUserById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Utilisateur introuvable');
  }
  return response.json();
};

// Mettre à jour un utilisateur
export const updateUser = async (id: string, updatedUser: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur de mise à jour');
  }
  return response.json();
};



// Supprimer un utilisateur
export const deleteUser = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors de la suppression');
  }
  return response.ok;
};

// Suppression douce d’un utilisateur
export const softDeleteUser = async (id: string) => {
  const response = await fetch(`${API_URL}/softDelete/${id}`, {
    method: 'PUT',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors de la suppression douce');
  }
  return response.json();
};

// Suspendre un utilisateur
export const suspendUser = async (id: string) => {
  const response = await fetch(`${API_URL}/suspend/${id}`, {
    method: 'PUT',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors de la suspension');
  }
  return response.json();
};

// Réactiver un utilisateur
export const reactivateUser = async (id: string) => {
  const response = await fetch(`${API_URL}/reactivate/${id}`, {
    method: 'PUT',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors de la réactivation');
  }
  return response.json();
};
