'use client';
import React, { useState } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons';

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  senderName: string;
}

interface Conversation {
  id: number;
  userId: number;
  userName: string;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

// Données mockées pour les conversations
const mockConversations: Conversation[] = [
  {
    id: 1,
    userId: 2,
    userName: "Thomas manga",
    lastMessage: "Je serai là dans 5 minutes",
    unreadCount: 2,
    messages: [
      {
        id: 1,
        senderId: 2,
        receiverId: 1,
        content: "Bonjour, je suis intéressé par votre trajet Yaoundé-Douala",
        timestamp: "09:30",
        senderName: "Thomas manga"
      },
      {
        id: 2,
        senderId: 1,
        receiverId: 2,
        content: "Bien sûr ! Je pars à 14h de Yaoundé",
        timestamp: "09:35",
        senderName: "Vous"
      },
      {
        id: 3,
        senderId: 2,
        receiverId: 1,
        content: "Super ! Je serai là dans 5 minutes",
        timestamp: "09:40",
        senderName: "Thomas manga"
      }
    ]
  },
  {
    id: 2,
    userId: 3,
    userName: "Marie Fotso",
    lastMessage: "Merci beaucoup !",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        senderId: 3,
        receiverId: 1,
        content: "Salut, est-ce que la place est toujours disponible ?",
        timestamp: "Hier",
        senderName: "Marie Fotso"
      },
      {
        id: 2,
        senderId: 1,
        receiverId: 3,
        content: "Oui, toujours disponible !",
        timestamp: "Hier",
        senderName: "Vous"
      },
      {
        id: 3,
        senderId: 3,
        receiverId: 1,
        content: "Merci beaucoup !",
        timestamp: "Hier",
        senderName: "Marie Fotso"
      }
    ]
  },
  {
    id: 3,
    userId: 4,
    userName: "Samuel Dang",
    lastMessage: "D'accord pour demain alors",
    unreadCount: 1,
    messages: [
      {
        id: 1,
        senderId: 4,
        receiverId: 1,
        content: "Bonjour, vous passez par le centre-ville ?",
        timestamp: "Hier",
        senderName: "Samuel Dang"
      },
      {
        id: 2,
        senderId: 1,
        receiverId: 4,
        content: "Oui, je passe par le marché central",
        timestamp: "Hier",
        senderName: "Vous"
      },
      {
        id: 3,
        senderId: 4,
        receiverId: 1,
        content: "D'accord pour demain alors",
        timestamp: "Hier",
        senderName: "Samuel Dang"
      }
    ]
  }
];

export default function Chat() {
  const { locale } = useLocale();
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const content = {
    en: {
      title: 'Messages',
      placeholder: 'Type your message...',
      send: 'Send',
      noConversation: 'Select a conversation to start chatting',
    },
    fr: {
      title: 'Messages',
      placeholder: 'Tapez votre message...',
      send: 'Envoyer',
      noConversation: 'Sélectionnez une conversation pour commencer à discuter',
    },
  };

  const localizedText = content[locale as 'fr' | 'en'] || content.en;

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: Date.now(),
      senderId: 1,
      receiverId: selectedConversation.userId,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderName: "Vous"
    };

    setSelectedConversation(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, newMsg],
        lastMessage: newMessage
      };
    });

    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-200px)] bg-white rounded-lg shadow-lg">
      {/* Liste des conversations */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">{localizedText.title}</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {conversations.map(conversation => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedConversation?.id === conversation.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{conversation.userName}</h3>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zone de conversation */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b">
              <h2 className="font-semibold">{selectedConversation.userName}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 1 ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.senderId === 1
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={localizedText.placeholder}
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            {localizedText.noConversation}
          </div>
        )}
      </div>
    </div>
  );
}
