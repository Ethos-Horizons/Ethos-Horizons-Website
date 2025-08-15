// Environment configuration for API endpoints
export const ENV_CONFIG = {
  // Chatbot API configuration
      CHATBOT_API: {
      // Point both dev and prod to n8n's webhook base. The chatbot app will append endpoint paths.
      development: 'https://cmchorizions.app.n8n.cloud/webhook',
      production: 'https://cmchorizions.app.n8n.cloud/webhook',
    },
  
  // Get the appropriate base URL based on environment
  getChatbotApiUrl(): string {
    if (import.meta.env.DEV) {
      return this.CHATBOT_API.development;
    }
    return this.CHATBOT_API.production;
  }
}; 