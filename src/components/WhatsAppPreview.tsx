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
        return <span className="text-gray-400">✓</span>;
      case 'delivered':
        return <span className="text-gray-400">✓✓</span>;
      case 'read':
        return <span className="text-blue-400">✓✓</span>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center space-x-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
        </svg>
        <img
          src={contact.photo || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150'}
          alt={contact.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{contact.name || 'Contato'}</h3>
          <p className="text-sm text-gray-300">{contact.status}</p>
        </div>
        <div className="flex items-center space-x-4">
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
      <div className="flex-1 p-4 space-y-2 overflow-y-auto" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundColor: '#0a0a0a'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'me'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className="flex items-center justify-end space-x-1 mt-1">
                <span className="text-xs opacity-70">{message.time}</span>
                {message.sender === 'me' && getStatusIcon(message.status)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-gray-900 p-4 flex items-center space-x-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
        </svg>
        <div className="flex-1 bg-gray-800 rounded-full px-4 py-2 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Mensagem..."
            className="flex-1 outline-none text-sm bg-transparent text-white placeholder-gray-400"
            readOnly
          />
          <Smile size={20} className="text-gray-400" />
          <Paperclip size={20} className="text-gray-400" />
          <Camera size={20} className="text-gray-400" />
        </div>
        <div className="bg-purple-600 p-2 rounded-full">
          <Mic size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
};