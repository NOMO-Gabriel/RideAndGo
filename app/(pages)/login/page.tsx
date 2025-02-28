'use client';

import { useState, FormEvent } from 'react';
import { useUser } from '@/app/utils/hooks/useUser';
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';
import { useLocale } from "@/app/utils/hooks/useLocale.js";
interface LoginData {
  identifier: string;
  password: string;
}

const translations = {
  fr: {
    title: "Se Connecter",
    identifierPlaceholder: "Email, Pseudo ou Téléphone",
    passwordPlaceholder: "Mot de passe",
    submitButton: "Se Connecter",
    loading: "Chargement...",
    forgotPassword: "Mot de passe oublié ?",
    createAccount: "Créer un compte",
    loginSuccess: "Connexion réussie ! Redirection en cours...",
    loginError: "Erreur de connexion. Veuillez vérifier vos identifiants."
  },
  en: {
    title: "Log In",
    identifierPlaceholder: "Email, Username or Phone",
    passwordPlaceholder: "Password",
    submitButton: "Log In",
    loading: "Loading...",
    forgotPassword: "Forgot Password?",
    createAccount: "Create an Account",
    loginSuccess: "Login successful! Redirecting...",
    loginError: "Login error. Please check your credentials."
  }
};

const LoginForm = () => {
  const { login } = useUser();
  const { showFlashMessage } = useFlashMessage();
  const [loginData, setLoginData] = useState<LoginData>({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const {locale} = useLocale(); // Récupère la locale actuelle (chaîne ou objet)

  // Sélectionner les traductions en fonction de la locale
  const currentTranslations = locale === 'fr' ? translations.fr : translations.en;

  const getIdentifierType = (identifier: string): 'email' | 'phoneNumber' | 'pseudo' => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^\+?\d{10,15}$/;

    if (emailRegex.test(identifier)) return 'email';
    if (phoneRegex.test(identifier)) return 'phoneNumber';
    return 'pseudo';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const identifierType = getIdentifierType(loginData.identifier);

    try {
      await login(identifierType, loginData.identifier, loginData.password);
      showFlashMessage(currentTranslations.loginSuccess, 'success', true);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error: any) {
      showFlashMessage(error.message || currentTranslations.loginError, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url(/images/bg_register.jpeg)" }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm">
        <div className="flex justify-center items-center min-h-screen p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">{currentTranslations.title}</h2>
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulaire de connexion">
              <input
                type="text"
                name="identifier"
                value={loginData.identifier}
                onChange={handleChange}
                placeholder={currentTranslations.identifierPlaceholder}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded text-sm sm:text-base"
                aria-label={currentTranslations.identifierPlaceholder}
                required
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder={currentTranslations.passwordPlaceholder}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded text-sm sm:text-base"
                aria-label={currentTranslations.passwordPlaceholder}
                required
              />
              <button
                type="submit"
                className="w-full p-2 sm:p-3 bg-bleu-nuit text-white rounded hover:bg-orange-btn transition-colors text-sm sm:text-base"
                disabled={loading}
              >
                {loading ? currentTranslations.loading : currentTranslations.submitButton}
              </button>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 mt-4">
                <a href="/forgot-password" className="text-sm sm:text-base text-bleu-nuit underline hover:text-orange-btn">
                  {currentTranslations.forgotPassword}
                </a>
                <a href="/register" className="text-sm sm:text-base text-bleu-nuit underline hover:text-orange-btn">
                  {currentTranslations.createAccount}
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