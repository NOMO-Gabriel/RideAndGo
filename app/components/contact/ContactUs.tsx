'use client';

import React, { useState } from 'react';
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import Image from 'next/image';

const ContactUs: React.FC = () => {
  const { locale } = useLocale();

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
    setSuccessMessage(content[locale].form.successMessage);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gradient-to-r from-blanc-casse to-blue-100 min-h-screen p-10 flex flex-col justify-center items-center">
      {/* Titre de la page */}
      <h1 className="text-5xl font-bold text-center text-blue-700 mb-6 animate__animated animate__fadeIn">
        {content[locale].title}
      </h1>
      <p className="text-lg text-center mb-12 text-blue-600 animate__animated animate__fadeIn">
        {content[locale].subtitle}
      </p>

      {/* Informations de contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate__animated animate__fadeIn w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
            <FaMapMarkerAlt className="inline-block mr-3 text-blue-500" />
            {content[locale].contactInfo.address}
          </h2>
          <p className="text-lg text-orange-btn">123 Ride&Go Lane, City, Country</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
            <FaPhone className="inline-block mr-3 text-blue-500" />
            {content[locale].contactInfo.phone}
          </h2>
          <p className="text-lg text-orange-btn">+123 456 7890</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
            <FaEnvelope className="inline-block mr-3 text-blue-500" />
            {content[locale].contactInfo.email}
          </h2>
          <p className="text-lg text-orange-btn">support@rideandgo.com</p>
        </div>
      </div>

      {/* Formulaire de contact */}
      <form className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md animate__animated animate__fadeIn" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Contact Form</h2>
        
        {/* Champ Nom */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="name">{content[locale].form.name}</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>

        {/* Champ Email */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="email">{content[locale].form.email}</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>

        {/* Champ Message */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="message">{content[locale].form.message}</label>
          <textarea 
            name="message" 
            id="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:border-blue-500 text-lg" 
            rows={5}
          ></textarea>
        </div>

        {/* Bouton d'envoi */}
        <button 
          type="submit" 
          className="bg-blue-600 text-white text-lg px-6 py-3 rounded w-full hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
        >
          <FaPaperPlane className="mr-2" />
          {content[locale].form.submit}
        </button>
      </form>

      {/* Message de succès */}
      {successMessage && (
        <p className="text-green-600 mt-6 text-lg font-semibold animate__animated animate__fadeIn">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default ContactUs;
