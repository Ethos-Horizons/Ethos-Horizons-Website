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
      const response = await chatbotApi.startConversation();
      
      if (response.success) {
        // Handle AgentHub response format
        const conversationId = response.id || response.conversationId;
        const greeting = response.message || response.greeting;
        
        if (conversationId) {
          setConversationId(conversationId);
          setGlobalConversationId(conversationId);
          
          // Add initial greeting message if provided
          if (greeting) {
            const greetingMessage: ChatMessage = {
              id: `greeting-${Date.now()}`,
              content: greeting,
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages([greetingMessage]);
            setGlobalMessages([greetingMessage]);
          }
        } else {
          setError('Invalid response from chatbot service');
          setGlobalError('Invalid response from chatbot service');
        }
      } else {
        setError(response.error || 'Failed to start conversation');
        setGlobalError(response.error || 'Failed to start conversation');
      }
    } catch (err) {
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
        // Handle AgentHub response format
        const messageContent = response.message;
        
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