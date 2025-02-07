'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaGlobe, FaRoad, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useUser } from '@/app/utils/hooks/useUser';

const Navbar: React.FC = () => {
  const { locale, changeLocale } = useLocale();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownAccountOpen, setIsDropdownAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useUser();
  const roles = user?.roles || ['ROLE_GUEST'];

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const toggleDropdownAccount = () => setIsDropdownAccountOpen(prev => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const handleLanguageChange = (lang: string) => {
    changeLocale(lang);
  };

  return (
    <nav className="bg-bleu-nuit text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-4xl font-bold flex items-center hover:text-orange-btn transition duration-300 cursor-pointer">
          <FaRoad className="mr-2" /> Ride&Go
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-2xl" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div className={`fixed top-16 right-0 bg-bleu-nuit p-4 w-48 flex flex-col space-y-4 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-all duration-300 ease-in-out lg:relative lg:top-0 lg:flex lg:flex-col lg:items-end lg:space-y-6 lg:w-auto lg:transform-none`}>
          <Link href="/" className="hover:text-orange-btn transition duration-300">Home</Link>
          <Link href="/calculate" className="hover:text-orange-btn transition duration-300">Fare Calculator</Link>
          {!isAuthenticated && <Link href="/search" className="hover:text-orange-btn transition duration-300">Search</Link>}
          {roles.includes('ROLE_TRAVELLER') && <Link href="/newGo" className="hover:text-orange-btn transition duration-300">Go</Link>}
          {roles.includes('ROLE_DRIVER') && <Link href="/ride" className="hover:text-orange-btn transition duration-300">Ride</Link>}
        
          {/* Help Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center space-x-1 hover:text-orange-btn transition duration-300">
              <span>Help</span>
              <FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-bleu-nuit rounded-lg shadow-lg">
                <ul>
                  <li><Link href="/about" className="block px-4 py-2 hover:bg-orange-btn">About Us</Link></li>
                  <li><Link href="/privacy" className="block px-4 py-2 hover:bg-orange-btn">Policy</Link></li>
                  <li><Link href="/contact" className="block px-4 py-2 hover:bg-orange-btn">Contact Us</Link></li>
                  <li><Link href="/help" className="block px-4 py-2 hover:bg-orange-btn">Assistance</Link></li>
                </ul>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <FaGlobe />
            <select value={locale} onChange={(e) => handleLanguageChange(e.target.value)} className="bg-bleu-nuit text-white border-none focus:outline-none">
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          {/* Authentication / Profile */}
          {!user ? (
            <div className="flex flex-col space-y-2">
              <Link href="/login" className="bg-orange-btn px-4 py-2 rounded-lg hover:bg-white hover:text-orange-btn">Sign In</Link>
              <Link href="/register" className="bg-orange-btn px-4 py-2 rounded-lg hover:bg-white hover:text-orange-btn">Sign Up</Link>
            </div>
          ) : (
            <div className="relative">
              <button onClick={toggleDropdownAccount} className="flex items-center space-x-2">
                <FaUser />
                <span>{user.pseudo}</span>
                <FontAwesomeIcon icon={isDropdownAccountOpen ? faChevronUp : faChevronDown} />
              </button>
              {isDropdownAccountOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-bleu-nuit rounded-lg shadow-lg">
                  <ul>
                    <li><Link href="/dashboard" className="block px-4 py-2 hover:bg-orange-btn">Dashboard</Link></li>
                    <li><button onClick={logout} className="block px-4 py-2 hover:bg-orange-btn w-full text-left">Logout</button></li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
