import React, { useState, forwardRef, useImperativeHandle } from "react";
import VoiceNotification from "./VoiceNotification";
import useSpeech from '../../utils/hooks/useSpeech';


const NotificationManager = forwardRef((props, ref) => {
  const [notifications, setNotifications] = useState([]);
  const { speak } = useSpeech(); // Hook to read the notification

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      isOpen: true,
    };

    setNotifications((prev) => [...prev, newNotification]);
    speak(message); // Trigger speech synthesis

    // Auto-close notification after 5 seconds
    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === newNotification.id ? { ...notif, isOpen: false } : notif
        )
      );
    }, 5000);
  };

  // Expose the addNotification method to parent component via ref
  useImperativeHandle(ref, () => ({
    addNotification,
  }));

  return (
    <div>
      {notifications.map((notification) => (
        <VoiceNotification
          key={notification.id}
          message={notification.message}
          isOpen={notification.isOpen}
        />
      ))}
    </div>
  );
});

export default NotificationManager;
