'use client';
import React, { useEffect, useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { getUser, updateUserPreferences } from '@/app/utils/api/users';
import { useUser } from '@/app/utils/hooks/useUser';
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';

// Définir le contenu des préférences avec des types
type PreferencesContent = {
  preferences: string;
  language: string;
  theme: string;
  timeZone: string;
  location: string;
  save: string;
  updateSuccess: string;
  updateError: string;
};

const content: Record<string, PreferencesContent> = {
  en: {
    preferences: 'Preferences',
    language: 'Language :',
    theme: 'Theme :',
    timeZone: 'Time Zone :',
    location: 'Enable Location :',
    save: 'Save Preferences',
    updateSuccess: 'Preferences updated successfully!',
    updateError: 'Error updating preferences. Please try again.',
  },
  fr: {
    preferences: 'Préférences',
    language: 'Langue :',
    theme: 'Thème :',
    timeZone: 'Fuseau horaire :',
    location: 'Activer la localisation :',
    save: 'Enregistrer les Préférences',
    updateSuccess: 'Préférences mises à jour avec succès!',
    updateError: 'Erreur lors de la mise à jour des préférences. Veuillez réessayer.',
  },
};

export default function Preferences() {
  const { locale } = useLocale();
  const { user } = useUser();
  const currentContent = locale === 'en' ? content.en : content.fr;
  const { showFlashMessage } = useFlashMessage(); 
  const [preferences, setPreferences] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        if (!user) return;
        const data = await getUser(user.id);
        setPreferences({
          language: data.language,
          theme: data.theme,
          timeZone: data.timeZone,
          isLocationEnabled: data.isLocationEnabled,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des préférences:', error);
      }
    };
    fetchPreferences();
  }, [user?.id]);

  const handleSave = async () => {
    try {
      await updateUserPreferences({
        id: user?.id,
        preferences,
      });
      showFlashMessage(currentContent.updateSuccess,"success", true);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des préférences:', error);
      showFlashMessage(currentContent.updateError,"error", true);
    }
  };

  const toggleLocation = () => {
    if (!isEditing) return; // Empêche le changement si on n'est pas en mode édition
    setPreferences((prev: any) => ({
      ...prev,
      isLocationEnabled: !prev.isLocationEnabled,
    }));
  };

  if (!preferences) return <p>Chargement...</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow flex flex-col space-y-8">
      <div className="border border-gray-200 shadow-xl rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">{currentContent.preferences}</h2>
          <button onClick={() => setIsEditing(!isEditing)}>
            <FontAwesomeIcon icon={faEdit} className="w-6 h-6 text-blue-500" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-bold">{currentContent.language}</label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              className={`border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full`}
              disabled={!isEditing}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-bold  ">{currentContent.theme}</label>
            <select
              value={preferences.theme}
              onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
              className={`border w-max ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full`}
              disabled={!isEditing}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-bold">{currentContent.timeZone}</label>
            <input
              type="number"
              value={preferences.timeZone}
              onChange={(e) => setPreferences({ ...preferences, timeZone: +e.target.value })}
              className={`border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded px-2 py-1 w-full`}
              disabled={!isEditing}
            />
          </div>

          <div className="flex items-center">
            <label className="block font-bold mr-2">{currentContent.location}</label>
            <div
              className={`w-20 h-8 flex items-center rounded-full p-1 cursor-pointer ${
                preferences.isLocationEnabled ? 'bg-blue-500' : 'bg-gray-400'
              }`}
              onClick={toggleLocation}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  preferences.isLocationEnabled ? 'translate-x-12' : 'translate-x-0'
                }`}
              />
            </div>
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
