export type StatisticsType = {
    totalTrips: number;
    totalDistance: number;
    averageRating: number;
    totalEarnings: number;
    tripsPerMonth: {
        month: string;
        count: number;
    }[];
};

export const mockStatistics: StatisticsType = {
    totalTrips: 45,
    totalDistance: 3500,
    averageRating: 4.6,
    totalEarnings: 1250.50,
    tripsPerMonth: [
        { month: "Janvier", count: 12 },
        { month: "Février", count: 15 },
        { month: "Mars", count: 18 }
    ]
};