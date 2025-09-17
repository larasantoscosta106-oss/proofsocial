import React, { useState, useCallback } from 'react';
import { AppState, Message, Template } from './types';
import { DeviceFrame } from './components/DeviceFrame';
import { WhatsAppPreview } from './components/WhatsAppPreview';
import { InstagramPreview } from './components/InstagramPreview';
import { FacebookPreview } from './components/FacebookPreview';
import { ConfigForm } from './components/ConfigForm';
import { exportToPNG } from './utils/exportUtils';
import { templates } from './utils/templates';
import { Download, AlertCircle } from 'lucide-react';

const initialState: AppState = {
  platform: 'whatsapp',
  device: {
    time: '14:30',
    carrier: 'Vivo',
    battery: 85,
    wifi: true
  },
  contact: {
    name: 'João Silva',
    photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'online',
    verified: false
  },
  messages: [
    {
      id: '1',
      text: 'Olá! Como posso ajudar?',
      sender: 'me',
      time: '14:25',
      status: 'read'
    },
    {
      id: '2',
      text: 'Oi! Gostaria de mais informações sobre o produto',
      sender: 'contact',
      time: '14:26',
      status: 'read'
    }
  ]
};

function App() {
  const [state, setState] = useState<AppState>(initialState);
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<string>('');

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const addMessage = useCallback(() => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: '',
      sender: 'me',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  }, []);

  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setState(prev => ({
      ...prev,
      messages: prev.messages.map(msg => 
        msg.id === id ? { ...msg, ...updates } : msg
      )
    }));
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      messages: prev.messages.filter(msg => msg.id !== id)
    }));
  }, []);

  const applyTemplate = useCallback((templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setState(prev => ({
        ...prev,
        platform: template.platform,
        contact: template.contact,
        messages: template.messages
      }));
    }
  }, []);

  const handlePhotoUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const photo = e.target?.result as string;
      setState(prev => ({
        ...prev,
        contact: { ...prev.contact, photo }
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleExport = async () => {
    setIsExporting(true);
    setExportMessage('');
    
    try {
      await exportToPNG('device-preview', `prova-social-${state.platform}-${Date.now()}`);
      setExportMessage('PNG gerado com sucesso!');
    } catch (error) {
      setExportMessage('Erro ao gerar imagem');
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportMessage(''), 3000);
    }
  };

  const renderPreview = () => {
    switch (state.platform) {
      case 'whatsapp':
        return <WhatsAppPreview contact={state.contact} messages={state.messages} />;
      case 'instagram':
        return <InstagramPreview contact={state.contact} messages={state.messages} />;
      case 'facebook':
        return <FacebookPreview contact={state.contact} messages={state.messages} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Gerador de Prova Social</h1>
            <div className="flex items-center space-x-4">
              {exportMessage && (
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                  exportMessage.includes('sucesso') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <AlertCircle size={16} />
                  <span className="text-sm">{exportMessage}</span>
                </div>
              )}
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download size={16} className="mr-2" />
                {isExporting ? 'Gerando...' : 'Gerar PNG'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Configuration Form */}
          <ConfigForm
            state={state}
            onUpdateState={updateState}
            onAddMessage={addMessage}
            onUpdateMessage={updateMessage}
            onDeleteMessage={deleteMessage}
            onApplyTemplate={applyTemplate}
            onPhotoUpload={handlePhotoUpload}
          />

          {/* Device Preview */}
          <div className="flex-1 flex justify-center">
            <div className="transform scale-75 origin-top">
              <div id="device-preview">
                <DeviceFrame device={state.device}>
                  {renderPreview()}
                </DeviceFrame>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">Aviso Importante</p>
                <p>Este é um gerador de mockups para fins educacionais e de marketing. Não use para enganar ou fraudar pessoas. Ao usar este aplicativo, você concorda em utilizá-lo de forma ética e responsável.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;