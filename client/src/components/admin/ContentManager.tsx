import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Home } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface ContentItem {
  id?: string;
  content_type: string;
  content_key: string;
  content_value: any;
}

export const ContentManager = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Hero form state
  const [hero, setHero] = useState({
    title: 'Transform Your Business with AI-Powered Digital Marketing',
    subtitle: 'We help businesses grow through integrity, innovation, and measurable results.',
    cta: 'Get Started Today'
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const heroResponse = await apiRequest('GET', '/api/cms/content/hero');
      const heroData = await heroResponse.json();

      console.log('Loaded hero data:', heroData);

      // Process hero data
      if (heroData.length > 0) {
        const heroMap: any = {};
        heroData.forEach((item: ContentItem) => {
          heroMap[item.content_key] = item.content_value;
        });
        setHero(heroMap);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading content:', error);
      setLoading(false);
    }
  };

  const saveContent = async (type: string, key: string, value: any) => {
    setSaving(true);
    setMessage('');

    try {
      console.log(`Saving ${type}/${key}:`, value);
      const response = await apiRequest('PUT', `/api/cms/content/${type}/${key}`, { content_value: value });
      const result = await response.json();
      console.log(`Save result for ${type}/${key}:`, result);
      
      // Parse the response to see what was actually saved
      if (result && result.content_value) {
        console.log(`Actual saved value for ${type}/${key}:`, result.content_value);
      }
      
      setMessage('Content saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const handleHeroSave = async () => {
    await Promise.all([
      saveContent('hero', 'title', hero.title),
      saveContent('hero', 'subtitle', hero.subtitle),
      saveContent('hero', 'cta', hero.cta)
    ]);
  };

  if (loading) {
    return <div className="text-white">Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      {message && (
        <Alert className={message.includes('Error') ? 'border-red-500' : 'border-green-500'}>
          <AlertDescription className={message.includes('Error') ? 'text-red-400' : 'text-green-400'}>
            {message}
          </AlertDescription>
        </Alert>
      )}

             <Tabs defaultValue="hero" className="space-y-4">
         <TabsList className="grid w-full grid-cols-1 bg-gray-700 border border-gray-600">
           <TabsTrigger 
             value="hero" 
             className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
           >
             <Home className="w-4 h-4 mr-2" />
             Hero Section
           </TabsTrigger>
         </TabsList>

        

        <TabsContent value="hero" className="space-y-4">
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Hero Section Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero-title" className="text-gray-300">Main Title</Label>
                <Input
                  id="hero-title"
                  value={hero.title}
                  onChange={(e) => setHero(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-600 border-gray-500 text-white"
                />
              </div>
              <div>
                <Label htmlFor="hero-subtitle" className="text-gray-300">Subtitle</Label>
                <Textarea
                  id="hero-subtitle"
                  value={hero.subtitle}
                  onChange={(e) => setHero(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="bg-gray-600 border-gray-500 text-white"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="hero-cta" className="text-gray-300">Call to Action Text</Label>
                <Input
                  id="hero-cta"
                  value={hero.cta}
                  onChange={(e) => setHero(prev => ({ ...prev, cta: e.target.value }))}
                  className="bg-gray-600 border-gray-500 text-white"
                />
              </div>

              <Button
                onClick={handleHeroSave}
                disabled={saving}
                className="bg-cyan-500 hover:bg-cyan-600"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Hero Content'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}; 