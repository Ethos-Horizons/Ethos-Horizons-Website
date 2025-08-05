import { useState, useEffect, useCallback } from 'react';
import { useChatbot } from './useChatbot';
import { useChatbotState } from './useChatbotState';

// Global state to prevent multiple auto-starts
let globalConversationStarted = false;
let globalNotificationShown = false;

export interface UseAutoStartChatbotReturn {
  hasNotification: boolean;
  clearNotification: () => void;
  conversationStarted: boolean;
}

export const useAutoStartChatbot = (notificationDelaySeconds: number = 20): UseAutoStartChatbotReturn => {
  const { startConversation, conversationId } = useChatbot();
  const { isOpen } = useChatbotState();
  const [hasNotification, setHasNotification] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);

  // Start conversation immediately when component mounts (only once globally)
  useEffect(() => {
    if (globalConversationStarted || conversationId) return;

    const startConversationImmediately = async () => {
      if (globalConversationStarted) return;
      
      globalConversationStarted = true;
      try {
        console.log('Starting conversation immediately...');
        await startConversation();
        setConversationStarted(true);
      } catch (error) {
        console.error('Failed to start conversation:', error);
        globalConversationStarted = false; // Reset on error
      }
    };

    startConversationImmediately();
  }, [startConversation, conversationId]);

  // Show notification after delay if chat hasn't been opened
  useEffect(() => {
    if (globalNotificationShown || isOpen || !conversationStarted) return;

    const timer = setTimeout(() => {
      if (globalNotificationShown || isOpen) return;
      
      globalNotificationShown = true;
      console.log(`Showing notification after ${notificationDelaySeconds} seconds...`);
      setHasNotification(true);
    }, notificationDelaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [notificationDelaySeconds, isOpen, conversationStarted]);

  // Update conversation started state when conversationId changes
  useEffect(() => {
    if (conversationId && !conversationStarted) {
      setConversationStarted(true);
    }
  }, [conversationId, conversationStarted]);

  const clearNotification = useCallback(() => {
    setHasNotification(false);
  }, []);

  return {
    hasNotification,
    clearNotification,
    conversationStarted,
  };
}; 