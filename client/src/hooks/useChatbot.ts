import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, Conversation } from '@/lib/chatbotConfig';
import { chatbotApi } from '@/lib/chatbotApi';

export interface UseChatbotReturn {
  messages: ChatMessage[];
  conversationId: string | null;
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  startConversation: () => Promise<void>;
  clearError: () => void;
}

export const useChatbot = (): UseChatbotReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const startConversation = useCallback(async () => {
    if (conversationId) return; // Already have a conversation

    setIsLoading(true);
    setError(null);

    try {
      console.log('Starting conversation...');
      const response = await chatbotApi.startConversation();
      console.log('Start conversation response:', response);
      
      if (response.success) {
        // Handle both response formats: with data property or direct response
        const conversationId = response.data?.conversationId || response.conversationId;
        const greeting = response.data?.greeting || response.message;
        
        if (conversationId) {
          setConversationId(conversationId);
          console.log('Conversation started with ID:', conversationId);
          
          // Add initial greeting message if provided
          if (greeting) {
            const greetingMessage: ChatMessage = {
              id: `greeting-${Date.now()}`,
              content: greeting,
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages([greetingMessage]);
          }
        } else {
          console.error('No conversation ID in response:', response);
          setError('Invalid response from chatbot service');
        }
      } else {
        console.error('Failed to start conversation:', response.error);
        setError(response.error || 'Failed to start conversation');
      }
    } catch (err) {
      console.error('Error starting conversation:', err);
      setError(`Failed to connect to chatbot service: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  const sendMessage = useCallback(async (message: string) => {
    if (!conversationId || !message.trim()) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: message.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setError(null);

    try {
      const response = await chatbotApi.sendMessage(conversationId, message.trim());
      
      if (response.success) {
        // Handle multiple response formats from the agent dashboard
        const messageContent = response.data?.message || 
                              response.data?.response || 
                              response.message || 
                              response.response;
        
        if (messageContent) {
          const botMessage: ChatMessage = {
            id: `bot-${Date.now()}`,
            content: messageContent,
            sender: 'bot',
            timestamp: new Date(),
            metadata: {
              ...response.data?.metadata,
              ...response.metadata,
              intent: response.intent,
              confidence: response.confidence,
              suggestions: response.suggestions
            },
          };
          
          setMessages(prev => [...prev, botMessage]);
        } else {
          console.error('No message content found in response:', response);
          setError('No message content in response');
        }
      } else {
        setError(response.error || 'Failed to get response from chatbot');
      }
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setIsTyping(false);
    }
  }, [conversationId]);

  // Remove auto-start conversation - only start when explicitly called
  // useEffect(() => {
  //   if (!conversationId && !isLoading) {
  //     startConversation();
  //   }
  // }, [conversationId, isLoading, startConversation]);

  return {
    messages,
    conversationId,
    isLoading,
    isTyping,
    error,
    sendMessage,
    startConversation,
    clearError,
  };
}; 