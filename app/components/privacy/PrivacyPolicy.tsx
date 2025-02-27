'use client';

import React from 'react';
import { useLocale } from "@/app/utils/hooks/useLocale.js"; // Hook pour gérer la langue
import { FaShieldAlt, FaRegFileAlt, FaUserShield, FaLock } from 'react-icons/fa'; // Icônes supplémentaires

const PrivacyPolicy: React.FC = () => {
  const { locale } = useLocale(); // Utilisation du hook pour obtenir la langue actuelle

  // Contenu multilingue
  const content = {
    en: {
      effectiveDate: "Effective Date: October 20, 2024",
      companyName: "Company Name: Ride&Go Inc.",
      websiteUrl: "Company website URL: https://rideandgo.com",
      platformAddress: "Platform Address: https://app.rideandgo.com",
      introduction: "At Ride&Go Inc., your privacy is our priority. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our platform.",
      userResponsibilities: {
        title: "Key Responsibilities and User Obligations",
        accountability: {
          title: "User Accountability",
          points: [
            "Accurate Information: Users must provide accurate and complete information during account creation and service requests.",
            "Account Security: Users are responsible for maintaining the confidentiality of their account credentials."
          ]
        },
        respectfulConduct: "Users are expected to treat drivers and other users with respect, fostering a positive environment on the platform.",
        compliance: "Users must adhere to all platform policies, including payment obligations and safety guidelines."
      },
      handlingUserPrivacy: {
        title: "Handling User Privacy and Data Protection",
        collection: {
          title: "Information Collection",
          text: "We collect personal information that you provide directly, such as your name, email address, phone number, and payment details."
        },
        use: {
          title: "Use of Information",
          points: [
            "Facilitate and process transactions.",
            "Communicate with you regarding your account and services.",
            "Improve our platform through data analysis."
          ]
        },
        sharing: {
          title: "Data Sharing and Disclosure",
          text: "We do not sell or rent your personal information to third parties. We may share your information with service providers and legal authorities when required by law."
        },
        security: {
          title: "Data Security",
          text: "We implement a variety of security measures to protect your personal information from unauthorized access, use, or disclosure."
        }
      },
      userRights: {
        title: "User Rights",
        text: "Users have the right to access, correct, or delete their personal information at any time by contacting our support team."
      },
      conclusion: "Ride&Go Inc. is committed to protecting your personal information while ensuring a safe experience on our platform.",
      contactInfo: {
        title: "Contact Information",
        text: "For any questions regarding your personal information, please contact us at:",
        companyName: "Ride&Go Inc.",
        email: "Email: support@rideandgo.com",
        website: "Website: https://rideandgo.com"
      }
    },
    fr: {
      effectiveDate: "Date d'entrée en vigueur : 20 octobre 2024",
      companyName: "Nom de l'entreprise : Ride&Go Inc.",
      websiteUrl: "URL du site de l'entreprise : https://rideandgo.com",
      platformAddress: "Adresse de la plateforme : https://app.rideandgo.com",
      introduction: "Chez Ride&Go Inc., votre vie privée est notre priorité. Cette politique de confidentialité décrit comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre plateforme.",
      userResponsibilities: {
        title: "Responsabilités et Obligations des Utilisateurs",
        accountability: {
          title: "Responsabilité de l'utilisateur",
          points: [
            "Informations Précises : Les utilisateurs doivent fournir des informations exactes et complètes lors de la création de compte et des demandes de service.",
            "Sécurité du Compte : Les utilisateurs sont responsables de la confidentialité de leurs identifiants de compte."
          ]
        },
        respectfulConduct: "Les utilisateurs doivent traiter les chauffeurs et les autres utilisateurs avec respect, favorisant ainsi un environnement positif sur la plateforme.",
        compliance: "Les utilisateurs doivent respecter toutes les politiques de la plateforme, y compris les obligations de paiement et les directives de sécurité."
      },
      handlingUserPrivacy: {
        title: "Gestion de la Vie Privée des Utilisateurs et Protection des Données",
        collection: {
          title: "Collecte d'Informations",
          text: "Nous collectons des informations personnelles que vous fournissez directement, telles que votre nom, votre adresse e-mail, votre numéro de téléphone et vos coordonnées de paiement."
        },
        use: {
          title: "Utilisation des Informations",
          points: [
            "Faciliter et traiter les transactions.",
            "Communiquer avec vous concernant votre compte et nos services.",
            "Améliorer notre plateforme grâce à l'analyse des données."
          ]
        },
        sharing: {
          title: "Partage et Divulgation des Données",
          text: "Nous ne vendons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations avec des prestataires de services et des autorités légales si nécessaire."
        },
        security: {
          title: "Sécurité des Données",
          text: "Nous mettons en œuvre diverses mesures de sécurité pour protéger vos informations personnelles contre tout accès, utilisation ou divulgation non autorisé."
        }
      },
      userRights: {
        title: "Droits des Utilisateurs",
        text: "Les utilisateurs ont le droit d'accéder, de corriger ou de supprimer leurs informations personnelles à tout moment en contactant notre équipe d'assistance."
      },
      conclusion: "Ride&Go Inc. s'engage à protéger vos informations personnelles tout en garantissant une expérience sécurisée sur notre plateforme.",
      contactInfo: {
        title: "Informations de Contact",
        text: "Pour toute question concernant vos informations personnelles, veuillez nous contacter à :",
        companyName: "Ride&Go Inc.",
        email: "Email : support@rideandgo.com",
        website: "Site Web : https://rideandgo.com"
      }
    }
  };

  const currentContent = locale === 'en' ? content.en : content.fr; // Sélection du contenu selon la langue

  return (
    <div className="bg-gradient-to-r from-blanc-casse to-blue-100 text-gray-800 p-6 md:p-10 lg:p-12 transition-all duration-300">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800 flex items-center justify-center">
        <FaShieldAlt className="inline-block mr-2 text-orange-500" />
        {currentContent.companyName}
      </h1>
      <p className="text-center text-gray-600 italic">{currentContent.effectiveDate}</p>
  
      <div className="border-b border-gray-300 mb-6"></div>
  
      <h2 className="text-2xl font-semibold mb-4 text-orange-600 text-center">
        {currentContent.introduction}
      </h2>
  
      {/* Section User Responsibilities */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600">
          {currentContent.userResponsibilities.title}
        </h2>
        <h3 className="text-lg font-semibold text-orange-500">{currentContent.userResponsibilities.accountability.title}</h3>
        <ul className="list-disc pl-6">
          {currentContent.userResponsibilities.accountability.points.map((point, index) => (
            <li key={index} className="mb-2 text-gray-700">{point}</li>
          ))}
        </ul>
        <p className="text-gray-700">{currentContent.userResponsibilities.respectfulConduct}</p>
        <p className="text-gray-700">{currentContent.userResponsibilities.compliance}</p>
      </div>
  
      <div className="border-b border-gray-300 my-6"></div>
  
      {/* Section Data Privacy */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600">{currentContent.handlingUserPrivacy.title}</h2>
  
        <h3 className="text-lg font-semibold text-orange-500">{currentContent.handlingUserPrivacy.collection.title}</h3>
        <p className="text-gray-700">{currentContent.handlingUserPrivacy.collection.text}</p>
  
        <h3 className="text-lg font-semibold">{currentContent.handlingUserPrivacy.use.title}</h3>
        <ul className="list-disc pl-6">
          {currentContent.handlingUserPrivacy.use.points.map((point, index) => (
            <li key={index} className="mb-2 text-gray-700">{point}</li>
          ))}
        </ul>
  
        <h3 className="text-lg font-semibold text-orange-500">{currentContent.handlingUserPrivacy.sharing.title}</h3>
        <p className="text-gray-700">{currentContent.handlingUserPrivacy.sharing.text}</p>
  
        <h3 className="text-lg font-semibold">{currentContent.handlingUserPrivacy.security.title}</h3>
        <p className="text-gray-700">{currentContent.handlingUserPrivacy.security.text}</p>
      </div>
  
      <div className="border-b border-gray-300 my-6"></div>
  
      {/* Section User Rights */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600">{currentContent.userRights.title}</h2>
        <p className="text-gray-700">{currentContent.userRights.text}</p>
      </div>
  
      <div className="border-b border-gray-300 my-6"></div>
  
      {/* Section Contact */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600">{currentContent.contactInfo.title}</h2>
        <p className="text-gray-700">{currentContent.contactInfo.text}</p>
        <p className="text-gray-700">{currentContent.contactInfo.companyName}</p>
        <p className="text-gray-700">{currentContent.contactInfo.email}</p>
        <p className="text-gray-700">{currentContent.contactInfo.website}</p>
      </div>
  
      <p className="mt-8 text-center text-lg text-gray-800 font-semibold">{currentContent.conclusion}</p>
    </div>
  );
  
};

export default PrivacyPolicy;