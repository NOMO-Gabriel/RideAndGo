export type ItineraryType = {
    id: string;
    departure: string;
    arrival: string;
    date: string;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    price: number;
    seats: number;
    driver: {
        id: string;
        name: string;
        rating: number;
    };
};

export const mockItineraries: ItineraryType[] = [
    {
        id: "1",
        departure: "Paris",
        arrival: "Lyon",
        date: "2024-02-15T08:00:00Z",
        status: "PENDING",
        price: 35.00,
        seats: 3,
        driver: {
            id: "d1",
            name: "Pierre Martin",
            rating: 4.5
        }
    },
    {
        id: "2",
        departure: "Marseille",
        arrival: "Nice",
        date: "2024-02-20T10:00:00Z",
        status: "COMPLETED",
        price: 25.00,
        seats: 2,
        driver: {
            id: "d2",
            name: "Sophie Dubois",
            rating: 4.8
        }
    }
];