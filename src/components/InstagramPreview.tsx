import React from 'react';
import { ContactConfig, Message } from '../types';
import { Phone, Video, Info, Heart, Smile, Camera, Mic, Image } from 'lucide-react';

interface InstagramPreviewProps {
  contact: ContactConfig;
  messages: Message[];
}

export const InstagramPreview: React.FC<InstagramPreviewProps> = ({ contact, messages }) => {
  return (
    <div className="h-full bg-black flex flex-col">
      {/* Header */}
      <div className="bg-black p-4 flex items-center space-x-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
        </svg>
        <div className="bg-white bg-opacity-20 rounded-full px-2 py-1">
          <span className="text-white text-sm font-medium">4</span>
        </div>
        <img
          src={contact.photo || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'}
          alt={contact.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-1">
            <h3 className="font-medium text-white text-base">{contact.name || 'Usuário'}</h3>
            {contact.verified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400">{contact.status}</p>
        </div>
        <div className="flex items-center space-x-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="currentColor"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-black">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 ${message.sender === 'me' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
              {message.sender === 'contact' && (
                <img
                  src={contact.photo}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover mb-1"
                />
              )}
              <div
                className={`max-w-xs px-4 py-3 ${
                  message.sender === 'me'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl rounded-br-lg'
                    : 'bg-gray-800 text-white rounded-3xl rounded-bl-lg'
                }`}
                style={{
                  borderRadius: message.sender === 'me' 
                    ? '24px 24px 8px 24px' 
                    : '24px 24px 24px 8px'
                }}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-black p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Camera size={20} className="text-white" />
        </div>
        <div className="flex-1 bg-gray-800 rounded-full px-5 py-3 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Enviar mensagem..."
            className="flex-1 outline-none text-sm bg-transparent text-white placeholder-gray-400"
            readOnly
          />
          <Smile size={18} className="text-gray-400" />
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
  );
};