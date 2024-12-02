import React, { useState, useEffect } from 'react';

interface ConfirmationMessagePropos {
  icon: JSX.Element;
  message: string;
  timeout?: number;
}

const ConfirmationMessage: React.FC<ConfirmationMessagePropos> = ({ icon, message, timeout = 2000 }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);

    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [timeout]);

  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 0.5s ease-in-out',
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? 'auto' : 'none',
  };

  return (
    <div style={popupStyle}>
      {icon}
      <p>{message}</p>
    </div>
  );
};

export default ConfirmationMessage;