import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) =>
      apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: 'Message sent successfully!',
        description: 'We\'ll get back to you within 24 hours.',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error sending message',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name *</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400"
                    placeholder="Your full name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email *</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="email"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400"
                    placeholder="your.email@company.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Company</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400"
                    placeholder="Your company name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Service Interest</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-cyan-400">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="seo">SEO Services</SelectItem>
                    <SelectItem value="ppc">PPC Advertising</SelectItem>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="content-marketing">Content Marketing</SelectItem>
                    <SelectItem value="social-media">Social Media Marketing</SelectItem>
                    <SelectItem value="email-marketing">Email Marketing</SelectItem>
                    <SelectItem value="consultation">General Consultation</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Message *</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 min-h-[120px]"
                  placeholder="Tell us about your project, goals, or any questions you have..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  );
}; 