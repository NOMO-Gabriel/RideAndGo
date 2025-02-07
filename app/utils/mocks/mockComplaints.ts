export type ComplaintType = {
    id: string;
    subject: string;
    description: string;
    status: 'PENDING' | 'RESOLVED' | 'IN_PROGRESS';
    date: string;
    userId: string;
    category: string;
};

export const mockComplaints: ComplaintType[] = [
    {
        id: "1",
        subject: "Retard important",
        description: "Le conducteur avait 30 minutes de retard",
        status: "RESOLVED",
        date: "2024-02-01T09:00:00Z",
        userId: "1",
        category: "DELAY"
    },
    {
        id: "2",
        subject: "Problème de paiement",
        description: "Double facturation pour un trajet",
        status: "IN_PROGRESS",
        date: "2024-02-05T14:30:00Z",
        userId: "1",
        category: "PAYMENT"
    },
    {
        id: "3",
        subject: "Comportement inapproprié",
        description: "Conducteur impoli",
        status: "PENDING",
        date: "2024-02-07T10:15:00Z",
        userId: "1",
        category: "BEHAVIOR"
    }
];