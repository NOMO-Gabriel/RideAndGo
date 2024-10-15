'use client';

import React, { useState, useEffect } from 'react';

interface Stat {
  label: string;
  value: number;
}

const statistics: Stat[] = [
  { label: 'Taxis', value: 100 },
  { label: 'Utilisateurs', value: 5000 },
  { label: 'Nombre de déplacements par jour', value: 120 },
];

const StatisticsSection: React.FC = () => {
  const [displayedStats, setDisplayedStats] = useState<number[]>([0, 0, 0]);
  const [explosionVisible, setExplosionVisible] = useState<boolean[]>([false, false, false]);

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
    <section className="py-16 bg-blanc-casse relative overflow-hidden">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-bleu-nuit mb-10">Statistiques Clés</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statistics.map((stat, idx) => (
            <div
              key={idx}
              className="relative p-8 bg-white shadow-lg rounded-lg transform transition-transform duration-500"
            >
              {/* Effet lumineux */}
              <div
                className={`absolute inset-0 rounded-lg z-0 transition-opacity duration-700 ease-out ${
                  explosionVisible[idx] ? 'opacity-100 bg-gradient-to-r from-orange-400 to-yellow-300 blur-md' : 'opacity-0'
                }`}
              ></div>

              <div className="relative z-10">
                <div className="text-bleu-nuit text-6xl font-extrabold mb-2">
                  {displayedStats[idx]}+
                </div>
                <p className="mt-2 text-gray-600 text-lg font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Effet d'éclat lumineux global */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
    </section>
  );
};

export default StatisticsSection;
