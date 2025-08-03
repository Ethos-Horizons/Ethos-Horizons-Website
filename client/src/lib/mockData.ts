import { ListOrdered } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  results: string;
  journey?: string;
  visitSiteUrl?: string;
  socialMediaLinks?: Array<{
    platform: string;
    url: string;
  }>;
  featured: boolean;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "5 Essential SEO Strategies for Local Businesses in 2025",
    excerpt: "Discover the most effective SEO techniques that local businesses can implement in 2025 to dominate search rankings and attract more customers.",
    content: `
      <h2>Introduction: Thriving in Local Search</h2>
      <p>For local businesses, visibility in search results isn't just a goal—it's essential for survival. As search engines like Google evolve with features like AI-powered overviews (Search Generative Experience), the rules for local SEO are constantly changing. Staying ahead in <strong>2025</strong> means focusing on a handful of high-impact strategies. This guide covers the five pillars of modern local SEO that will drive foot traffic and phone calls.</p>
      
      <h2>1. Master Your Google Business Profile (GBP)</h2>
      <p>Your GBP is your digital storefront on Google Search and Maps. It's often the first and only interaction a potential customer has with your business online. A fully optimized profile is non-negotiable.</p>
      <ul>
        <li><strong>Complete Every Section:</strong> Fill out your business name, address, phone number (NAP), hours, and website. Add secondary categories, service areas, and accessibility attributes.</li>
        <li><strong>Leverage GBP Posts:</strong> Regularly use GBP Posts to announce offers, new products, and events. These posts expire, so consistency is key.</li>
        <li><strong>Use the Q&A Feature Proactively:</strong> Don't wait for customers to ask questions. Seed the Q&A section with your own frequently asked questions and provide clear, helpful answers.</li>
        <li><strong>Upload High-Quality Photos & Videos:</strong> Showcase your location, products, and team. Aim for weekly photo uploads to keep your profile fresh.</li>
      </ul>
      
      <h2>2. Conduct Hyper-Local Keyword Research</h2>
      <p>Understanding what your local customers are searching for is the foundation of your strategy. Think beyond broad terms.</p>
      <ul>
        <li><strong>Location-Specific Keywords:</strong> Target keywords like "[service] in [neighborhood]" or "[product] near [landmark]".</li>
        <li><strong>"Near Me" and Voice Search:</strong> Optimize for conversational phrases people use in voice search, such as "What's the best coffee shop near me open now?" Ensure your GBP hours are accurate.</li>
        <li><strong>Service-Based Keywords:</strong> Be specific. Instead of "plumber," target "emergency plumbing repair" or "tankless water heater installation."</li>
      </ul>
      
      <h2>3. Build Local Authority with Citations & Links</h2>
      <p>Google trusts businesses that are well-established in their local community. Citations (online mentions of your NAP) and local backlinks are powerful trust signals.</p>
      <ul>
        <li><strong>Ensure NAP Consistency:</strong> Your Name, Address, and Phone number must be identical across all platforms (Yelp, Facebook, industry directories, etc.).</li>
        <li><strong>Sponsor Local Events:</strong> Sponsoring a local sports team, charity run, or festival often results in valuable backlinks from community websites.</li>
        <li><strong>Partner with Non-Competing Businesses:</strong> Collaborate on a promotion with a neighboring business and get mentioned on their website or social media.</li>
      </ul>
      
      <h2>4. Prioritize Online Reviews and Reputation</h2>
      <p>Reviews are a massive ranking factor and the ultimate form of social proof. A strong review strategy directly impacts your visibility in the "Local Pack" (the map results).</p>
      <ul>
        <li><strong>Actively Request Reviews:</strong> Encourage happy customers to leave a review via a simple link in an email or a QR code at your location.</li>
        <li><strong>Respond to Every Review:</strong> Thank positive reviewers and, more importantly, address negative feedback professionally and publicly. This shows you care and are actively managing your reputation.</li>
        <li><strong>Mention Keywords in Responses:</strong> When appropriate, naturally include keywords and location in your review responses (e.g., "We're so glad you enjoyed our deep-dish pizza here in Evansville!").</li>
      </ul>

      <h2>5. Create Location-Specific Website Content</h2>
      <p>Your website should signal to Google that you are the authority for your services in your specific area. Generic content won't cut it.</p>
      <ul>
        <li><strong>Create Local Landing Pages:</strong> If you serve multiple towns, create a unique page for each one detailing your services in that specific area.</li>
        <li><strong>Feature Local Case Studies & Testimonials:</strong> Showcase work you've done for local clients. This builds trust with both users and search engines.</li>
        <li><strong>Blog About Local Topics:</strong> Write posts relevant to your community. A roofer might blog about "Choosing the Best Shingles for Indiana Weather," while a cafe could highlight its participation in a local food festival.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Local SEO in 2025 is about building trust and relevance within a specific geographic area. By mastering your Google Business Profile, targeting local keywords, building community authority, managing reviews, and creating location-focused content, you'll build a powerful moat around your business in local search results.</p>
    `,
    author: "Ethos Digital Team",
    category: "seo",
    tags: ["Local SEO", "Google Business Profile", "Keyword Research"]
  },
  {
    id: "2",
    title: "How AI is Revolutionizing Digital Marketing for Small Businesses",
    excerpt: "Explore how artificial intelligence is making digital marketing more accessible, personalized, and effective for businesses of all sizes.",
    content: `
      <h2>The AI Revolution in Digital Marketing</h2>
      <p>Artificial Intelligence (AI) is no longer a futuristic buzzword—it's a practical toolkit that's leveling the playing field in digital marketing. For small businesses, AI automates tedious tasks, provides deep customer insights, and enables personalization at a scale once reserved for corporate giants. Let's explore how you can harness this power.</p>
      
      <h2>AI-Powered Content Creation & Ideation</h2>
      <p>Content creation can be a major drain on resources. AI tools act as a creative partner, accelerating the process from idea to publication.</p>
      <ul>
        <li><strong>Blog Post & Ad Copy Generation:</strong> Tools like Jasper and Copy.ai can generate outlines, drafts, and multiple ad variations in seconds based on a simple prompt.</li>
        <li><strong>Social Media Management:</strong> AI can analyze top-performing content in your niche to suggest post ideas and optimal posting times.</li>
        <li><strong>Email Marketing Personalization:</strong> AI can write subject lines and email body content tailored to different customer segments, dramatically improving open and click-through rates.</li>
      </ul>
      
      <h2>Predictive Analytics for Smarter Decisions</h2>
      <p>AI's greatest strength is its ability to analyze vast datasets and identify patterns that are invisible to the human eye. This leads to smarter, data-driven decisions.</p>
      <ul>
        <li><strong>Identify High-Value Customers:</strong> AI can analyze your customer data to predict which segments are most likely to make repeat purchases, allowing you to focus your marketing budget effectively.</li>
        <li><strong>Optimize Ad Spend:</strong> Platforms like Google and Meta use AI to automatically adjust ad bids and targeting to maximize your return on investment (ROI).</li>
        <li><strong>Forecast Market Trends:</strong> AI tools can monitor online conversations and search data to identify emerging trends, giving you a first-mover advantage.</li>
      </ul>
      
      <h2>Hyper-Personalization at Scale</h2>
      <p>Today's consumers expect personalized experiences. AI makes it possible for small businesses to deliver this without a massive team.</p>
      <ul>
        <li><strong>Dynamic Website Content:</strong> AI can alter the content a visitor sees on your website based on their past behavior, location, or referral source.</li>
        <li><strong>Personalized Product Recommendations:</strong> E-commerce businesses can use AI to suggest products that a customer is highly likely to be interested in, just like Amazon does.</li>
        <li><strong>Tailored Email Campaigns:</strong> Move beyond "Hi [First Name]". AI can help create email sequences that trigger based on user behavior, such as abandoning a cart or viewing a specific product.</li>
      </ul>
      
      <h2>Intelligent Chatbots & Customer Service</h2>
      <p>AI-powered chatbots have evolved from clunky responders to sophisticated customer service agents that can handle a wide range of tasks.</p>
      <ul>
        <li><strong>24/7 Lead Qualification:</strong> A chatbot on your website can engage visitors around the clock, answer common questions, qualify leads, and even schedule appointments.</li>
        <li><strong>Instant Customer Support:</strong> Instantly resolve common issues (e.g., "Where is my order?") without human intervention, freeing up your team for more complex problems.</li>
        <li><strong>Seamless Handoffs:</strong> Modern chatbots can collect initial information from a customer and then seamlessly transfer the conversation to a live agent with all the context included.</li>
      </ul>
      
      <h2>Conclusion: Your First Steps into AI Marketing</h2>
      <p>AI is a powerful force multiplier for small businesses. The key is to start small and focus on solving a specific problem. Begin by using an AI writing assistant to help with your blog, implement a simple chatbot on your website, or dive into the AI-driven optimization tools within your existing ad platforms. By embracing AI now, you'll build a significant competitive advantage for the future.</p>
    `,
    author: "Ethos Digital Team",
    category: "ai-marketing",
    tags: ["AI Marketing", "Automation", "Small Business"]
  },
  {
    id: "3",
    title: "Building a Successful Podcast Website: A Complete Guide",
    excerpt: "Learn the essential elements and best practices for creating a professional podcast website that engages listeners, grows your audience, and opens up monetization.",
    content: `
      <h2>Why Your Podcast Needs a Website</h2>
      <p>In a sea of over 4 million podcasts, discovery is a huge challenge. While platforms like Spotify and Apple Podcasts are essential, a dedicated website is your <strong>brand's home base</strong>. It's the one place you own and control, allowing you to deepen your relationship with listeners, improve search visibility, and build a sustainable brand.</p>
      
      <h2>Essential Website Elements</h2>
      <h3>1. A Compelling Homepage</h3>
      <p>Your homepage must instantly answer three questions: "What is this podcast about?", "Who is it for?", and "Why should I listen?".</p>
      <ul>
        <li><strong>Clear Value Proposition:</strong> A headline that summarizes your show's unique angle.</li>
        <li><strong>"Listen Now" Links:</strong> Prominent buttons that link directly to your show on major platforms (Apple, Spotify, YouTube).</li>
        <li><strong>Latest Episode Player:</strong> Embed your most recent episode player at the top for immediate engagement.</li>
        <li><strong>Social Proof:</strong> Showcase positive reviews, listener testimonials, or notable guests to build credibility.</li>
      </ul>
      
      <h3>2. SEO-Friendly Episode Pages</h3>
      <p>Every episode deserves its own page. This is crucial for search engine optimization and providing a rich listener experience.</p>
      <ul>
        <li><strong>Embedded Audio Player:</strong> Let visitors listen directly on the page.</li>
        <li><strong>Full Show Notes & Transcripts:</strong> Transcripts are a goldmine for SEO, making your entire episode discoverable by Google. Show notes should include timestamps for key topics.</li>
        <li><strong>Guest Bios and Links:</strong> Credit your guests properly with links to their work. They will be more likely to share the episode.</li>
        <li><strong>Call-to-Action (CTA):</strong> Each page should have a CTA, like "Subscribe to our newsletter for more content like this."</li>
      </ul>
      
      <h3>3. A Relatable "About" Page</h3>
      <p>Listeners connect with hosts as much as they connect with content. Your About page is where you build that personal connection.</p>
      <ul>
        <li><strong>Host Bio(s):</strong> Share your story. Why did you start the podcast? What is your expertise or passion?</li>
        <li><strong>Show's Mission:</strong> Explain the "why" behind your podcast. What change do you want to create for your listener?</li>
        <li><strong>High-Quality Photos:</strong> Include professional photos of the host(s) and your recording setup.</li>
      </ul>
      
      <h2>Key Technical Considerations</h2>
      <h3>Podcast SEO and Discoverability</h3>
      <p>A website allows you to tap into the power of Google to attract new listeners.</p>
      <ul>
        <li><strong>Use Structured Data:</strong> Implement <a href="https://schema.org/PodcastEpisode" target="_blank" rel="noopener noreferrer">PodcastEpisode schema markup</a> so Google can understand and feature your content in search results.</li>
        <li><strong>Target Keywords:</strong> Each episode page title and description should target keywords a potential listener might search for.</li>
        <li><strong>Fast Load Times:</strong> A slow website will frustrate visitors. Optimize images and use good hosting to ensure your site is fast.</li>
      </ul>
      
      <h2>Monetization & Growth Features</h2>
      <p>Your website is the central hub for turning your podcast into a business.</p>
      <ul>
        <li><strong>Email List Signup:</strong> This is your most valuable asset. Offer a free resource (like a checklist or ebook) in exchange for an email address.</li>
        <li><strong>Merchandise Store:</strong> Integrate a simple store using services like Shopify or Printful.</li>
        <li><strong>Premium Content/Membership:</strong> Use platforms like Patreon or Memberful to offer exclusive episodes or content to paying supporters, linked directly from your site.</li>
        <li><strong>Sponsor/Media Kit:</strong> Create a page with your listener demographics, download numbers, and sponsorship packages to attract advertisers.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>A professional podcast website transforms your show from a hobby into a brand. It serves as your central hub for audience growth, community engagement, and monetization. By focusing on these core elements, you create a powerful asset that will support your show's success for years to come.</p>
    `,
    author: "Ethos Digital Team",
    category: "web-development",
    tags: ["Podcast", "Web Development", "Content Strategy"]
  },
  {
    id: "4",
    title: "The Ultimate Guide to Google Business Profile Optimization",
    excerpt: "A step-by-step guide to fully optimizing your Google Business Profile (GBP) to maximize local visibility, engagement, and customer acquisition.",
    content: `
      <h2>What is Google Business Profile and Why Does It Matter?</h2>
      <p>Google Business Profile (GBP) is a free tool that allows you to manage how your business appears on Google Search and Google Maps. For local businesses, it is the single most important factor for local SEO. A well-optimized profile can lead to hundreds of new customers, while a neglected one can render you invisible.</p>
      
      <h2>Phase 1: Setup and Verification</h2>
      <h3>1. Claim or Create Your Listing</h3>
      <p>Go to <a href="https://google.com/business" target="_blank" rel="noopener noreferrer">google.com/business</a> and search for your business name and address. If a listing exists, claim it. If not, create a new one. Be meticulous with your details.</p>
      <ul>
        <li><strong>Business Name:</strong> Use your real-world business name. Do not add keywords (e.g., "Ethos Digital Web Design"). This is against Google's guidelines.</li>
        <li><strong>Address:</strong> Use your actual physical address. If you are a service-area business without a storefront, you can hide your address during setup.</li>
      </ul>
      <h3>2. Complete Verification</h3>
      <p>Google needs to confirm your business is legitimate. This is typically done via a postcard with a verification code sent to your business address. Phone or email verification may be available for some businesses.</p>
      
      <h2>Phase 2: Core Optimization (The "Must-Haves")</h2>
      <h3>1. Fill Out Every Single Field</h3>
      <p>An incomplete profile is a red flag to Google. Go through every section in your GBP dashboard and complete it.</p>
      <ul>
        <li><strong>Categories:</strong> Choose a specific primary category (e.g., "Italian Restaurant" instead of just "Restaurant"). Then add all relevant secondary categories.</li>
        <li><strong>Hours & Special Hours:</strong> Keep your regular hours updated. Always set special hours for holidays to build trust.</li>
        <li><strong>Services/Products:</strong> Add all of your services or products with detailed descriptions and prices. This helps you rank for specific service-related searches.</li>
      </ul>
      <h3>2. Upload High-Quality Media</h3>
      <p>Visuals build trust and increase engagement. Aim for a steady stream of new photos.</p>
      <ul>
        <li><strong>Logo & Cover Photo:</strong> Make sure these are high-resolution and represent your brand.</li>
        <li><strong>Interior & Exterior Photos:</strong> Show customers what to expect.</li>
        <li><strong>Team & "In-Action" Photos:</strong> Humanize your business.</li>
        <li><strong>Videos:</strong> Short (under 30 seconds) video tours or product showcases perform very well.</li>
      </ul>
      
      <h2>Phase 3: Ongoing Management (The "Game-Changers")</h2>
      <h3>1. Actively Manage Reviews</h3>
      <p>Reviews are a top-3 ranking factor for the local map pack.</p>
      <ul>
        <li><strong>Get More Reviews:</strong> Create a simple short link (e.g., using a tool like Bitly) that goes directly to your review form and share it with happy customers.</li>
        <li><strong>Respond to ALL Reviews:</strong> Thank positive reviewers. For negative reviews, respond publicly with empathy and offer to resolve the issue offline. This shows potential customers you handle problems professionally.</li>
      </ul>
      <h3>2. Leverage GBP Posts</h3>
      <p>Think of GBP Posts as free micro-ads on your profile. They increase visibility and engagement.</p>
      <ul>
        <li><strong>Post Weekly:</strong> Use the "Offer," "What's New," or "Event" post types to keep your profile active.</li>
        <li><strong>Include a Call-to-Action:</strong> Always use a CTA button like "Call Now," "Learn More," or "Book."</li>
      </ul>
      <h3>3. Use the Q&A Feature</h3>
      <p>The Q&A section is a public forum. If you don't control it, someone else will.</p>
      <ul>
        <li><strong>Seed Your Own FAQs:</strong> Ask and answer your most common questions yourself. This preemptively helps customers and prevents misinformation.</li>
        <li><strong>Monitor for New Questions:</strong> Set up alerts to get notified when a customer asks a new question so you can answer it quickly.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Optimizing your Google Business Profile isn't a "set it and forget it" task. It's an ongoing process of providing fresh information, engaging with customers, and showcasing what makes your business great. By treating your GBP as a dynamic marketing channel, you'll significantly improve your local visibility and attract more customers directly from Google.</p>
    `,
    author: "Ethos Digital Team",
    category: "local-marketing",
    tags: ["Google Business Profile", "Local Marketing", "SEO"]
  },
  {
    id: "5",
    title: "Content Marketing Strategies That Actually Drive Results",
    excerpt: "Move beyond random blog posts. Learn proven content marketing strategies that build authority, attract qualified leads, and drive measurable business growth.",
    content: `
      <h2>The Shift from Content Creation to Content Strategy</h2>
      <p>Many businesses fall into the "random acts of content" trap: publishing a blog post here and a social media update there with no clear goal. A <strong>content strategy</strong>, on the other hand, is a documented plan that aligns every piece of content with a specific business objective. It's the difference between shouting into the void and building a powerful engine for lead generation and brand loyalty.</p>
      
      <h2>1. The Hub and Spoke Model (Topic Clusters)</h2>
      <p>Instead of chasing dozens of unrelated keywords, establish authority around a core topic. This model involves creating a central "hub" page about a broad topic and linking out to multiple "spoke" pages that cover specific subtopics in detail.</p>
      <ul>
        <li><strong>Hub Page:</strong> A comprehensive, long-form guide on a core business topic (e.g., "A Complete Guide to Local SEO").</li>
        <li><strong>Spoke Pages:</strong> Detailed articles on specific subtopics (e.g., "How to Optimize Your Google Business Profile," "Building Local Backlinks," "Mastering Local Keyword Research").</li>
        <li><strong>Internal Linking:</strong> The hub page links to all spoke pages, and every spoke page links back to the hub. This structure signals your expertise to Google and keeps users engaged on your site longer.</li>
      </ul>
      
      <h2>2. Align Content with the Buyer's Journey</h2>
      <p>Effective content meets your audience where they are. Create content for each stage of their decision-making process.</p>
      <ul>
        <li><strong>Awareness Stage (Top of Funnel):</strong> The customer is experiencing a problem. Content here should be educational and not salesy. Think blog posts, how-to videos, and infographics. (e.g., "Why Isn't My Website Getting Traffic?").</li>
        <li><strong>Consideration Stage (Middle of Funnel):</strong> The customer is researching solutions. Content here should compare options and showcase your expertise. Think case studies, webinars, and detailed guides. (e.g., "SEO vs. PPC: Which is Right for Your Business?").</li>
        <li><strong>Decision Stage (Bottom of Funnel):</strong> The customer is ready to buy. Content here should make it easy to choose you. Think free consultations, demos, and detailed service pages. (e.g., "Request a Free SEO Audit").</li>
      </ul>
      
      <h2>3. The Content Repurposing Flywheel</h2>
      <p>Don't let your best content die after one publication. Maximize your investment by repurposing a single piece of content into multiple formats for different channels.</p>
      <ul>
        <li>A <strong>long-form blog post</strong> can become:</li>
        <li>A multi-part <strong>email newsletter series</strong>.</li>
        <li>An engaging <strong>infographic</strong> for Pinterest and LinkedIn.</li>
        <li>A script for a <strong>YouTube video</strong>.</li>
        <li>A series of <strong>short video clips</strong> for Instagram Reels and TikTok.</li>
        <li>Key quotes turned into <strong>image graphics</strong> for Twitter and Facebook.</li>
      </ul>
      
      <h2>4. Focus on Product-Led Content</h2>
      <p>This is content that educates readers on a topic while naturally integrating your product or service as the ideal solution. It's not a hard sell, but rather a demonstration of how your offering helps solve the problem being discussed.</p>
      <ul>
        <li>An email marketing company could write, "10 Subject Line Formulas to Boost Your Open Rates," and show screenshots of how to implement them using their software.</li>
        <li>A project management tool could publish, "How to Run More Efficient Team Meetings," with a downloadable template created within their app.</li>
      </ul>
      
      <h2>5. A Documented Distribution and Promotion Plan</h2>
      <p>Great content is useless if no one sees it. Your strategy must include a promotion checklist for every piece of content you publish.</p>
      <ul>
        <li><strong>Owned Channels:</strong> Share on your email list, social media profiles, and with your team to share on their personal networks (like LinkedIn).</li>
        <li><strong>Earned Channels:</strong> Reach out to influencers or other websites mentioned in your article and ask them to share it.</li>
        <li><strong>Paid Channels:</strong> Use a small budget to boost top-performing posts on social media or run targeted ads to reach a wider, relevant audience.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>A successful content marketing strategy is a system, not a lottery. By building topic clusters, mapping content to the buyer's journey, repurposing effectively, and having a clear promotion plan, you can transform your content from a cost center into a predictable source of traffic, leads, and revenue.</p>
    `,
    author: "Ethos Digital Team",
    category: "content-marketing",
    tags: ["Content Marketing", "Strategy", "ROI"]
  },
  {
    id: "6",
    title: "Social Media Marketing for Local Businesses: Best Practices",
    excerpt: "Go beyond just posting. Learn effective social media strategies designed for local businesses to build an engaged community and drive real-world results.",
    content: `
      <h2>Why Local Businesses Need a Different Social Media Strategy</h2>
      <p>Global brands use social media to build massive followings. Local businesses have a different, more powerful goal: to build a genuine <strong>community</strong>. Your success isn't measured in millions of followers, but in how well you connect with the people in your neighborhood, build loyalty, and drive foot traffic. Here’s how to do it effectively.</p>
      
      <h2>1. Choose Platforms Where Your Community Lives</h2>
      <p>Don't stretch yourself thin trying to be everywhere. Master the platforms that matter most for local discovery.</p>
      <ul>
        <li><strong>Facebook:</strong> Still the king of local. A well-managed Facebook Page is essential. Engage in local community groups (without spamming) to build authentic connections. Facebook Events are powerful for promoting in-store activities.</li>
        <li><strong>Instagram:</strong> The go-to platform for visual businesses (restaurants, boutiques, salons). Use a mix of high-quality photos in your feed, behind-the-scenes content in Stories, and engaging short-form video in Reels. Always use location tags on your posts and stories.</li>
        <li><strong>Nextdoor:</strong> This is your direct line to your immediate neighborhood. Use it to share helpful local updates and business recommendations. It's a high-trust platform where a good reputation goes a long way.</li>
      </ul>
      
      <h2>2. Create Content That Celebrates Your Community</h2>
      <p>Your content should feel like it's from a neighbor, not a corporation. The goal is to be the go-to source for what's happening in your local area, as it relates to your business.</p>
      <ul>
        <li><strong>Feature User-Generated Content (UGC):</strong> Reshare photos and posts from customers who have tagged your business. It's authentic, free content that acts as a powerful testimonial.</li>
        <li><strong>Highlight Community & Local Events:</strong> Post about the local farmers' market, a high school football game, or a charity event. This shows you're invested in the community, not just trying to sell to it.</li>
        <li><strong>Collaborate with Other Local Businesses:</strong> Partner with a non-competing business on a joint giveaway or promotion. This cross-promotes your audiences and strengthens local business ties.</li>
      </ul>
      
      <h2>3. Engage, Don't Just Broadcast</h2>
      <p>Social media is a two-way conversation. Building a community requires active participation.</p>
      <ul>
        <li><strong>Respond to Every Comment & Message:</strong> When someone takes the time to engage, acknowledge them. Answer questions promptly and thank people for their support.</li>
        <li><strong>Ask Questions:</strong> Encourage engagement by asking your audience for their opinions. A coffee shop could ask, "What new fall drink should we add to the menu?"</li>
        <li><strong>Go Live:</strong> Host a live Q&A session, give a tour of your shop, or introduce a new team member. Live video feels personal and drives high engagement.</li>
      </ul>

      <h2>4. Use Hyper-Targeted Local Advertising</h2>
      <p>Paid social advertising allows you to reach your ideal local customers with precision.</p>
      <ul>
        <li><strong>Location-Based Targeting:</strong> Target ads to people within a specific radius of your business—as small as one mile. This is perfect for promoting limited-time offers to drive immediate foot traffic.</li>
        <li><strong>Customer List Audiences:</strong> Upload your customer email list to create a Custom Audience. You can then serve ads directly to people who already know you, or create a Lookalike Audience to find new people with similar characteristics.</li>
        <li><strong>"Store Traffic" Objective:</strong> On platforms like Facebook, you can run ads specifically optimized to drive in-store visits, and in some cases, even track the results.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>For a local business, social media is about connection over clicks. By choosing the right platforms, creating community-focused content, engaging in real conversations, and using targeted ads, you can transform your social media profiles from simple marketing channels into vibrant community hubs that drive loyalty and sales.</p>
    `,
    author: "Ethos Digital Team",
    category: "social-media",
    tags: ["Social Media", "Local Business", "Community"]
  },
  {
    id: "7",
    title: "Video Marketing Strategies for Small Business Growth",
    excerpt: "Learn how to leverage the power of video to increase engagement, build trust, and drive conversions—even with a small budget.",
    content: `
      <h2>The Undeniable Power of Video</h2>
      <p>In today's fast-paced digital world, video is the most engaging form of content, period. It captures attention, conveys emotion, and explains complex ideas more effectively than text or images alone. For small businesses, video marketing is no longer a luxury—it's an essential tool for building trust, showcasing products, and driving growth.</p>
      
      <h2>1. Focus on Short-Form Vertical Video</h2>
      <p>The biggest shift in video is the dominance of platforms like TikTok, Instagram Reels, and YouTube Shorts. These short, vertical videos are perfect for capturing attention quickly and reaching new audiences.</p>
      <ul>
        <li><strong>"How-To" and Tips:</strong> Share quick, valuable tips related to your industry. A financial advisor could share a 30-second tip on saving for retirement.</li>
        <li><strong>Behind-the-Scenes:</strong> Show the process of how your product is made or introduce a team member. This humanizes your brand.</li>
        <li><strong>Answer FAQs:</strong> Take common customer questions and answer them in a short video. This is highly valuable and shareable content.</li>
      </ul>
      
      <h2>2. The "Hero, Hub, Help" Content Strategy</h2>
      <p>Organize your video efforts with a proven framework to ensure you're meeting different audience needs.</p>
      <ul>
        <li><strong>Help Content (Most Frequent):</strong> These are videos that answer specific questions your target audience is searching for on Google and YouTube (e.g., "How to fix a leaky faucet"). This content drives consistent, organic traffic.</li>
        <li><strong>Hub Content (Regularly Scheduled):</strong> This is episodic content designed to build a subscriber base, like a weekly series or a monthly Q&A. It gives people a reason to come back.</li>
        <li><strong>Hero Content (Infrequent):</strong> These are your big, campaign-style videos designed to reach a massive audience. Think of a brand story video or a major product launch.</li>
      </ul>
      
      <h2>3. You Don't Need Expensive Equipment</h2>
      <p>The quality of your content is more important than the quality of your camera. Modern smartphones shoot incredible video, which is more than enough to get started.</p>
      <ul>
        <li><strong>Invest in Audio First:</strong> Viewers will tolerate mediocre video quality, but not bad audio. A simple lavalier microphone ($20-$30) that clips to your shirt will dramatically improve your quality.</li>
        <li><strong>Use Good Lighting:</strong> Natural light is your best friend. Film facing a window. If you don't have good natural light, a simple ring light is an inexpensive way to make your videos look more professional.</li>
        <li><strong>Keep it Steady:</strong> Use a small tripod to avoid shaky footage.</li>
      </ul>
      
      <h2>4. Optimize for Search and Silence</h2>
      <p>Creating the video is only half the battle. You need to ensure it's discoverable and watchable.</p>
      <ul>
        <li><strong>Video SEO:</strong> On platforms like YouTube, treat your title, description, and tags like you would for a blog post. Use keywords that your audience is searching for.</li>
        <li><strong>Compelling Thumbnails:</strong> The thumbnail is like the cover of a book. Create custom thumbnails with bold text and an expressive face to increase click-through rates.</li>
        <li><strong>Add Captions/Subtitles:</strong> Over 85% of videos on social media are watched with the sound off. Adding captions makes your content accessible and ensures your message gets across even in silence.</li>
      </ul>

      <h2>5. Have a Clear Call-to-Action (CTA)</h2>
      <p>Every video should have a purpose. What do you want the viewer to do next?</p>
      <ul>
        <li><strong>Verbally state the CTA:</strong> "If you found this helpful, subscribe to our channel for more tips."</li>
        <li><strong>Include it in the description:</strong> "Visit our website to book a free consultation at [yourwebsite.com]."</li>
        <li><strong>Use on-screen text or end cards:</strong> Visually prompt the user to take the next step.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Video marketing is an achievable and highly effective strategy for any small business. Start with the tools you already have (your phone), focus on providing value with short-form content, and be consistent. By embracing video, you'll build a stronger, more personal connection with your customers and see tangible results for your business.</p>
    `,
    author: "Ethos Digital Team",
    category: "video-marketing",
    tags: ["Video Marketing", "Content Creation", "Engagement"]
  }
];

