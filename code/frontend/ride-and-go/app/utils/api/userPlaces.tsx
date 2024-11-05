// In /utils/api/userPlaces.js
function getHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

// Function to get all user places
export const fetchUserPlaces = async () => {
    const response = await fetch("http://localhost:8080/api/userPlaces", {
      method: 'GET',
      headers: getHeaders(),  // Make sure this function sets Content-Type to 'application/json'
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user places');
    }
    return response.json();
  };
  
// Function to delete a user place by id
export const deleteUserPlace = async (id: string) => {
    const response = await fetch(`http://localhost:8080/api/userPlaces/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete user place');
    }
  };
  // Function to get user places by user ID
  export const fetchUserPlacesByUserId = async (userId: string) => {
    const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
      method: 'GET',
      headers: getHeaders(),  // Ensure this function sets Content-Type to 'application/json'
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user places for user');
    }
    
    return response.json();
  };
  
  

