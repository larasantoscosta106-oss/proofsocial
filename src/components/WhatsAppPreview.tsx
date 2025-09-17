import React from 'react';
import { ContactConfig, Message } from '../types';
import { Phone, Video, MoreVertical, Smile, Paperclip, Camera, Mic } from 'lucide-react';

interface WhatsAppPreviewProps {
  contact: ContactConfig;
  messages: Message[];
}

export const WhatsAppPreview: React.FC<WhatsAppPreviewProps> = ({ contact, messages }) => {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent':
        return <span className="text-gray-400 text-xs">✓</span>;
      case 'delivered':
        return <span className="text-gray-400 text-xs">✓✓</span>;
      case 'read':
        return <span className="text-blue-400 text-xs">✓✓</span>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center space-x-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
        </svg>
        <img
          src={contact.photo || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150'}
          alt={contact.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium text-white">{contact.name || 'Contato'}</h3>
          <p className="text-sm text-gray-300">{contact.status}</p>
        </div>
        <div className="flex items-center space-x-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="currentColor"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
          </svg>
          <MoreVertical size={24} />
        </div>
      </div>

      {/* Messages */}
      <div 
        className="flex-1 p-4 space-y-2 overflow-y-auto relative"
        style={{ 
          backgroundColor: '#0b141a',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M50 30c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20zm0 5c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
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
                  className="w-8 h-8 rounded-full object-cover mb-1"
                />
              )}
              <div
                className={`max-w-xs px-3 py-2 shadow-sm ${
                  message.sender === 'me'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-white'
                }`}
                style={{
                  borderRadius: message.sender === 'me' 
                    ? '18px 18px 4px 18px' 
                    : '18px 18px 18px 4px'
                }}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  <span className="text-xs opacity-70">{message.time}</span>
                  {message.sender === 'me' && getStatusIcon(message.status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-gray-900 p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
          <Smile size={20} className="text-gray-300" />
        </div>
        <div className="flex-1 bg-gray-800 rounded-full px-4 py-3 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Mensagem..."
            className="flex-1 outline-none text-sm bg-transparent text-white placeholder-gray-400"
            readOnly
          />
          <Paperclip size={18} className="text-gray-400 rotate-45" />
          <Camera size={18} className="text-gray-400" />
        </div>
        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
          <Mic size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
};