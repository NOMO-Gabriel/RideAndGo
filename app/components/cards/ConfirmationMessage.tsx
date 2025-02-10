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

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      bg-blue-500 text-white p-4 md:p-5 rounded-md shadow-lg transition-all duration-500 
      ease-in-out max-w-[90%] md:max-w-md ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center space-x-2 md:space-x-3">
        <span className="text-base md:text-lg">{icon}</span>
        <p className="text-sm md:text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};
export default ConfirmationMessage;
