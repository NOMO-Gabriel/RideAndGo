'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaGlobe, FaRoad, FaUser } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useUser } from '@/app/utils/hooks/useUser';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { locale, changeLocale } = useLocale();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownAccountOpen, setIsDropdownAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useUser();
  const roles = user?.roles || ['ROLE_GUEST'];

  const handleLanguageChange = (lang: string) => {
    changeLocale(lang);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleDropdownAccount = () => {
    setIsDropdownAccountOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown') && !target.closest('.mobile-menu')) {
      setIsDropdownOpen(false);
      setIsDropdownAccountOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      dashboard: 'Dashboard',
      calculate: "Fare Calculator",
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
      dashboard: "Tableau de bord",
      calculate: 'Calculateur de tarif',
    },
  };

  const currentContent = locale === 'en' ? content.en : content.fr;
  const isTraveller = roles.includes('ROLE_TRAVELLER');
  const isDriver = roles.includes('ROLE_DRIVER');
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-bleu-nuit text-white py-2 md:py-4 px-3 md:px-6 shadow-md sticky top-0 z-50 size-auto">
      <div className="container mx-auto max-w-7xl">
        {/* Desktop and Tablet Navigation */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider flex items-center  hover:text-orange-btn transition-all duration-300">
            <FaRoad className="mr-2" />
            <span className="hidden sm:inline">Ride&Go</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="nav-link hover:text-orange-btn font-bold">
              {currentContent.home}
            </Link>
            <Link href="/calculate" className="nav-link hover:text-orange-btn font-bold">
              {currentContent.calculate}
            </Link>
            {!isAuthenticated && (
              <Link href="/search" className="nav-link hover:text-orange-btn font-bold">
                {currentContent.search}
              </Link>
            )}
            {isTraveller && (
              <Link href="/go" className="nav-link hover:text-orange-btn font-bold">
                {currentContent.go}
              </Link>
            )}
            {isDriver && (
              <Link href="/ride" className="nav-link hover:text-orange-btn font-bold">
                {currentContent.ride}
              </Link>
            )}

            {/* Help Dropdown - Desktop */}
            <div className="relative dropdown font-bold">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 hover:text-orange-btn transition-all duration-300"
              >
                <span>{currentContent.help}</span>
                <FontAwesomeIcon
                  icon={isDropdownOpen ? faChevronUp : faChevronDown}
                  className="ml-1 text-sm"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 font-bold">
                  <div className="flex flex-col">
                    <Link href="/about" className="dropdown-item text-bleu-nuit hover:text-orange-btn font-bold">
                      {currentContent.aboutUs}
                    </Link>
                    <Link href="/privacy" className="dropdown-item text-bleu-nuit hover:text-orange-btn font-bold">
                      {currentContent.policy}
                    </Link>
                    <Link href="/contact" className="dropdown-item text-bleu-nuit hover:text-orange-btn font-bold">
                      {currentContent.contactUs}
                    </Link>
                    <Link href="/help" className="dropdown-item text-bleu-nuit hover:text-orange-btn font-bold">
                      {currentContent.assistance}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector - Desktop */}
            <div className="relative">
              <div className="flex items-center space-x-2">
                <FaGlobe className="text-sm" />
                <select
                  value={locale}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-transparent font-bold hover:text-orange-btn transition-all duration-300 cursor-pointer focus:outline-none"
                >
                  <option value="en" className="text-bleu-nuit">
                    {locale === 'en' ? 'English' : 'Anglais'}
                  </option>
                  <option value="fr" className="text-bleu-nuit">
                    {locale === 'en' ? 'French' : 'Français'}
                  </option>
                </select>
              </div>
            </div>

            {/* Auth Section - Desktop */}
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="auth-button bg-orange-btn rounded-md  py-3 font-bold">
                  {currentContent.signIn}
                </Link>
                <Link href="/register" className="auth-button  bg-orange-btn rounded-md py-3 font-bold">
                  {currentContent.signUp}
                </Link>
              </div>
            ) : (
              <div className="relative dropdown">
                <button
                  onClick={toggleDropdownAccount}
                  className="flex items-center space-x-2 hover:text-orange-btn transition-all duration-300"
                >
                  <FaUser className="text-sm" />
                  <span>{user?.pseudo}</span>
                  <FontAwesomeIcon
                    icon={isDropdownAccountOpen ? faChevronUp : faChevronDown}
                    className="ml-1 text-sm"
                  />
                </button>
                {isDropdownAccountOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <Link href="/dashboard" className="dropdown-item text-bleu-nuit">
                      {currentContent.dashboard}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left dropdown-item"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-white hover:text-orange-btn transition-all duration-300"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-2xl" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-bleu-nuit z-40">
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              <Link href="/" className="mobile-nav-link hover:text-orange-btn" onClick={closeMobileMenu}>
                {currentContent.home}
              </Link>
              <Link href="/calculate" className="mobile-nav-link hover:text-orange-btn" onClick={closeMobileMenu}>
                {currentContent.calculate}
              </Link>
              {!isAuthenticated && (
                <Link href="/search" className="mobile-nav-link hover:text-orange-btn" onClick={closeMobileMenu}>
                  {currentContent.search}
                </Link>
              )}
              {isTraveller && (
                <Link href="/go" className="mobile-nav-link hover:text-orange-btn" onClick={closeMobileMenu}>
                  {currentContent.go}
                </Link>
              )}
              {isDriver && (
                <Link href="/ride" className="mobile-nav-link hover:text-orange-btn" onClick={closeMobileMenu}>
                  {currentContent.ride}
                </Link>
              )}

              {/* Help Section - Mobile */}
              <div className="border-t border-white/20 pt-4">
                <div className="text-lg font-semibold mb-2 hover:text-orange-btn">{currentContent.help}</div>
                <div className="flex flex-col space-y-2">
                  <Link href="/about" className="mobile-nav-link hover:text-orange-btn" onClick={closeMobileMenu}>
                    {currentContent.aboutUs}
                  </Link>
                  <Link href="/privacy" className="mobile-nav-link hover:text-orange-btn" onClick={closeMobileMenu}>
                    {currentContent.policy}
                  </Link>
                  <Link href="/contact" className="mobile-nav-link hover:text-orange-btn" onClick={closeMobileMenu}>
                    {currentContent.contactUs}
                  </Link>
                  <Link href="/help" className="mobile-nav-link hover:text-orange-btn" onClick={closeMobileMenu}>
                    {currentContent.assistance}
                  </Link>
                </div>
              </div>

              {/* Language Selector - Mobile */}
              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center space-x-3">
                  <FaGlobe className="text-lg" />
                  <select
                    value={locale}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-transparent text-white py-2 focus:outline-none"
                  >
                    <option value="en" className="text-bleu-nuit" onClick={closeMobileMenu}>
                      {locale === 'en' ? 'English' : 'Anglais'}
                    </option>
                    <option value="fr" className="text-bleu-nuit" onClick={closeMobileMenu}>
                      {locale === 'en' ? 'French' : 'Français'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Auth Section - Mobile */}
              <div className="border-t border-white/20 pt-4">
                {!user ? (
                  <div className="flex flex-col space-y-3">
                    <Link href="/login" className="mobile-auth-button  bg-orange-btn rounded-md w-20 hover:text-blue-btn " onClick={closeMobileMenu}>
                      {currentContent.signIn}
                    </Link>
                    <Link href="/register" className="mobile-auth-button  bg-orange-btn rounded-md w-20" onClick={closeMobileMenu}>
                      {currentContent.signUp}
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-lg" />
                      <span className="text-lg">{user?.pseudo}</span>
                    </div>
                    <Link href="/dashboard" className="mobile-nav-link">
                      {currentContent.dashboard}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left mobile-nav-link"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .nav-link {
          @apply hover:text-orange-btn hover:underline underline-offset-8 transition-all duration-300 text-sm;
        }
        .dropdown-item {
          @apply block px-4 py-2 text-bleu-nuit hover:bg-orange-btn hover:text-white transition-all duration-300 text-sm;
        }
        .auth-button {
          @apply bg-orange-btn text-white px-4 py-2 rounded-lg shadow hover:bg-white hover:text-orange-btn transition-all duration-300 text-sm whitespace-nowrap;
        }
        .mobile-nav-link {
          @apply text-white hover:text-orange-btn transition-all duration-300 py-2 text-lg;
        }
        .mobile-auth-button {
          @apply w-full bg-orange-btn text-white px-4 py-3 rounded-lg text-center hover:bg-white hover:text-orange-btn transition-all duration-300 text-lg;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;