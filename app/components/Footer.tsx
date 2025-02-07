'use client'

import React from 'react';

import { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedin, FaApple, FaGooglePlay } from 'react-icons/fa'; // Icônes des réseaux sociaux
import { FaGlobe, FaChevronDown } from 'react-icons/fa'; 
const Footer: React.FC = () => {

  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Fr'); // Langue par défaut

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };
  const { locale, changeLocale } = useLocale();

  const handleLanguageChange = () => {
    changeLocale(locale === 'en' ? 'fr' : 'en');
  };
  
  const content= {
    en: {
      companyinfo1 : "Our Vision",
      companyinfo2 : "Our Mission",
      companyinfo3 : "Our Objectives",
      companyinfo4 : "Our Originality",
      companyinfo5 : "We Are Hiring",
      companyinfo6 : "Contact Information",
      supportinfo1: 'Marketplace',
      supportinfo2: 'Our system for connecting travel service customers and providers',
      supportinfo3: 'Rental Agency',
      supportinfo4: 'Travel Agency',
      supportinfo5: 'Carpooling Service',
      supportinfo6:  'Pick me up',
      legalinfo1: 'General Terms of Use',
      legalinfo2: 'Privacy Policy',
      legalinfo3: 'Your Personal Information',
      legalinfo4: 'Cookies'


    },
    fr: {
      companyinfo1 : "A propos de nous",
      companyinfo2 : "Notre Mission",
      companyinfo3 : "Nos Objectifs",
      companyinfo4 : "Nos plus values",
      companyinfo5 : "Nous employons",
      companyinfo6 : "Contacts",
      supportinfo1: 'Marché',
      supportinfo2: 'Notre système sonnecte les voyageurs et les chauffeurs',
      supportinfo3: 'Agence de location',
      supportinfo4: 'Agence de voyage',
      supportinfo5: '...',
      supportinfo6:  'Collectez',
      legalinfo1: "Termes d'utilisation",
      legalinfo2: 'Politique de confidentialité',
      legalinfo3: 'Informations personnelles',
      legalinfo4: 'Cookies'

    }
  }
  const currentContent = locale === 'en' ? content.en : content.fr;


  return (
    <footer className="bg-bleu-nuit  text-white py-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Colonne 1 - Our Company */}
        <div>
          <h4 className="font-semibold text-xl mb-4">{locale==='en'?'Our Company':'Notre companie'}</h4>
          <ul>
            {[currentContent.companyinfo1, currentContent.companyinfo2, currentContent.companyinfo3, currentContent.companyinfo4,currentContent.companyinfo5, currentContent.companyinfo6 ].map((item, idx) => (
              <li key={idx} className="mb-2 hover:underline transition-colors duration-300 hover:text-orange-400">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 2 - Support */}
        <div>
          <h4 className="font-semibold text-xl mb-4">Support</h4>
          <ul>
            {[currentContent.supportinfo1, currentContent.supportinfo2,currentContent.supportinfo3, currentContent.supportinfo4, currentContent.supportinfo5, currentContent.supportinfo6].map((item, idx) => (
              <li key={idx} className="mb-2 hover:underline transition-colors duration-300 hover:text-orange-400">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 - Legal Information */}
        <div>
          <h4 className="font-semibold text-xl mb-4"> {locale==='en'?'Legal Information':'Informations légales'}</h4>
          <ul>
            {[currentContent.legalinfo1, currentContent.legalinfo2, currentContent.legalinfo3, currentContent.legalinfo4].map((item, idx) => (
              <li key={idx} className="mb-2 hover:underline transition-colors duration-300 hover:text-orange-400">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4 - Mobile App */}
        <div>
          <h4 className="font-semibold text-xl mb-4">{locale==='en'?'Mobile App':'App Mobile'}</h4>
          <ul>
            <li className="mb-4">
              <a href="#" className="flex items-center space-x-2 hover:text-orange-400 transition-colors duration-300">
                <FaApple className="w-5 h-5" />
                <span>App Store</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 hover:text-orange-400 transition-colors duration-300">
                <FaGooglePlay className="w-5 h-5" />
                <span>Play Store</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 5 - Social & Language */}
        <div>
          <h4 className="font-semibold text-xl mb-4">{locale==='en'?'Follow us':'Suivez nous'} </h4>
          <div className="flex space-x-4 mb-6">
          <a href="#" className="hover:text-orange-400 hover:scale-110 transition-transform duration-300">
  <FaTwitter className="w-6 h-6" />
</a>
<a href="#" className="hover:text-orange-400 hover:scale-110 transition-transform duration-300">
  <FaFacebookF className="w-6 h-6" />
</a>
<a href="#" className="hover:text-orange-400 hover:scale-110 transition-transform duration-300">
  <FaInstagram className="w-6 h-6" />
</a>
<a href="#" className="hover:text-orange-400 hover:scale-110 transition-transform duration-300">
  <FaLinkedin className="w-6 h-6" />
</a>
          </div>
          

          {/* Language Selector */}
          <div className="relative inline-block">
          <div className="relative">
            <button 
              onClick={toggleLanguageMenu} 
              className="flex items-center space-x-2 hover:text-orange-btn transition duration-300"
            >
              <FaGlobe />
              <span className="font-semibold">{selectedLanguage}</span> {/* Affiche l'abréviation de la langue */}
              <FaChevronDown className={`transition-transform duration-300 ${languageMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {languageMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-bleu-nuit rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li><button onClick={() => handleLanguageChange()} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">{locale==='en'?'French':'Français'}</button></li>
                  <li><button onClick={() => handleLanguageChange()} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">{locale==='en'?'English':'Anglais'}</button></li>
                </ul>
              </div>
            )}
          </div>

            {/* Dropdown can be added here for multiple language options */}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-8 text-center">
        <p>&copy; 2024 Ride&Go.</p>{locale==='en'?'All rights reserved':'Tous droits réservés           '}
      </div>
    </footer>
  );
};

export default Footer;
