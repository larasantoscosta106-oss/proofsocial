import React from 'react';
import { ContactConfig, Message } from '../types';

interface InstagramPreviewProps {
  contact: ContactConfig;
  messages: Message[];
}

export const InstagramPreview: React.FC<InstagramPreviewProps> = ({ contact, messages }) => {
  return (
    <div className="h-full bg-black flex flex-col text-white">
      {/* Header */}
      <div className="bg-black p-4 flex items-center space-x-3">
        {/* Back arrow */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
        </svg>
        
        {/* Badge with number */}
        <div className="bg-white bg-opacity-20 rounded-full px-2 py-1 min-w-[24px] h-6 flex items-center justify-center">
          <span className="text-white text-sm font-medium">4</span>
        </div>
        
        {/* Profile image and info */}
        <img
          src={contact.photo || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'}
          alt={contact.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-1">
            <h3 className="font-semibold text-white">{contact.name || 'Usuário'}</h3>
            {contact.verified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-400">{contact.status}</p>
        </div>
        
        {/* Header icons */}
        <div className="flex items-center space-x-4">
          {/* Link icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="currentColor"/>
          </svg>
          
          {/* Phone icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
          </svg>
          
          {/* Video icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto bg-black">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-[280px] ${message.sender === 'me' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
              {message.sender === 'contact' && (
                <img
                  src={contact.photo}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div
                className={`px-4 py-2 text-white text-sm ${
                  message.sender === 'me'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl rounded-br-lg'
                    : 'bg-gray-700 rounded-3xl rounded-bl-lg'
                }`}
                style={{
                  borderRadius: message.sender === 'me' 
                    ? '24px 24px 8px 24px' 
                    : '24px 24px 24px 8px'
                }}
              >
                <p>{message.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-black px-4 py-3 flex items-center space-x-3">
        {/* Camera button with gradient */}
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M12 15.2l3.2-2.7c.3-.3.8-.3 1.1 0s.3.8 0 1.1L12.6 17c-.3.3-.8.3-1.1 0l-3.7-3.4c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0L12 15.2z" fill="currentColor"/>
            <circle cx="12" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M12 2L9.5 5H7c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-2.5L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        
        {/* Input field */}
        <div className="flex-1 bg-gray-800 rounded-full px-4 py-2 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Mensagem..."
            className="flex-1 outline-none text-sm bg-transparent text-white placeholder-gray-400"
            readOnly
          />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M9 9h.01" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 9h.01" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        
        {/* Additional icons */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
        
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
        
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-black">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
  );
};