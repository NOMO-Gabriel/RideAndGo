"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const ExternalServicesPage = () => {
  const [activeTab, setActiveTab] = useState('organisation');

  const services = [
    {
      id: 'organisation',
      name: 'Service Organisation',
      description: 'Service permettant la gestion et l\'organisation des trajets et des ressources pour la planification d\'itinéraires.',
      links: [
        {
          name: 'Page Vitrine',
          url: 'https://organisation-presentation.vercel.app/',
          icon: 'presentation',
          description: 'Présentation et fonctionnalités du service organisation'
        },
        {
          name: 'Documentation',
          url: 'https://organisation-doc.vercel.app/',
          icon: 'document',
          description: 'Documentation complète pour développeurs'
        },
        {
          name: 'API Swagger',
          url: 'https://gateway.yowyob.com/webjars/swagger-ui/index.html?urls.primaryName=Organization+Service#/',
          icon: 'api',
          description: 'Interface Swagger pour tester l\'API du service organisation'
        }
      ]
    },
    {
      id: 'resource',
      name: 'Service de Gestion des Ressources',
      description: 'Service dédié à la gestion des ressources nécessaires pour les itinéraires et le calcul des tarifs.',
      links: [
        {
          name: 'API Swagger',
          url: 'https://gateway.yowyob.com/webjars/swagger-ui/index.html?urls.primaryName=Resource+Service',
          icon: 'api',
          description: 'Interface Swagger pour tester l\'API de gestion des ressources (version 5gi\'25)'
        }
      ]
    }
  ];

  const getIconComponent = (iconName:string) => {
    switch (iconName) {
      case 'presentation':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        );
      case 'document':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      case 'api':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
            <line x1="19" y1="12" x2="5" y2="12"></line>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* En-tête */}
      

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Onglets des services */}
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === service.id
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
                }`}
              >
                {service.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu des services */}
        {services.map((service) => (
          <div
            key={service.id}
            className={`mt-6 ${activeTab === service.id ? 'block' : 'hidden'}`}
          >
            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-orange-400">{service.name}</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-300">{service.description}</p>
              </div>
              <div className="border-t border-gray-700">
                <dl>
                  {service.links.map((link, index) => (
                    <div key={index} className={`${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                      <dt className="flex items-center text-sm font-medium text-gray-300">
                        <span className="mr-2 text-orange-400">{getIconComponent(link.icon)}</span>
                        {link.name}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                        <div className="flex flex-col">
                          <p className="mb-2">{link.description}</p>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500 w-max"
                          >
                            Accéder
                            <svg className="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </a>
                        </div>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {service.id === 'organisation' && (
              <div className="mt-8 bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-orange-400">À propos du Service Organisation</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-300">Informations supplémentaires sur le service</p>
                </div>
                <div className="border-t border-gray-700 px-4 py-5 sm:p-6">
                  <p className="text-sm text-gray-300">
                    Le Service Organisation est un composant essentiel de notre solution de planification d'itinéraire.
                    Il permet la gestion complète des organisations, la configuration des ressources et la définition des règles
                    tarifaires pour assurer une planification précise et optimisée des trajets.
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="relative rounded-lg border border-gray-600 bg-gray-700 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-500">
                      <div className="flex-shrink-0">
                        <svg className="h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-orange-300">Sécurité & Fiabilité</h4>
                        <p className="mt-1 text-sm text-gray-300">Conforme aux standards de sécurité et haute disponibilité</p>
                      </div>
                    </div>
                    <div className="relative rounded-lg border border-gray-600 bg-gray-700 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-500">
                      <div className="flex-shrink-0">
                        <svg className="h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-orange-300">Performances</h4>
                        <p className="mt-1 text-sm text-gray-300">Optimisé pour des résultats rapides même avec de grands volumes de données</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Section de contact */}
        <div className="mt-12 bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-orange-400">Besoin d'aide ?</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-300">Contactez notre équipe de support technique</p>
          </div>
          <div className="border-t border-gray-700 px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-sm font-medium text-orange-300">Support Technique</h3>
                <p className="mt-1 text-sm text-gray-300">tafoukeuz@gmail.com</p>
                <p className="mt-1 text-sm text-gray-300">+237 672538346</p>
              </div>
              <div>
                <a href="/contact" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500">
                  Accéder à l'aide
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

    
    </div>
  );
};

export default ExternalServicesPage;