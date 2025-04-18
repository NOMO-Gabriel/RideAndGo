'use client';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import React, { useEffect, useState } from 'react';

// Définition des interfaces améliorées
interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  [key: string]: string | undefined;
}

// Interface pour les données JSON qui contiennent des objets localisés
interface TeamMemberData {
  id: number;
  name: string;
  position: {
    fr: string;
    en: string;
    [key: string]: string;
  };
  bio: {
    fr: string;
    en: string;
    [key: string]: string;
  };
  image: string;
  socials?: SocialLinks;
  featured?: boolean;
}

// Interface pour l'utilisation dans le composant
interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  socials?: SocialLinks;
  featured?: boolean;
}

interface Translations {
  title: string;
  description: string;
  viewProfile: string;
  errorMessage: string;
}

interface TeamSectionProps {
  teamData?: TeamMember[];
  translations?: Translations;
}

const Equipe: React.FC<TeamSectionProps> = ({ teamData: initialTeamData, translations: customTranslations }) => {
  const [teamData, setTeamData] = useState<TeamMember[]>(initialTeamData || []);
  const [loading, setLoading] = useState(!initialTeamData);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useLocale();

  // Default translations with English and French options
  const defaultTranslations: Record<string, Translations> = {
    fr: {
      title: "Notre Équipe",
      description: "Une équipe passionnée qui travaille pour vous",
      viewProfile: "Voir le profil",
      errorMessage: "Impossible de charger les données de l'équipe"
    },
    en: {
      title: "Our Team",
      description: "A passionate team working for you",
      viewProfile: "View profile",
      errorMessage: "Unable to load team data"
    }
  };

  // Use custom translations if provided, otherwise use defaults
  const translations: Translations = customTranslations || defaultTranslations[locale] || defaultTranslations.en;

  // Fonction pour transformer les données JSON en format attendu par le composant
  const transformTeamData = (data: TeamMemberData[]): TeamMember[] => {
    return data.map(member => ({
      id: member.id,
      name: member.name,
      // Utiliser la traduction correspondante à la locale actuelle
      position: member.position[locale] || member.position.en || member.position.fr,
      bio: member.bio[locale] || member.bio.en || member.bio.fr,
      image: member.image,
      socials: member.socials,
      featured: member.featured
    }));
  };

  // Load team data if not provided via props
  useEffect(() => {
    if (!initialTeamData) {
      const fetchTeamData = async () => {
        try {
          setLoading(true);
          // You can replace this with your actual API endpoint
          const response = await fetch(`/api/team?locale=${locale}`);
          if (!response.ok) {
            throw new Error('Failed to fetch team data');
          }
          const data = await response.json();
          setTeamData(transformTeamData(data));
          setError(null);
        } catch (error) {
          console.error('Error fetching team data:', error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
          
          // Import from local JSON instead of hardcoding fallback data
          import('../../data/teamData.json')
            .then(module => {
              const localData = module.default;
              setTeamData(transformTeamData(localData));
            })
            .catch(err => {
              console.error('Error loading local team data:', err);
              // Only use hardcoded fallback if JSON import fails
              setTeamData(getFallbackData());
            });
        } finally {
          setLoading(false);
        }
      };

      fetchTeamData();
    }
  }, [locale, initialTeamData]);

  // Get fallback data - moved to a function for clarity
  const getFallbackData = (): TeamMember[] => {
    return [
      {
        id: 1,
        name: "Djotio Thomas",
        position: locale === 'fr' ? "Prof,Dr-Ing, Directeur Général" : "Prof, Dr-Ing, CEO",
        bio: locale === 'fr' ? "Enseignant chercheur doté de puissantes qualités de pédagogue et de manager" : "Leadership expert",
        image: "/images/equipe/djotio.jpeg",
        socials: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com"
        },
        featured: true
      },
      {
        id: 2,
        name: "Nomo Gabriel",
        position: locale === 'fr' ? "Directeur Général" : "CEO",
        bio: locale === 'fr' ? "Expert en leadership" : "Leadership expert",
        image: "/images/equipe/nomo.jpg",
        socials: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com"
        },
        featured: true
      },
      {
        id: 3,
        name: "Yves",
        position: locale === 'fr' ? "Directeur Marketing" : "Marketing Director",
        bio: locale === 'fr' ? "Spécialiste en stratégie digitale" : "Digital strategy specialist",
        image: "/images/equipe/yves.jpg",
        socials: {
          linkedin: "https://linkedin.com"
        }
      },
      {
        id: 4,
        name: "Eleonor",
        position: locale === 'fr' ? "Directrice Marketing" : "Marketing Director",
        bio: locale === 'fr' ? "Spécialiste en stratégie digitale" : "Digital strategy specialist",
        image: "/images/equipe/eleonor.jpg",
        socials: {
          linkedin: "https://linkedin.com"
        }
      },
      {
        id: 5,
        name: "Folong Zidane",
        position: locale === 'fr' ? "Directeur Technique" : "Technical Director",
        bio: locale === 'fr' ? "Spécialiste en solutions techniques" : "Technical solutions specialist",
        image: "/images/equipe/folong.jpg",
        socials: {
          linkedin: "https://linkedin.com"
        }
      },
      {
        id: 6,
        name: "Estelle",
        position: locale === 'fr' ? "Responsable RH" : "HR Manager",
        bio: locale === 'fr' ? "Gestionnaire des ressources humaines" : "HR management specialist",
        image: "/images/equipe/member1.jpg",
        socials: {
          linkedin: "https://linkedin.com"
        }
      },
      {
        id: 7,
        name: "Donchi",
        position: locale === 'fr' ? "Développeur Frontend" : "Frontend Developer",
        bio: locale === 'fr' ? "Expert en développement d'interfaces utilisateur" : "UI development expert",
        image: "/images/equipe/member1.jpg",
        socials: {
          linkedin: "https://linkedin.com"
        }
      },
      {
        id: 8,
        name: "Noukoua",
        position: locale === 'fr' ? "Développeur Backend" : "Backend Developer",
        bio: locale === 'fr' ? "Expert en architecture de serveurs" : "Server architecture expert",
        image: "/images/equipe/member1.jpg",
        socials: {
          linkedin: "https://linkedin.com"
        }
      }
    ];
  };

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // Séparer les membres en deux groupes: membres en vedette et membres réguliers
  const featuredMembers = teamData.filter(member => member.featured);
  const regularMembers = teamData.filter(member => !member.featured);

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">{translations.title}</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">{translations.description}</p>
        </div>

        {/* Featured members section - en ligne sur desktop */}
        {featuredMembers.length > 0 && (
          <div className="flex justify-center mb-16">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-6xl">
              {featuredMembers.map((member: TeamMember) => (
                <div 
                  key={member.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 flex-1 max-w-sm mx-auto"
                >
                  <div className="h-48 md:h-56 overflow-hidden flex items-center justify-center">
                    <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-orange-500">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-black">{member.name}</h3>
                    <p className="text-orange-500 font-medium mb-2">{member.position}</p>
                    <p className="text-gray-700 mb-4 text-sm md:text-base line-clamp-3">{member.bio}</p>
                    
                    {/* Social Media Icons */}
                    <div className="flex space-x-3 mb-2">
                      {member.socials?.linkedin && (
                        <a 
                          href={member.socials.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-orange-500"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {member.socials?.twitter && (
                        <a 
                          href={member.socials.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-orange-500"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.03 10.03 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 14-7.496 14-13.986 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </a>
                      )}
                      {member.socials?.github && (
                        <a 
                          href={member.socials.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-orange-500"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular members section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {regularMembers.map((member: TeamMember) => (
            <div 
              key={member.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="h-64 overflow-hidden flex items-center justify-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black">{member.name}</h3>
                <p className="text-orange-500 font-medium mb-2">{member.position}</p>
                <p className="text-gray-700 mb-4">{member.bio}</p>
                
                {/* Social Media Icons */}
                <div className="flex space-x-3 mb-4">
                  {member.socials?.linkedin && (
                    <a 
                      href={member.socials.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-orange-500"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a 
                      href={member.socials.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-orange-500"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.03 10.03 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 14-7.496 14-13.986 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                  {member.socials?.github && (
                    <a 
                      href={member.socials.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-orange-500"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Equipe;