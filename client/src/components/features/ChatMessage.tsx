import { ChatMessage as ChatMessageType } from '@/lib/chatbotConfig';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={cn(
      "flex",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-xs sm:max-w-sm p-3 rounded-lg",
        isBot 
          ? "bg-gray-700 text-gray-300" 
          : "bg-purple-500 text-white"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <div className={cn(
          "text-xs mt-2 opacity-70",
          isBot ? "text-gray-400" : "text-purple-100"
        )}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}; 