import { Handshake, Award, Users, Target } from 'lucide-react';

export const AboutUsSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-cyan-400">Ethos Digital</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We're a forward-thinking digital marketing agency that believes in the power of integrity, 
              innovation, and results. Our team brings fresh perspectives and cutting-edge technology 
              to deliver exceptional digital marketing solutions.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Handshake className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Mission</h3>
                  <p className="text-gray-300">
                    To deliver exceptional digital marketing results while maintaining the highest standards 
                    of integrity and transparency in everything we do.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Approach</h3>
                  <p className="text-gray-300">
                    Data-driven strategies combined with creative thinking and cutting-edge technology 
                    to create campaigns that not only perform but also build lasting brand value.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Team</h3>
                  <p className="text-gray-300">
                    A dedicated team of experts in SEO, PPC, web development, and AI technology, 
                    committed to delivering exceptional results and building lasting partnerships.
                  </p>
                </div>
              </div>
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
                  <span>Continuous learning and growth</span>
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