import React from 'react';
import { ContactConfig, Message } from '../types';
import { Phone, Video, Info, Smile, Image, Mic, ThumbsUp } from 'lucide-react';

interface FacebookPreviewProps {
  contact: ContactConfig;
  messages: Message[];
}

export const FacebookPreview: React.FC<FacebookPreviewProps> = ({ contact, messages }) => {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center space-x-3">
        <img
          src={contact.photo || 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150'}
          alt={contact.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{contact.name || 'Usuário'}</h3>
          <p className="text-xs text-gray-500">{contact.status}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Phone size={20} className="text-blue-600" />
          <Video size={20} className="text-blue-600" />
          <Info size={20} className="text-blue-600" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 ${message.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
              {message.sender === 'contact' && (
                <img
                  src={contact.photo}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.sender === 'me'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                {message.reaction && (
                  <div className="mt-1 text-xs">{message.reaction}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 flex items-center space-x-3">
        <Image size={20} className="text-blue-600" />
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Digite uma mensagem..."
            className="flex-1 outline-none text-sm bg-transparent"
            readOnly
          />
          <Smile size={16} className="text-gray-500" />
        </div>
        <Mic size={20} className="text-blue-600" />
        <ThumbsUp size={20} className="text-blue-600" />
      </div>
    </div>
  );
};