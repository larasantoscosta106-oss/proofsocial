export interface DeviceConfig {
  time: string;
  carrier: string;
  battery: number;
  wifi: boolean;
}

export interface ContactConfig {
  name: string;
  photo: string;
  status: string;
  verified: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'contact';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  reaction?: string;
}

export interface AppState {
  platform: 'whatsapp' | 'instagram' | 'facebook';
  device: DeviceConfig;
  contact: ContactConfig;
  messages: Message[];
}

export interface Template {
  id: string;
  name: string;
  platform: 'whatsapp' | 'instagram' | 'facebook';
  contact: ContactConfig;
  messages: Message[];
}