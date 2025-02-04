'use client';

import React, { useState } from 'react';
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import { FaPlus, FaMinus, FaSearch, FaQuestionCircle, FaReply } from 'react-icons/fa';

const HelpPage: React.FC = () => {
  const { locale } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const content = {
    en: {
      title: "Help & Support",
      subtitle: "Frequently Asked Questions",
      searchPlaceholder: "Search for questions or topics...",
      questions: [
        { question: "How do I create an account?", answer: "To create an account, click on the 'Sign Up' button..." },
        { question: "How can I reset my password?", answer: "If you've forgotten your password, click on 'Forgot Password?'..." },
        { question: "How do I book a ride?", answer: "Select your pickup location and destination in the app..." },
      ],
    },
    fr: {
      title: "Aide & Assistance",
      subtitle: "Questions Fréquemment Posées",
      searchPlaceholder: "Recherchez des questions ou des sujets...",
      questions: [
        { question: "Comment créer un compte ?", answer: "Pour créer un compte, cliquez sur 'S'inscrire'..." },
        { question: "Comment réinitialiser mon mot de passe ?", answer: "Si vous avez oublié votre mot de passe..." },
        { question: "Comment réserver un trajet ?", answer: "Sélectionnez votre lieu de prise en charge et votre destination..." },
      ],
    }
  };

  const filteredQuestions = content[locale].questions.filter(({ question, answer }) =>
    question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-white to-blue-100 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-4 animate-fadeIn">
        {content[locale].title}
      </h1>
      <p className="text-lg text-center mb-8 text-orange-500 font-bold animate-fadeIn">
        {content[locale].subtitle}
      </p>

      {/* Barre de recherche */}
      <div className="w-full max-w-xl mb-8 relative">
        <input
          type="text"
          placeholder={content[locale].searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute top-3 right-3 text-gray-500" />
      </div>

      {/* Questions/Réponses */}
      <div className="w-full max-w-2xl">
        {filteredQuestions.length === 0 ? (
          <p className="text-gray-600 text-center">No results found. Try another search term.</p>
        ) : (
          filteredQuestions.map((item, index) => (
            <div key={index} className="mb-4 bg-blue-50 rounded-lg shadow transition-all duration-300">
              <div
                role="button"
                aria-expanded={openIndex === index}
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-blue-100 rounded-lg transition-all duration-300"
                onClick={() => toggleQuestion(index)}
              >
                <h3 className="text-lg font-bold text-blue-700 flex items-center">
                  <FaQuestionCircle className="mr-2 text-blue-500" /> {item.question}
                </h3>
                {openIndex === index ? <FaMinus className="text-blue-700" /> : <FaPlus className="text-blue-700" />}
              </div>
              {openIndex === index && (
                <div className="p-4 text-gray-700 bg-blue-200 rounded-lg transition-all duration-500">
                  <p className="flex items-center">
                    <FaReply className="mr-2 text-green-500" /> 
                    <span className="font-bold text-lg">{item.answer}</span>
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
