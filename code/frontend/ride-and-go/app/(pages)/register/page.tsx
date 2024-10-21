'use client';

import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js";

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lasrname: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "Voyageur",
  });
  const { locale, changeLocale } = useLocale();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, phoneNumber, email } = formData;

    // Vérifier qu'au moins un champ est rempli
    if (!username && !phoneNumber && !email) {
      alert(locale === 'en' ? "You must fill at least one of the fields: Username, Phone number or Email." : "Vous devez remplir au moins un des champs : Nom d'utilisateur, Numéro de téléphone ou Email.");
      return;
    }

    // Traiter les données du formulaire
    console.log("Formulaire soumis : ", formData);
  };

  return (
    <div className="flex h-screen absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login_img.avif')"}}>
      {/* Colonne gauche : Image floutée avec texte centré */}
      <div className="w-1/2 relative">
        <div className="absolute inset-0" style={{ filter: "blur(8px)" }}></div>
        <div className="relative flex items-center justify-center h-full">
          <div className="p-8 text-bleu-nuit text-center">
            <h1 className="text-8xl font-bold mb-4">Ride&Go</h1>
            <p className="text-4xl">{locale==='en'?'Move around more easily...':'Déplacez vous plus aisément...'}</p>
          </div>
        </div>
      </div>

      {/* Colonne droite : Formulaire de connexion */}
      <div className="w-1/2 flex items-center justify-center">
        <form className="bg-white p-8 shadow-md rounded-lg w-3/5 bg-opacity-50" onSubmit={handleSubmit}>
          <h2 className="text-2xl text-center font-bold mb-6 text-bleu-nuit">
            {locale === 'en' ? 'Log in' : 'Connexion'}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            {locale === 'en' ? 'Please fill all the fields.' : 'Veuillez remplir tous les champs.'}
          </p>
          {/* Champ Nom */}
          <div className="mb-4">
            <label className="block text-bleu-nuit text-sm font-bold mb-2" htmlFor="username">
              {locale === 'en' ? 'Firstname' : 'Nom'}
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={formData.firstname}
              onChange={handleInputChange}
              placeholder={locale === 'en' ? 'Firstname' : 'Nom'}
              className="w-full bg-white bg-opacity-50 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-btn"
            />
          </div>
          {/* Champ Nom d'utilisateur */}
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

          {/* Champ Numéro de téléphone */}
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

          {/* Champ Email */}
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

          {/* Champ Mot de passe */}
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

          {/* Champ Rôle */}
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

          <button type="submit" className="w-full bg-orange-btn text-white p-3 rounded-md hover:bg-orange-600 transition duration-300">
            {locale === 'en' ? 'Log in' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;

