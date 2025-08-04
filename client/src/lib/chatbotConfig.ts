import { ENV_CONFIG } from './env';

// Chatbot API Configuration
export const CHAT_API_CONFIG = {
  baseUrl: ENV_CONFIG.getChatbotApiUrl(),
  
  endpoints: {
    startConversation: '/chatbot/conversation/start',
    sendMessage: '/chatbot/message',
    getConversation: '/chatbot/conversation'
  }
};

// Message types for the chatbot
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  metadata?: any;
}

export interface Conversation {
  id: string;
  sessionId: string;
  messages: ChatMessage[];
  status: 'active' | 'ended';
  startTime: Date;
  endTime?: Date;
}

export interface ChatbotResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
} 