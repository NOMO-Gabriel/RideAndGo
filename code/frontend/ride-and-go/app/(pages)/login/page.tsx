'use client';

import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js";


const Page = () => {
  const [isRegister, setIsRegister] = useState(false); // Etat pour basculer entre Login et Register
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "Voyageur",
  });
  const { locale } = useLocale();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire soumis : ", formData);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{backgroundImage: "url(/images/bg_login.jpg)"}}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm">
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">{currentContent.login}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={currentContent.username}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="relative mb-4">
                <input
                  type={passwordVisible ? 'text' : 'password'} // Basculer entre 'password' et 'text'
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={currentContent.password}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {/* Icône d'œil pour basculer la visibilité */}
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                    {passwordVisible ? (
                        // Icône pour "mot de passe visible"
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12h.01M19.5 12C19.5 16.14 15 19.5 12 19.5S4.5 16.14 4.5 12 9 4.5 12 4.5s7.5 3.36 7.5 7.5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.99 12.01L15.01 12.01" />
                        </svg>
                    ) : (
                        // Icône pour "mot de passe masqué"
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12h.01M19.5 12C19.5 16.14 15 19.5 12 19.5S4.5 16.14 4.5 12 9 4.5 12 4.5s7.5 3.36 7.5 7.5z" />
                        </svg>
                    )}
                </button>
            </div>
              <div className="mb-4">
                <select
                  title="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="customer">{currentContent.customer}</option>
                  <option value="driver">{currentContent.driver}</option>
                </select>
              </div>
              <button type="submit" className="w-full p-2 bg-bleu-nuit text-white rounded hover:bg-orange-500">
                <Link href="/">{currentContent.login}</Link>
              </button>
              <p className="mt-4 text-center">
                {currentContent.extra} <a href="/register" className="text-blue-nuit underline hhover:text-orange-btn">{currentContent.link}</a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <form className="bg-white p-8 shadow-md rounded-lg w-3/5 bg-opacity-50" onSubmit={handleSubmit}>
          <h2 className="text-2xl text-center font-bold mb-6 text-bleu-nuit">
            {isRegister ? (locale === 'en' ? 'Sign up' : 'Inscription') : (locale === 'en' ? 'Log in' : 'Connexion')}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            {locale === 'en'
              ? 'Please fill at least one of the fields: Username, Phone number or Email'
              : 'Veuillez remplir au moins un des champs : Nom d\'utilisateur, Numéro de téléphone ou Email.'}
          </p>

          {isRegister && (
            <>
              {/* Champ Nom */}
              <div className="mb-4">
                <label className="block text-bleu-nuit text-sm font-bold mb-2" htmlFor="firstName">
                  {locale === 'en' ? 'First Name' : 'Prénom'}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder={locale === 'en' ? 'First Name' : 'Prénom'}
                  className="w-full bg-white bg-opacity-50 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-btn"
                />
              </div>

              {/* Champ Prénoms */}
              <div className="mb-4">
                <label className="block text-bleu-nuit text-sm font-bold mb-2" htmlFor="lastName">
                  {locale === 'en' ? 'Last Name' : 'Nom'}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder={locale === 'en' ? 'Last Name' : 'Nom'}
                  className="w-full bg-white bg-opacity-50 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-btn"
                />
              </div>
            </>
          )}

          {/* Champs pour Connexion/Inscription */}
          <div className="mb-4">
            <label className="block text-bleu-nuit text-sm font-bold mb-2" htmlFor="username">
              {locale === 'en' ? 'Username' : 'Nom d\'utilisateur'}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              placeholder={locale === 'en' ? 'Username' : 'Nom d\'utilisateur'}
              className="w-full bg-white bg-opacity-50 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-btn"
            />
          </div>

          <div className="mb-4">
            <label className="block text-bleu-nuit text-sm font-bold mb-2" htmlFor="phoneNumber">
              {locale === 'en' ? 'Phone Number' : 'Numéro de téléphone'}
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder={locale === 'en' ? 'Phone Number' : 'Numéro de téléphone'}
              className="w-full bg-white bg-opacity-50 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-btn"
            />
          </div>

          <div className="mb-4">
            <label className="block text-bleu-nuit text-sm font-bold mb-2" htmlFor="email">
              {locale === 'en' ? 'Email' : 'Email'}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={locale === 'en' ? 'Your email' : 'Votre email'}
              className="w-full bg-white bg-opacity-50 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-btn"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-bleu-nuit text-sm font-bold mb-2" htmlFor="password">
              {locale === 'en' ? 'Password' : 'Mot de passe'}
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              placeholder={locale === 'en' ? 'Password' : 'Mot de passe'}
              className="w-full bg-white bg-opacity-50 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-btn"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-10 text-sm text-blue-500 hover:underline"
            >
              {showPassword ? (locale === 'en' ? 'Hide' : 'Masquer') : (locale === 'en' ? 'Show' : 'Afficher')}
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-bleu-nuit text-sm font-bold mb-2" htmlFor="role">
              {locale === 'en' ? 'Role' : 'Rôle'}
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full bg-white bg-opacity-50 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-btn"
            >
              <option value="Voyageur">{locale === 'en' ? 'Traveler' : 'Voyageur'}</option>
              <option value="Chauffeur">{locale === 'en' ? 'Driver' : 'Chauffeur'}</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-orange-btn text-white py-2 rounded-md hover:bg-orange-700 focus:outline-none">
            {isRegister ? (locale === 'en' ? 'Sign up' : 'Inscription') : (locale === 'en' ? 'Log in' : 'Connexion')}
          </button>

          <p className="mt-4 text-center text-sm text-bleu-nuit">
            {isRegister ? (locale === 'en' ? 'Already have an account?' : 'Déjà un compte?') : (locale === 'en' ? 'Don’t have an account?' : 'Pas encore de compte?')}{' '}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-700 hover:underline"
            >
              {isRegister ? (locale === 'en' ? 'Log in' : 'Connexion') : (locale === 'en' ? 'Register' : 'Inscription')}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;

