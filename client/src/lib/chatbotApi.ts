import { CHAT_API_CONFIG, ChatbotResponse } from './chatbotConfig';

class ChatbotApiService {
  private sessionId: string;

  constructor() {
    this.sessionId = this.getSessionId();
  }

  private getSessionId(): string {
    let sessionId = localStorage.getItem('chat_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('chat_session_id', sessionId);
    }
    return sessionId;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${CHAT_API_CONFIG.baseUrl}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async startConversation(): Promise<ChatbotResponse> {
    try {
      const response = await this.makeRequest(CHAT_API_CONFIG.endpoints.startConversation, {
        method: 'POST',
        body: JSON.stringify({
          message: '', // Empty message to start conversation
          session_id: this.sessionId,
          context: {
            page: window.location.pathname,
            user_agent: navigator.userAgent,
            referrer: document.referrer,
          }
        }),
      });

      console.log('AgentHub start response:', response);

      // Return standardized response
      return {
        success: true,
        id: response.id,
        session_id: response.session_id || this.sessionId,
        status: response.status,
        message: response.message || "Hi! I'm Ethos Horizon's assistant. How can I help today?",
        conversationId: response.id, // For legacy compatibility
        greeting: response.message || "Hi! I'm Ethos Horizon's assistant. How can I help today?",
      };
    } catch (error) {
      console.error('Failed to start conversation:', error);
      return {
        success: false,
        error: `Failed to connect: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  async sendMessage(conversationId: string, message: string): Promise<ChatbotResponse> {
    try {
      console.log('Sending message to AgentHub:', { conversationId, message });

      const response = await this.makeRequest(CHAT_API_CONFIG.endpoints.sendMessage, {
        method: 'POST',
        body: JSON.stringify({
          message: message.trim(),
          session_id: this.sessionId,
          context: {
            page: window.location.pathname,
            user_agent: navigator.userAgent,
          }
        }),
      });

      console.log('AgentHub message response:', response);

      // If processing, poll for completion
      if (response.status === 'processing') {
        return this.pollForCompletion(response.id);
      }

      // Return immediate response
      return {
        success: true,
        id: response.id,
        session_id: response.session_id || this.sessionId,
        status: response.status,
        message: response.message,
      };
    } catch (error) {
      console.error('Failed to send message:', error);
      return {
        success: false,
        error: `Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  private async pollForCompletion(conversationId: string): Promise<ChatbotResponse> {
    const maxAttempts = 30; // 30 seconds max
    let attempts = 0;

    const poll = async (): Promise<ChatbotResponse> => {
      try {
        const response = await this.makeRequest(`${CHAT_API_CONFIG.endpoints.getConversation}/${conversationId}`);
        
        if (response.status === 'completed') {
          return {
            success: true,
            id: response.id,
            session_id: response.session_id || this.sessionId,
            status: response.status,
            message: response.message,
          };
        }
        
        if (response.status === 'error') {
          return {
            success: false,
            error: response.error || 'Processing failed',
          };
        }
        
        // Still processing, poll again
        attempts++;
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
          return poll();
        } else {
          return {
            success: false,
            error: 'Response timeout. Please try again.',
          };
        }
      } catch (error) {
        return {
          success: false,
          error: 'Network error during polling',
        };
      }
    };

    return poll();
  }

  async getConversation(conversationId: string): Promise<ChatbotResponse> {
    try {
      const response = await this.makeRequest(`${CHAT_API_CONFIG.endpoints.getConversation}/${conversationId}`);
      
      return {
        success: true,
        id: response.id,
        session_id: response.session_id || this.sessionId,
        status: response.status,
        message: response.message,
      };
    } catch (error) {
      console.error('Failed to get conversation:', error);
      return {
        success: false,
        error: `Failed to get conversation: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }
}

export const chatbotApi = new ChatbotApiService();