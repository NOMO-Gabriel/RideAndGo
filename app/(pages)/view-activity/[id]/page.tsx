'use client';

import React, { useState } from 'react';
import { useLocale } from "@/app/utils/hooks/useLocale.js"; // Hook pour gérer la langue
import { FaPlus, FaMinus, FaSearch, FaQuestionCircle, FaReply } from 'react-icons/fa';

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
    ],
  },
  fr: {
    title: "Aide & Assistance",
    subtitle: "Questions Fréquemment Posées",
    searchPlaceholder: "Recherchez des questions ou des sujets...",
    questions: [
      { question: "Comment créer un compte ?", answer: "Pour créer un compte, cliquez sur le bouton 'S'inscrire' sur la page d'accueil et remplissez les informations requises." },
      { question: "Comment réinitialiser mon mot de passe ?", answer: "Si vous avez oublié votre mot de passe, cliquez sur 'Mot de passe oublié ?' sur la page de connexion et suivez les instructions." },
      { question: "Comment réserver un trajet ?", answer: "Sélectionnez votre lieu de prise en charge et votre destination dans l'application, choisissez votre type de trajet et confirmez votre réservation." },
    ],
  },
};

const HelpPage: React.FC = () => {
  const { locale } = useLocale() as { locale: Locale };
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredQuestions = content[locale].questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-white to-blue-100 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">{content[locale].title}</h1>
      <p className="text-lg text-center mb-8 text-orange-500 font-bold">{content[locale].subtitle}</p>

      <div className="w-full max-w-xl mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder={content[locale].searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-3 right-3 text-gray-500" />
        </div>
      </div>

      <div className="w-full max-w-2xl">
        {filteredQuestions.length === 0 ? (
          <p className="text-gray-600 text-center">No results found. Please try a different search term.</p>
        ) : (
          filteredQuestions.map((item, index) => (
            <div
              key={index}
              className={`mb-4 rounded-lg transition-all duration-300 ${openIndex === index ? 'bg-blue-50 shadow-lg' : 'bg-blue-100'}`}
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-blue-200 rounded-lg"
                onClick={() => toggleQuestion(index)}
              >
                <h3 className="text-lg font-bold text-blue-700 flex items-center">
                  <FaQuestionCircle className="mr-2 text-blue-500" /> {item.question}
                </h3>
                {openIndex === index ? <FaMinus className="text-blue-700" /> : <FaPlus className="text-blue-700" />}
              </div>
              {openIndex === index && (
                <div className="p-4 text-gray-700 bg-blue-200 rounded-lg">
                  <p className="flex items-center">
                    <FaReply className="mr-2 text-green-500" /> {item.answer}
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
