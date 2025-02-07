'use client';

import { useState } from "react";
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import { createAdmin } from "@/app/utils/api/admin";
import { useUser } from "@/app/utils/hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';

interface RegisterAdminProps {
  onFormSubmit: () => void;
}

export default function RegisterAdmin({ onFormSubmit }: RegisterAdminProps) {
  const { locale } = useLocale();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {showFlashMessage} = useFlashMessage()
  const { user } = useUser();

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
      register: "Créer un administrateur",
      link: "Se connecter",
      success: "Création réussie !",
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
      register: "Register an admin",
      success: "Creation successful!",
      error: "An error occurred, please try again.",
    },
  };

  const currentContent = locale === 'en' ? content.en : content.fr;

  const [formData, setFormData] = useState<{
    pseudo: string;
    email: string;
    password: string;
    phoneNumber: string;
    name: string;
    surname: string;
    birthday: string;
    gender: "MALE" | "FEMALE"; 
  }>({
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
   
    const formattedBirthday = new Date(formData.birthday).toISOString().split('T')[0];
    const dataToSend = { 
      ...formData, 
      birthday: formattedBirthday,
      gender: formData.gender as "MALE" | "FEMALE" 
    };
    
    
    try {
      if (user?.id) {
        await createAdmin({ superAdminId: user.id, adminToCreate : dataToSend }); 
      }; 
     
      showFlashMessage("admin cree avec succes", "success", true);
    } catch (error) {
      showFlashMessage("erreur lors de la creation d'un admin", "error", true);
    } finally {
      onFormSubmit();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center relative p-4">
      <div className="absolute inset-0"></div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg z-10 w-full max-w-md mx-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center flex-1">
            {currentContent.register}
          </h2>
          <button 
            onClick={onFormSubmit} 
            className="text-xl sm:text-2xl p-1" 
            title={locale == "fr" ? "annuller" : "abort"}
          >
            <FontAwesomeIcon icon={faTimes} className="text-red-500"/>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="grid gap-3 sm:gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative w-full">
              <input 
                type={passwordVisible ? 'text' : 'password'} 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder={currentContent.password} 
                className="w-full p-2 border border-gray-300 rounded pr-10" 
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
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input 
              type="date" 
              name="birthday" 
              value={formData.birthday} 
              onChange={handleChange} 
              placeholder={currentContent.birthday} 
              className="w-full p-2 border border-gray-300 rounded" 
              required 
            />
            <select 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded" 
              required
            >
              <option value="MALE">M</option>
              <option value="FEMALE">F</option>
            </select>
          </div>
  
          <button 
            type="submit" 
            className="w-full bg-bleu-nuit text-white py-2 rounded mt-2 sm:mt-4 hover:bg-orange-btn transition-colors"
          >
            {currentContent.register}
          </button>
        </form>
      </div>
    </div>
  );
}  