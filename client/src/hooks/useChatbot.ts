import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, Conversation } from '@/lib/chatbotConfig';
import { chatbotApi } from '@/lib/chatbotApi';

// Global state to ensure single instance
let globalMessages: ChatMessage[] = [];
let globalConversationId: string | null = null;
let globalIsLoading = false;
let globalIsTyping = false;
let globalError: string | null = null;

// Global setters
const setGlobalMessages = (messages: ChatMessage[]) => {
  globalMessages = messages;
  // Notify all instances
  if (globalStateListeners.length > 0) {
    globalStateListeners.forEach(listener => listener());
  }
};

const setGlobalConversationId = (id: string | null) => {
  globalConversationId = id;
  if (globalStateListeners.length > 0) {
    globalStateListeners.forEach(listener => listener());
  }
};

const setGlobalIsLoading = (loading: boolean) => {
  globalIsLoading = loading;
  if (globalStateListeners.length > 0) {
    globalStateListeners.forEach(listener => listener());
  }
};

const setGlobalIsTyping = (typing: boolean) => {
  globalIsTyping = typing;
  if (globalStateListeners.length > 0) {
    globalStateListeners.forEach(listener => listener());
  }
};

const setGlobalError = (error: string | null) => {
  globalError = error;
  if (globalStateListeners.length > 0) {
    globalStateListeners.forEach(listener => listener());
  }
};

// Global state listeners
const globalStateListeners: (() => void)[] = [];

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
  const [messages, setMessages] = useState<ChatMessage[]>(globalMessages);
  const [conversationId, setConversationId] = useState<string | null>(globalConversationId);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debug logging for messages state changes
  useEffect(() => {
    console.log('useChatbot messages state changed:', messages);
  }, [messages]);

  // Listen to global state changes
  useEffect(() => {
    const listener = () => {
      setMessages(globalMessages);
      setConversationId(globalConversationId);
      setIsLoading(globalIsLoading);
      setIsTyping(globalIsTyping);
      setError(globalError);
    };
    
    globalStateListeners.push(listener);
    
    return () => {
      const index = globalStateListeners.indexOf(listener);
      if (index > -1) {
        globalStateListeners.splice(index, 1);
      }
    };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setGlobalError(null);
  }, []);

  const startConversation = useCallback(async () => {
    // Clear any existing conversation state to start fresh
    setConversationId(null);
    setMessages([]);
    setError(null);
    setGlobalConversationId(null);
    setGlobalMessages([]);
    setGlobalError(null);
    
    setIsLoading(true);
    setGlobalIsLoading(true);

    try {
      console.log('Starting conversation...');
      const response = await chatbotApi.startConversation();
      console.log('Start conversation response:', response);
      
      if (response.success) {
        // Handle both response formats: with data property or direct response
        const conversationId = response.data?.conversationId || (response as any).conversationId;
        const greeting = response.data?.greeting || response.message;
        
        if (conversationId) {
          setConversationId(conversationId);
          setGlobalConversationId(conversationId);
          console.log('Conversation started with ID:', conversationId);
          
          // Add initial greeting message if provided
          if (greeting) {
            const greetingMessage: ChatMessage = {
              id: `greeting-${Date.now()}`,
              content: greeting,
              sender: 'bot',
              timestamp: new Date(),
            };
            console.log('Setting greeting message:', greetingMessage);
            setMessages([greetingMessage]);
            setGlobalMessages([greetingMessage]);
          }
        } else {
          console.error('No conversation ID in response:', response);
          setError('Invalid response from chatbot service');
          setGlobalError('Invalid response from chatbot service');
        }
      } else {
        console.error('Failed to start conversation:', response.error);
        setError(response.error || 'Failed to start conversation');
        setGlobalError(response.error || 'Failed to start conversation');
      }
    } catch (err) {
      console.error('Error starting conversation:', err);
      setError(`Failed to connect to chatbot service: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setGlobalError(`Failed to connect to chatbot service: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      setGlobalIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!conversationId || !message.trim()) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: message.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setGlobalMessages(newMessages);
    setIsTyping(true);
    setGlobalIsTyping(true);
    setError(null);
    setGlobalError(null);

    try {
      const response = await chatbotApi.sendMessage(conversationId, message.trim());
      
      if (response.success) {
        // Handle multiple response formats from the agent dashboard
        const messageContent = response.data?.message || 
                              response.data?.response || 
                              response.message || 
                              (response as any).response;
        
        if (messageContent) {
          const botMessage: ChatMessage = {
            id: `bot-${Date.now()}`,
            content: messageContent,
            sender: 'bot',
            timestamp: new Date(),
            metadata: {
              ...response.data?.metadata,
              ...(response as any).metadata,
              intent: (response as any).intent,
              confidence: (response as any).confidence,
              suggestions: (response as any).suggestions
            },
          };
          
          const updatedMessages = [...newMessages, botMessage];
          setMessages(updatedMessages);
          setGlobalMessages(updatedMessages);
        } else {
          console.error('No message content found in response:', response);
          setError('No message content in response');
          setGlobalError('No message content in response');
        }
      } else {
        setError(response.error || 'Failed to get response from chatbot');
        setGlobalError(response.error || 'Failed to get response from chatbot');
      }
    } catch (err) {
      setError('Failed to send message');
      setGlobalError('Failed to send message');
    } finally {
      setIsTyping(false);
      setGlobalIsTyping(false);
    }
  }, [conversationId, messages]);

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