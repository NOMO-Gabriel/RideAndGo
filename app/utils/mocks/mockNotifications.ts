export type NotificationType = {
    id: string;
    title: string;
    message: string;
    date: string;
    isRead: boolean;
    type: 'info' | 'warning' | 'error' | 'success';
};

export const mockNotifications: NotificationType[] = [
    {
        id: "1",
        title: "Nouveau trajet disponible",
        message: "Un nouveau trajet correspondant à vos critères est disponible",
        date: "2024-02-07T08:30:00Z",
        isRead: false,
        type: "info"
    },
    {
        id: "2",
        title: "Modification de réservation",
        message: "Votre réservation du 15 février a été modifiée",
        date: "2024-02-06T15:45:00Z",
        isRead: true,
        type: "warning"
    },
    {
        id: "3",
        title: "Paiement confirmé",
        message: "Votre paiement pour le trajet du 10 février a été confirmé",
        date: "2024-02-05T12:00:00Z",
        isRead: true,
        type: "success"
    }
];