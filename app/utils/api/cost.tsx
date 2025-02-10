// import { API_URL } from './api_infos';
// export const API_URL="https://rideandgo.onrender.com"
export const API_URL="http://localhost:5000"


export interface   calculateCostRequest {
            
    start: string;
    end: string;
    hour?: string;
   
}

export const  formatDuration = (durationMin:number) => {
  let totalSeconds = Math.round(durationMin * 60); // Convertir en secondes
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  return `${hours}h ${minutes}min ${seconds}s`;
}


const getHeaders = () => ({
  'Content-Type': 'application/json',
});

// calculer un cout
  export const calculateCost = async (
    calculateCostRequest: calculateCostRequest) => {
      console.log("data:" + JSON.stringify(calculateCostRequest))
            const response = await fetch(`${API_URL}/cost`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(calculateCostRequest),
              });

              if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors du calcul de cout');
        }
              return response.json();
    }
 
    
        
  

    
    