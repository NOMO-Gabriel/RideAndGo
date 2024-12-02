'use client';

import React from 'react';
import { FaRoad } from 'react-icons/fa'; // Icône pour le logo
import Image from 'next/image'; // Pour intégrer des images facilement
import Link from 'next/link'; // Pour les liens internes
import { useLocale } from "@/app/utils/hooks/useLocale.js"; // Hook pour la gestion de la langue

const AboutUs: React.FC = () => {
  const { locale } = useLocale(); // Utilisation du hook pour obtenir la langue actuelle

  // Contenu multilingue
  const content = {
    en: {
      heroTitle: "About Ride&Go",
      heroText: "At Ride&Go, we don't just move people, we move lives forward. Join us in making every ride count!",
      missionTitle: "Our Mission",
      missionText: "Our mission is to revolutionize the transportation industry by connecting travelers with professional drivers who prioritize safety, responsibility, and service excellence. Every trip with Ride&Go contributes to a better future where every journey is meaningful.",
      visionTitle: "Our Vision",
      visionText: "We envision a world where transportation is not just about reaching a destination but enhancing lives through safe and reliable services. Our goal is to be the most trusted transportation partner for our users, empowering them to explore the world with confidence.",
      historyTitle: "Our History",
      historyText: "Founded in 2020, Ride&Go was born out of a passion for providing high-quality transportation solutions. Over the years, we have grown from a small startup to a leading player in the industry, serving thousands of satisfied customers every day.",
      valuesTitle: "Our Values",
      values: [
        {
          title: "Safety First",
          text: "Every ride is a responsibility. Our drivers are committed to safe and secure trips, ensuring peace of mind for our clients."
        },
        {
          title: "Professionalism",
          text: "We work only with certified, highly trained drivers who uphold the highest standards of professional service and ethical conduct."
        },
        {
          title: "Community Impact",
          text: "Ride&Go contributes to local communities by ensuring ethical transportation practices and giving back a portion of our earnings to support safety initiatives."
        },
        {
          title: "Innovation",
          text: "We continuously strive to improve our services by embracing technology and innovation, ensuring our users receive the best experience possible."
        },
        {
          title: "Sustainability",
          text: "We are committed to reducing our carbon footprint by promoting eco-friendly practices within our operations and encouraging the use of sustainable transportation options."
        }
      ],
      teamTitle: "Meet Our Team",
      teamText: "Our team is comprised of passionate professionals dedicated to providing the best service. We believe in collaboration, innovation, and respect, ensuring that our company culture reflects our commitment to excellence.",
      callToActionTitle: "Join Us on This Journey",
      callToActionText: "Whether you're a passenger, a driver, or someone looking to make an impact in your community, Ride&Go is the platform for you. Let's make every journey count.",
      callToActionButton: "Get Started"
    },
    fr: {
      heroTitle: "À propos de Ride&Go",
      heroText: "Chez Ride&Go, nous ne faisons pas que transporter des gens, nous faisons avancer des vies. Rejoignez-nous pour rendre chaque trajet important !",
      missionTitle: "Notre Mission",
      missionText: "Notre mission est de révolutionner l'industrie du transport en connectant les voyageurs avec des chauffeurs professionnels qui priorisent la sécurité, la responsabilité et l'excellence du service. Chaque trajet avec Ride&Go contribue à un avenir meilleur où chaque voyage est significatif.",
      visionTitle: "Notre Vision",
      visionText: "Nous envisageons un monde où le transport ne se limite pas à atteindre une destination, mais à améliorer les vies grâce à des services sûrs et fiables. Notre objectif est d'être le partenaire de transport le plus fiable pour nos utilisateurs, leur permettant d'explorer le monde en toute confiance.",
      historyTitle: "Notre Histoire",
      historyText: "Fondée en 2020, Ride&Go est née d'une passion pour fournir des solutions de transport de haute qualité. Au fil des ans, nous sommes passés d'une petite startup à un acteur majeur de l'industrie, servant des milliers de clients satisfaits chaque jour.",
      valuesTitle: "Nos Valeurs",
      values: [
        {
          title: "Sécurité avant tout",
          text: "Chaque trajet est une responsabilité. Nos chauffeurs s'engagent à assurer des trajets sûrs et sécurisés, garantissant la tranquillité d'esprit de nos clients."
        },
        {
          title: "Professionnalisme",
          text: "Nous travaillons uniquement avec des chauffeurs certifiés et hautement qualifiés qui respectent les normes les plus élevées de service professionnel et de conduite éthique."
        },
        {
          title: "Impact Communautaire",
          text: "Ride&Go contribue aux communautés locales en assurant des pratiques de transport éthiques et en redistribuant une partie de nos bénéfices pour soutenir des initiatives de sécurité."
        },
        {
          title: "Innovation",
          text: "Nous nous efforçons en permanence d'améliorer nos services en adoptant la technologie et l'innovation, garantissant à nos utilisateurs la meilleure expérience possible."
        },
        {
          title: "Durabilité",
          text: "Nous sommes engagés à réduire notre empreinte carbone en promouvant des pratiques écologiques au sein de nos opérations et en encourageant l'utilisation d'options de transport durables."
        }
      ],
      teamTitle: "Rencontrez notre Équipe",
      teamText: "Notre équipe est composée de professionnels passionnés dédiés à fournir le meilleur service. Nous croyons en la collaboration, l'innovation et le respect, garantissant que notre culture d'entreprise reflète notre engagement envers l'excellence.",
      callToActionTitle: "Rejoignez-nous dans cette aventure",
      callToActionText: "Que vous soyez passager, chauffeur, ou quelqu'un cherchant à avoir un impact dans votre communauté, Ride&Go est la plateforme qu'il vous faut. Faisons en sorte que chaque voyage compte.",
      callToActionButton: "Commencer"
    }
  };

  const currentContent = locale === 'en' ? content.en : content.fr; // Sélection du contenu selon la langue

  return (
    <div className="bg-blanc-casse text-bleu-nuit">
      {/* Section Hero */}
      <section className="relative bg-bleu-nuit text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center mb-4">
            <FaRoad className="text-6xl text-orange-btn" />
            <h1 className="text-5xl font-bold ml-4">{currentContent.heroTitle}</h1>
          </div>
          <p className="text-lg font-bold  mt-2">{currentContent.heroText}</p>
        </div>
      </section>

      {/* Section Mission */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-center">{currentContent.missionTitle}</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">{currentContent.missionText}</p>
        </div>
      </section>

        {/* Section Values */}
        <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10">{currentContent.valuesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {currentContent.values.map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="text-2xl font-bold text-orange-btn mb-4">{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
         {/* Section History */}
         <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-center">{currentContent.historyTitle}</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">{currentContent.historyText}</p>
        </div>
      </section>


      {/* Section Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-center">{currentContent.visionTitle}</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">{currentContent.visionText}</p>
        </div>
      </section>

   
    

      {/* Section Our Team */}
      <section className="py-16 bg-blanc-casse">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">{currentContent.teamTitle}</h2>
          <p className="text-lg mb-8">{currentContent.teamText}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src="" // Placeholder image, replace with actual image path
                alt="Team Member 1"
                width={200}
                height={200}
                className="mx-auto rounded-full"
              />
              <h3 className="text-2xl font-bold mt-4">Thomas Djotio Ndié</h3>
              <p className="text-lg text-orange-btn">CEO & Founder</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src="" // Placeholder image, replace with actual image path
                alt="Team Member 2"
                width={200}
                height={200}
                className="mx-auto rounded-full"
              />
              <h3 className="text-2xl font-bold mt-4">Bernabé Batchkui</h3>
              <p className="text-lg text-orange-btn">Head of Training</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src="" // Placeholder image, replace with actual image path
                alt="Team Member 3"
                width={200}
                height={200}
                className="mx-auto rounded-full"
              />
              <h3 className="text-2xl font-bold mt-4">Jean Yves Etougue</h3>
              <p className="text-lg text-orange-btn">Lead Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Call to Action */}
      <section className="relative bg-bleu-nuit text-white py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold">{currentContent.callToActionTitle}</h2>
          <p className="text-lg mt-4">{currentContent.callToActionText}</p>
          <Link href="/sign-up" className="inline-block bg-orange-btn text-white px-6 py-3 mt-6 rounded-lg shadow-lg hover:bg-white hover:text-orange-btn transition-all duration-300">
            {currentContent.callToActionButton}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
