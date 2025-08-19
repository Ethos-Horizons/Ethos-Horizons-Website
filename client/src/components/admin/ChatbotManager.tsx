import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const ChatbotManager = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Chatbot Responses</h3>
        <Button className="bg-purple-500 hover:bg-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Response
        </Button>
      </div>
      <div className="text-gray-400 text-center py-8">
        Chatbot management functionality coming soon...
      </div>
    </div>
  );
}; 