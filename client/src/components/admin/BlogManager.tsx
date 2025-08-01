import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const BlogManager = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Blog Posts</h3>
        <Button className="bg-cyan-500 hover:bg-cyan-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Post
        </Button>
      </div>
      <div className="text-gray-400 text-center py-8">
        Blog management functionality coming soon...
      </div>
    </div>
  );
}; 