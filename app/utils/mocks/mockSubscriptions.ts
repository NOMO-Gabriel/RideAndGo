export interface Subscription {
  id: string;
  label: string;
  price: string;
  features: string[];
}

export const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    label: "Gratuit",
    price: "0 FCFA",
    features: [
      "3 trajets par jour",
      "Chat avec les conducteurs",
      "Support par email"
    ]
  },
  {
    id: "2",
    label: "Premium",
    price: "5000 FCFA/mois",
    features: [
      "Trajets illimités",
      "Chat prioritaire",
      "Support 24/7",
      "Réservations prioritaires",
      "Notifications en temps réel",
      "Historique détaillé"
    ]
  },
  {
    id: "3",
    label: "Pro Conducteur",
    price: "15000 FCFA/mois",
    features: [
      "Tous les avantages Premium",
      "Commission réduite à 10%",
      "Visibilité accrue",
      "Badge conducteur vérifié",
      "Statistiques détaillées",
      "Support téléphonique prioritaire",
      "Formation conducteur gratuite"
    ]
  }
];

// Mock de l'abonnement actuel pour chaque utilisateur
export const mockUserSubscriptions: Record<string, string> = {
  "1": "Premium", // ngono jean
  "2": "Pro Conducteur", // Thomas manga
  "3": "Gratuit", // Marie Fotso
  "4": "Premium" // Samuel Dang
};
