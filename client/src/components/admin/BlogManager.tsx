import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, X, Save, Edit, Trash2, Eye, EyeOff, Upload, FileText, RefreshCw } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { convertBlogPostToJson, extractContentFromBlogPost, extractContentAndRemoveField } from '@/lib/jsonConverter';
import { OptimizedImageUpload } from '@/components/ui/optimized-image-upload';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  image_url?: string; // Database field name
  published: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  created_at?: string; // Database field name
  updated_at?: string; // Database field name
}

const CATEGORIES = [
  'seo',
  'ai-marketing',
  'web-development',
  'local-marketing',
  'content-marketing',
  'social-media',
  'video-marketing'
];

export const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showJsonImport, setShowJsonImport] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [imageError, setImageError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: [] as string[],
    imageUrl: '',
    published: false,
    slug: ''
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await apiRequest('GET', '/api/cms/blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug when title changes
    if (field === 'title') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        slug: generateSlug(value)
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      tags: [],
      imageUrl: '',
      published: false,
      slug: ''
    });
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Ensure slug is generated if empty and map fields correctly
      const dataToSubmit = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        tags: formData.tags || [],
        image_url: formData.imageUrl || null, // Map to database field name
        published: formData.published,
        slug: formData.slug || generateSlug(formData.title)
      };

      console.log('Submitting blog post data:', dataToSubmit);
      
      if (editingPost) {
        await apiRequest('PUT', `/api/cms/blog/${editingPost.id}`, dataToSubmit);
      } else {
        await apiRequest('POST', '/api/cms/blog', dataToSubmit);
      }
      
      await fetchPosts();
      resetForm();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags || [],
      imageUrl: post.imageUrl || post.image_url || '', // Handle both field names
      published: post.published,
      slug: post.slug || ''
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await apiRequest('DELETE', `/api/cms/blog/${id}`);
        await fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  // Helper function to convert JavaScript object literal to JSON
  const convertJsToJson = (input: string): string => {
    try {
      return convertBlogPostToJson(input);
    } catch (error) {
      throw new Error('Failed to convert JavaScript object literal to JSON');
    }
  };

  const parseAndPopulateJson = () => {
    try {
      setJsonError('');
      let jsonToParse = jsonInput;
      
      // First, try to parse as-is
      try {
        JSON.parse(jsonInput);
        console.log('Input parsed as valid JSON');
      } catch (initialError) {
        console.log('Initial JSON parsing failed, attempting conversion...');
        // If initial parsing fails, try to convert from JavaScript object literal
        try {
          jsonToParse = convertJsToJson(jsonInput);
          console.log('Conversion result:', jsonToParse.substring(0, 200) + '...');
          // Test if the conversion worked
          JSON.parse(jsonToParse);
          console.log('Conversion successful!');
        } catch (conversionError) {
          console.error('Conversion failed:', conversionError);
          console.log('Original input:', jsonInput.substring(0, 200) + '...');
          console.log('Converted result:', jsonToParse.substring(0, 200) + '...');
          throw new Error('Invalid JSON format. The input appears to be JavaScript object literal syntax. Please ensure:\n\n1. All strings are enclosed in double quotes (") not backticks (`)\n2. All property names are in double quotes\n3. Multi-line strings have newlines escaped as \\n\n\nExample of valid JSON:\n{\n  "title": "Your Title",\n  "content": "<h2>Your content</h2>\\n<p>More content</p>"\n}');
        }
      }
      
      const parsedData = JSON.parse(jsonToParse);
      
      // Handle both single object and array of objects
      const dataToUse = Array.isArray(parsedData) ? parsedData[0] : parsedData;
      
      // Map the JSON fields to form fields, handling different possible field names
      // Note: published, created_at, and updated_at are handled by the CMS/database
      const mappedData = {
        title: dataToUse.title || '',
        excerpt: dataToUse.excerpt || '',
        content: dataToUse.content || '',
        author: dataToUse.author || 'Ethos Digital Team',
        category: dataToUse.category || '',
        tags: dataToUse.tags || [],
        imageUrl: dataToUse.imageUrl || dataToUse.image_url || '',
        published: false, // Default to draft - user can toggle in form
        slug: dataToUse.slug || generateSlug(dataToUse.title || '')
      };

      setFormData(mappedData);
      setShowJsonImport(false);
      setJsonInput('');
      setIsCreating(true);
      
      // Show success message
      alert('JSON data imported successfully! Please review and edit the form fields as needed. The published status defaults to draft for safety.');
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : 'Invalid JSON format. Please check your JSON syntax.');
      console.error('JSON parsing error:', error);
    }
  };

  const handleJsonInputChange = (value: string) => {
    setJsonInput(value);
    setJsonError(''); // Clear error when user starts typing
  };

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Post Management</h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowJsonImport(true)}
            variant="outline"
            className="border-cyan-500 text-cyan-500 hover:bg-cyan-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import JSON
          </Button>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* JSON Import Modal */}
      {showJsonImport && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Import Blog Post from JSON
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jsonInput">Paste your JSON data here</Label>
                <Textarea
                  id="jsonInput"
                  value={jsonInput}
                  onChange={(e) => handleJsonInputChange(e.target.value)}
                  placeholder={`Paste your blog post data here. You can use:

1. Valid JSON format (with double quotes)
2. JavaScript object literal format (with backticks)

Example JavaScript format (from mockData.ts):
{
  id: "1",
  title: "Your Blog Post Title",
  content: \`<h2>Your content here</h2>\`,
  author: "Author Name"
}

Click "Convert to JSON" to automatically convert JavaScript format to JSON.`}
                  rows={12}
                  className="font-mono text-sm"
                />
                {jsonError && (
                  <p className="text-red-500 text-sm">{jsonError}</p>
                )}
              </div>
              
                             <div className="flex gap-2">
                 <Button 
                   onClick={parseAndPopulateJson}
                   className="bg-cyan-500 hover:bg-cyan-600"
                 >
                   <Upload className="w-4 h-4 mr-2" />
                   Import & Populate Form
                 </Button>
                                   <Button 
                    variant="outline"
                    onClick={() => {
                      try {
                        const converted = convertJsToJson(jsonInput);
                        setJsonInput(converted);
                        setJsonError('');
                      } catch (error) {
                        setJsonError('Failed to convert to JSON. Please check your input format.');
                      }
                    }}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Convert to JSON
                  </Button>
                                     <Button 
                     variant="outline"
                     onClick={() => {
                       try {
                         const { content, jsonWithoutContent } = extractContentAndRemoveField(jsonInput);
                         console.log('Extracted content:', content);
                         console.log('JSON without content:', jsonWithoutContent);
                         // Copy content to clipboard
                         navigator.clipboard.writeText(content).then(() => {
                           // Update the textarea with JSON that has content field removed
                           setJsonInput(jsonWithoutContent);
                           setJsonError('');
                           alert('HTML content copied to clipboard! The content field has been removed from the JSON. You can now click "Import & Populate Form" to fill in the other fields, then paste the content into the content field.');
                         }).catch(() => {
                           // Fallback if clipboard API fails
                           setJsonInput(jsonWithoutContent);
                           setJsonError('');
                         });
                       } catch (error) {
                         console.error('Extract content error:', error);
                         setJsonError('Failed to extract content. Please check your input format.');
                       }
                     }}
                   >
                     <FileText className="w-4 h-4 mr-2" />
                     Extract Content
                   </Button>
                 <Button 
                   variant="outline" 
                   onClick={() => {
                     setShowJsonImport(false);
                     setJsonInput('');
                     setJsonError('');
                   }}
                 >
                   Cancel
                 </Button>
               </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Supported JSON Fields:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><strong>title:</strong> Blog post title</li>
                  <li><strong>excerpt:</strong> Brief description</li>
                  <li><strong>content:</strong> Full blog content (HTML supported)</li>
                  <li><strong>author:</strong> Author name</li>
                  <li><strong>category:</strong> One of: seo, ai-marketing, web-development, local-marketing, content-marketing, social-media, video-marketing</li>
                  <li><strong>tags:</strong> Array of tag strings</li>
                  <li><strong>imageUrl/image_url:</strong> Featured image URL</li>
                  <li><strong>slug:</strong> URL-friendly slug (auto-generated if not provided)</li>
                </ul>
                <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                  <p className="text-xs text-blue-800">
                    <strong>Note:</strong> The <code>published</code>, <code>created_at</code>, and <code>updated_at</code> fields are handled automatically by the CMS. 
                    Imported posts default to draft status for safety.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter post title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Enter author name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of the post"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="URL-friendly slug"
                    required
                  />
                </div>
              </div>

                                     <div className="space-y-2">
          <OptimizedImageUpload
            value={formData.imageUrl}
            onChange={(url, optimizedUrls) => {
              handleInputChange('imageUrl', url);
              // Store optimized URLs in form data for future use
              if (optimizedUrls) {
                setFormData(prev => ({
                  ...prev,
                  imageUrl: url,
                  optimizedImageUrls: optimizedUrls
                }));
              }
            }}
            onError={(error) => setImageError(error)}
            label="Featured Image"
            placeholder="Upload a featured image for your blog post"
            folder="blog-images"
            showProgress={true}
          />
          {imageError && (
            <p className="text-red-500 text-sm">{imageError}</p>
          )}
        </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Write your blog post content (HTML supported)"
                  rows={15}
                  required
                />
                <p className="text-sm text-gray-500">
                  You can use HTML tags for formatting (e.g., &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;)
                </p>
              </div>

              {/* Publish Status */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => handleInputChange('published', checked)}
                />
                <Label htmlFor="published">Published</Label>
              </div>

              {/* Form Actions */}
              <div className="flex gap-2">
                <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
                  <Save className="w-4 h-4 mr-2" />
                  {editingPost ? 'Update Post' : 'Create Post'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Posts List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Existing Posts</h3>
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{post.title}</h4>
                      {post.published ? (
                        <Badge className="bg-green-500">Published</Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>By {post.author}</span>
                      <span>Category: {post.category}</span>
                      <span>Created: {new Date(post.createdAt || post.created_at || '').toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(post)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}; 