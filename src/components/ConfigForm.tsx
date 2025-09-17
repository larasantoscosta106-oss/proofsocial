import React from 'react';
import { AppState, Message } from '../types';
import { Plus, Trash2, Upload } from 'lucide-react';
import { templates } from '../utils/templates';

interface ConfigFormProps {
  state: AppState;
  onUpdateState: (updates: Partial<AppState>) => void;
  onAddMessage: () => void;
  onUpdateMessage: (id: string, updates: Partial<Message>) => void;
  onDeleteMessage: (id: string) => void;
  onApplyTemplate: (templateId: string) => void;
  onPhotoUpload: (file: File) => void;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({
  state,
  onUpdateState,
  onAddMessage,
  onUpdateMessage,
  onDeleteMessage,
  onApplyTemplate,
  onPhotoUpload
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  };

  const carriers = ['Vivo', 'Claro', 'TIM', 'Oi', 'Algar', 'Nextel'];

  return (
    <div className="w-96 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Configurações</h2>

      {/* Platform Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Rede Social</label>
        <div className="grid grid-cols-3 gap-2">
          {(['whatsapp', 'instagram', 'facebook'] as const).map((platform) => (
            <button
              key={platform}
              onClick={() => onUpdateState({ platform })}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                state.platform === platform
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {platform === 'whatsapp' ? 'WhatsApp' : 
               platform === 'instagram' ? 'Instagram' : 'Facebook'}
            </button>
          ))}
        </div>
      </div>

      {/* Templates */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Templates</label>
        <select
          onChange={(e) => onApplyTemplate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecionar template...</option>
          {templates
            .filter(t => t.platform === state.platform)
            .map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
        </select>
      </div>

      {/* Device Config */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Configurações do Dispositivo</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Horário</label>
            <input
              type="time"
              value={state.device.time}
              onChange={(e) => onUpdateState({ 
                device: { ...state.device, time: e.target.value } 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Operadora</label>
            <select
              value={state.device.carrier}
              onChange={(e) => onUpdateState({ 
                device: { ...state.device, carrier: e.target.value } 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {carriers.map(carrier => (
                <option key={carrier} value={carrier}>{carrier}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nível da Bateria ({state.device.battery}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={state.device.battery}
              onChange={(e) => onUpdateState({ 
                device: { ...state.device, battery: parseInt(e.target.value) } 
              })}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Contact Config */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Configurações do Contato</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nome do Contato</label>
            <input
              type="text"
              value={state.contact.name}
              onChange={(e) => onUpdateState({ 
                contact: { ...state.contact, name: e.target.value } 
              })}
              placeholder="Digite o nome do contato..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Foto de Perfil</label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              >
                <Upload size={16} className="mr-2" />
                Upload
              </label>
              {state.contact.photo && (
                <img
                  src={state.contact.photo}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <input
              type="text"
              value={state.contact.status}
              onChange={(e) => onUpdateState({ 
                contact: { ...state.contact, status: e.target.value } 
              })}
              placeholder="online"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {state.platform === 'instagram' && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="verified"
                checked={state.contact.verified}
                onChange={(e) => onUpdateState({ 
                  contact: { ...state.contact, verified: e.target.checked } 
                })}
                className="mr-2"
              />
              <label htmlFor="verified" className="text-sm text-gray-600">Conta verificada</label>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Mensagens</h3>
          <button
            onClick={onAddMessage}
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Adicionar
          </button>
        </div>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {state.messages.map((message) => (
            <div key={message.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <select
                  value={message.sender}
                  onChange={(e) => onUpdateMessage(message.id, { sender: e.target.value as 'me' | 'contact' })}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="me">Eu</option>
                  <option value="contact">Contato</option>
                </select>
                <button
                  onClick={() => onDeleteMessage(message.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea
                value={message.text}
                onChange={(e) => onUpdateMessage(message.id, { text: e.target.value })}
                placeholder="Texto da mensagem..."
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm resize-none"
                rows={2}
              />
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="time"
                  value={message.time}
                  onChange={(e) => onUpdateMessage(message.id, { time: e.target.value })}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
                {state.platform === 'whatsapp' && message.sender === 'me' && (
                  <select
                    value={message.status || 'sent'}
                    onChange={(e) => onUpdateMessage(message.id, { status: e.target.value as any })}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="sent">Enviado</option>
                    <option value="delivered">Entregue</option>
                    <option value="read">Visualizado</option>
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};