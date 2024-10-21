'use client';

import React, { useState } from 'react';
import { useLocale } from "@/app/utils/hooks/useLocale.js"; // Hook pour gérer la langue
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'; // Icônes pour les sections
import Image from 'next/image'; // Pour intégrer des images

const ContactUs: React.FC = () => {
  const { locale } = useLocale(); // Utilisation du hook pour obtenir la langue actuelle

  // Contenu multilingue
  const content = {
    en: {
      title: "Get in Touch with Us",
      subtitle: "We'd love to hear from you!",
      contactInfo: {
        address: "Our Address",
        phone: "Phone Number",
        email: "Email Address"
      },
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        submit: "Send Message",
        successMessage: "Thank you for reaching out! We'll get back to you soon."
      }
    },
    fr: {
      title: "Contactez-nous",
      subtitle: "Nous serions ravis de vous entendre !",
      contactInfo: {
        address: "Notre Adresse",
        phone: "Numéro de Téléphone",
        email: "Adresse Email"
      },
      form: {
        name: "Votre Nom",
        email: "Votre Email",
        message: "Votre Message",
        submit: "Envoyer le Message",
        successMessage: "Merci de nous avoir contactés ! Nous reviendrons vers vous bientôt."
      }
    }
  };

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler un envoi de formulaire
    setSuccessMessage(content[locale].form.successMessage);
    setFormData({ name: '', email: '', message: '' }); // Réinitialiser le formulaire
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 min-h-screen p-6 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-4 animate__animated animate__fadeIn">
        {content[locale].title}
      </h1>
      <p className="text-lg text-center mb-8 text-blue-600 animate__animated animate__fadeIn">
        {content[locale].subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate__animated animate__fadeIn">
        <div className="bg-blanc-casse shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            <FaMapMarkerAlt className="inline mr-2" />
            {content[locale].contactInfo.address}
          </h2>
          <p className="text-lg text-gray-600">123 Ride&Go Lane, City, Country</p>
        </div>
        <div className="bg-blanc-casse shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            <FaPhone className="inline mr-2" />
            {content[locale].contactInfo.phone}
          </h2>
          <p className="text-lg text-gray-600">+123 456 7890</p>
        </div>
        <div className="bg-blanc-casse shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            <FaEnvelope className="inline mr-2" />
            {content[locale].contactInfo.email}
          </h2>
          <p className="text-lg text-gray-600">support@rideandgo.com</p>
        </div>
      </div>

      <form className="bg-blanc-casse shadow-lg rounded-lg p-8 w-full max-w-md animate__animated animate__fadeIn" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">Contact Form</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">{content[locale].form.name}</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">{content[locale].form.email}</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="message">{content[locale].form.message}</label>
          <textarea 
            name="message" 
            id="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500" 
            rows={4}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300 flex items-center"
        >
          <FaPaperPlane className="mr-2" />
          {content[locale].form.submit}
        </button>
      </form>

      {successMessage && <p className="text-green-600 mt-4 font-semibold animate__animated animate__fadeIn">{successMessage}</p>}
    </div>
  );
};

export default ContactUs;
