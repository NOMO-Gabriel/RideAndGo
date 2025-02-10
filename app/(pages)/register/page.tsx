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
  const [isDriver, setIsDriver] = useState(false); // Toggle pour le chauffeur

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
      role: "Souhaitez-vous être chauffeur ?",
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
      role: "Do you want to be a driver?",
      register: "Register",
      extra: "Already have an account?",
      link: "Login",
      success: "Registration successful! Redirecting...",
      error: "An error occurred, please try again.",
    },
  };

  const currentContent = locale === 'en' ? content.en : content.fr;

  type FormData = {
    pseudo: string;
    email: string;
    password: string;
    phoneNumber: string;
    name: string;
    surname: string;
    birthday: string;
    gender: 'MALE' | 'FEMALE';
    isDriver: boolean;
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
    isDriver: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDriverToggle = () => {
    setIsDriver(!isDriver);
    setFormData({ ...formData, isDriver: !isDriver });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formattedBirthday = new Date(formData.birthday).toISOString().split('T')[0];
    const dataToSend = { ...formData, birthday: formattedBirthday };
    try {
      console.log("data to send :")
      console.log(dataToSend);
      await register(dataToSend);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
      } else {
        setError(currentContent.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm">
        <div className="flex justify-center items-center min-h-screen p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">{currentContent.register}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {error && <p className="text-red-500 text-center col-span-1 md:col-span-2">{error}</p>}
              {success && <p className="text-green-500 text-center col-span-1 md:col-span-2">{currentContent.success}</p>}
  
              <input 
                type="text" 
                name="pseudo" 
                value={formData.pseudo} 
                onChange={handleChange} 
                placeholder={currentContent.username} 
                className="w-full p-2 border border-gray-300 rounded col-span-1 md:col-span-1" 
                required 
              />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
                className="w-full p-2 border border-gray-300 rounded col-span-1 md:col-span-1" 
                required 
              />
              
              <div className="relative col-span-1 md:col-span-2">
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
                placeholder={currentContent.birthday} 
                type="date" 
                name="birthday" 
                value={formData.birthday} 
                onChange={handleChange} 
                className="w-full p-2 border border-gray-300 rounded" 
                required 
              />
  
              <select 
                title={currentContent.gender} 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                className="w-full p-2 border border-gray-300 rounded col-span-1 md:col-span-2" 
                required
              >
                <option value="MALE">M</option>
                <option value="FEMALE">F</option>
              </select>
  
              <div className="flex items-center justify-between col-span-1 md:col-span-2 space-x-2">
                <span className="text-sm md:text-base">{currentContent.role}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={isDriver} onChange={handleDriverToggle} />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
  
              <button 
                type="submit" 
                className="w-full p-2 bg-bleu-nuit text-white rounded hover:bg-orange-btn col-span-1 md:col-span-2 transition-colors" 
                disabled={loading}
              >
                {loading ? 'Loading...' : currentContent.register}
              </button>
  
              <div className="mt-4 text-center col-span-1 md:col-span-2">
                <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
                  <span className="text-sm md:text-base">{currentContent.extra}</span>
                  <Link href="/login" className="text-bleu-nuit hover:text-orange-btn underline transition-colors">
                    {currentContent.link}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}