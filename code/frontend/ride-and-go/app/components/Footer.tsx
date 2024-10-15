'use client'

import React from 'react';

import { useState } from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedin, FaApple, FaGooglePlay } from 'react-icons/fa'; // Icônes des réseaux sociaux
import { FaGlobe, FaChevronDown } from 'react-icons/fa'; 
const Footer: React.FC = () => {

  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Fr'); // Langue par défaut

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang); // Met à jour la langue sélectionnée
    setLanguageMenuOpen(false); // Ferme le menu
  };

  return (
    <footer className="bg-bleu-nuit  text-white py-16">
      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Colonne 1 - Our Company */}
        <div>
          <h4 className="font-semibold text-xl mb-4">Our Company</h4>
          <ul>
            {['About Us', 'Our Vision', 'Our Mission', 'Our Objectives', 'Our Originality', 'We Are Hiring', 'Contact Information'].map((item, idx) => (
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
            {['Marketplace', 'Our system for connecting travel service customers and providers', 'Rental Agency', 'Travel Agency', 'Carpooling Service', 'Pick me up'].map((item, idx) => (
              <li key={idx} className="mb-2 hover:underline transition-colors duration-300 hover:text-orange-400">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 - Legal Information */}
        <div>
          <h4 className="font-semibold text-xl mb-4">Legal Information</h4>
          <ul>
            {['General Terms of Use', 'Terms of Service', 'Privacy Policy', 'Your Personal Information', 'Cookies'].map((item, idx) => (
              <li key={idx} className="mb-2 hover:underline transition-colors duration-300 hover:text-orange-400">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4 - Mobile App */}
        <div>
          <h4 className="font-semibold text-xl mb-4">Mobile App</h4>
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
          <h4 className="font-semibold text-xl mb-4">Follow Us</h4>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="hover:text-orange-400 transition-colors duration-300">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-orange-400 transition-colors duration-300">
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-orange-400 transition-colors duration-300">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-orange-400 transition-colors duration-300">
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
                  <li><button onClick={() => handleLanguageChange('Fr')} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">Français</button></li>
                  <li><button onClick={() => handleLanguageChange('En')} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">English</button></li>
                  <li><button onClick={() => handleLanguageChange('Es')} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">Español</button></li>
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
        <p>&copy; 2024 Ride&Go. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
