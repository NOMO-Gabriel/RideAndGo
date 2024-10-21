'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaGlobe, FaRoad } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('Fr'); // Langue par défaut
  const { locale, changeLocale } = useLocale();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleLanguageChange = () => {
        changeLocale(locale === 'en' ? 'fr' : 'en');
    };


  return (
    <nav className="bg-bleu-nuit text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-4xl font-bold tracking-wider hover:text-orange-btn transition duration-300 cursor-pointer">
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

            {/* Menu déroulant des langues */}
            {/* <div className="absolute hidden group-hover:block right-0 mt-2 w-32 bg-white text-bleu-nuit rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li><button onClick={() => handleLanguageChange('fr')} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">Français</button></li>
                <li><button onClick={() => handleLanguageChange('en')} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">English</button></li>
                <li><button onClick={() => handleLanguageChange('fr')} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">Español</button></li>
              </ul>
            </div> */}
          </div>

          {/* Sign In & Sign Up Buttons */}
          <button className="bg-orange-btn text-white px-4 py-2 rounded-lg shadow hover:bg-white hover:text-orange-btn transition-all duration-300" onClick={()=>{setIsRegister(false)}}><Link href="/login">{locale==='en'?'Log in':'Se Connecter'}</Link></button>
          <button className="bg-orange-btn text-white px-4 py-2 rounded-lg shadow hover:bg-white hover:text-orange-btn transition-all duration-300" onClick={()=>{setIsRegister(true)}}><Link href="/login">{locale==='en'?'Register':"S'inscrire"}</Link></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
