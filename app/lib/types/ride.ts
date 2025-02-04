export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface Client {
  id: string;
  name: string;
  position: [number, number];
  currentLocation: Location;
  destination: Location;
  pickupLocation: Location;
  price: number;
  status: 'available' | 'selected' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  speed: number;
  direction: [number, number];
  requestTime: Date;
  estimatedDuration: number; // en minutes
  distance: number; // en kilomètres
}

export interface ProgressData {
  dailyGoal: number;
  earnedToday: number;
  completedRides: number;
  totalDistance: number;
  averageRating: number;
  ridesHistory: {
    date: Date;
    earnings: number;
    distance: number;
    rating: number;
  }[];
}
