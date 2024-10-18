'use client';
import { useState } from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa'; // Icônes pour la langue et le menu déroulant
import Link from 'next/link';
import { useLocale } from '@/app/utils/hooks/useLocale.js';

const Navbar: React.FC = () => {
  const {changeLocale} = useLocale();
  const [selectedLanguage, setSelectedLanguage] = useState('Fr'); // Langue par défaut

  const handleLanguageChange = (languageCode: string) => {
    changeLocale(languageCode); // Met à jour la langue sélectionnée
    setSelectedLanguage(languageCode);
  };

  return (
    <nav className="bg-bleu-nuit text-white p-4 shadow-md sticky top-0 z-50"> {/* Header toujours visible en haut */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="/">
            <img src="/images/logo.png" alt='Ride&Go' className="h-12 w-auto"/>
          </a>
          <span className="text-white text-lg font-semibold hover:text-orange-btn transition duration-300 cursor-pointer"><a href="/">Ride&Go</a></span>
        </div>
        {/* Links */}
        <div className="flex space-x-8 items-center">
          <Link href="/" className="hover:text-orange-btn hover:underline underline-offset-8 transition duration-300">Home</Link>
          <Link href="search" className="hover:text-orange-btn hover:underline underline-offset-8 transition duration-300">Search</Link>
          <Link href="go" className="hover:text-orange-btn hover:underline underline-offset-8 transition duration-300">Ride</Link>
          <Link href="ride" className="hover:text-orange-btn hover:underline underline-offset-8 transition duration-300">Collect</Link>

          {/* Help Menu Dropdown */}
          <div className="relative group"> {/* Utilisation de "group" pour gérer le hover */}
            <button className="flex items-center space-x-1 group-hover:text-orange-btn transition duration-300">
              <span>Help</span>
              <FaChevronDown className="transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* Menu déroulant qui s'affiche au hover */}
            <div className="absolute hidden group-hover:block right-0 mt-2 w-40 bg-white text-bleu-nuit rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li><Link href="#" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">About Us</Link></li>
                <li><Link href="#" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">Privacy</Link></li>
                <li><Link href="#" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">Contact</Link></li>
                <li><Link href="#" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">Help</Link></li>
              </ul>
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative group"> {/* Hover pour le menu des langues */}
            <button className="flex items-center space-x-2 group-hover:text-orange-btn transition duration-300">
              <FaGlobe />
              <span className="font-semibold">{selectedLanguage}</span>
              <FaChevronDown className="transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* Menu déroulant des langues */}
            <div className="absolute hidden group-hover:block right-0 mt-2 w-32 bg-white text-bleu-nuit rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li><button onClick={() => handleLanguageChange('fr')} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">Français</button></li>
                <li><button onClick={() => handleLanguageChange('en')} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">English</button></li>
                <li><button onClick={() => handleLanguageChange('fr')} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">Español</button></li>
              </ul>
            </div>
          </div>

          {/* Sign In & Sign Up Buttons */}
          <button className="bg-orange-btn text-white px-4 py-2 rounded-lg shadow hover:bg-white hover:text-orange-btn transition-all duration-300"><Link href="/login">Log in</Link></button>
          <button className="bg-orange-btn text-white px-4 py-2 rounded-lg shadow hover:bg-white hover:text-orange-btn transition-all duration-300"><Link href="/register">Register</Link></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
