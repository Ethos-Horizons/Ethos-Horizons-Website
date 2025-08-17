// Environment configuration for API endpoints
export const ENV_CONFIG = {
  // AgentHub API configuration
  CHATBOT_API: {
    development: 'http://localhost:5000', // AgentHub API
    production: 'http://localhost:5000',  // Will update when AgentHub is deployed
  },
  
  // Get the appropriate base URL based on environment
  getChatbotApiUrl(): string {
    if (import.meta.env.DEV) {
      return this.CHATBOT_API.development;
    }
    return this.CHATBOT_API.production;
  }
}; 