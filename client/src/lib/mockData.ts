export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  technologies: string[];
  results: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "5 Essential SEO Strategies for Local Businesses in 2024",
    excerpt: "Discover the most effective SEO techniques that local businesses can implement to improve their search rankings and attract more customers.",
    content: `
      <h2>Introduction</h2>
      <p>In today's digital landscape, local businesses face unique challenges when it comes to search engine optimization. With the rise of mobile search and voice queries, local SEO has become more important than ever. This comprehensive guide will walk you through the five essential strategies that every local business should implement in 2024.</p>
      
      <h2>1. Google Business Profile Optimization</h2>
      <p>Your Google Business Profile (formerly Google My Business) is often the first impression potential customers have of your business. Here's how to optimize it:</p>
      <ul>
        <li>Complete all profile information including hours, services, and photos</li>
        <li>Regularly post updates and respond to reviews</li>
        <li>Use relevant keywords in your business description</li>
        <li>Add high-quality photos of your business, products, and team</li>
      </ul>
      
      <h2>2. Local Keyword Research</h2>
      <p>Local keyword research is the foundation of any successful local SEO strategy. Focus on:</p>
      <ul>
        <li>Location-specific keywords (e.g., "restaurant in [city name]")</li>
        <li>Service-based keywords with local modifiers</li>
        <li>Long-tail keywords that reflect customer intent</li>
        <li>Voice search optimization for conversational queries</li>
      </ul>
      
      <h2>3. Local Link Building</h2>
      <p>Building local backlinks helps establish your business as an authority in your community:</p>
      <ul>
        <li>Partner with local businesses and organizations</li>
        <li>Get listed in local business directories</li>
        <li>Sponsor local events and get mentioned in coverage</li>
        <li>Create shareable local content</li>
      </ul>
      
      <h2>4. Mobile-First Website Design</h2>
      <p>With over 60% of local searches happening on mobile devices, your website must be mobile-optimized:</p>
      <ul>
        <li>Ensure fast loading times (under 3 seconds)</li>
        <li>Use responsive design that works on all screen sizes</li>
        <li>Implement click-to-call and directions features</li>
        <li>Optimize for local search intent</li>
      </ul>
      
      <h2>5. Customer Reviews and Reputation Management</h2>
      <p>Online reviews significantly impact local search rankings and customer trust:</p>
      <ul>
        <li>Encourage satisfied customers to leave reviews</li>
        <li>Respond to all reviews, both positive and negative</li>
        <li>Monitor your online reputation across all platforms</li>
        <li>Use review management tools to stay organized</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Implementing these five essential SEO strategies will help your local business improve its online visibility and attract more customers. Remember that local SEO is an ongoing process that requires consistent effort and monitoring. Start with these fundamentals and gradually build upon them as you see results.</p>
      
      <p>Need help implementing these strategies? Our team at Ethos Digital specializes in local SEO and can help your business dominate local search results.</p>
    `,
    author: "Ethos Digital Team",
    category: "seo",
    tags: ["Local SEO", "Google Business Profile", "Keyword Research"],
    image_url: "https://picsum.photos/400/250?random=4",
    published: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    title: "How AI is Revolutionizing Digital Marketing for Small Businesses",
    excerpt: "Explore how artificial intelligence is making digital marketing more accessible and effective for businesses of all sizes.",
    content: `
      <h2>The AI Revolution in Digital Marketing</h2>
      <p>Artificial Intelligence is transforming the way small businesses approach digital marketing. From automated content creation to predictive analytics, AI tools are making sophisticated marketing strategies accessible to businesses of all sizes.</p>
      
      <h2>AI-Powered Content Creation</h2>
      <p>Content creation is one of the most time-consuming aspects of digital marketing. AI tools are changing this:</p>
      <ul>
        <li>Automated blog post generation based on trending topics</li>
        <li>Social media content scheduling and optimization</li>
        <li>Personalized email marketing campaigns</li>
        <li>Video content creation and editing</li>
      </ul>
      
      <h2>Predictive Analytics and Customer Insights</h2>
      <p>AI algorithms can analyze vast amounts of data to predict customer behavior:</p>
      <ul>
        <li>Identify high-value customer segments</li>
        <li>Predict customer churn and retention</li>
        <li>Optimize pricing strategies</li>
        <li>Forecast sales and marketing ROI</li>
      </ul>
      
      <h2>Chatbots and Customer Service</h2>
      <p>AI-powered chatbots are revolutionizing customer service:</p>
      <ul>
        <li>24/7 customer support availability</li>
        <li>Instant responses to common questions</li>
        <li>Lead qualification and appointment scheduling</li>
        <li>Multilingual support capabilities</li>
      </ul>
      
      <h2>Personalization at Scale</h2>
      <p>AI enables personalization that was previously only possible for large enterprises:</p>
      <ul>
        <li>Dynamic website content based on user behavior</li>
        <li>Personalized product recommendations</li>
        <li>Customized email marketing sequences</li>
        <li>Targeted advertising campaigns</li>
      </ul>
      
      <h2>Getting Started with AI Marketing</h2>
      <p>For small businesses looking to implement AI marketing:</p>
      <ol>
        <li>Start with simple automation tools</li>
        <li>Focus on one area at a time</li>
        <li>Measure results and iterate</li>
        <li>Invest in training for your team</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>AI is not just a trend—it's the future of digital marketing. Small businesses that embrace AI tools early will have a significant competitive advantage. The key is to start small, measure results, and gradually expand your AI marketing capabilities.</p>
    `,
    author: "Ethos Digital Team",
    category: "ai-marketing",
    tags: ["AI Marketing", "Automation", "Small Business"],
    image_url: "https://picsum.photos/400/250?random=5",
    published: true,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z"
  },
  {
    id: "3",
    title: "Building a Successful Podcast Website: A Complete Guide",
    excerpt: "Learn the essential elements and best practices for creating a professional podcast website that engages listeners and drives growth.",
    content: `
      <h2>Why Your Podcast Needs a Professional Website</h2>
      <p>In today's crowded podcast landscape, having a professional website is essential for building your brand, engaging with listeners, and growing your audience. A well-designed podcast website serves as your digital headquarters and can significantly impact your show's success.</p>
      
      <h2>Essential Website Elements</h2>
      <h3>1. Homepage Design</h3>
      <p>Your homepage should immediately communicate what your podcast is about:</p>
      <ul>
        <li>Clear value proposition and show description</li>
        <li>Featured episodes with compelling thumbnails</li>
        <li>Call-to-action buttons for subscribing</li>
        <li>Social proof (download numbers, reviews)</li>
      </ul>
      
      <h3>2. Episode Pages</h3>
      <p>Each episode should have its own dedicated page with:</p>
      <ul>
        <li>Embedded audio player</li>
        <li>Detailed show notes and timestamps</li>
        <li>Guest information and links</li>
        <li>Social sharing buttons</li>
        <li>Related episodes</li>
      </ul>
      
      <h3>3. About Page</h3>
      <p>Help listeners connect with you and your show:</p>
      <ul>
        <li>Host bio and photos</li>
        <li>Show mission and values</li>
        <li>Behind-the-scenes content</li>
        <li>Contact information</li>
      </ul>
      
      <h2>Technical Considerations</h2>
      <h3>SEO Optimization</h3>
      <p>Optimize your podcast website for search engines:</p>
      <ul>
        <li>Use relevant keywords in titles and descriptions</li>
        <li>Create transcriptions for each episode</li>
        <li>Optimize images with alt text</li>
        <li>Ensure fast loading times</li>
      </ul>
      
      <h3>Mobile Responsiveness</h3>
      <p>With most podcast listening happening on mobile devices:</p>
      <ul>
        <li>Ensure your website works perfectly on all devices</li>
        <li>Optimize audio players for mobile</li>
        <li>Use touch-friendly navigation</li>
        <li>Test on various screen sizes</li>
      </ul>
      
      <h2>Monetization Features</h2>
      <p>Your podcast website can become a revenue stream:</p>
      <ul>
        <li>Premium content areas</li>
        <li>Merchandise stores</li>
        <li>Sponsorship opportunities</li>
        <li>Email list building</li>
        <li>Affiliate marketing integration</li>
      </ul>
      
      <h2>Analytics and Tracking</h2>
      <p>Monitor your website's performance:</p>
      <ul>
        <li>Track visitor behavior and engagement</li>
        <li>Monitor conversion rates</li>
        <li>Analyze traffic sources</li>
        <li>Measure podcast download attribution</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>A professional podcast website is an investment in your show's long-term success. By focusing on user experience, SEO, and monetization opportunities, you can create a powerful platform that supports your podcast's growth and engages your audience.</p>
    `,
    author: "Ethos Digital Team",
    category: "web-development",
    tags: ["Podcast", "Web Development", "Content Strategy"],
    image_url: "https://picsum.photos/400/250?random=6",
    published: true,
    created_at: "2024-01-08T10:00:00Z",
    updated_at: "2024-01-08T10:00:00Z"
  },
  {
    id: "4",
    title: "The Ultimate Guide to Google Business Profile Optimization",
    excerpt: "Step-by-step guide to optimizing your Google Business Profile to increase local visibility and attract more customers.",
    content: `
      <h2>What is Google Business Profile?</h2>
      <p>Google Business Profile (formerly Google My Business) is a free tool that allows businesses to manage their online presence across Google, including Search and Maps. It's one of the most powerful tools for local SEO and customer discovery.</p>
      
      <h2>Setting Up Your Profile</h2>
      <h3>1. Claim Your Business</h3>
      <p>Start by claiming your business listing:</p>
      <ul>
        <li>Search for your business on Google</li>
        <li>Click "Claim this business" if it exists</li>
        <li>Create a new listing if it doesn't exist</li>
        <li>Verify your ownership through postcard or phone</li>
      </ul>
      
      <h3>2. Complete Your Profile</h3>
      <p>Fill out every section of your profile:</p>
      <ul>
        <li>Business name, address, and phone number</li>
        <li>Business hours and special hours</li>
        <li>Business category and description</li>
        <li>Services and products offered</li>
        <li>High-quality photos and videos</li>
      </ul>
      
      <h2>Optimization Strategies</h2>
      <h3>Keyword Optimization</h3>
      <p>Use relevant keywords throughout your profile:</p>
      <ul>
        <li>Include location-specific keywords in your business name</li>
        <li>Use descriptive business categories</li>
        <li>Optimize your business description with relevant terms</li>
        <li>Add keywords to your services and products</li>
      </ul>
      
      <h3>Content Management</h3>
      <p>Regular content updates improve your visibility:</p>
      <ul>
        <li>Post regular updates about your business</li>
        <li>Share photos of your products, team, and location</li>
        <li>Create posts about events, offers, and news</li>
        <li>Use Google's Q&A feature to answer customer questions</li>
      </ul>
      
      <h2>Review Management</h2>
      <p>Reviews are crucial for local SEO and customer trust:</p>
      <ul>
        <li>Encourage satisfied customers to leave reviews</li>
        <li>Respond to all reviews promptly and professionally</li>
        <li>Address negative reviews constructively</li>
        <li>Use review management tools to stay organized</li>
      </ul>
      
      <h2>Performance Tracking</h2>
      <p>Monitor your Google Business Profile performance:</p>
      <ul>
        <li>Track views, clicks, and calls</li>
        <li>Monitor review ratings and responses</li>
        <li>Analyze customer actions and inquiries</li>
        <li>Use insights to optimize your strategy</li>
      </ul>
      
      <h2>Advanced Features</h2>
      <p>Take advantage of advanced Google Business Profile features:</p>
      <ul>
        <li>Messaging for direct customer communication</li>
        <li>Booking integration for appointment scheduling</li>
        <li>Product catalogs for e-commerce businesses</li>
        <li>Virtual tours and 360-degree photos</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Google Business Profile optimization is an ongoing process that requires regular attention and updates. By following these best practices, you can improve your local visibility, attract more customers, and build trust with your audience.</p>
    `,
    author: "Ethos Digital Team",
    category: "local-marketing",
    tags: ["Google Business Profile", "Local Marketing", "SEO"],
    image_url: "https://picsum.photos/400/250?random=7",
    published: true,
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-05T10:00:00Z"
  },
  {
    id: "5",
    title: "Content Marketing Strategies That Actually Drive Results",
    excerpt: "Proven content marketing strategies that help businesses build authority, attract customers, and drive conversions.",
    content: `
      <h2>The Power of Strategic Content Marketing</h2>
      <p>Content marketing is more than just creating blog posts and social media updates. It's a strategic approach to creating and distributing valuable, relevant content that attracts and retains a clearly defined audience. When done right, content marketing can be one of your most effective marketing channels.</p>
      
      <h2>Developing Your Content Strategy</h2>
      <h3>1. Define Your Audience</h3>
      <p>Before creating any content, you need to understand your audience:</p>
      <ul>
        <li>Create detailed buyer personas</li>
        <li>Identify pain points and challenges</li>
        <li>Understand their content consumption habits</li>
        <li>Map their buyer's journey</li>
      </ul>
      
      <h3>2. Set Clear Goals</h3>
      <p>Your content marketing goals should align with your business objectives:</p>
      <ul>
        <li>Increase brand awareness</li>
        <li>Generate leads and conversions</li>
        <li>Build customer loyalty</li>
        <li>Establish thought leadership</li>
      </ul>
      
      <h2>Content Types and Formats</h2>
      <h3>Blog Posts and Articles</h3>
      <p>The foundation of most content marketing strategies:</p>
      <ul>
        <li>How-to guides and tutorials</li>
        <li>Industry insights and trends</li>
        <li>Case studies and success stories</li>
        <li>Expert interviews and Q&As</li>
      </ul>
      
      <h3>Visual Content</h3>
      <p>Visual content is highly engaging and shareable:</p>
      <ul>
        <li>Infographics and data visualizations</li>
        <li>Videos and webinars</li>
        <li>Podcasts and audio content</li>
        <li>Social media graphics</li>
      </ul>
      
      <h2>Distribution and Promotion</h2>
      <p>Creating great content is only half the battle. You also need to promote it:</p>
      <ul>
        <li>Share on social media platforms</li>
        <li>Email marketing campaigns</li>
        <li>Guest posting on industry websites</li>
        <li>Influencer outreach and partnerships</li>
        <li>Paid promotion and advertising</li>
      </ul>
      
      <h2>SEO and Content Optimization</h2>
      <p>Optimize your content for search engines:</p>
      <ul>
        <li>Keyword research and optimization</li>
        <li>Internal linking strategies</li>
        <li>Meta descriptions and title tags</li>
        <li>Image optimization and alt text</li>
        <li>Mobile-friendly content design</li>
      </ul>
      
      <h2>Measuring Success</h2>
      <p>Track your content marketing performance:</p>
      <ul>
        <li>Website traffic and engagement metrics</li>
        <li>Lead generation and conversion rates</li>
        <li>Social media reach and engagement</li>
        <li>Email open rates and click-through rates</li>
        <li>ROI and revenue attribution</li>
      </ul>
      
      <h2>Content Calendar and Consistency</h2>
      <p>Maintain consistency with a content calendar:</p>
      <ul>
        <li>Plan content themes and topics</li>
        <li>Set publishing schedules</li>
        <li>Coordinate across different channels</li>
        <li>Repurpose content for multiple formats</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Content marketing is a long-term strategy that requires patience and consistency. By focusing on creating valuable content for your audience, optimizing for search engines, and promoting effectively, you can build a sustainable content marketing program that drives real business results.</p>
    `,
    author: "Ethos Digital Team",
    category: "content-marketing",
    tags: ["Content Marketing", "Strategy", "ROI"],
    image_url: "https://picsum.photos/400/250?random=8",
    published: true,
    created_at: "2024-01-03T10:00:00Z",
    updated_at: "2024-01-03T10:00:00Z"
  },
  {
    id: "6",
    title: "Social Media Marketing for Local Businesses: Best Practices",
    excerpt: "Effective social media strategies specifically designed for local businesses to build community and drive foot traffic.",
    content: `
      <h2>Why Local Businesses Need Social Media</h2>
      <p>Social media has become essential for local businesses looking to connect with their community, build brand awareness, and drive foot traffic. With the right strategy, social media can be a powerful tool for local business growth.</p>
      
      <h2>Choosing the Right Platforms</h2>
      <h3>Facebook</h3>
      <p>Facebook remains the most important platform for local businesses:</p>
      <ul>
        <li>Large user base with local targeting capabilities</li>
        <li>Business page features and local search integration</li>
        <li>Event promotion and community building</li>
        <li>Messaging and customer service tools</li>
      </ul>
      
      <h3>Instagram</h3>
      <p>Perfect for businesses with visual appeal:</p>
      <ul>
        <li>Showcase products and services with high-quality photos</li>
        <li>Stories for behind-the-scenes content</li>
        <li>Reels for engaging video content</li>
        <li>Local hashtags and location tagging</li>
      </ul>
      
      <h3>Nextdoor</h3>
      <p>Specifically designed for local communities:</p>
      <ul>
        <li>Connect with neighbors and local customers</li>
        <li>Share local news and updates</li>
        <li>Respond to recommendations and reviews</li>
        <li>Participate in local discussions</li>
      </ul>
      
      <h2>Content Strategy for Local Businesses</h2>
      <h3>Local-Focused Content</h3>
      <p>Create content that resonates with your local audience:</p>
      <ul>
        <li>Share local news and events</li>
        <li>Highlight community involvement</li>
        <li>Feature local customers and success stories</li>
        <li>Showcase local landmarks and attractions</li>
      </ul>
      
      <h3>Behind-the-Scenes Content</h3>
      <p>Give customers a glimpse into your business:</p>
      <ul>
        <li>Introduce your team members</li>
        <li>Show your workspace and processes</li>
        <li>Share the story behind your business</li>
        <li>Document special events and milestones</li>
      </ul>
      
      <h2>Engagement and Community Building</h2>
      <p>Build relationships with your local community:</p>
      <ul>
        <li>Respond to comments and messages promptly</li>
        <li>Ask questions and encourage discussion</li>
        <li>Share user-generated content</li>
        <li>Host local events and meetups</li>
        <li>Collaborate with other local businesses</li>
      </ul>
      
      <h2>Local SEO Integration</h2>
      <p>Use social media to improve your local search rankings:</p>
      <ul>
        <li>Include your business name and location consistently</li>
        <li>Use local keywords in your posts</li>
        <li>Link to your Google Business Profile</li>
        <li>Encourage check-ins and location tags</li>
      </ul>
      
      <h2>Paid Advertising for Local Businesses</h2>
      <p>Target your local audience with paid social media advertising:</p>
      <ul>
        <li>Use location-based targeting</li>
        <li>Create custom audiences from your customer list</li>
        <li>Use lookalike audiences to find similar customers</li>
        <li>Test different ad formats and messaging</li>
      </ul>
      
      <h2>Measuring Local Social Media Success</h2>
      <p>Track metrics that matter for local businesses:</p>
      <ul>
        <li>Local reach and engagement</li>
        <li>Foot traffic from social media</li>
        <li>Local mentions and tags</li>
        <li>Customer reviews and recommendations</li>
        <li>Event attendance and participation</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Social media marketing for local businesses is about building genuine connections with your community. By focusing on local content, engaging with your audience, and integrating with your local SEO efforts, you can create a social media presence that drives real business results.</p>
    `,
    author: "Ethos Digital Team",
    category: "social-media",
    tags: ["Social Media", "Local Business", "Community"],
    image_url: "https://picsum.photos/400/250?random=9",
    published: true,
    created_at: "2023-12-28T10:00:00Z",
    updated_at: "2023-12-28T10:00:00Z"
  },
  {
    id: "7",
    title: "Video Marketing Strategies for Small Business Growth",
    excerpt: "Learn how to leverage video content to increase engagement, build trust, and drive conversions for your business.",
    content: `
      <h2>The Rise of Video Marketing</h2>
      <p>Video has become the most engaging form of content online, with users spending more time watching videos than any other type of content. For small businesses, video marketing offers an opportunity to compete with larger companies and connect with customers on a deeper level.</p>
      
      <h2>Types of Video Content for Small Businesses</h2>
      <h3>1. Product and Service Videos</h3>
      <p>Showcase what you offer:</p>
      <ul>
        <li>Product demonstrations and tutorials</li>
        <li>Service overview and process explanations</li>
        <li>Customer testimonials and case studies</li>
        <li>Behind-the-scenes manufacturing or service delivery</li>
      </ul>
      
      <h3>2. Educational Content</h3>
      <p>Position yourself as an expert:</p>
      <ul>
        <li>How-to videos and tutorials</li>
        <li>Industry insights and tips</li>
        <li>Q&A sessions and expert interviews</li>
        <li>Educational series and webinars</li>
      </ul>
      
      <h3>3. Brand and Culture Videos</h3>
      <p>Build emotional connections:</p>
      <ul>
        <li>Company story and mission</li>
        <li>Team introductions and culture</li>
        <li>Community involvement and values</li>
        <li>Behind-the-scenes daily operations</li>
      </ul>
      
      <h2>Video Marketing Platforms</h2>
      <h3>YouTube</h3>
      <p>The world's second-largest search engine:</p>
      <ul>
        <li>Long-form educational content</li>
        <li>SEO optimization with keywords</li>
        <li>Monetization opportunities</li>
        <li>Community building through comments</li>
      </ul>
      
      <h3>Social Media Platforms</h3>
      <p>Short-form video for engagement:</p>
      <ul>
        <li>Instagram Reels and Stories</li>
        <li>TikTok for trending content</li>
        <li>Facebook and LinkedIn video posts</li>
        <li>Twitter video content</li>
      </ul>
      
      <h2>Video Production Tips</h2>
      <h3>Equipment and Setup</h3>
      <p>You don't need expensive equipment to start:</p>
      <ul>
        <li>Use your smartphone for basic videos</li>
        <li>Invest in a good microphone for audio quality</li>
        <li>Ensure good lighting with natural or artificial light</li>
        <li>Use a tripod or stabilizer for steady shots</li>
      </ul>
      
      <h3>Content Planning</h3>
      <p>Plan your video content strategically:</p>
      <ul>
        <li>Create a content calendar</li>
        <li>Write scripts or outlines</li>
        <li>Plan for different video lengths</li>
        <li>Consider your target audience</li>
      </ul>
      
      <h2>Video SEO and Optimization</h2>
      <p>Optimize your videos for search and discovery:</p>
      <ul>
        <li>Use descriptive titles and thumbnails</li>
        <li>Write detailed descriptions with keywords</li>
        <li>Add captions and transcripts</li>
        <li>Use relevant tags and categories</li>
        <li>Create playlists for related content</li>
      </ul>
      
      <h2>Measuring Video Marketing Success</h2>
      <p>Track key metrics to measure your video marketing performance:</p>
      <ul>
        <li>View count and watch time</li>
        <li>Engagement rates (likes, comments, shares)</li>
        <li>Click-through rates on calls-to-action</li>
        <li>Conversion rates and lead generation</li>
        <li>Brand awareness and reach</li>
      </ul>
      
      <h2>Video Marketing Best Practices</h2>
      <p>Follow these best practices for effective video marketing:</p>
      <ul>
        <li>Keep videos concise and engaging</li>
        <li>Start with a strong hook</li>
        <li>Include clear calls-to-action</li>
        <li>Optimize for mobile viewing</li>
        <li>Be consistent with your brand voice</li>
        <li>Engage with your audience in comments</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Video marketing is an essential tool for small business growth in today's digital landscape. By creating valuable, engaging video content and distributing it across the right platforms, you can build brand awareness, establish authority, and drive conversions for your business.</p>
    `,
    author: "Ethos Digital Team",
    category: "video-marketing",
    tags: ["Video Marketing", "Content Creation", "Engagement"],
    image_url: "https://picsum.photos/400/250?random=10",
    published: true,
    created_at: "2023-12-25T10:00:00Z",
    updated_at: "2023-12-25T10:00:00Z"
  }
];

