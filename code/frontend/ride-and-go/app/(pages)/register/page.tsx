'use client';

import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import Link from "next/link";
import { register } from "@/app/utils/api/auth";

export default function Register() {
  const { locale } = useLocale();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const content = {
    fr: {
      firstname: "Prénom",
      lastname: "Nom",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      phoneNumber: "Numéro de téléphone",
      birthday: "Date de naissance",
      gender: "Genre",
      role: "Rôle",
      customer: "Client",
      driver: "Chauffeur",
      register: "S'inscrire",
      extra: "Déjà un compte?",
      link: "Se connecter",
      success: "Inscription réussie! Redirection...",
      error: "Une erreur est survenue, veuillez réessayer.",
    },
    en: {
      firstname: "First Name",
      lastname: "Last Name",
      username: "Username",
      password: "Password",
      phoneNumber: "Phone Number",
      birthday: "Birthday",
      gender: "Gender",
      role: "Role",
      customer: "Customer",
      driver: "Driver",
      register: "Register",
      extra: "Already have an account?",
      link: "Login",
      success: "Registration successful! Redirecting...",
      error: "An error occurred, please try again.",
    },
  };

  const currentContent = locale === 'en' ? content.en : content.fr;

  // Typage pour les données du formulaire
  type FormData = {
    pseudo: string;
    email: string;
    password: string;
    phoneNumber: string;
    name: string;
    surname: string;
    birthday: string;
    gender: 'MALE' | 'FEMALE';
  };

  const [formData, setFormData] = useState<FormData>({
    pseudo: "",
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
    surname: "",
    birthday: "",
    gender: "MALE",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formattedBirthday = new Date(formData.birthday).toISOString().split('T')[0];
    const dataToSend = { ...formData, birthday: formattedBirthday };
    try {
      await register(dataToSend);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login"; // Redirection après succès
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message); // Utilisez le message d'erreur
      } else {
        setError(currentContent.error); // Message générique
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url(/images/bg_register.jpeg)" }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm">
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">{currentContent.register}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {error && <p className="text-red-500 text-center col-span-2">{error}</p>}
              {success && <p className="text-green-500 text-center col-span-2">{currentContent.success}</p>}

              <input
                type="text"
                name="pseudo"
                value={formData.pseudo}
                onChange={handleChange}
                placeholder={currentContent.username}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <div className="relative col-span-2">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={currentContent.password}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {passwordVisible ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder={currentContent.phoneNumber}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={currentContent.firstname}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder={currentContent.lastname}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="date"
                name="birthday"
                placeholder = {currentContent.birthday}
                value={formData.birthday}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <select
                name="gender"
                title = {currentContent.gender}
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded col-span-2"
                required
              >
                <option value="MALE">M</option>
                <option value="FEMALE">F</option>
              </select>
              <button
                type="submit"
                className="w-full p-2 bg-bleu-nuit text-white rounded hover:bg-orange-btn col-span-2"
                disabled={loading}
              >
                {loading ? 'Loading...' : currentContent.register}
              </button>
              <p className="mt-4 text-center col-span-2 space-x-4 flex flex-row justify-center items-center">
                <p>{currentContent.extra}</p> <Link href="/login" className="text-bleu-nuit font- hover:text-orange-btn underline">{currentContent.link}</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
