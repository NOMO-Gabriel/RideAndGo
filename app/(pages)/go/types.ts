// types.ts

// Définition du type pour une localisation (point de départ ou destination)
export interface Location {
    id: string;
    name: string;
    lat: number;
    lng: number;
  }
  
  // Définition du type pour un conducteur
  export interface Driver {
    id: string;
    name: string;
    rating: number;  // Note du conducteur
    price: number;   // Prix proposé par le conducteur
    accepted: boolean;  // Si le conducteur a accepté ou non la course
  }
  
  // Définition du type pour le calcul du tarif
  export interface Fare {
    estimatedFare: number;
    distance: number;
    time: number;
  }
  