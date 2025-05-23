'use client';

import React, { useState } from 'react';
import { useLocale } from "@/app/utils/hooks/useLocale.js"; // Hook pour gérer la langue
import { FaPlus, FaMinus, FaSearch, FaQuestionCircle, FaReply } from 'react-icons/fa'; // Ajout des icônes de question et réponse

type Locale = 'en' | 'fr';

interface Question {
  question: string;
  answer: string;
}

interface Content {
  [key: string]: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    questions: Question[];
  };
}

const content: Content = {
  en: {
    title: "Help & Support",
    subtitle: "Frequently Asked Questions",
    searchPlaceholder: "Search for questions or topics...",
    questions: [
      { question: "How do I create an account?", answer: "To create an account, click on the 'Sign Up' button on the homepage and fill in the required information." },
      { question: "How can I reset my password?", answer: "If you've forgotten your password, click on 'Forgot Password?' on the login page, and follow the instructions." },
      { question: "How do I book a ride?", answer: "Select your pickup location and destination in the app, choose your ride type, and confirm your booking." },
      { question: "What payment methods do you accept?", answer: "We accept major credit/debit cards and PayPal for payments." },
      { question: "How can I contact support?", answer: "You can contact our support team through the 'Contact Us' page or email us at support@rideandgo.com." },
      { question: "Can I cancel my ride?", answer: "Yes, you can cancel your ride within 5 minutes of booking without any charge." },
      { question: "How can I change my profile information?", answer: "To change your profile information, go to 'Account Settings' in the app and update your details." },
      { question: "Is my payment information secure?", answer: "Yes, we use encryption and secure payment gateways to protect your payment information." },
      { question: "How do I leave feedback?", answer: "After your ride, you can rate your driver and leave feedback through the app." },
      { question: "What if I left something in the car?", answer: "Please contact our support team immediately, and we will assist you in retrieving your lost item." },
    ]
  },
  fr: {
    title: "Aide & Assistance",
    subtitle: "Questions Fréquemment Posées",
    searchPlaceholder: "Recherchez des questions ou des sujets...",
    questions: [
      { question: "Comment créer un compte ?", answer: "Pour créer un compte, cliquez sur le bouton 'S'inscrire' sur la page d'accueil et remplissez les informations requises." },
      { question: "Comment réinitialiser mon mot de passe ?", answer: "Si vous avez oublié votre mot de passe, cliquez sur 'Mot de passe oublié ?' sur la page de connexion et suivez les instructions." },
      { question: "Comment réserver un trajet ?", answer: "Sélectionnez votre lieu de prise en charge et votre destination dans l'application, choisissez votre type de trajet et confirmez votre réservation." },
      { question: "Quels moyens de paiement acceptez-vous ?", answer: "Nous acceptons les principales cartes de crédit/débit et PayPal pour les paiements." },
      { question: "Comment contacter le support ?", answer: "Vous pouvez contacter notre équipe d'assistance via la page 'Contactez-nous' ou par e-mail à support@rideandgo.com." },
      { question: "Puis-je annuler mon trajet ?", answer: "Oui, vous pouvez annuler votre trajet dans les 5 minutes suivant la réservation sans frais." },
      { question: "Comment puis-je modifier mes informations de profil ?", answer: "Pour modifier vos informations de profil, allez dans 'Paramètres du compte' dans l'application et mettez à jour vos détails." },
      { question: "Mes informations de paiement sont-elles sécurisées ?", answer: "Oui, nous utilisons le cryptage et des passerelles de paiement sécurisées pour protéger vos informations de paiement." },
      { question: "Comment laisser des commentaires ?", answer: "Après votre trajet, vous pouvez évaluer votre chauffeur et laisser des commentaires via l'application." },
      { question: "Que faire si j'ai oublié quelque chose dans la voiture ?", answer: "Veuillez contacter immédiatement notre équipe d'assistance, et nous vous aiderons à récupérer votre objet perdu." },
    ]
  }
};

const HelpPage: React.FC = () => {
  const { locale } = useLocale() as { locale: Locale }; // Typage explicite
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredQuestions = content[locale].questions.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-white to-blue-100 min-h-screen p-4 sm:p-6 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-700 mb-3 sm:mb-4">
        {content[locale].title}
      </h1>
      <p className="text-base sm:text-lg text-center mb-6 sm:mb-8 text-orange-500 font-bold">
        {content[locale].subtitle}
      </p>
      <div className="w-full max-w-xl mb-6 sm:mb-8 px-4 sm:px-0">
        <div className="relative">
          <input
            type="text"
            placeholder={content[locale].searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" />
        </div>
      </div>
      <div className="w-full max-w-2xl px-4 sm:px-0">
        {filteredQuestions.length === 0 ? (
          <p className="text-gray-600 text-center">No results found. Please try a different search term.</p>
        ) : (
          filteredQuestions.map((item, index) => (
            <div
              key={index}
              className={`mb-4 rounded-lg transition-all duration-300 ${
                openIndex === index ? 'bg-blue-50 shadow-lg' : 'bg-blue-100'
              }`}
            >
              <div
                className="flex justify-between items-center p-3 sm:p-4 cursor-pointer hover:bg-blue-200 rounded-lg"
                onClick={() => toggleQuestion(index)}
              >
                <h3 className="text-base sm:text-lg font-bold text-blue-700 flex items-center">
                  <FaQuestionCircle className="mr-2 text-blue-500 flex-shrink-0" />
                  <span className="break-words">{item.question}</span>
                </h3>
                {openIndex === index ? (
                  <FaMinus className="text-blue-700 flex-shrink-0 ml-2" />
                ) : (
                  <FaPlus className="text-blue-700 flex-shrink-0 ml-2" />
                )}
              </div>
              {openIndex === index && (
                <div className="p-3 sm:p-4 text-gray-700 bg-blue-200 rounded-lg">
                  <p className="flex items-start">
                    <FaReply className="mr-2 text-green-500 mt-1 flex-shrink-0" />
                    <span className="break-words">{item.answer}</span>
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HelpPage;