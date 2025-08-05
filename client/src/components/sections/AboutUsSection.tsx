import { Handshake, Award, Users, Target, X, Calendar, Code, Camera, Mic, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const AboutUsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teamMembers = [
    {
      name: "Christopher McElwain",
      role: "Technical Lead & AI Specialist",
      image: "https://picsum.photos/300/300?random=11",
      bio: "With 6+ years of coding experience, Christopher has shifted focus to AI and backend systems, specializing in leveraging artificial intelligence to build powerful web applications and automate marketing processes.",
      expertise: ["Full-Stack Development", "AI/ML Integration", "Backend Systems", "Web Application Development", "Process Automation"],
      icon: <Code className="w-6 h-6 text-cyan-400" />
    },
    {
      name: "Thomas Grimm",
      role: "Content Creation & Media Specialist",
      image: "https://picsum.photos/300/300?random=12",
      bio: "A 6-year podcast veteran with extensive experience in videography, photography, and social media management. Thomas brings deep expertise in content creation and audience engagement strategies.",
      expertise: ["Podcast Production", "Video/Photo Editing", "Social Media Management", "Content Strategy", "Event Videography"],
      icon: <Camera className="w-6 h-6 text-cyan-400" />
    }
  ];

  const companyStory = {
    mission: "To help businesses grow through integrity, innovation, and measurable results - ethically driven, with growth beyond limits.",
    vision: "To become the leading digital marketing agency that combines cutting-edge AI technology with creative content creation, setting new standards for ethical business growth.",
    approach: "We believe in the power of complementary skills and continuous learning. Our technical expertise combined with creative abilities creates comprehensive digital marketing solutions."
  };

  const capabilities = [
    {
      category: "Technical Capabilities",
      items: ["AI-Powered Marketing Automation", "Custom Web Development", "SEO & Technical Optimization", "Backend System Integration", "Data Analytics & Reporting"]
    },
    {
      category: "Creative Capabilities", 
      items: ["Professional Video Production", "Photography & Editing", "Podcast Development", "Social Media Content", "Brand Storytelling"]
    },
    {
      category: "Marketing Expertise",
      items: ["Local SEO Strategy", "Content Marketing", "Social Media Management", "Google Business Profile", "Growth Strategy"]
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-cyan-400">Ethos Horizons</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We're a forward-thinking digital marketing agency that believes in the power of integrity, 
              innovation, and results. Our team brings fresh perspectives and cutting-edge technology 
              to deliver exceptional digital marketing solutions.
            </p>
            
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Handshake className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">Our Mission</h3>
                  <p className="text-gray-300">
                    To deliver exceptional digital marketing results while maintaining the highest standards 
                    of integrity and transparency in everything we do.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">Our Approach</h3>
                  <p className="text-gray-300">
                    Data-driven strategies combined with creative thinking and cutting-edge technology 
                    to create campaigns that not only perform but also build lasting brand value.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">Our Team</h3>
                  <p className="text-gray-300">
                    A partnership built on complementary skills and shared values of integrity, 
                    continuous learning, and service to others through business growth.
                  </p>
                </div>
              </div>

              {/* Learn More Button */}
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white mt-6 w-full lg:w-auto">
                    Learn More About Our Team
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700" aria-describedby="about-dialog-description">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-white text-center">
                      Meet the <span className="text-cyan-400">Ethos Horizons</span> Team
                    </DialogTitle>
                    <div id="about-dialog-description" className="sr-only">
                      Detailed information about the Ethos Horizons team, their expertise, and company values
                    </div>
                  </DialogHeader>
                  
                                     {/* Company Story */}
                   <div className="mb-8">
                     <h3 className="text-2xl font-bold text-white mb-4">Our Approach</h3>
                     <div className="bg-gray-700 rounded-lg p-6">
                       <p className="text-gray-300 leading-relaxed">
                         We believe in the power of complementary skills and continuous learning. 
                         Our partnership combines technical expertise with creative abilities to deliver 
                         comprehensive digital marketing solutions that help businesses grow and, 
                         in turn, positively impact their communities.
                       </p>
                     </div>
                   </div>

                  {/* Team Members */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Our Team</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {teamMembers.map((member, index) => (
                        <div key={index} className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                          <div className="flex items-start space-x-4 mb-4">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="text-xl font-bold text-white">{member.name}</h4>
                              <p className="text-cyan-400 font-semibold">{member.role}</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4 text-sm leading-relaxed">{member.bio}</p>
                          <div>
                            <h5 className="text-white font-semibold mb-3">Expertise:</h5>
                            <div className="flex flex-wrap gap-2">
                              {member.expertise.map((skill, skillIndex) => (
                                <span 
                                  key={skillIndex}
                                  className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Our Capabilities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {capabilities.map((capability, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-cyan-400 mb-4">{capability.category}</h4>
                          <ul className="space-y-2">
                            {capability.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-center text-gray-300 text-sm">
                                <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                                     {/* Why Choose Us */}
                   <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-6 border border-cyan-400/30">
                     <h3 className="text-xl font-bold text-white mb-4">Our Values</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="flex items-start space-x-3">
                         <Zap className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                         <div>
                           <h4 className="text-white font-semibold mb-2">Integrity & Service</h4>
                           <p className="text-gray-300 text-sm">We take our work seriously, grounded in values that extend through history and ancient wisdom, believing that helping businesses grow positively affects many others.</p>
                         </div>
                       </div>
                       <div className="flex items-start space-x-3">
                         <Target className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                         <div>
                           <h4 className="text-white font-semibold mb-2">Continuous Learning</h4>
                           <p className="text-gray-300 text-sm">Our love for learning and contemplation drives us to always be better, remaining resilient and competent while engaging with the world with integrity and courage.</p>
                         </div>
                       </div>
                     </div>
                   </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gray-700 rounded-xl p-8 border border-gray-600">
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-cyan-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Our Values</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  <span>Integrity in all our relationships</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  <span>Innovation through technology</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  <span>Results-driven strategies</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  <span>Transparent communication</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  <span>Continuous learning and service</span>
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center bg-gray-700 rounded-xl p-6 border border-gray-600">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Expert</div>
                <p className="text-white font-semibold">Team</p>
              </div>
              <div className="text-center bg-gray-700 rounded-xl p-6 border border-gray-600">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Modern</div>
                <p className="text-white font-semibold">Approach</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 