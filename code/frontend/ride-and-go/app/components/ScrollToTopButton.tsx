// components/ScrollToTopButton.tsx
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300); // Afficher le bouton si on a scrollé plus de 300px
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`fixed bottom-10 right-10 bg-orange-btn text-white px-8 py-8 rounded-full shadow-lg transition-all duration-300 ${showTopBtn ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top" // 
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
