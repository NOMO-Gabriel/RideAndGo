'use client';
import { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaGlobe } from 'react-icons/fa';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 // Icônes pour la langue et le menu déroulant
import Link from 'next/link';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = ({ setIsRegistegit vr }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('Fr'); // Langue par défaut
  const { locale, changeLocale } = useLocale();

  const handleLanguageChange = () => {
        changeLocale(locale === 'en' ? 'fr' : 'en');
    };

  return (
    <nav className="bg-bleu-nuit text-white p-4 shadow-md sticky top-0 z-50"> {/* Header toujours visible en haut */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-4xl font-bold tracking-wider hover:text-orange-btn transition duration-300 cursor-pointer">
          Ride&Go
        </div>
        
        {/* Links */}
        <div className="flex space-x-8 items-center">
          <Link href="/" className="hover:text-orange-btn hover:underline underline-offset-8 transition duration-300"> {locale==='en'?'Home':'Accueil'}</Link>
          <Link href="search" className="hover:text-orange-btn hover:underline underline-offset-8 transition duration-300">{locale==='en'?'Search':'Recherche'}</Link>
          <Link href="go" className="hover:text-orange-btn hover:underline underline-offset-8 transition duration-300">{locale==='en'?'Ride':'Collecter'}</Link>
          <Link href="ride" className="hover:text-orange-btn hover:underline underline-offset-8 transition duration-300">{locale==='en'?'Go':'Voyager'}</Link>

          {/* Help Menu Dropdown */}
          <div className="relative group"> {/* Utilisation de "group" pour gérer le hover */}
            <button className="flex items-center space-x-1 group-hover:text-orange-btn transition duration-300">
              <span>{locale==='en'?'Help':'Aide'}</span>
              <FontAwesomeIcon icon={faChevronDown} className="transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* Menu déroulant qui s'affiche au hover */}
            <div className="absolute hidden group-hover:block right-0 mt-2 w-40 bg-white text-bleu-nuit rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li><Link href="#" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">{locale==='en'?'About Us':'A propos de nous'}</Link></li>
                <li><Link href="#" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">{locale==='en'?'Policy':'Politique'}</Link></li>
                <li><Link href="#" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">{locale==='en'?'Contact us':'Contactez-nous'}</Link></li>
                <li><Link href="#" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">{locale==='en'?'Assistance':'Assistance'}</Link></li>
              </ul>
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative group"> {/* Hover pour le menu des langues */}
            <button className="flex items-center space-x-2 group-hover:text-orange-btn transition duration-300">
              <FaGlobe />
              {/*<span className="font-semibold">{selectedLanguage}</span>
              <FontAwesomeIcon icon={faChevronDown} className="transition-transform duration-300 group-hover:rotate-180" />*/}
              <select   
                value={locale}
                onChange={(e) => changeLocale(e.target.value)}
                className=' p-2 text-white bg-bleu-nuit rounded-lg shadow-lg z-10'
                >
                <option key ="en" value="en" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300"> {locale==='en'?'English':'Anglais'} </option>
                <option key= "fr" value="=fr" className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">{locale==='en'?'French':'Français'}</option>
                
              </select>
            </button>

            {/* Menu déroulant des langues */}
            {/* <div className="absolute hidden group-hover:block right-0 mt-2 w-32 bg-white text-bleu-nuit rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li><button onClick={() => handleLanguageChange('Fr')} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">Français</button></li>
                <li><button onClick={() => handleLanguageChange('En')} className="block px-4 py-2 hover:bg-orange-btn hover:text-white transition duration-300">English</button></li>
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
