import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Calendar, ExternalLink, Code, TrendingUp, Globe, Share2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiRequest } from '@/lib/queryClient';

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
  image_url?: string;
  images?: PortfolioImage[];
  technologies: string[];
  results: string;
  journey?: string;
  visitSiteUrl?: string;
  socialMediaLinks?: SocialMediaLink[];
  featured: boolean;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

export default function PortfolioProjectPage() {
  const [, setLocation] = useLocation();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Get slug from URL
  const slug = window.location.pathname.split('/portfolio/')[1];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        
        // Fetch specific portfolio project by slug
        const response = await apiRequest('GET', `/api/public/portfolio/${slug}`);
        const foundProject = await response.json();

        if (foundProject && !foundProject.error) {
          console.log('Found project:', foundProject);
          setProject(foundProject);
          // Set initial selected image
          if (foundProject.images && foundProject.images.length > 0) {
            const heroImage = foundProject.images.find(img => img.isHero);
            setSelectedImage(heroImage ? heroImage.url : foundProject.images[0].url);
          } else {
            setSelectedImage(foundProject.imageUrl || foundProject.image_url || null);
          }
        } else {
          setError('Portfolio project not found');
        }
      } catch (err) {
        console.error('Error fetching portfolio project:', err);
        setError('Failed to load portfolio project');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getHeroImage = (project: PortfolioProject) => {
    if (project.images && project.images.length > 0) {
      const heroImage = project.images.find(img => img.isHero);
      return heroImage ? heroImage.url : project.images[0].url;
    }
    return project.imageUrl || project.image_url || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">The portfolio project you're looking for doesn't exist.</p>
          <Button onClick={() => setLocation('/')} className="bg-cyan-500 hover:bg-cyan-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const createdDate = project.createdAt || project.created_at || '';
  const updatedDate = project.updatedAt || project.updated_at || '';

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {createdDate && formatDate(createdDate)}
                </div>
                {project.featured && (
                  <Badge className="bg-cyan-500 text-white">
                    Featured Project
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-white leading-tight">
                {project.title}
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                {project.description}
              </p>

              {/* Visit Site Button */}
              {project.visitSiteUrl && (
                <div className="pt-4">
                  <Button 
                    asChild
                    className="bg-cyan-500 hover:bg-cyan-600 text-white"
                  >
                    <a 
                      href={project.visitSiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Live Site
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {/* Project Images */}
            {selectedImage && (
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src={selectedImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image Gallery */}
                {project.images && project.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {project.images.map((image) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage(image.url)}
                        className={`aspect-video rounded-lg overflow-hidden transition-all duration-200 ${
                          selectedImage === image.url 
                            ? 'ring-2 ring-cyan-400' 
                            : 'hover:ring-2 hover:ring-gray-400'
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt || project.title}
                          className="w-full h-full object-cover"
                        />
                        {image.isHero && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-cyan-500 text-white text-xs">
                              Hero
                            </Badge>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Project Journey */}
            {project.journey && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Project Journey & Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: project.journey }} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Results */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Results & Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: project.results }} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies Used */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Technologies Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            {project.socialMediaLinks && project.socialMediaLinks.length > 0 && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Share2 className="w-5 h-5 mr-2" />
                    Social Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.socialMediaLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <span className="text-gray-300">{link.platform}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Details */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Status:</span>
                  <Badge className="bg-green-500 text-white">Completed</Badge>
                </div>
                {createdDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">{formatDate(createdDate)}</span>
                  </div>
                )}
                {updatedDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Updated:</span>
                    <span className="text-white">{formatDate(updatedDate)}</span>
                  </div>
                )}
                {project.images && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Images:</span>
                    <span className="text-white">{project.images.length}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Interested in a similar project?
                </h3>
                <p className="text-gray-300 mb-6">
                  Let's discuss how we can help bring your vision to life with our expertise in digital marketing and web development.
                </p>
                <Button 
                  onClick={() => setLocation('/#contact')} 
                  className="w-full bg-cyan-500 hover:bg-cyan-600"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 