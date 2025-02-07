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
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url(/images/bg_register.jpeg)" }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm">
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 sm:w-[32rem] md:w-[40rem]">
            <h2 className="text-2xl font-bold mb-6 text-center sm:text-3xl md:text-4xl">{currentContent.register}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {error && <p className="text-red-500 text-center col-span-2 sm:col-span-1 md:col-span-2">{error}</p>}
              {success && <p className="text-green-500 text-center col-span-2 sm:col-span-1 md:col-span-2">{currentContent.success}</p>}
  
              {/* Inputs classiques */}
              <input type="text" name="pseudo" value={formData.pseudo} onChange={handleChange} placeholder={currentContent.username} className="w-full p-2 border border-gray-300 rounded sm:text-lg md:text-xl" required />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border border-gray-300 rounded sm:text-lg md:text-xl" required />
  
              <div className="relative col-span-2 sm:col-span-1 md:col-span-2">
                <input type={passwordVisible ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder={currentContent.password} className="w-full p-2 border border-gray-300 rounded sm:text-lg md:text-xl" required />
                <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  {passwordVisible ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
  
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder={currentContent.phoneNumber} className="w-full p-2 border border-gray-300 rounded sm:text-lg md:text-xl" required />
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={currentContent.firstname} className="w-full p-2 border border-gray-300 rounded sm:text-lg md:text-xl" required />
              <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder={currentContent.lastname} className="w-full p-2 border border-gray-300 rounded sm:text-lg md:text-xl" required />
              <input placeholder={currentContent.birthday} type="date" name="birthday" value={formData.birthday} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded sm:text-lg md:text-xl" required />
  
              <select title={currentContent.gender} name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded col-span-2 sm:col-span-1 md:col-span-2">
                <option value="MALE">M</option>
                <option value="FEMALE">F</option>
              </select>
  
              {/* Toggle Chauffeur */}
              <div className="flex items-center justify-between col-span-2 sm:col-span-1 md:col-span-2">
                <span>{currentContent.role}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input placeholder={currentContent.role} type="checkbox" className="sr-only peer" checked={isDriver} onChange={handleDriverToggle} />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
  
              <button type="submit" className="w-full p-2 bg-bleu-nuit text-white rounded hover:bg-orange-btn col-span-2 sm:col-span-1 md:col-span-2" disabled={loading}>
                {loading ? 'Loading...' : currentContent.register}
              </button>
  
              <p className="mt-4 text-center col-span-2 space-x-4 flex flex-row justify-center items-center sm:col-span-1 md:col-span-2">
                <span>{currentContent.extra}</span>
                <Link href="/login" className="text-bleu-nuit font-bold hover:text-orange-btn underline">{currentContent.link}</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}  

export default HelpPage;
