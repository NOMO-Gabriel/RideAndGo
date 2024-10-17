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
  newPassword: string;
  confirmPassword: string;
};

const content: Record<string, Content> = {
  en: {
    personalInfo: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    username: "Username",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    email: "Email",
    phone: "Phone",
    changePassword: "Change Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
  },
  fr: {
    personalInfo: "Informations Personnelles",
    firstName: "Prénom",
    lastName: "Nom",
    username: "Pseudo",
    dateOfBirth: "Date de Naissance",
    gender: "Genre",
    email: "Email",
    phone: "Téléphone",
    changePassword: "Changer le Mot de Passe",
    newPassword: "Nouveau Mot de Passe",
    confirmPassword: "Confirmer le Mot de Passe",
  },
};

export default function PersonalInfo() {
  const { locale } = useLocale(); // Utiliser le hook pour obtenir la langue active
  const localizedContent = content[locale as "fr" | "en"]; // Obtenir le contenu localisé

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
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{localizedContent.personalInfo}</h2>
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
            <label className="block mb-1">{field.label}</label>
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

      <h3 className="text-lg font-semibold mb-2">{localizedContent.changePassword}</h3>
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <div>
          <label className="block mb-1">{localizedContent.newPassword}</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">{localizedContent.confirmPassword}</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          {localizedContent.changePassword}
        </button>
      </form>
    </div>
  );
}
