'use client';

import React, { useState } from 'react';
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import Image from 'next/image';

type Locale = 'en' | 'fr';

const content: Record<Locale, {
  title: string;
  subtitle: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  form: {
    name: string;
    email: string;
    message: string;
    submit: string;
    successMessage: string;
  };
}> = {
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

const ContactUs: React.FC = () => {
  const { locale } = useLocale();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const currentContent = locale==='en'? content.en:content.fr;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(currentContent.form.successMessage);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gradient-to-r from-blanc-casse to-blue-100 min-h-screen p-10 flex flex-col justify-center items-center">
      {/* Votre code existant */}
    </div>
  );
};

export default ContactUs;
