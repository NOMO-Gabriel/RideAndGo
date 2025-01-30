// Points d'intérêt à Yaoundé
export const YAOUNDE_LOCATIONS = {
  CENTRE: { lat: 3.8667, lng: 11.5167, name: 'Centre-ville' },
  BASTOS: { lat: 3.8833, lng: 11.5167, name: 'Bastos' },
  MVOG_MBI: { lat: 3.8544, lng: 11.5189, name: 'Mvog-Mbi' },
  MVAN: { lat: 3.8236, lng: 11.4954, name: 'Mvan' },
  NSAM: { lat: 3.8347, lng: 11.5153, name: 'Nsam' },
  NGOUSSO: { lat: 3.9089, lng: 11.5375, name: 'Ngousso' },
  CITE_VERTE: { lat: 3.8894, lng: 11.4919, name: 'Cité Verte' },
  BIYEM_ASSI: { lat: 3.8514, lng: 11.4889, name: 'Biyem-Assi' },
  MIMBOMAN: { lat: 3.8667, lng: 11.5417, name: 'Mimboman' },
  OMNISPORT: { lat: 3.8833, lng: 11.5333, name: 'Omnisport' }
};

// Noms camerounais pour les chauffeurs
export const DRIVER_NAMES = [
  'Kamdem Jean',
  'Nganou Pierre',
  'Mbarga Paul',
  'Atangana Thomas',
  'Fouda Michel',
  'Nkodo François',
  'Essomba André',
  'Mvondo Joseph',
  'Ongolo Robert',
  'Biyiha Jacques'
];

// Configuration des tarifs
export const FARE_CONFIG = {
  BASE_FARE: 500, // Tarif de base en FCFA
  PER_KM_RATE: 200, // Tarif par kilomètre en FCFA
  MIN_FARE: 1000, // Tarif minimum en FCFA
  PEAK_HOUR_MULTIPLIER: 1.5, // Multiplicateur pour les heures de pointe
  PEAK_HOURS: { // Heures de pointe
    morning: { start: 7, end: 9 }, // 7h-9h
    evening: { start: 17, end: 19 } // 17h-19h
  }
};
