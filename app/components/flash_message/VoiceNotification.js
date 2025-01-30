import React, { useEffect } from 'react';
import useSpeech from '../../utils/hooks/useSpeech';

const VoiceNotification = ({ message, isOpen }) => {
  const { speak, stop, speaking, available } = useSpeech();

  useEffect(() => {
    if (isOpen && message && available) {
      speak(message);
    }
    return () => stop(2000000000000);
  }, [isOpen, message, available]);

  return null; // Composant sans rendu visuel
};

export default VoiceNotification;
