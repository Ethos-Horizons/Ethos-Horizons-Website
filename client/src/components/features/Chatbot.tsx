import { useState } from 'react';
import { Bot, X, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={cn(
        "fixed bottom-[160px] right-6 sm:right-10 w-80 sm:w-96 h-[28rem] bg-gray-800 rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-[60]",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        <div className="bg-gray-900 p-4 rounded-t-xl flex justify-between items-center flex-shrink-0">
          <h3 className="text-white font-bold flex items-center">
            <Bot className="w-5 h-5 mr-2 text-cyan-400" /> 
            Ethos Digital Assistant
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsOpen(false)}
            data-testid="button-close-chat"
          >
            <X size={20} />
          </Button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="flex flex-col space-y-3">
            <div className="bg-gray-700 p-3 rounded-lg self-start max-w-xs">
              <p className="text-sm text-gray-300">Hello! Our virtual assistant is currently under development.</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg self-start max-w-xs">
              <p className="text-sm text-gray-300">It will be available soon to answer your questions. For now, please use the contact form for any inquiries. We look forward to assisting you!</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          <div className="flex space-x-2">
            <Input 
              type="text" 
              placeholder="Virtual assistant coming soon..." 
              disabled
              className="w-full bg-gray-700 border-gray-600 text-white cursor-not-allowed"
            />
            <Button 
              disabled 
              className="bg-cyan-800 text-white/50 cursor-not-allowed"
            >
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-16 right-6 sm:right-10 bg-cyan-500 hover:bg-cyan-600 text-white p-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110 z-50"
        data-testid="button-open-chat"
      >
        <MessageSquare size={36} />
      </Button>
    </>
  );
}; 