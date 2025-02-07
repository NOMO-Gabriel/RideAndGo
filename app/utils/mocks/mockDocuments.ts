export interface Document {
  id: string;
  type: 'CNI' | 'PERMIS' | 'CARTE_GRISE' | 'ASSURANCE' | 'CERTIFICAT_VISITE' | 'LICENCE_TRANSPORT';
  name: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  uploadDate: string;
  expiryDate?: string;
  imageUrl: string;
  rejectionReason?: string;
}

export const mockDocuments: Record<string, Document[]> = {
  "2": [ // Documents pour Thomas manga
    {
      id: "1",
      type: "CNI",
      name: "Carte Nationale d'Identité",
      description: "CNI valide du conducteur",
      status: "APPROVED",
      uploadDate: "2024-01-15",
      expiryDate: "2029-01-15",
      imageUrl: "/images/documents/cni.jpg"
    },
    {
      id: "2",
      type: "PERMIS",
      name: "Permis de Conduire",
      description: "Permis de conduire catégorie B",
      status: "APPROVED",
      uploadDate: "2024-01-15",
      expiryDate: "2027-01-15",
      imageUrl: "/images/documents/permis.jpg"
    },
    {
      id: "3",
      type: "CARTE_GRISE",
      name: "Carte Grise",
      description: "Carte grise du véhicule",
      status: "PENDING",
      uploadDate: "2024-02-01",
      imageUrl: "/images/documents/carte_grise.jpg"
    },
    {
      id: "4",
      type: "ASSURANCE",
      name: "Assurance Automobile",
      description: "Attestation d'assurance en cours de validité",
      status: "REJECTED",
      uploadDate: "2024-01-20",
      expiryDate: "2025-01-20",
      imageUrl: "/images/documents/assurance.jpg",
      rejectionReason: "Document expiré, veuillez fournir une attestation à jour"
    },
    {
      id: "5",
      type: "CERTIFICAT_VISITE",
      name: "Certificat de Visite Technique",
      description: "Certificat de contrôle technique",
      status: "APPROVED",
      uploadDate: "2024-01-10",
      expiryDate: "2024-07-10",
      imageUrl: "/images/documents/visite_technique.jpg"
    },
    {
      id: "6",
      type: "LICENCE_TRANSPORT",
      name: "Licence de Transport",
      description: "Autorisation de transport urbain",
      status: "APPROVED",
      uploadDate: "2024-01-05",
      expiryDate: "2025-01-05",
      imageUrl: "/images/documents/licence.jpg"
    }
  ]
};
