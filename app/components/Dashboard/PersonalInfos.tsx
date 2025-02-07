'use client';
import React, { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  birthDate: string;
}

const mockPersonalInfo: PersonalInfo = {
  firstName: 'ngono',
  lastName: 'jean',
  email: 'ngonojean@gmail.com',
  phone: '+237 699 99 99 99',
  address: '123 Yaoundé',
  city: 'Yaoundé',
  country: 'Cameroun',
  birthDate: '1995-03-11'
};

type PersonalInfoContent = {
  personalInfo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  birthDate: string;
  save: string;
  updateSuccess: string;
  updateError: string;
};

const content: Record<string, PersonalInfoContent> = {
  en: {
    personalInfo: 'Personal Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    country: 'Country',
    birthDate: 'Birth Date',
    save: 'Save Changes',
    updateSuccess: 'Personal information updated successfully!',
    updateError: 'Error updating personal information. Please try again.',
  },
  fr: {
    personalInfo: 'Informations Personnelles',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    city: 'Ville',
    country: 'Pays',
    birthDate: 'Date de Naissance',
    save: 'Enregistrer les Modifications',
    updateSuccess: 'Informations personnelles mises à jour avec succès!',
    updateError: 'Erreur lors de la mise à jour des informations. Veuillez réessayer.',
  },
};

export default function PersonalInfos() {
  const { locale } = useLocale();
  const currentContent = locale === 'en' ? content.en : content.fr;
  const { showFlashMessage } = useFlashMessage();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(mockPersonalInfo);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      showFlashMessage(currentContent.updateSuccess, "success", true);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations:', error);
      showFlashMessage(currentContent.updateError, "error", true);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="border border-gray-200 shadow-xl rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">{currentContent.personalInfo}</h2>
          <button onClick={() => setIsEditing(!isEditing)}>
            <FontAwesomeIcon icon={faEdit} className="w-6 h-6 text-blue-500" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-bold">{currentContent.firstName}</label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
              className={`border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full`}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">{currentContent.lastName}</label>
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
              className={`border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full`}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">{currentContent.email}</label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
              className={`border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full`}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">{currentContent.phone}</label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              className={`border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full`}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">{currentContent.address}</label>
            <input
              type="text"
              value={personalInfo.address}
              onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
              className={`border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full`}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">{currentContent.city}</label>
            <input
              type="text"
              value={personalInfo.city}
              onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
              className={`border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full`}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">{currentContent.country}</label>
            <input
              type="text"
              value={personalInfo.country}
              onChange={(e) => setPersonalInfo({ ...personalInfo, country: e.target.value })}
              className={`border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full`}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">{currentContent.birthDate}</label>
            <input
              type="date"
              value={personalInfo.birthDate}
              onChange={(e) => setPersonalInfo({ ...personalInfo, birthDate: e.target.value })}
              className={`border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full`}
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {currentContent.save}
          </button>
        )}
      </div>
    </div>
  );
}
