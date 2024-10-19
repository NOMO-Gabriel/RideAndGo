'use client'
import React, { useState } from 'react';
import { useLocale } from "@/app/utils/hooks/useLocale.js"; // Hook pour obtenir la locale
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Définir le contenu des informations personnelles avec des types
type Content = {
  personalInfo: string;
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  changePassword: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  passwordRequirementsIntro: string; // Texte introductif pour les exigences de mot de passe
  passwordRequirements: {
    minLength: string;
    lowercase: string;
    uppercase: string;
    symbolOrNumber: string;
  };
};

const content: Record<string, Content> = {
  en: {
    personalInfo: "Personal Information",
    firstName: "First Name :",
    lastName: "Last Name :",
    username: "Username :",
    dateOfBirth: "Date of Birth :",
    gender: "Gender :",
    email: "Email :",
    phone: "Phone :",
    changePassword: "Change Password",
    currentPassword: "Current Password :",
    newPassword: "New Password :",
    confirmPassword: "Confirm Password :",
    passwordRequirementsIntro: "Please ensure your new password meets the following requirements:",
    passwordRequirements: {
      minLength: "* Minimum 8 characters long - the more, the better",
      lowercase: "* At least one lowercase",
      uppercase: "* At least one uppercase character",
      symbolOrNumber: "* At least one number, symbol or whitespace character",
    },
  },
  fr: {
    personalInfo: "Informations Personnelles",
    firstName: "Prénom :",
    lastName: "Nom :",
    username: "Pseudo :",
    dateOfBirth: "Date de Naissance :",
    gender: "Genre :",
    email: "Email :",
    phone: "Téléphone :",
    changePassword: "Changer le Mot de Passe",
    currentPassword: "Mot de passe actuel :",
    newPassword: "Nouveau Mot de Passe :",
    confirmPassword: "Confirmer le Mot de Passe :",
    passwordRequirementsIntro: "Veuillez vous assurer que votre nouveau mot de passe respecte les exigences suivantes :",
    passwordRequirements: {
      minLength: "* Minimum 8 caractères - plus c'est long, mieux c'est",
      lowercase: "* Au moins une minuscule",
      uppercase: "* Au moins une majuscule",
      symbolOrNumber: "* Au moins un chiffre, symbole ou espace",
    },
  },
};

export default function PersonalInfo() {
  const { locale } = useLocale(); // Utiliser le hook pour obtenir la langue active
  const localizedContent = content[locale as "fr" | "en"]; 

  // État pour les informations personnelles
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [username, setUsername] = useState('johndoe');
  const [dob, setDob] = useState('1990-01-01');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1234567890');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false); // État pour activer/désactiver le mode édition

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Logique pour changer le mot de passe (API call, etc.)
    alert("Password changed successfully!");
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow flex flex-col space-y-8 ">
        {/* personal infos */}
        <div className='border border-gray-200 shadow-xl rounded-lg z-0 p-6 flex  flex-col'>
            <div className="flex justify-between mb-4">
                <h2 className="font-bold text-lg mb-8 text-center flex flex-col">{localizedContent.personalInfo}</h2>
                <button onClick={() => setIsEditing(!isEditing)}>
                    <FontAwesomeIcon icon={faEdit} className="w-6 h-6 text-blue-500" />

                </button>
            </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: localizedContent.firstName, value: firstName, setter: setFirstName },
                { label: localizedContent.lastName, value: lastName, setter: setLastName },
                { label: localizedContent.username, value: username, setter: setUsername },
                { label: localizedContent.dateOfBirth, value: dob, setter: setDob, type: 'date' },
                { label: localizedContent.gender, value: gender, setter: setGender },
                { label: localizedContent.email, value: email, setter: setEmail, type: 'email' },
                { label: localizedContent.phone, value: phone, setter: setPhone, type: 'tel' },
              ].map((field, index) => (
                <div key={index}>
                  <label className="block mb-1 font-bold">{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className={`border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full transition`}
                    disabled={!isEditing}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* password */}
          <div className='border border-gray-200 shadow-xl rounded-lg z-0 p-6 flex flex-col space-y-4 '>
              <h3 className="text-lg font-semibold mb-6 text-center">{localizedContent.changePassword}</h3>
              <form onSubmit={handlePasswordChange} className="space-y-4 flex flex-col">
                  <div>
                    <div>
                        <label className="">{localizedContent.currentPassword}</label>
                        <input
                          type="password"
                          value={''}
                          className="border rounded px-2 py-1 w-full"
                          required
                        />
                    </div>
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <div className='flex flex-row gap-4 w-full'>
                      <div className='w-1/2'>
                        <label className="">{localizedContent.newPassword}</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                          required
                        />
                      </div>
                      <div className='w-1/2'>
                        <label className="">{localizedContent.confirmPassword}</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                          required
                        />
                      </div>
                    </div>
                    <div className='flex flex-col justify-start space-y-2'>
                      <p className='space-y-2'>{localizedContent.passwordRequirementsIntro}</p> {/* Texte introductif */}
                      <ul className='text-red-600'>
                        <li>{localizedContent.passwordRequirements.minLength}</li>
                        <li>{localizedContent.passwordRequirements.lowercase}</li>
                        <li>{localizedContent.passwordRequirements.uppercase}</li>
                        <li>{localizedContent.passwordRequirements.symbolOrNumber}</li>
                      </ul>
                    </div>
                  </div>
                  <button type="submit" className="bg-bleu-nuit hover:bg-blue-800 text-white rounded px-4 py-2 w-max">
                    {localizedContent.changePassword}
                  </button>
              </form>
          </div>
    </div>
  );
}
