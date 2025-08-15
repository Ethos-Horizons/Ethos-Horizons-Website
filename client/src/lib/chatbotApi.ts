import { CHAT_API_CONFIG, ChatMessage, Conversation, ChatbotResponse } from './chatbotConfig';

class ChatbotApiService {
  private baseUrl: string;
  private visitorId: string;

  constructor() {
    this.baseUrl = CHAT_API_CONFIG.baseUrl;
    // Generate a unique visitor ID for this session
    this.visitorId = this.getOrCreateVisitorId();
  }

  private getOrCreateVisitorId(): string {
    // Try to get existing visitor ID from localStorage
    let visitorId = localStorage.getItem('chatbot_visitor_id');
    
    if (!visitorId) {
      // Generate a new visitor ID
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatbot_visitor_id', visitorId);
    }
    
    return visitorId;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        const errorText = await response.text();
        
        // Check for rate limiting specifically
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          throw new Error(`Rate limit exceeded. Please wait ${retryAfter || 'a moment'} before trying again.`);
        }
        
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('n8n response:', data); // Debug log - remove this later
      return data;
    } catch (error) {
      throw error;
    }
  }

  private coerceToPlainJson(data: any) {
    if (data && typeof data.output === 'string') {
      const fenced = data.output.match(/```json\s*([\s\S]*?)\s*```/i);
      const raw = fenced ? fenced[1] : data.output;
      try { return JSON.parse(raw); } catch { /* fall through */ }
    }
    return data;
  }

  async startConversation(): Promise<ChatbotResponse> {
    try {
      const response = await this.makeRequest(CHAT_API_CONFIG.endpoints.startConversation, {
        method: 'POST',
        body: JSON.stringify({
          type: 'start_conversation',
          visitorId: this.visitorId,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
      });
      
      return this.coerceToPlainJson(response);
    } catch (error) {
      return {
        success: false,
        error: 'Failed to start conversation',
      };
    }
  }

  async sendMessage(conversationId: string, message: string): Promise<ChatbotResponse> {
    try {
      console.log('Sending message to:', `${this.baseUrl}${CHAT_API_CONFIG.endpoints.sendMessage}`);
      console.log('Message payload:', { conversationId, visitorId: this.visitorId, message });
      
      const response = await this.makeRequest(CHAT_API_CONFIG.endpoints.sendMessage, {
        method: 'POST',
        body: JSON.stringify({
          type: 'send_message',
          conversationId,        // Now this gets sent to the webhook!
          visitorId: this.visitorId,
          message,
          timestamp: new Date().toISOString(),
        }),
      });
      
      console.log('Message response:', response);
      return this.coerceToPlainJson(response);
    } catch (error) {
      console.error('Send message error:', error);
      return {
        success: false,
        error: 'Failed to send message',
      };
    }
  }

  async getConversation(conversationId: string): Promise<ChatbotResponse> {
    try {
      const response = await this.makeRequest(`${CHAT_API_CONFIG.endpoints.getConversation}/${conversationId}`, {
        method: 'GET',
      });
      
      return this.coerceToPlainJson(response);
    } catch (error) {
      return {
        success: false,
        error: 'Failed to get conversation',
      };
    }
  }
}

export const chatbotApi = new ChatbotApiService(); 