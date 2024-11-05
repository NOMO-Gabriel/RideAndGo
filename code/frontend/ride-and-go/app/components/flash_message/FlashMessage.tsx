import { FC } from 'react';
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineWarning, AiOutlineCloseCircle } from 'react-icons/ai';
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage'; 
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

interface FlashMessageType {
  msg: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const FlashMessage: FC = () => {
  const { message } = useFlashMessage();

  if (!message) return null;

  // Utilisation de l'interface `FlashMessage` pour typer la prop `message`
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
      className={`fixed top-4 right-4 p-4 rounded shadow-lg flex items-center ${getMessageStyle(message.type)} z-50`}
    >
      {getMessageIcon(message.type)}
      <div className='border-l-2 border-gray-300 mx-3 h-6'></div>
      <span className='flex-1'>{message.msg}</span>
    </div>
  );
};

export default FlashMessage;
