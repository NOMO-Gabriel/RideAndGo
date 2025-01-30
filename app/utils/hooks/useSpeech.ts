import { useState, useEffect } from "react";

const useSpeech = () => {
  const [speech, setSpeech] = useState(null);
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const speechSynthesis = window.speechSynthesis;
      setSpeech(speechSynthesis);
      console.log("Speech synthesis initialized:", speech); // Debugging

      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        console.log("Available voices:", availableVoices); // Debugging
        setVoices(availableVoices.filter((voice) => voice.lang.includes("fr")));
      };

      speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  const speak = (text) => {
    console.log("Speaking text:", text); // Debugging

    if (speech && voices.length > 0) {
      speech.cancel(); // Stop any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices[0] || null; // Use first available voice
      utterance.rate = 1.0; // Normal speed
      utterance.pitch = 1.0; // Normal pitch
      utterance.volume = 1.0; // Full volume

      utterance.onstart = () => {
        console.log("Speech started");
        setSpeaking(true);
      };

      utterance.onend = () => {
        console.log("Speech ended");
        setSpeaking(false);
      };

      utterance.onerror = (e) => {
        console.error("Speech error:", e);
        setSpeaking(false);
      };

      speech.speak(utterance);
    } else {
      console.warn("No speech synthesis available or voices not loaded yet.");
    }
  };

  const stop = (delay = 2000000000000000000) => {
    if (speech) {
      console.log(`Stopping speech in ${delay / 1000} seconds...`);
  
      setTimeout(() => {
        speech.cancel();
        setSpeaking(false);
        console.log("Speech stopped");
      }, delay);
    }
  };
  

  return {
    speak,
    stop,
    speaking,
    available: speech !== null && voices.length > 0,
  };
};

export default useSpeech;
