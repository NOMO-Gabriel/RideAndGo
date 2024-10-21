
'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaGlobe, FaRoad } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


const Navbar: React.FC = () => {
  const { locale, changeLocale } = useLocale();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    changeLocale(lang);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Fermer le dropdown si on clique à l'extérieur
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('.dropdown') === null) {
      setIsDropdownOpen(false);
    }
  };

  // Ajouter l'écouteur d'événements pour le clic à l'extérieur
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Contenu multilingue
  const content = {
    en: {
      home: 'Home',
      search: 'Search',
      ride: 'Ride',
      go: 'Go',
      help: 'Help',
      aboutUs: 'About Us',
      policy: 'Policy',
      contactUs: 'Contact us',
      assistance: 'Assistance',
      signIn: 'Sign in',
      signUp: 'Sign up',
    },
    fr: {
      home: 'Accueil',
      search: 'Recherche',
      ride: 'Collecter',
      go: 'Voyager',
      help: 'Aide',
      aboutUs: 'À propos de nous',
      policy: 'Politique',
      contactUs: 'Contactez-nous',
      assistance: 'Assistance',
      signIn: 'Se Connecter',
      signUp: "S'inscrire",
    },
  };

  const currentContent = content[locale]; 

  return (
    <nav className="bg-bleu-nuit text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo avec l'icône de route */}
        <div className="text-4xl font-bold tracking-wider flex items-center hover:text-orange-btn transition duration-300 cursor-pointer">
          <FaRoad className="mr-2" />
          Ride&Go
        </div>
        {/* Links */}
        <div className="flex space-x-8 items-center">
          <Link href="/" className="hover:text-orange-btn hover:underline underline-offset-8 transition duration-300">{currentContent.home}</Link>
          <Link href="/search" className="hover:text-orange-btn hover:underline underline-offset-8 transition duration-300">{currentContent.search}</Link>
          <Link href="/go" className="hover:text-orange-btn hover:underline underline-offset-8 transition duration-300">{currentContent.ride}</Link>
          <Link href="/ride" className="hover:text-orange-btn hover:underline underline-offset-8 transition duration-300">{currentContent.go}</Link>

          {/* Help Menu Dropdown */}
          <div className="relative group dropdown">
            <button 
              onClick={toggleDropdown} 
              className="flex items-center space-x-1 group-hover:text-orange-btn transition duration-300"
            >
              <span>{currentContent.help}</span>
              <FontAwesomeIcon icon={faChevronDown} className="transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-bleu-nuit rounded-lg shadow-lg z-20">
                <ul className="py-2">
                  <li><Link href="/about" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">{currentContent.aboutUs}</Link></li>
                  <li><Link href="/privacy" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">{currentContent.policy}</Link></li>
                  <li><Link href="/contact" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">{currentContent.contactUs}</Link></li>
                  <li><Link href="/help" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">{currentContent.assistance}</Link></li>
                </ul>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative group">
            <button className="flex items-center space-x-2 group-hover:text-orange-btn transition duration-300">
              <FaGlobe />
              <select   
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className='p-2 text-white bg-bleu-nuit rounded-lg shadow-lg z-10'
              >
                <option value="en">{locale === 'en' ? 'English' : 'Anglais'}</option>
                <option value="fr">{locale === 'en' ? 'French' : 'Français'}</option>
              </select>
            </button>
          </div>

          {/* Sign In & Sign Up Buttons */}
          <button className="bg-orange-btn text-white px-4 py-2 rounded-lg shadow hover:bg-white hover:text-orange-btn transition-all duration-300">{currentContent.signIn}</button>
          <button className="bg-orange-btn text-white px-4 py-2 rounded-lg shadow hover:bg-white hover:text-orange-btn transition-all duration-300">{currentContent.signUp}</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
