import { ENV_CONFIG } from './env';

// AgentHub API Configuration
export const CHAT_API_CONFIG = {
  baseUrl: ENV_CONFIG.getChatbotApiUrl(),
  endpoints: {
    startConversation: '/conversation',        // AgentHub endpoint
    sendMessage: '/conversation',              // Same endpoint for new messages  
    getConversation: '/conversation'           // Get conversation status
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
  // AgentHub response structure
  id?: string;                        // Conversation/run ID
  session_id?: string;               // Session ID for tracking
  status?: "processing" | "completed" | "error";
  metadata?: {
    response_time_ms?: number;
    tokens_used?: number;
    cost_usd?: number;
  };
  // Legacy support
  conversationId?: string;
  greeting?: string;
} 