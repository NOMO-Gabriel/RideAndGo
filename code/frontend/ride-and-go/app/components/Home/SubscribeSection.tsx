'use client'

import React, { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FaEnvelope } from 'react-icons/fa'; // Icône pour l'email
import { motion } from 'framer-motion'; // Pour les animations interactives
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';

const SubscribeSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const { locale, changeLocale } = useLocale();
  const { showFlashMessage } = useFlashMessage(); 

  const handleLanguageChange = () => {
    changeLocale(locale === 'en' ? 'fr' : 'en');
  };

  // Gestion de l'envoi de formulaire (pour l'exemple, juste un alert)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showFlashMessage(`Merci pour votre inscription, ${email}!`, "info", true);
    setEmail(''); // Réinitialiser le champ d'email après inscription
  };

  // Textes selon la langue
  const title = locale === 'en' ? 'Join Us Now' : "Rejoignez-nous dès maintenant";
  const description = locale === 'en' 
    ? 'Discover a new way to travel with exclusive and personalized services.' 
    : 'Découvrez une nouvelle façon de vous déplacer avec des services exclusifs et personnalisés.';
  const placeholder = locale === 'en' ? 'Enter your email' : "Entrez votre email";
  const buttonText = locale === 'en' ? "Subscribe" : "S'inscrire";

  return (
    <motion.section 
      className="relative bg-blanc-casse text-black py-16 mb-16" 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-8">{description}</p>
        
        {/* Formulaire d'inscription */}
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="email" 
              className="pl-10 pr-4 py-2 w-full max-w-md rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300" 
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-orange-btn text-white ml-4 px-6 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
          >
            {buttonText}
          </button>
        </form>
      </div>

      {/* Décoration et Animation supplémentaire */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 opacity-30 rounded-full blur-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-48 h-48 bg-blue-300 opacity-30 rounded-full blur-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </motion.section>
  );
};

export default SubscribeSection;
