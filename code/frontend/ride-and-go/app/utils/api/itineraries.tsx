// api/itineraries.js
import { API_URL } from './api_infos';


// Function to get all itineraries
export const fetchItineraries = async () => {
  const response = await fetch("http://localhost:8080/api/itineraries", {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch itineraries');
  }
  return response.json();
};

// Function to delete an itinerary by id
export const deleteItinerary = async (id) => {
  const response = await fetch(`${API_URL}/delete/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete itinerary');
  }
};

// Function to update an itinerary by id
export const updateItinerary = async (id, itineraryDetails) => {
  const response = await fetch(`${API_URL}/edit/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(itineraryDetails),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update itinerary');
  }
  return response.json();
};

// Helper function to get headers 
function getHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}
