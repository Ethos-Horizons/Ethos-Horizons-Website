import { useState, useCallback, useEffect } from 'react';

// Global state for chatbot open/close
let globalIsOpen = false;
let listeners: ((isOpen: boolean) => void)[] = [];

const notifyListeners = (isOpen: boolean) => {
  listeners.forEach(listener => listener(isOpen));
};

export const useChatbotState = () => {
  const [isOpen, setIsOpenState] = useState(globalIsOpen);

  const setIsOpen = useCallback((open: boolean) => {
    globalIsOpen = open;
    setIsOpenState(open);
    notifyListeners(open);
  }, []);

  // Subscribe to changes
  useEffect(() => {
    const listener = (open: boolean) => setIsOpenState(open);
    listeners.push(listener);
    
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  return {
    isOpen,
    setIsOpen,
  };
}; 