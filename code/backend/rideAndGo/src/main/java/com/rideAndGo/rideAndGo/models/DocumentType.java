package com.rideAndGo.rideAndGo.models;

public enum DocumentType {
    CNI("Carte Nationale d'Identité"),
    PERMIS_DE_CONDUITE("Permis de Conduire"),
    CARTE_GRISE("Carte Grise"),
    ASSURANCE("Assurance"),
    CERTIFICAT_DE_VISITE_TECHNIQUE("Certificat de Visite Technique"),
    VIGNETTE_AUTOMOBILE("Vignette Automobile"),
    CARTE_DE_STATIONNEMENT("Carte de Stationnement");

    private final String description;

    DocumentType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    // Méthode pour récupérer un DocumentType par son code (par exemple "CNI", "PERMIS_DE_CONDUITE")
    public static DocumentType fromCode(String code) {
        for (DocumentType type : values()) {
            if (type.name().equalsIgnoreCase(code)) {
                return type;
            }
        }
        return null;  // ou gérer un cas par défaut si nécessaire
    }

    // Méthode pour récupérer un DocumentType par sa description (ancien comportement)
    public static DocumentType fromDescription(String description) {
        for (DocumentType type : values()) {
            if (type.getDescription().equalsIgnoreCase(description)) {
                return type;
            }
        }
        return null;  // ou gérer un cas par défaut si nécessaire
    }
    
}
