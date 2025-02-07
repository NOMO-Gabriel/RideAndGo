'use client';

import { useState, FormEvent } from 'react';  
import { useUser } from '@/app/utils/hooks/useUser'; // Import du hook de connexion
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';
import NotificationManager from "../../components/flash_message/NotificationManager";
import { useRef } from "react";
interface LoginData {
  identifier: string;
  password: string;
}


const LoginForm = () => {
  const { login } = useUser(); // Récupère la fonction de connexion du contexte
  const { showFlashMessage } = useFlashMessage(); // Récupère la fonction pour afficher les flash messages
  const [loginData, setLoginData] = useState<LoginData>({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const notificationManager = useRef(null);

  const handleEvent = () => {
    notificationManager.current?.addNotification(
      "Nouveau client disponible à 500 mètres"
    );
  };
  // Détection du type d'identifiant
  const getIdentifierType = (identifier: string): 'email' | 'phoneNumber' | 'pseudo' => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^\+?\d{10,15}$/;

    if (emailRegex.test(identifier)) return 'email';
    if (phoneRegex.test(identifier)) return 'phoneNumber';
    return 'pseudo';
  };

  // Mise à jour des données de connexion
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const identifierType = getIdentifierType(loginData.identifier);
  
    try {
      await login(identifierType, loginData.identifier, loginData.password);
      showFlashMessage('Connexion réussie ! Redirection en cours...', 'success', true);
      handleEvent();
      setTimeout(() => {
        window.location.href = '/'; // Redirection sécurisée
      }, 2000);
    } catch (error: any) { 
      showFlashMessage(error.message || 'Erreur de connexion. Veuillez vérifier vos identifiants.', 'error');
      handleEvent();
      
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url(/images/bg_register.jpeg)" }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm">
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Se Connecter</h2>
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulaire de connexion">
              <NotificationManager ref={notificationManager} /> 
              
              <input
                type="text"
                name="identifier"
                value={loginData.identifier}
                onChange={handleChange}
                placeholder="Email, Pseudo ou Téléphone"
                className="w-full p-2 border border-gray-300 rounded"
                aria-label="Identifiant (Email, Pseudo ou Téléphone)"
                required
              />

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="w-full p-2 border border-gray-300 rounded"
                aria-label="Mot de passe"
                required
              />

              <button
                type="submit"
                className="w-full p-2 bg-bleu-nuit text-white rounded hover:bg-orange-btn"
                disabled={loading}
              >
                {loading ? 'Chargement...' : 'Se Connecter'}
              </button>

              <div className="flex justify-between items-center mt-4">
                <a href="/forgot-password" className="text-bleu-nuit underline hover:text-orange-btn">
                  Mot de passe oublié ?
                </a>
                <a href="/register" className="text-bleu-nuit underline hover:text-orange-btn">
                  Créer un compte
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
