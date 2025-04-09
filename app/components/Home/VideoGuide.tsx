'use client';

import { useState, useRef, useEffect } from 'react';

interface Video {
  id: number;
  title: string;
  description: string;
  src: string;
  icon: string;
}

const VideoGuide = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null)
  ];
  
  const videos: Video[] = [
    {
      id: 0,
      title: "Calculateur de tarif",
      description: "Apprenez à utiliser notre calculateur de tarif pour estimer le coût de votre trajet",
      src: "/videos/test1.mp4", // Remplacez par le chemin vers votre vidéo
      icon: "💰"
    },
    {
      id: 1,
      title: "Publier une offre",
      description: "Découvrez comment publier une offre de trajet en tant que passager",
      src: "/videos/test2.mp4", // Remplacez par le chemin vers votre vidéo
      icon: "📝"
    },
    {
      id: 2,
      title: "Collecter des clients",
      description: "Guide pour les chauffeurs: comment trouver et collecter des clients",
      src: "/videos/test1.mp4", // Remplacez par le chemin vers votre vidéo
      icon: "🚗"
    }
  ];

  const handleVideoSelect = (index:number) => {
    setActiveVideo(index);
    // Pause toutes les vidéos
    videoRefs.forEach((ref, i) => {
      if (ref.current) {
        if (i === index) {
          ref.current.play().catch(e => console.log("Autoplay prevented:", e));
        } else {
          ref.current.pause();
        }
      }
    });
  };

  // Jouer automatiquement la première vidéo au chargement
  useEffect(() => {
    if (videoRefs[activeVideo].current) {
      videoRefs[activeVideo].current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [activeVideo]);

  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0A1433]">
          How to use Ride&Go
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* La vidéo principale */}
          <div className="w-full lg:w-2/3 rounded-xl overflow-hidden shadow-2xl bg-white">
            <div className="relative pt-[56.25%]">
              {videos.map((video, index) => (
                <video
                  key={video.id}
                  ref={videoRefs[index]}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${index === activeVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  src={video.src}
                  controls
                  loop
                  playsInline
                  preload="metadata"
                >
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
              ))}
            </div>
          </div>
          
          {/* Sélecteur de vidéos */}
          <div className="w-full lg:w-1/3 space-y-4">
            {videos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => handleVideoSelect(index)}
                className={`flex items-center p-5 rounded-lg cursor-pointer transition-all duration-300 ${
                  index === activeVideo 
                    ? 'bg-[#0A1433] text-white scale-105 shadow-lg' 
                    : 'bg-white text-[#0A1433] hover:bg-gray-100 shadow'
                }`}
              >
                <div className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full text-2xl ${
                  index === activeVideo 
                    ? 'bg-[#FF7D00] text-white' 
                    : 'bg-gray-100 text-[#0A1433]'
                }`}>
                  {video.icon}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">{video.title}</h3>
                  <p className={`text-sm ${index === activeVideo ? 'text-gray-200' : 'text-gray-500'}`}>
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoGuide;