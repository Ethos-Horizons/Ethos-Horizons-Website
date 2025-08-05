import { useState, useRef, useEffect } from 'react';
import { Bot, X, MessageSquare, ArrowRight, Send, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useChatbot } from '@/hooks/useChatbot';
import { useAutoStartChatbot } from '@/hooks/useAutoStartChatbot';
import { ChatMessage } from './ChatMessage';

interface ChatbotProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Chatbot = ({ isOpen: externalIsOpen, onOpenChange }: ChatbotProps = {}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    messages,
    conversationId,
    isLoading,
    isTyping,
    error,
    sendMessage,
    clearError
  } = useChatbot();

  // Auto-start conversation and manage notification
  const { hasNotification, clearNotification, conversationStarted } = useAutoStartChatbot(20);



  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
    
    const message = inputValue.trim();
    setInputValue('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    clearError();
    clearNotification(); // Clear notification when chat is opened
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  // Handle click outside to close
  const handleClickOutside = (e: React.MouseEvent) => {
    // Only close if clicking on the backdrop, not the chat window itself
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop for click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-[50]"
          onClick={handleClickOutside}
        />
      )}
      
      {/* Chat Window */}
      <div className={cn(
        "fixed bottom-[160px] right-6 sm:right-10 w-80 sm:w-96 h-[28rem] bg-gray-800 rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-[60]",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {/* Header */}
        <div className="bg-gray-900 p-4 rounded-t-xl flex justify-between items-center flex-shrink-0">
          <h3 className="text-white font-bold flex items-center">
            <Bot className="w-5 h-5 mr-2 text-cyan-400" /> 
            Ethos Horizons Assistant
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCloseChat}
            data-testid="button-close-chat"
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-grow p-4 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center space-x-2 text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Connecting to assistant...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div className="text-sm text-red-300">
                <p className="font-medium">Connection Error</p>
                <p className="text-xs opacity-80">{error}</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="w-12 h-12 text-gray-600 mb-4" />
              <p className="text-gray-400 text-sm">
                Welcome! I'm here to help you learn about our services and answer any questions you might have.
              </p>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-400 ml-2">Assistant is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          <div className="flex space-x-2">
            <Input 
              ref={inputRef}
              type="text" 
              placeholder="Type your message..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping || isLoading}
              className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping || isLoading}
              className="bg-cyan-500 hover:bg-cyan-600 text-white disabled:bg-gray-600 disabled:text-gray-400"
              size="sm"
            >
              <Send size={16} />
            </Button>
          </div>
          
          {/* Connection status */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            {isLoading ? 'Connecting...' : error ? 'Connection failed' : 'Connected to Ethos Horizons Assistant'}
          </div>
        </div>
      </div>

      {/* Chat Toggle Button */}
      <div className="fixed bottom-16 right-6 sm:right-10 z-50">
        <Button
          onClick={handleOpenChat}
          disabled={isLoading}
          className="bg-cyan-500 hover:bg-cyan-600 text-white p-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed relative"
          data-testid="button-open-chat"
        >
          <MessageSquare size={36} />
          
          {/* Notification Badge */}
          {hasNotification && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              1
            </div>
          )}
        </Button>
      </div>
    </>
  );
}; 