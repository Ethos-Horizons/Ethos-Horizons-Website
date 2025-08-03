import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, X, Save, Edit, Trash2, Star, ExternalLink, Image, Globe, Share2, FileText, Copy } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { OptimizedImageUpload } from '@/components/ui/optimized-image-upload';
import { convertPortfolioProjectToJson, extractPortfolioContentAndRemoveFields } from '@/lib/jsonConverter';

interface PortfolioImage {
  id: string;
  url: string;
  alt: string;
  isHero: boolean;
  order: number;
}

interface SocialMediaLink {
  platform: string;
  url: string;
}

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  images?: PortfolioImage[];
  technologies: string[];
  results: string;
  journey?: string;
  visitSiteUrl?: string;
  socialMediaLinks?: SocialMediaLink[];
  featured: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export const PortfolioManager = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    images: [] as PortfolioImage[],
    technologies: [] as string[],
    results: '',
    journey: '',
    visitSiteUrl: '',
    socialMediaLinks: [] as SocialMediaLink[],
    featured: false,
    slug: ''
  });

  const [newTechnology, setNewTechnology] = useState('');
  const [newSocialPlatform, setNewSocialPlatform] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [showAdditionalImageUpload, setShowAdditionalImageUpload] = useState(false);

  // JSON Import state
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [jsonSuccess, setJsonSuccess] = useState('');
  const [showJsonImport, setShowJsonImport] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await apiRequest('GET', '/api/cms/portfolio');
      const data = await response.json();
      console.log('Fetched projects:', data);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
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

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const addImage = (url: string, alt: string = '') => {
    setFormData(prev => {
      const isFirstImage = prev.images.length === 0;
      const newImage: PortfolioImage = {
        id: Date.now().toString(),
        url,
        alt,
        isHero: isFirstImage, // First image is hero by default
        order: prev.images.length
      };
      
      return {
        ...prev,
        images: [...prev.images, newImage],
        // If this is the first image, also set it as the hero image in imageUrl
        imageUrl: isFirstImage ? url : prev.imageUrl
      };
    });
  };

  const handleAdditionalImageUpload = (url: string, optimizedUrls?: any) => {
    addImage(url);
    setShowAdditionalImageUpload(false);
  };

  const removeImage = (imageId: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const setHeroImage = (imageId: string) => {
    setFormData(prev => {
      const updatedImages = prev.images.map(img => ({
        ...img,
        isHero: img.id === imageId
      }));
      
      // Find the hero image and update imageUrl
      const heroImage = updatedImages.find(img => img.isHero);
      
      return {
        ...prev,
        images: updatedImages,
        imageUrl: heroImage ? heroImage.url : prev.imageUrl
      };
    });
  };

  const addSocialMediaLink = () => {
    if (newSocialPlatform.trim() && newSocialUrl.trim()) {
      const newLink: SocialMediaLink = {
        platform: newSocialPlatform.trim(),
        url: newSocialUrl.trim()
      };
      
      setFormData(prev => ({
        ...prev,
        socialMediaLinks: [...prev.socialMediaLinks, newLink]
      }));
      
      setNewSocialPlatform('');
      setNewSocialUrl('');
    }
  };

  const removeSocialMediaLink = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      socialMediaLinks: prev.socialMediaLinks.filter(link => link.platform !== platform)
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      images: [],
      technologies: [],
      results: '',
      journey: '',
      visitSiteUrl: '',
      socialMediaLinks: [],
      featured: false,
      slug: ''
    });
    setEditingProject(null);
    setIsCreating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitting form data:', formData);
    
    try {
      if (editingProject) {
        const response = await apiRequest('PUT', `/api/cms/portfolio/${editingProject.id}`, formData);
        console.log('Update response:', response);
      } else {
        const response = await apiRequest('POST', '/api/cms/portfolio', formData);
        console.log('Create response:', response);
      }
      
      await fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      images: project.images || [],
      technologies: project.technologies,
      results: project.results,
      journey: project.journey || '',
      visitSiteUrl: project.visitSiteUrl || '',
      socialMediaLinks: project.socialMediaLinks || [],
      featured: project.featured,
      slug: project.slug
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await apiRequest('DELETE', `/api/cms/portfolio/${id}`);
        await fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  // JSON Import functions
  const parseAndPopulateJson = () => {
    try {
      setJsonError('');
      
      if (!jsonInput.trim()) {
        setJsonError('Please enter JSON data');
        return;
      }

      // Extract content fields first
      const { results, journey, jsonWithoutContent } = extractPortfolioContentAndRemoveFields(jsonInput);
      
      let parsedData;
      
      // Try to parse the original JSON first
      try {
        parsedData = JSON.parse(jsonInput);
      } catch (e) {
        // If that fails, try to convert from JavaScript object literal
        try {
          const convertedJson = convertPortfolioProjectToJson(jsonInput);
          parsedData = JSON.parse(convertedJson);
        } catch (convertError) {
          console.error('JSON parsing error:', convertError);
          setJsonError('Invalid JSON format. Please check your JSON syntax.');
          return;
        }
      }

      // Populate form with the data, using extracted content when available
      setFormData({
        title: parsedData.title || '',
        description: parsedData.description || '',
        imageUrl: parsedData.image_url || parsedData.imageUrl || '',
        images: parsedData.images || [],
        technologies: parsedData.technologies || [],
        results: results || parsedData.results || '',
        journey: journey || parsedData.journey || '',
        visitSiteUrl: parsedData.visitSiteUrl || parsedData.visit_site_url || '',
        socialMediaLinks: parsedData.socialMediaLinks || parsedData.social_media_links || [],
        featured: parsedData.featured || false,
        slug: parsedData.slug || generateSlug(parsedData.title || '')
      });

      // Clear JSON input and close import section
      setJsonInput('');
      setShowJsonImport(false);
      setIsCreating(true);
      
      // Show success message
      setJsonSuccess('Portfolio project data imported successfully! Form populated with extracted content.');
      setTimeout(() => setJsonSuccess(''), 3000);
      
    } catch (error) {
      console.error('JSON parsing error:', error);
      setJsonError(`Invalid JSON format: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      console.log('Attempting to copy to clipboard:', text.substring(0, 100) + '...');
      await navigator.clipboard.writeText(text);
      console.log('Successfully copied to clipboard');
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers or non-HTTPS
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        console.log('Successfully copied to clipboard using fallback method');
        return true;
      } catch (fallbackError) {
        console.error('Fallback copy method also failed:', fallbackError);
        return false;
      }
    }
  };

  const extractResults = () => {
    try {
      if (!jsonInput.trim()) {
        setJsonError('Please paste JSON data first.');
        return;
      }
      
      const { results, jsonWithoutContent } = extractPortfolioContentAndRemoveFields(jsonInput, 'results');
      console.log('Extracted results:', results);
      console.log('Results length:', results.length);
      console.log('Results is empty?', results === '');
      console.log('Results is falsy?', !results);
      
      if (!results) {
        setJsonError('No results content found in the JSON. Please check the format.');
        return;
      }
      
      // Copy results to clipboard
      navigator.clipboard.writeText(results).then(() => {
        // Update the textarea with JSON that has results field removed
        setJsonInput(jsonWithoutContent);
        setJsonError('');
        alert('Results content copied to clipboard! The results field has been removed from the JSON. You can now click "Import & Populate Form" to fill in the other fields, then paste the results into the results field.');
      }).catch(() => {
        // Fallback if clipboard API fails
        setJsonInput(jsonWithoutContent);
        setJsonError('');
        alert('Results content extracted! The results field has been removed from the JSON. Please manually copy the content from the form field.');
      });
      
    } catch (error) {
      console.error('Extract results error:', error);
      setJsonError('Failed to extract results. Please check your input format.');
    }
  };

  const extractJourney = () => {
    try {
      if (!jsonInput.trim()) {
        setJsonError('Please paste JSON data first.');
        return;
      }
      
      const { journey, jsonWithoutContent } = extractPortfolioContentAndRemoveFields(jsonInput, 'journey');
      console.log('Extracted journey:', journey);
      
      if (!journey) {
        setJsonError('No journey content found in the JSON. Please check the format.');
        return;
      }
      
      // Copy journey to clipboard
      navigator.clipboard.writeText(journey).then(() => {
        // Update the textarea with JSON that has journey field removed
        setJsonInput(jsonWithoutContent);
        setJsonError('');
        alert('Journey content copied to clipboard! The journey field has been removed from the JSON. You can now click "Import & Populate Form" to fill in the other fields, then paste the journey into the journey field.');
      }).catch(() => {
        // Fallback if clipboard API fails
        setJsonInput(jsonWithoutContent);
        setJsonError('');
        alert('Journey content extracted! The journey field has been removed from the JSON. Please manually copy the content from the form field.');
      });
      
    } catch (error) {
      console.error('Extract journey error:', error);
      setJsonError('Failed to extract journey. Please check your input format.');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio Project Management</h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowJsonImport(!showJsonImport)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            {showJsonImport ? 'Hide' : 'Show'} JSON Import
          </Button>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* JSON Import Section */}
      {showJsonImport && (
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Import Portfolio Project from JSON
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="jsonInput">Paste JSON Data</Label>
                <Textarea
                  id="jsonInput"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste your portfolio project JSON data here..."
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-gray-500 mt-1">
                  You can paste JavaScript object literals or JSON. The system will automatically convert and extract content fields.
                </p>
              </div>
              
              {jsonError && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded">
                  {jsonError}
                </div>
              )}
              
              {jsonSuccess && (
                <div className="text-green-600 text-sm bg-green-50 p-3 rounded border border-green-200">
                  {jsonSuccess}
                </div>
              )}
              
              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={parseAndPopulateJson}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Import & Populate Form
                </Button>
                <Button 
                  onClick={extractResults}
                  variant="outline"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Extract Results
                </Button>
                <Button 
                  onClick={extractJourney}
                  variant="outline"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Extract Journey
                </Button>

                <Button 
                  onClick={() => setJsonInput('')}
                  variant="outline"
                >
                  Clear
                </Button>
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
              {editingProject ? 'Edit Portfolio Project' : 'Create New Portfolio Project'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter project title"
                    required
                  />
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
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of the project"
                  rows={3}
                  required
                />
              </div>

              {/* Visit Site URL */}
              <div className="space-y-2">
                <Label htmlFor="visitSiteUrl" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Visit Site URL
                </Label>
                <Input
                  id="visitSiteUrl"
                  type="url"
                  value={formData.visitSiteUrl}
                  onChange={(e) => handleInputChange('visitSiteUrl', e.target.value)}
                  placeholder="https://example.com"
                />
                <p className="text-sm text-gray-500">
                  Link to the live project website
                </p>
              </div>

              {/* Hero Image */}
              <div className="space-y-2">
                <OptimizedImageUpload
                  value={formData.imageUrl}
                  onChange={(url, optimizedUrls) => {
                    handleInputChange('imageUrl', url);
                    
                    // If this is the first image, add it to the images array as hero
                    if (formData.images.length === 0) {
                      const heroImage: PortfolioImage = {
                        id: Date.now().toString(),
                        url,
                        alt: 'Hero image',
                        isHero: true,
                        order: 0
                      };
                      setFormData(prev => ({
                        ...prev,
                        imageUrl: url,
                        images: [heroImage],
                        optimizedImageUrls: optimizedUrls
                      }));
                    } else {
                      // Update existing hero image
                      setFormData(prev => ({
                        ...prev,
                        imageUrl: url,
                        images: prev.images.map(img => 
                          img.isHero ? { ...img, url } : img
                        ),
                        optimizedImageUrls: optimizedUrls
                      }));
                    }
                  }}
                  onError={(error) => setImageError(error)}
                  label="Hero Image"
                  placeholder="Upload the main project image"
                  folder="portfolio-images"
                  showProgress={true}
                />
                {imageError && (
                  <p className="text-red-500 text-sm">{imageError}</p>
                )}
              </div>

              {/* Additional Images */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  <Label>Additional Project Images</Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.images.map((image) => (
                    <Card key={image.id} className="relative">
                      <CardContent className="p-3">
                        <img 
                          src={image.url} 
                          alt={image.alt} 
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                        <div className="flex items-center justify-between">
                          <Badge variant={image.isHero ? "default" : "secondary"} className="text-xs">
                            {image.isHero ? "Hero" : "Gallery"}
                          </Badge>
                          <div className="flex gap-1">
                            {!image.isHero && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setHeroImage(image.id)}
                                className="text-xs"
                              >
                                Set Hero
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeImage(image.id)}
                              className="text-xs text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card 
                    className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
                    onClick={() => setShowAdditionalImageUpload(true)}
                  >
                    <CardContent className="p-6 flex flex-col items-center justify-center h-32">
                      <Plus className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 text-center">Add Image</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Additional Image Upload Modal */}
              {showAdditionalImageUpload && (
                <Card className="border-2 border-cyan-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Upload Additional Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <OptimizedImageUpload
                        value=""
                        onChange={handleAdditionalImageUpload}
                        onError={(error) => setImageError(error)}
                        label="Additional Image"
                        placeholder="Upload an additional project image"
                        folder="portfolio-images"
                        showProgress={true}
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setShowAdditionalImageUpload(false)}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Project Journey */}
              <div className="space-y-2">
                <Label htmlFor="journey">Project Journey & Process</Label>
                <Textarea
                  id="journey"
                  value={formData.journey}
                  onChange={(e) => handleInputChange('journey', e.target.value)}
                  placeholder="Describe the journey of creating this project - challenges, process, team collaboration, etc. (HTML supported)"
                  rows={6}
                />
                <p className="text-sm text-gray-500">
                  Share the story behind the project. You can use HTML tags for formatting.
                </p>
              </div>

              {/* Social Media Links */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  <Label>Social Media Links</Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    value={newSocialPlatform}
                    onChange={(e) => setNewSocialPlatform(e.target.value)}
                    placeholder="Platform (e.g., Instagram, Twitter)"
                  />
                  <Input
                    value={newSocialUrl}
                    onChange={(e) => setNewSocialUrl(e.target.value)}
                    placeholder="URL"
                    type="url"
                  />
                </div>
                <Button 
                  type="button" 
                  onClick={addSocialMediaLink} 
                  variant="outline"
                  disabled={!newSocialPlatform.trim() || !newSocialUrl.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Social Link
                </Button>
                <div className="flex flex-wrap gap-2">
                  {formData.socialMediaLinks.map((link, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {link.platform}
                      <button
                        type="button"
                        onClick={() => removeSocialMediaLink(link.platform)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    placeholder="Add a technology"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  />
                  <Button type="button" onClick={addTechnology} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="space-y-2">
                <Label htmlFor="results">Project Results & Impact *</Label>
                <Textarea
                  id="results"
                  value={formData.results}
                  onChange={(e) => handleInputChange('results', e.target.value)}
                  placeholder="Describe the results, metrics, and impact of this project (HTML supported)"
                  rows={12}
                  required
                />
                <p className="text-sm text-gray-500">
                  You can use HTML tags for formatting (e.g., &lt;h3&gt;, &lt;h4&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;)
                </p>
              </div>

              {/* Featured Status */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
                <Label htmlFor="featured" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Featured Project
                </Label>
              </div>

              {/* Form Actions */}
              <div className="flex gap-2">
                <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
                  <Save className="w-4 h-4 mr-2" />
                  {editingProject ? 'Update Project' : 'Create Project'}
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

      {/* Projects List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Existing Projects</h3>
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{project.title}</h4>
                      {project.featured && (
                        <Badge className="bg-cyan-500 flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                      <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(project.id)}
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