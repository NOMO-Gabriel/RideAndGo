'use client';

import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";

const FlashMessage = ({ type, message }) => {
    var icon, style;

    switch(type){
        case 'success':
            icon = <FaCheckCircle className="text-green-500 text-4xl" />;
            style = 'bg-green-100 border-green-400 text-green-700';
            break;
        case 'error':
            icon = <FaTimesCircle className="text-red-500 text-4xl" />;
            style = 'bg-red-100 border-red-400 text-red-700';
            break;
        case 'info':
            icon = <FaInfoCircle className="text-blue-500 text-4xl" />;
            style = 'bg-blue-100 border-blue-400 text-blue-700';
            break;
        default:
            icon = <FaInfoCircle className="text-gray-500 text-4xl" />;
            style = 'bg-gray-100 border-gray-400 text-gray-700';         
    }

    return(
        <div className={'flex items-center p-4 border-l-4 ' + style + ' rounded-lg'}>
            {icon}
            <div className="border-l-2 border-gray-300 mx-3 h-6"></div>
            <span className="flex-1">{message}</span>
        </div>
    )
}

export default FlashMessage;