export const mockPortfolioProjects: PortfolioProject[] = [
  {
    id: "1",
    title: "The Days Grimm Podcast Website",
    description: "Complete website redesign and development for a long-running technology podcast, featuring modern design, improved SEO, and enhanced user experience.",
    technologies: ["React", "Next.js", "Tailwind CSS", "SEO Optimization", "Podcast Integration"],
    results: `
      <h3>Project Results</h3>
      <p>The Days Grimm Podcast website redesign delivered exceptional results across all key metrics:</p>
      
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
      
      <p>The new website has positioned Days Grimm as a leading technology podcast platform, providing an exceptional user experience while driving significant business growth.</p>
    `,
    journey: `
      <h3>Project Journey & Process</h3>
      <p>The Days Grimm Podcast website redesign was a comprehensive project that required deep understanding of both podcasting workflows and modern web development practices.</p>
      
      <h4>Discovery & Planning Phase</h4>
      <p>We began with extensive research into the podcast's current audience, content strategy, and technical requirements. The existing website was built on an outdated platform that couldn't handle the growing traffic and lacked modern SEO capabilities.</p>
      
      <h4>Design & Development Challenges</h4>
      <p>The biggest challenge was creating a seamless podcast player integration that worked across all devices while maintaining fast load times. We also needed to implement advanced SEO features specifically for podcast content, including structured data markup for episodes.</p>
      
      <h4>Technical Implementation</h4>
      <p>We chose Next.js for its excellent SEO capabilities and React for the interactive components. The podcast player was custom-built to handle various audio formats and provide analytics tracking. We implemented lazy loading for episode content and optimized images for different screen sizes.</p>
      
      <h4>Content Migration & SEO</h4>
      <p>Migrating 200+ episodes required careful planning to preserve SEO value. We implemented 301 redirects, updated all meta descriptions, and created individual episode pages with optimized content structure. The new site structure improved crawlability and user navigation.</p>
      
      <h4>Testing & Launch</h4>
      <p>Rigorous testing across devices and browsers ensured a smooth launch. We implemented A/B testing for key conversion elements and monitored performance metrics closely during the transition period.</p>
      
      <h4>Post-Launch Optimization</h4>
      <p>After launch, we continued to optimize based on user behavior data. This included improving the mobile experience, enhancing the search functionality, and adding new features based on listener feedback.</p>
    `,
    visitSiteUrl: "https://Days Grimm-podcast.com",
    socialMediaLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com/Days Grimmpodcast"
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/Days Grimmpodcast"
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/company/DaysGrimmpodcast"
      },
      {
        platform: "YouTube",
        url: "https://youtube.com/DaysGrimmPodcast"
      }
    ],
    featured: true,
    slug: "Days Grimm-podcast-website"
  },
  {
    id: "2",
    title: "Local Restaurant Digital Presence",
    description: "Complete digital transformation for a local restaurant, including website, Google Business Profile optimization, and social media setup.",
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
    journey: `
      <h3>Project Journey & Process</h3>
      <p>This local restaurant digital transformation project required a holistic approach to modernize their entire online presence and operations.</p>
      
      <h4>Initial Assessment & Strategy</h4>
      <p>The restaurant had a basic website but no online ordering system, minimal social media presence, and an unoptimized Google Business Profile. We conducted a comprehensive audit of their current digital footprint and identified key opportunities for improvement.</p>
      
      <h4>Website Development & Online Ordering</h4>
      <p>We built a custom WordPress website with integrated online ordering capabilities. The biggest challenge was integrating with their existing point-of-sale system and ensuring real-time menu updates. We also implemented a mobile-first design to accommodate the growing number of mobile orders.</p>
      
      <h4>Google Business Profile Optimization</h4>
      <p>We completely overhauled their Google Business Profile, adding high-quality photos, detailed service descriptions, and regular posts about special events and menu updates. We also implemented a review management system to respond to customer feedback promptly.</p>
      
      <h4>Social Media Strategy & Content Creation</h4>
      <p>We developed a comprehensive social media strategy focusing on Instagram and Facebook, where their target audience was most active. We created a content calendar featuring behind-the-scenes content, menu highlights, and community engagement posts.</p>
      
      <h4>Local SEO Implementation</h4>
      <p>We optimized the website for local search terms, implemented structured data markup, and built local citations across relevant directories. We also created location-specific landing pages to target different neighborhoods they served.</p>
      
      <h4>Training & Ongoing Support</h4>
      <p>We provided comprehensive training to the restaurant staff on managing the new systems and created detailed documentation for ongoing maintenance. We also established a monthly reporting system to track performance and identify opportunities for further optimization.</p>
    `,
    visitSiteUrl: "https://restaurant-website.com",
    socialMediaLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com/restaurantname"
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/restaurantname"
      }
    ],
    featured: false,
    slug: "local-restaurant-digital-presence"
  },
  {
    id: "3",
    title: "E-commerce SEO Campaign",
    description: "Comprehensive SEO campaign for an e-commerce store, focusing on product page optimization and content marketing.",
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
    journey: `
      <h3>Project Journey & Process</h3>
      <p>This e-commerce SEO campaign required a systematic approach to improve visibility across thousands of product pages while building authority in competitive markets.</p>
      
      <h4>Comprehensive Site Audit</h4>
      <p>We began with a thorough technical and content audit of the entire e-commerce site. This revealed critical issues including duplicate content, poor site architecture, and missing schema markup. We prioritized fixes based on potential impact and implementation complexity.</p>
      
      <h4>Technical SEO Foundation</h4>
      <p>We addressed core technical issues including site speed optimization, mobile responsiveness, and crawlability problems. We implemented proper canonical tags, fixed broken links, and optimized the site structure for better search engine understanding.</p>
      
      <h4>Product Page Optimization</h4>
      <p>With 500+ product pages, we developed a systematic approach to optimization. We created unique, compelling product descriptions, implemented proper schema markup, and optimized images with descriptive alt text. We also improved the internal linking structure to distribute page authority effectively.</p>
      
      <h4>Content Strategy Development</h4>
      <p>We developed a comprehensive content strategy targeting buyer intent keywords. This included creating buying guides, product comparison pages, and educational content that positioned the brand as an authority in their industry. We also implemented a content calendar for consistent publishing.</p>
      
      <h4>Competitive Analysis & Gap Identification</h4>
      <p>We conducted extensive competitive analysis to identify keyword opportunities and content gaps. This revealed untapped markets and helped us prioritize content creation efforts. We also analyzed competitor backlink profiles to identify link building opportunities.</p>
      
      <h4>Ongoing Optimization & Monitoring</h4>
      <p>We established regular monitoring and reporting systems to track performance and identify new opportunities. This included monthly performance reviews, competitor tracking, and continuous optimization based on data insights.</p>
    `,
    visitSiteUrl: "https://ecommerce-store.com",
    socialMediaLinks: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/company/ecommercestore"
      }
    ],
    featured: false,
    slug: "ecommerce-seo-campaign"
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

