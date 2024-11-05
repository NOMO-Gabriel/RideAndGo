'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '@/app/utils/hooks/useUser';
import { getUser, UpdateUsersInfo, changePassword } from '@/app/utils/api/users';

// Définir le contenu des informations personnelles avec des types
type Content = {
  personalInfo: string;
  name: string;
  surname: string;
  pseudo: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  changePassword: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  passwordRequirementsIntro: string;
  passwordRequirements: {
    minLength: string;
    lowercase: string;
    uppercase: string;
    symbolOrNumber: string;
  };
  editPhoto: string;
  uploadPhoto: string;
  deletePhoto: string;
};

const content: Record<string, Content> = {
  en: {
    personalInfo: "Personal Information",
    surname: "First Name :",
    name: "Last Name :",
    pseudo: "Pseudo :",
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
    editPhoto: "Edit Photo",
    uploadPhoto: "Upload Photo",
    deletePhoto: "Delete Photo",
  },
  fr: {
    personalInfo: "Informations Personnelles",
    surname: "Prénom :",
    name: "Nom :",
    pseudo: "Pseudo :",
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
    editPhoto: "Modifier la Photo",
    uploadPhoto: "Télécharger une Photo",
    deletePhoto: "Supprimer la Photo",
  }
};

export default function PersonalInfo() {
  const { locale } = useLocale();
  const currentContent = locale === 'en' ? content.en : content.fr;
  const { user } = useUser();

  const [userInfo, setUserInfo] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isPhotoMenuOpen, setIsPhotoMenuOpen] = useState(false);
  const photoMenuRef = useRef<HTMLDivElement>(null);

  // Charger les informations utilisateur au montage du composant
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!user) return;
        const data = await getUser(user.id);
        setUserInfo(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
        alert('Erreur lors de la récupération des informations utilisateur:');
      }
    };
    fetchUserInfo();
  }, [user?.id]);

  const handleSave = async () => {
    try {
      await UpdateUsersInfo({
        id: user?.id,
        personnalInfos: {
          name: userInfo.name,
          surname: userInfo.surname,
          pseudo: userInfo.pseudo,
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber,
          birthday: userInfo.dateOfBirth,
          gender: userInfo.gender,
        },
      });
      alert('Informations mises à jour avec succès!');
      setIsEditing(false);
    } catch (error) {
      alert('Erreur lors de la mise à jour des informations. Veillez reessayer');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas!');
      return;
    }
    try {
      await changePassword({
        id: user?.id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      alert('Mot de passe changé avec succès!');
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      alert('Erreur lors du changement de mot de passe. Veuillez réessayer');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (photoMenuRef.current && !photoMenuRef.current.contains(event.target as Node)) {
      setIsPhotoMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isPhotoMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPhotoMenuOpen]);

  if (!userInfo) return <p>Chargement...</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow flex flex-col space-y-8">
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-60 h-60 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
            <img src={userInfo.photoUrl} alt="User Photo" className="w-full h-full object-cover" />
          </div>
          <a href="#" onClick={() => setIsPhotoMenuOpen(!isPhotoMenuOpen)} className="absolute bottom-0 left-0 bg-white rounded-full p-1">
            <FontAwesomeIcon icon={faEdit} className="w-4 h-4 text-blue-500" />
          </a>
          {isPhotoMenuOpen && (
            <div ref={photoMenuRef} className="absolute bottom-0 left-0 mt-8 bg-white border border-gray-200 rounded shadow-lg p-4">
              <div className="flex items-center mb-2">
                <label className="block mr-2 font-bold">{currentContent.uploadPhoto}</label>
                <input type="file" className="border rounded px-2 py-1" />
              </div>
              <div>
                <button className="text-red-500">{currentContent.deletePhoto}</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border border-gray-200 shadow-xl rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">{currentContent.personalInfo}</h2>
          <button onClick={() => setIsEditing(!isEditing)}>
            <FontAwesomeIcon icon={faEdit} className="w-6 h-6 text-blue-500" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: currentContent.name, value: 'name' },
            { label: currentContent.surname, value: 'surname' },
            { label: currentContent.pseudo, value: 'pseudo' },
            { label: currentContent.dateOfBirth, value: 'dateOfBirth', type: 'date' },
            { label: currentContent.gender, value: 'gender' },
            { label: currentContent.email, value: 'email', type: 'email' },
            { label: currentContent.phone, value: 'phoneNumber', type: 'tel' },
          ].map((field, index) => (
            <div key={index}>
              <label className="block mb-1 font-bold">{field.label}</label>
              <input
                type={field.type || 'text'}
                value={userInfo[field.value]}
                onChange={(e) => setUserInfo({ ...userInfo, [field.value]: e.target.value })}
                className={`border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full`}
                disabled={!isEditing}
              />
            </div>
          ))}
        </div>
        {isEditing && (
          <div className="flex justify-center mt-4">
            <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
              Enregistrer
            </button>
          </div>
        )}
      </div>

      <div className="border border-gray-200 shadow-xl rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">{currentContent.changePassword}</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label>{currentContent.currentPassword}</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label>{currentContent.newPassword}</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>
            <div className="w-1/2">
              <label>{currentContent.confirmPassword}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border rounded px-2 py-1 w-full"
                required
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Changer le mot de passe
          </button>
        </form>
      </div>
    </div>
  );
}
