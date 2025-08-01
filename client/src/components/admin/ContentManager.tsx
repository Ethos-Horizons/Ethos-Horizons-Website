import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, DollarSign, Home, Users } from 'lucide-react';
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

  // Pricing form state
  const [pricing, setPricing] = useState({
    setup: { price: 2500, title: 'Online Presence Setup', description: 'Complete website and online presence setup' },
    growth: { price: 1200, title: 'Growth Retainer', description: 'Monthly growth and maintenance services' },
    premium: { price: 2500, title: 'Premium Retainer', description: 'Comprehensive monthly services' }
  });

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
      const [pricingData, heroData] = await Promise.all([
        apiRequest('GET', '/api/cms/content/pricing'),
        apiRequest('GET', '/api/cms/content/hero')
      ]);

      // Process pricing data
      if (pricingData.length > 0) {
        const pricingMap: any = {};
        pricingData.forEach((item: ContentItem) => {
          pricingMap[item.content_key] = item.content_value;
        });
        setPricing(pricingMap);
      }

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
      await apiRequest('PUT', `/api/cms/content/${type}/${key}`, { content_value: value });
      setMessage('Content saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const handlePricingSave = async () => {
    await Promise.all([
      saveContent('pricing', 'setup', pricing.setup),
      saveContent('pricing', 'growth', pricing.growth),
      saveContent('pricing', 'premium', pricing.premium)
    ]);
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

      <Tabs defaultValue="pricing" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-gray-700 border border-gray-600">
          <TabsTrigger 
            value="pricing" 
            className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Pricing
          </TabsTrigger>
          <TabsTrigger 
            value="hero" 
            className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
          >
            <Home className="w-4 h-4 mr-2" />
            Hero Section
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="space-y-4">
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Pricing Tiers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Setup Plan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Online Presence Setup</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="setup-price" className="text-gray-300">Price ($)</Label>
                    <Input
                      id="setup-price"
                      type="number"
                      value={pricing.setup.price}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        setup: { ...prev.setup, price: e.target.value === '' ? 0 : Number(e.target.value) }
                      }))}
                      className="bg-gray-600 border-gray-500 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="setup-title" className="text-gray-300">Title</Label>
                    <Input
                      id="setup-title"
                      value={pricing.setup.title}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        setup: { ...prev.setup, title: e.target.value }
                      }))}
                      className="bg-gray-600 border-gray-500 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="setup-description" className="text-gray-300">Description</Label>
                  <Textarea
                    id="setup-description"
                    value={pricing.setup.description}
                    onChange={(e) => setPricing(prev => ({
                      ...prev,
                      setup: { ...prev.setup, description: e.target.value }
                    }))}
                    className="bg-gray-600 border-gray-500 text-white"
                    rows={3}
                  />
                </div>
              </div>

              {/* Growth Plan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Growth Retainer</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="growth-price" className="text-gray-300">Price ($/month)</Label>
                    <Input
                      id="growth-price"
                      type="number"
                      value={pricing.growth.price}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        growth: { ...prev.growth, price: e.target.value === '' ? 0 : Number(e.target.value) }
                      }))}
                      className="bg-gray-600 border-gray-500 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="growth-title" className="text-gray-300">Title</Label>
                    <Input
                      id="growth-title"
                      value={pricing.growth.title}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        growth: { ...prev.growth, title: e.target.value }
                      }))}
                      className="bg-gray-600 border-gray-500 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="growth-description" className="text-gray-300">Description</Label>
                  <Textarea
                    id="growth-description"
                    value={pricing.growth.description}
                    onChange={(e) => setPricing(prev => ({
                      ...prev,
                      growth: { ...prev.growth, description: e.target.value }
                    }))}
                    className="bg-gray-600 border-gray-500 text-white"
                    rows={3}
                  />
                </div>
              </div>

              {/* Premium Plan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Premium Retainer</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="premium-price" className="text-gray-300">Price ($/month)</Label>
                    <Input
                      id="premium-price"
                      type="number"
                      value={pricing.premium.price}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        premium: { ...prev.premium, price: e.target.value === '' ? 0 : Number(e.target.value) }
                      }))}
                      className="bg-gray-600 border-gray-500 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="premium-title" className="text-gray-300">Title</Label>
                    <Input
                      id="premium-title"
                      value={pricing.premium.title}
                      onChange={(e) => setPricing(prev => ({
                        ...prev,
                        premium: { ...prev.premium, title: e.target.value }
                      }))}
                      className="bg-gray-600 border-gray-500 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="premium-description" className="text-gray-300">Description</Label>
                  <Textarea
                    id="premium-description"
                    value={pricing.premium.description}
                    onChange={(e) => setPricing(prev => ({
                      ...prev,
                      premium: { ...prev.premium, description: e.target.value }
                    }))}
                    className="bg-gray-600 border-gray-500 text-white"
                    rows={3}
                  />
                </div>
              </div>

              <Button
                onClick={handlePricingSave}
                disabled={saving}
                className="bg-cyan-500 hover:bg-cyan-600"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Pricing'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

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