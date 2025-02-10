'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';

interface Stat {
  label: { en: string; fr: string }; // Ajouter des traductions pour chaque étiquette
  value: number;
}

const statistics: Stat[] = [
  { label: { en: 'Taxis', fr: 'Taxis' }, value: 100 },
  { label: { en: 'Users', fr: 'Utilisateurs' }, value: 5000 },
  { label: { en: 'Daily Rides', fr: 'Nombre de déplacements par jour' }, value: 120 },
];

const StatisticsSection: React.FC = () => {
  const [displayedStats, setDisplayedStats] = useState<number[]>([0, 0, 0]);
  const [explosionVisible, setExplosionVisible] = useState<boolean[]>([false, false, false]);
  const { locale } = useLocale(); // Retirer changeLocale car pas utilisé ici

  useEffect(() => {
    let animationRunning = true; // Pour garder la boucle active
    const animateStatistics = () => {
      statistics.forEach((stat, idx) => {
        let start = 0;
        const duration = 5000; // Durée de l'animation de comptage en millisecondes
        const startTime = performance.now();

        const animateCount = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const currentCount = Math.floor(stat.value * progress);
          setDisplayedStats((prevStats) => {
            const newStats = [...prevStats];
            newStats[idx] = currentCount;
            return newStats;
          });

          if (progress < 1) {
            requestAnimationFrame(animateCount);
          } else {
            // Montre l'effet lumineux une fois que le chiffre final est atteint
            setExplosionVisible((prevExplosions) => {
              const newExplosions = [...prevExplosions];
              newExplosions[idx] = true;
              return newExplosions;
            });

            // Efface l'explosion après un court moment
            setTimeout(() => {
              setExplosionVisible((prevExplosions) => {
                const newExplosions = [...prevExplosions];
                newExplosions[idx] = false;
                return newExplosions;
              });

              if (idx === statistics.length - 1 && animationRunning) {
                // Redémarre l'animation après 3 secondes d'attente
                setTimeout(() => {
                  setDisplayedStats([0, 0, 0]); // Réinitialise les statistiques à 0
                  animateStatistics(); // Redémarre l'animation
                }, 3000); // Délai de 3 secondes avant de recommencer
              }
            }, 1000); // Durée de l'explosion lumineuse (1 seconde)
          }
        };

        // Déclenche l'animation pour chaque statistique avec un délai
        setTimeout(() => {
          requestAnimationFrame(animateCount);
        }, idx * 500); // Décalage pour que les animations ne commencent pas toutes en même temps
      });
    };

    // Lancer l'animation initiale
    animateStatistics();

    return () => {
      animationRunning = false; // Arrête la boucle si le composant est démonté
    };
  }, []);

  

  return (
<<<<<<< HEAD
    <section className="relative py-6 sm:py-10 md:py-16 bg-blanc-casse overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-bleu-nuit 
                       mb-6 sm:mb-8 md:mb-10 
                       tracking-tight">
          {locale === 'en' ? 'Key Statistics' : 'Statistiques Clés'}
        </h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                        gap-4 sm:gap-6 lg:gap-8 
                        mx-auto max-w-6xl">
          {statistics.map((stat, idx) => (
            <div
              key={idx}
              className="relative p-4 sm:p-6 md:p-8 
                         bg-white shadow-lg rounded-lg 
                         transform transition-all duration-500 ease-out
                         hover:scale-105 hover:shadow-xl
                         flex flex-col items-center justify-center
                         min-h-[200px] sm:min-h-[220px] md:min-h-[240px]"
            >
              {/* Effet lumineux amélioré */}
=======
    <section className="py-12 sm:py-16 bg-blanc-casse relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-bleu-nuit mb-8 sm:mb-10">
          {locale === 'en' ? 'Key Statistics' : 'Statistiques Clés'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {statistics.map((stat, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 bg-white shadow-lg rounded-lg transform transition-transform duration-500"
            >
>>>>>>> origin/folongtz
              <div
                className={`absolute inset-0 rounded-lg z-0 
                           transition-all duration-700 ease-out
                           ${
                             explosionVisible[idx] 
                             ? 'opacity-100 scale-105 bg-gradient-to-r from-orange-400/60 to-yellow-300/60 blur-lg' 
                             : 'opacity-0 scale-100'
                           }`}
              ></div>
<<<<<<< HEAD
  
              {/* Contenu */}
              <div className="relative z-10 w-full">
                <div className="text-center text-6xl sm:text-7xl md:text-7xl 
                              font-extrabold text-bleu-nuit 
                              mb-2 sm:mb-3 md:mb-4
                              transition-all duration-300
                              hover:text-bleu-nuit/90">
                  {displayedStats[idx]}
                  <span className="text-orange-500">+</span>
                </div>
  
                <p className="text-center text-base sm:text-xl md:text-2xl 
                            font-medium text-gray-600
                            max-w-[250px] mx-auto
                            line-height-relaxed">
=======
              <div className="relative z-10">
                <div className="text-bleu-nuit text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-2">
                  {displayedStats[idx]}+
                </div>
                <p className="mt-2 text-gray-600 text-base sm:text-lg font-medium">
>>>>>>> origin/folongtz
                  {locale === 'en' ? stat.label.en : stat.label.fr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
<<<<<<< HEAD
  
      {/* Effets d'arrière-plan améliorés */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Effet de pulse principal */}
        <div className="absolute inset-0 
                      bg-gradient-radial from-transparent via-white to-transparent 
                      opacity-20 animate-pulse"></div>
        
        {/* Effet supplémentaire pour plus de profondeur */}
        <div className="absolute inset-0 
                      bg-gradient-to-b from-transparent via-white/5 to-transparent 
                      animate-floating"></div>
      </div>
=======
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
>>>>>>> origin/folongtz
    </section>
  );
}

export default StatisticsSection;
