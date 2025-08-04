# Chatbot Integration with Agent Dashboard

## Overview
This document explains how the website chatbot integrates with the separate AI Agent Dashboard application.

## Architecture
- **Website**: React application with chatbot component
- **Agent Dashboard**: Separate Node.js application managing AI agents
- **Communication**: REST API calls between the two applications

## Files Added/Modified

### New Files Created:
1. `client/src/lib/chatbotConfig.ts` - API configuration and TypeScript interfaces
2. `client/src/lib/chatbotApi.ts` - API service for communicating with agent dashboard
3. `client/src/lib/env.ts` - Environment configuration for API URLs
4. `client/src/hooks/useChatbot.ts` - Custom hook for chatbot state management
5. `client/src/components/features/ChatMessage.tsx` - Individual message component

### Modified Files:
1. `client/src/components/features/Chatbot.tsx` - Complete rewrite to integrate with agent dashboard
2. `client/src/components/index.ts` - Added ChatMessage export

## Configuration

### Development Setup:
The chatbot is configured to connect to `http://localhost:5000/api` in development mode.

### Production Setup:
Update the production URL in `client/src/lib/env.ts`:
```typescript
CHATBOT_API: {
  development: 'http://localhost:5000/api',
  production: 'https://your-deployed-agent-dashboard.com/api', // Update this
},
```

## API Endpoints Expected

The agent dashboard should provide these endpoints:

1. **POST** `/api/chatbot/conversation/start`
   - Starts a new conversation
   - Returns: `{ success: true, data: { conversationId: string, greeting?: string } }`

2. **POST** `/api/chatbot/message`
   - Sends a message to the chatbot
   - Body: `{ conversationId: string, message: string, timestamp: string }`
   - Returns: `{ success: true, data: { message: string, metadata?: any } }`

3. **GET** `/api/chatbot/conversation/:id`
   - Retrieves conversation history
   - Returns: `{ success: true, data: { messages: ChatMessage[] } }`

## Features Implemented

### Chatbot Component Features:
- ✅ Real-time messaging with agent dashboard
- ✅ Auto-scroll to latest messages
- ✅ Typing indicators
- ✅ Error handling and connection status
- ✅ Loading states
- ✅ Keyboard shortcuts (Enter to send)
- ✅ Responsive design
- ✅ Auto-focus on input when opened

### State Management:
- ✅ Conversation management
- ✅ Message history
- ✅ Connection status
- ✅ Error handling
- ✅ Loading states

## Testing the Integration

1. **Start the Agent Dashboard**: Ensure it's running on `http://localhost:5000`
2. **Start the Website**: Run your website in development mode
3. **Open Chatbot**: Click the chat icon in the bottom right
4. **Test Messages**: Try sending messages to verify the connection

## Troubleshooting

### Common Issues:

1. **Connection Failed**
   - Check if agent dashboard is running on port 5000
   - Verify CORS settings in agent dashboard
   - Check browser console for errors

2. **Messages Not Sending**
   - Verify API endpoints are implemented correctly
   - Check network tab for failed requests
   - Ensure proper response format from agent dashboard

3. **Styling Issues**
   - Verify Tailwind CSS classes are available
   - Check for CSS conflicts

## Next Steps

1. **Deploy Agent Dashboard**: Deploy to production and update the URL
2. **Add Analytics**: Implement conversation tracking and analytics
3. **Enhance Features**: Add file uploads, rich messages, etc.
4. **Admin Integration**: Connect to admin portal for conversation monitoring

## Security Considerations

- Implement proper authentication between applications
- Add rate limiting to prevent abuse
- Validate all inputs and outputs
- Use HTTPS in production
- Consider implementing API keys for secure communication 