'use client';

import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js"; 
import Link from "next/link";

export default function Page() {
  const { locale } = useLocale();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
  };

  const content = {
    fr: {
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      role: "Rôle",
      customer: "Client",
      driver: "Chauffeur",
      login: "Se connecter",
      extra: "Pas encore de compte?",
      link: "S'inscrire",
    },
    en: {
      username: "Username",
      password: "Password",
      role: "Role",
      customer: "Customer",
      driver: "Driver",
      login: "Login",
      extra: "Don't have an accout",
      link: "Register"
    },
  };

  const currentContent = locale === 'en' ? content.en : content.fr;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log(formData);
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
    </div>

  );
}
