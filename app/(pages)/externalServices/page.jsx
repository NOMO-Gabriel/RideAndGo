"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import servicesData from '../../data/services.json';
import ServiceIcon from '../../components/externaleService/ServiceIcon';

const ExternalServicesPage = () => {
  const [activeTab, setActiveTab] = useState(servicesData.services[0].id);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Onglets des services */}
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {servicesData.services.map((service) => (
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
        {servicesData.services.map((service) => (
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
                        <span className="mr-2 text-orange-400">
                          <ServiceIcon name={link.icon} />
                        </span>
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

            {/* Affichage des informations supplémentaires si elles existent */}
            {service.additionalInfo && (
              <div className="mt-8 bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-orange-400">{service.additionalInfo.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-300">{service.additionalInfo.subtitle}</p>
                </div>
                <div className="border-t border-gray-700 px-4 py-5 sm:p-6">
                  <p className="text-sm text-gray-300">
                    {service.additionalInfo.description}
                  </p>
                  {service.additionalInfo.features && (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {service.additionalInfo.features.map((feature, index) => (
                        <div key={index} className="relative rounded-lg border border-gray-600 bg-gray-700 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-500">
                          <div className="flex-shrink-0">
                            <ServiceIcon name={feature.icon} className="text-orange-500" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-orange-300">{feature.title}</h4>
                            <p className="mt-1 text-sm text-gray-300">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Section de contact */}
        <div className="mt-12 bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-orange-400">{servicesData.support.title}</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-300">{servicesData.support.subtitle}</p>
          </div>
          <div className="border-t border-gray-700 px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-sm font-medium text-orange-300">Support Technique</h3>
                <p className="mt-1 text-sm text-gray-300">{servicesData.support.email}</p>
                <p className="mt-1 text-sm text-gray-300">{servicesData.support.phone}</p>
              </div>
              <div>
                <a href={servicesData.support.buttonLink} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500">
                  {servicesData.support.buttonText}
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