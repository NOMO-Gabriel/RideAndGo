import { useEffect, useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaGlobe, FaRoad, FaUser, FaQuestion, FaInfoCircle, FaFileAlt, FaEnvelope, FaHeadset } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useUser } from '@/app/utils/hooks/useUser';

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

  // Classes communes pour une meilleure cohérence
  const buttonBase = "transition-colors duration-200 font-medium rounded-md";
  const primaryButton = `${buttonBase} bg-orange-btn text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 focus:outline-none`;
  const navLinkBase = "transition-colors duration-200 hover:text-orange-btn";

  return (
    <nav className="bg-bleu-nuit text-white py-2 px-3 md:py-3 md:px-5 lg:py-4 lg:px-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl">
        {/* Desktop and Tablet Navigation */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wider flex items-center hover:text-orange-btn transition-colors duration-200">
            <FaRoad className="mr-1 md:mr-2" />
            <span className="hidden sm:inline">Ride&Go</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Link href="/" className={`${navLinkBase} text-base`}>
              {currentContent.home}
            </Link>
            <Link href="/calculate" className={`${navLinkBase} text-base`}>
              {currentContent.calculate}
            </Link>
            {!isAuthenticated && (
              <Link href="/search" className={`${navLinkBase} text-base`}>
                {currentContent.search}
              </Link>
            )}
            <Link href="/go" className={`${navLinkBase} text-base`}>
              {currentContent.go}
            </Link>
            <Link href="/ride" className={`${navLinkBase} text-base`}>
              {currentContent.ride}
            </Link>

            {/* Help Dropdown - Desktop - MODERN VERSION */}
            <div className="relative dropdown">
              <button
                onClick={toggleDropdown}
                className={`${navLinkBase} text-base flex items-center space-x-1 group`}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <FaQuestion className="text-base mr-1 text-blue-300 group-hover:text-orange-btn transition-colors duration-200" />
                <span>{currentContent.help}</span>
                <FontAwesomeIcon
                  icon={isDropdownOpen ? faChevronUp : faChevronDown}
                  className="ml-1 text-xs transition-transform duration-200 group-hover:text-orange-btn"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl py-2 z-10 transform transition-all duration-200 border border-blue-100/30">
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white rotate-45 border-t border-l border-blue-100/30"></div>
                  <div className="flex flex-col">
                    <Link 
                      href="/about" 
                      className="px-4 py-3 text-bleu-nuit hover:bg-blue-50 hover:text-orange-btn text-sm md:text-base flex items-center space-x-3 transition-colors duration-200"
                    >
                      <FaInfoCircle className="text-blue-500" />
                      <span>{currentContent.aboutUs}</span>
                    </Link>
                    <Link 
                      href="/privacy" 
                      className="px-4 py-3 text-bleu-nuit hover:bg-blue-50 hover:text-orange-btn text-sm md:text-base flex items-center space-x-3 transition-colors duration-200"
                    >
                      <FaFileAlt className="text-blue-500" />
                      <span>{currentContent.policy}</span>
                    </Link>
                    <Link 
                      href="/contact" 
                      className="px-4 py-3 text-bleu-nuit hover:bg-blue-50 hover:text-orange-btn text-sm md:text-base flex items-center space-x-3 transition-colors duration-200"
                    >
                      <FaEnvelope className="text-blue-500" />
                      <span>{currentContent.contactUs}</span>
                    </Link>
                    <Link 
                      href="/help" 
                      className="px-4 py-3 text-bleu-nuit hover:bg-blue-50 hover:text-orange-btn text-sm md:text-base flex items-center space-x-3 transition-colors duration-200"
                    >
                      <FaHeadset className="text-blue-500" />
                      <span>{currentContent.assistance}</span>
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
                  className="bg-transparent hover:text-orange-btn transition-colors duration-200 cursor-pointer focus:outline-none text-base appearance-none pr-6"
                  aria-label="Select language"
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
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => window.location.href = '/login'}
                  className={`${primaryButton} px-5 py-2 text-base lg:text-lg  lg:w-32`}
                >
                  {currentContent.signIn}
                </button>
                <button
                  onClick={() => window.location.href = '/register'}
                  className={`${primaryButton} px-5 py-2 text-base lg:text-lg font-semibold lg:w-32`}
                >
                  {currentContent.signUp}
                </button>
              </div>
            ) : (
              <div className="relative dropdown">
                <button
                  onClick={toggleDropdownAccount}
                  className={`${navLinkBase} text-base flex items-center space-x-2`}
                  aria-expanded={isDropdownAccountOpen}
                  aria-haspopup="true"
                >
                  <FaUser className="text-sm" />
                  <span>{user?.pseudo}</span>
                  <FontAwesomeIcon
                    icon={isDropdownAccountOpen ? faChevronUp : faChevronDown}
                    className="ml-1 text-xs"
                  />
                </button>
                {isDropdownAccountOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 animate-fadeIn">
                    <Link href="/dashboard" className="block px-4 py-2 text-bleu-nuit hover:bg-gray-100 hover:text-orange-btn text-sm md:text-base">
                      {currentContent.dashboard}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-bleu-nuit hover:bg-gray-100 hover:text-orange-btn text-sm md:text-base"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            {!user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.location.href = '/login'}
                  className={`${primaryButton} px-3 py-2 text-sm font-semibold`}
                >
                  {currentContent.signIn}
                </button>
                <button
                  onClick={() => window.location.href = '/register'}
                  className={`${primaryButton} px-3 py-2 text-sm font-semibold`}
                >
                  {currentContent.signUp}
                </button>
              </div>
            ) : (
              <div className="relative dropdown">
                <button
                  onClick={toggleDropdownAccount}
                  className={`${navLinkBase} text-sm flex items-center space-x-1`}
                  aria-expanded={isDropdownAccountOpen}
                  aria-haspopup="true"
                >
                  <FaUser className="text-xs" />
                  <span className="truncate max-w-24">{user?.pseudo}</span>
                  <FontAwesomeIcon
                    icon={isDropdownAccountOpen ? faChevronUp : faChevronDown}
                    className="ml-1 text-xs"
                  />
                </button>
                {isDropdownAccountOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 z-10 animate-fadeIn">
                    <Link href="/dashboard" className="block px-3 py-2 text-bleu-nuit hover:bg-gray-100 hover:text-orange-btn text-sm">
                      {currentContent.dashboard}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-bleu-nuit hover:bg-gray-100 hover:text-orange-btn text-sm"
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
            className="lg:hidden text-white hover:text-orange-btn transition-colors duration-200 p-2"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-xl md:text-2xl" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-12 sm:top-14 bg-bleu-nuit z-40 mobile-menu overflow-y-auto">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3 sm:space-y-4">
              <Link href="/" className="text-white hover:text-orange-btn transition-colors duration-200 py-2 text-sm sm:text-base border-b border-white/10" onClick={closeMobileMenu}>
                {currentContent.home}
              </Link>
              <Link href="/calculate" className="text-white hover:text-orange-btn transition-colors duration-200 py-2 text-sm sm:text-base border-b border-white/10" onClick={closeMobileMenu}>
                {currentContent.calculate}
              </Link>
              {!isAuthenticated && (
                <Link href="/search" className="text-white hover:text-orange-btn transition-colors duration-200 py-2 text-sm sm:text-base border-b border-white/10" onClick={closeMobileMenu}>
                  {currentContent.search}
                </Link>
              )}
              <Link href="/go" className="text-white hover:text-orange-btn transition-colors duration-200 py-2 text-sm sm:text-base border-b border-white/10" onClick={closeMobileMenu}>
                {currentContent.go}
              </Link>
              <Link href="/ride" className="text-white hover:text-orange-btn transition-colors duration-200 py-2 text-sm sm:text-base border-b border-white/10" onClick={closeMobileMenu}>
                {currentContent.ride}
              </Link>

              {/* Help Section - Mobile - ALSO MODERNIZED */}
              <div className="border-t border-white/10 pt-3 mt-1 sm:pt-4 sm:mt-2">
                <div className="text-sm sm:text-base font-semibold mb-2 text-orange-btn flex items-center">
                  <FaQuestion className="mr-2 text-blue-300" />
                  {currentContent.help}
                </div>
                <div className="flex flex-col space-y-2 sm:space-y-3 pl-2">
                  <Link 
                    href="/about" 
                    className="text-white hover:text-orange-btn transition-colors duration-200 py-1 sm:py-2 text-sm sm:text-base flex items-center" 
                    onClick={closeMobileMenu}
                  >
                    <FaInfoCircle className="mr-2 text-blue-400" />
                    {currentContent.aboutUs}
                  </Link>
                  <Link 
                    href="/privacy" 
                    className="text-white hover:text-orange-btn transition-colors duration-200 py-1 sm:py-2 text-sm sm:text-base flex items-center" 
                    onClick={closeMobileMenu}
                  >
                    <FaFileAlt className="mr-2 text-blue-400" />
                    {currentContent.policy}
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-white hover:text-orange-btn transition-colors duration-200 py-1 sm:py-2 text-sm sm:text-base flex items-center" 
                    onClick={closeMobileMenu}
                  >
                    <FaEnvelope className="mr-2 text-blue-400" />
                    {currentContent.contactUs}
                  </Link>
                  <Link 
                    href="/help" 
                    className="text-white hover:text-orange-btn transition-colors duration-200 py-1 sm:py-2 text-sm sm:text-base flex items-center" 
                    onClick={closeMobileMenu}
                  >
                    <FaHeadset className="mr-2 text-blue-400" />
                    {currentContent.assistance}
                  </Link>
                </div>
              </div>

              {/* Language Selector - Mobile */}
              <div className="border-t border-white/10 pt-3 mt-1 sm:pt-4 sm:mt-2">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <FaGlobe className="text-sm sm:text-base" />
                  <select
                    value={locale}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-transparent text-white py-1 sm:py-2 focus:outline-none text-sm sm:text-base"
                    aria-label="Select language"
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

              {/* Auth Section - Mobile */}
              <div className="border-t border-white/10 pt-3 mt-1 sm:pt-4 sm:mt-2">
                {!user ? (
                  <div className="flex flex-col space-y-3 sm:space-y-4">
                    <Link
                      href="/login"
                      className="bg-orange-btn text-white py-3 px-4 sm:py-4 sm:px-6 rounded-md text-center font-semibold hover:bg-orange-600 transition-colors duration-200 text-sm sm:text-base md:text-lg"
                      onClick={closeMobileMenu}
                    >
                      {currentContent.signIn}
                    </Link>
                    <Link
                      href="/register"
                      className="bg-orange-btn text-white py-3 px-4 sm:py-4 sm:px-6 rounded-md text-center font-semibold hover:bg-orange-600 transition-colors duration-200 text-sm sm:text-base md:text-lg"
                      onClick={closeMobileMenu}
                    >
                      {currentContent.signUp}
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2 py-1 sm:py-2">
                      <FaUser className="text-sm sm:text-base" />
                      <span className="text-sm sm:text-base font-medium">{user?.pseudo}</span>
                    </div>
                    <Link
                      href="/dashboard"
                      className="text-white hover:text-orange-btn transition-colors duration-200 py-1 sm:py-2 text-sm sm:text-base"
                    >
                      {currentContent.dashboard}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left text-white hover:text-orange-btn transition-colors duration-200 py-1 sm:py-2 text-sm sm:text-base"
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
    </nav>
  );
};

export default Navbar;