export const mockPortfolioProjects: PortfolioProject[] = [
  {
    id: "1",
    title: "TechTalk Podcast Website",
    description: "Complete website redesign and development for a long-running technology podcast, featuring modern design, improved SEO, and enhanced user experience.",
    image_url: "https://picsum.photos/600/400?random=1",
    technologies: ["React", "Next.js", "Tailwind CSS", "SEO Optimization", "Podcast Integration"],
    results: `
      <h3>Project Results</h3>
      <p>The TechTalk Podcast website redesign delivered exceptional results across all key metrics:</p>
      
      <h4>Traffic and Engagement</h4>
      <ul>
        <li><strong>340% increase in website traffic</strong> within the first 3 months</li>
        <li><strong>45% improvement in average session duration</strong></li>
        <li><strong>67% increase in podcast downloads</strong> attributed to the new website</li>
        <li><strong>89% improvement in mobile user engagement</strong></li>
      </ul>
      
      <h4>Technical Performance</h4>
      <ul>
        <li><strong>1.2 second page load time</strong> (down from 4.8 seconds)</li>
        <li><strong>98/100 Google PageSpeed score</strong></li>
        <li><strong>100% mobile responsiveness</strong> across all devices</li>
        <li><strong>Zero downtime</strong> during the transition period</li>
      </ul>
      
      <h4>SEO and Visibility</h4>
      <ul>
        <li><strong>156% increase in organic search traffic</strong></li>
        <li><strong>Top 3 rankings</strong> for 15+ target keywords</li>
        <li><strong>Featured snippet</strong> for "technology podcast" search</li>
        <li><strong>Improved local search visibility</strong> for tech community</li>
      </ul>
      
      <h4>User Experience Improvements</h4>
      <ul>
        <li><strong>Streamlined podcast player integration</strong> with enhanced controls</li>
        <li><strong>Improved episode discovery</strong> with advanced filtering</li>
        <li><strong>Enhanced social sharing</strong> with custom preview cards</li>
        <li><strong>Automated email newsletter integration</strong></li>
      </ul>
      
      <h4>Business Impact</h4>
      <ul>
        <li><strong>Increased sponsorship revenue</strong> by 78%</li>
        <li><strong>Expanded audience reach</strong> to new demographics</li>
        <li><strong>Improved listener retention</strong> and community engagement</li>
        <li><strong>Enhanced brand credibility</strong> in the tech industry</li>
      </ul>
      
      <p>The new website has positioned TechTalk as a leading technology podcast platform, providing an exceptional user experience while driving significant business growth.</p>
    `,
    featured: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Local Restaurant Digital Presence",
    description: "Complete digital transformation for a local restaurant, including website, Google Business Profile optimization, and social media setup.",
    image_url: "https://picsum.photos/600/400?random=2",
    technologies: ["WordPress", "Google Business Profile", "Social Media", "Local SEO", "Content Creation"],
    results: `
      <h3>Digital Transformation Results</h3>
      <p>The comprehensive digital transformation for this local restaurant delivered remarkable results across all digital channels:</p>
      
      <h4>Online Visibility and Discovery</h4>
      <ul>
        <li><strong>280% increase in website traffic</strong> within 6 months</li>
        <li><strong>Top 5 Google search rankings</strong> for local restaurant searches</li>
        <li><strong>156% increase in Google Business Profile views</strong></li>
        <li><strong>Featured in Google's "Popular with locals" section</strong></li>
      </ul>
      
      <h4>Online Ordering and Revenue</h4>
      <ul>
        <li><strong>280% increase in online orders</strong> in the first month</li>
        <li><strong>45% of total revenue</strong> now comes from online orders</li>
        <li><strong>Reduced phone order errors</strong> by 67%</li>
        <li><strong>Improved order accuracy</strong> and customer satisfaction</li>
      </ul>
      
      <h4>Social Media Growth</h4>
      <ul>
        <li><strong>1,200+ new social media followers</strong> in 3 months</li>
        <li><strong>89% increase in social media engagement</strong></li>
        <li><strong>Regular customer check-ins</strong> and location tags</li>
        <li><strong>Viral social media posts</strong> reaching 50,000+ people</li>
      </ul>
      
      <h4>Customer Experience Improvements</h4>
      <ul>
        <li><strong>Mobile-first responsive design</strong> optimized for ordering</li>
        <li><strong>Real-time menu updates</strong> and availability</li>
        <li><strong>Online reservation system</strong> reducing wait times</li>
        <li><strong>Customer review management</strong> and response system</li>
      </ul>
      
      <h4>Local SEO Performance</h4>
      <ul>
        <li><strong>95/100 Google PageSpeed score</strong></li>
        <li><strong>Optimized for voice search</strong> and local queries</li>
        <li><strong>Enhanced local citations</strong> and directory listings</li>
        <li><strong>Improved local search rankings</strong> across all major platforms</li>
      </ul>
      
      <h4>Business Impact</h4>
      <ul>
        <li><strong>38% increase in overall revenue</strong></li>
        <li><strong>Reduced marketing costs</strong> by 45%</li>
        <li><strong>Improved customer retention</strong> and loyalty</li>
        <li><strong>Enhanced competitive advantage</strong> in the local market</li>
      </ul>
      
      <p>This digital transformation has positioned the restaurant as a leader in local digital marketing, demonstrating how small businesses can compete effectively in the digital age.</p>
    `,
    featured: false,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z"
  },
  {
    id: "3",
    title: "E-commerce SEO Campaign",
    description: "Comprehensive SEO campaign for an e-commerce store, focusing on product page optimization and content marketing.",
    image_url: "https://picsum.photos/600/400?random=3",
    technologies: ["Technical SEO", "Content Marketing", "Keyword Research", "Analytics", "A/B Testing"],
    results: `
      <h3>E-commerce SEO Campaign Results</h3>
      <p>This comprehensive SEO campaign transformed the e-commerce store's online visibility and sales performance:</p>
      
      <h4>Traffic and Visibility Growth</h4>
      <ul>
        <li><strong>420% increase in organic search traffic</strong> over 12 months</li>
        <li><strong>156% increase in product page views</strong></li>
        <li><strong>Top 10 rankings</strong> for 200+ target keywords</li>
        <li><strong>Featured snippets</strong> for 15 high-value search terms</li>
      </ul>
      
      <h4>Product Page Optimization</h4>
      <ul>
        <li><strong>Optimized 500+ product pages</strong> with unique content</li>
        <li><strong>Improved product schema markup</strong> for rich snippets</li>
        <li><strong>Enhanced product images</strong> with optimized alt text</li>
        <li><strong>Streamlined product navigation</strong> and filtering</li>
      </ul>
      
      <h4>Content Marketing Success</h4>
      <ul>
        <li><strong>Published 50+ blog posts</strong> targeting buyer intent</li>
        <li><strong>Created comprehensive buying guides</strong> for major product categories</li>
        <li><strong>Developed product comparison content</strong> driving conversions</li>
        <li><strong>Generated 15,000+ monthly blog visitors</strong></li>
      </ul>
      
      <h4>Technical SEO Improvements</h4>
      <ul>
        <li><strong>92/100 Google PageSpeed score</strong> (up from 45)</li>
        <li><strong>Fixed 200+ technical SEO issues</strong></li>
        <li><strong>Improved site architecture</strong> and internal linking</li>
        <li><strong>Enhanced mobile user experience</strong></li>
      </ul>
      
      <h4>Conversion and Revenue Impact</h4>
      <ul>
        <li><strong>52% increase in organic conversion rate</strong></li>
        <li><strong>78% increase in revenue from organic traffic</strong></li>
        <li><strong>Reduced bounce rate</strong> by 34%</li>
        <li><strong>Improved average order value</strong> by 23%</li>
      </ul>
      
      <h4>Competitive Analysis and Strategy</h4>
      <ul>
        <li><strong>Comprehensive competitor analysis</strong> identifying opportunities</li>
        <li><strong>Gap analysis</strong> revealing untapped keyword opportunities</li>
        <li><strong>Content gap identification</strong> and strategic content creation</li>
        <li><strong>Market share growth</strong> in competitive product categories</li>
      </ul>
      
      <h4>Long-term Sustainability</h4>
      <ul>
        <li><strong>Established content calendar</strong> for ongoing optimization</li>
        <li><strong>Implemented SEO monitoring</strong> and reporting systems</li>
        <li><strong>Created scalable content templates</strong> for future growth</li>
        <li><strong>Built sustainable competitive advantage</strong> in the market</li>
      </ul>
      
      <p>This SEO campaign demonstrates how strategic optimization can transform an e-commerce business, driving sustainable growth and establishing market leadership.</p>
    `,
    featured: false,
    created_at: "2024-01-08T10:00:00Z",
    updated_at: "2024-01-08T10:00:00Z"
  }
];

// Helper function to generate slug from title
export const generateSlug = (title: string): string => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

// Helper function to find blog post by slug
export const findBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return mockBlogPosts.find(post => generateSlug(post.title) === slug);
};

// Helper function to find portfolio project by slug
export const findPortfolioProjectBySlug = (slug: string): PortfolioProject | undefined => {
  return mockPortfolioProjects.find(project => generateSlug(project.title) === slug);
}; 