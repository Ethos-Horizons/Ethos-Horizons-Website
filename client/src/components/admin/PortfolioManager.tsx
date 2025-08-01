import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const PortfolioManager = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Portfolio Items</h3>
        <Button className="bg-cyan-500 hover:bg-cyan-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </Button>
      </div>
      <div className="text-gray-400 text-center py-8">
        Portfolio management functionality coming soon...
      </div>
    </div>
  );
}; 