// Environment configuration for API endpoints
export const ENV_CONFIG = {
  // Chatbot API configuration
  CHATBOT_API: {
    development: 'http://localhost:5000/api',
    production: 'https://your-deployed-agent-dashboard.com/api', // Update this when you deploy
  },
  
  // Get the appropriate base URL based on environment
  getChatbotApiUrl(): string {
    if (import.meta.env.DEV) {
      return this.CHATBOT_API.development;
    }
    return this.CHATBOT_API.production;
  }
}; 