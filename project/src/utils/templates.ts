import { Template } from '../types';

export const templates: Template[] = [
  {
    id: 'venda-confirmada',
    name: 'Venda Confirmada',
    platform: 'whatsapp',
    contact: {
      name: 'João Silva',
      photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'online',
      verified: false
    },
    messages: [
      {
        id: '1',
        text: 'Oi! Recebi o PIX, obrigado!',
        sender: 'contact',
        time: '14:25',
        status: 'read'
      },
      {
        id: '2',
        text: 'Perfeito! Quando posso retirar?',
        sender: 'contact',
        time: '14:26',
        status: 'read'
      },
      {
        id: '3',
        text: 'Pode retirar amanhã às 14h',
        sender: 'me',
        time: '14:27',
        status: 'read'
      },
      {
        id: '4',
        text: 'Show! Muito obrigado pelo atendimento',
        sender: 'contact',
        time: '14:28',
        status: 'read'
      }
    ]
  },
  {
    id: 'depoimento',
    name: 'Depoimento Cliente',
    platform: 'instagram',
    contact: {
      name: 'Maria Santos',
      photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'Ativo agora',
      verified: true
    },
    messages: [
      {
        id: '1',
        text: 'Nossa, ficou incrível o resultado!',
        sender: 'contact',
        time: '15:30'
      },
      {
        id: '2',
        text: 'Superou minhas expectativas',
        sender: 'contact',
        time: '15:31'
      },
      {
        id: '3',
        text: 'Obrigada! Fico feliz que tenha gostado 😊',
        sender: 'me',
        time: '15:32'
      },
      {
        id: '4',
        text: 'Já indiquei para 3 amigas',
        sender: 'contact',
        time: '15:33'
      },
      {
        id: '5',
        text: 'Parabéns pelo trabalho!',
        sender: 'contact',
        time: '15:34'
      }
    ]
  },
  {
    id: 'agendamento',
    name: 'Agendamento',
    platform: 'facebook',
    contact: {
      name: 'Carlos Oliveira',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'Ativo há 5 min',
      verified: false
    },
    messages: [
      {
        id: '1',
        text: 'Oi, gostaria de agendar',
        sender: 'contact',
        time: '10:15'
      },
      {
        id: '2',
        text: 'Que dia você tem disponível?',
        sender: 'contact',
        time: '10:15'
      },
      {
        id: '3',
        text: 'Tenho vaga na quinta às 15h',
        sender: 'me',
        time: '10:18'
      },
      {
        id: '4',
        text: 'Perfeito! Pode confirmar',
        sender: 'contact',
        time: '10:20'
      }
    ]
  }
];