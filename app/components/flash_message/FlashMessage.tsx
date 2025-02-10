import { FC, useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';

interface FlashMessageType {
  msg: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const FlashMessage: FC = () => {
  const { message } = useFlashMessage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!message) return;

    setIsVisible(true); // Show message when updated
    const timer = setTimeout(() => {
      setIsVisible(false); // Hide after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [message]);

  if (!message || !isVisible) return null;

  const getMessageIcon = (type: FlashMessageType['type']) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500 text-4xl" />;
      case 'error':
        return <FaTimesCircle className="text-red-500 text-4xl" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500 text-4xl" />;
      default:
        return <FaInfoCircle className="text-blue-500 text-4xl" />;
    }
  };

  const getMessageStyle = (type: FlashMessageType['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-800';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-800';
    }
  };

  return (
    <div
      className={`fixed sm:top-4 sm:right-4 top-2 right-2 p-3 sm:p-4 rounded shadow-lg 
      flex items-center transition-all duration-500 max-w-[calc(100%-1rem)] sm:max-w-md
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'} 
      ${getMessageStyle(message.type)} z-50`}
    >
      <div className="flex-shrink-0">
        {getMessageIcon(message.type)}
      </div>
      <div className="border-l-2 border-gray-300 mx-2 sm:mx-3 h-6"></div>
      <span className="flex-1 text-sm sm:text-base break-words">
        {message.msg}
      </span>
    </div>
  );
}  
export default FlashMessage;
