import React, { useEffect, useRef } from 'react';
import { Shield, Zap, Users } from 'lucide-react';

const collaborators = [
  { id: 1, name: "Meherma Tech", logo: "/msp.jpg", type: "Industry" },
  { id: 2, name: "IEEE Education Society", logo: "/1.svg", type: "Industry" },
  { id: 3, name: "NanoTechX", logo: "/nanotechx-black.jpg", type: "Industry" },
  { id: 4, name: "ACM Cyber", logo: "acm-cys.jpeg", type: "Industry" },
  { id: 5, name: "ACM BAHRIA", logo: "/2.svg", type: "Industry" },
  { id: 6, name: "AIS", logo: "/ais.png", type: "Industry" },
  { id: 7, name: "AICP", logo: "/aicp.jpeg", type: "Industry" },
];

const CyberpunkCollaboratorsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Create floating data particles
    const createDataParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-coastal-200/40 rounded-full';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float 6s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 3}s`;
      
      section.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode === section) {
          section.removeChild(particle);
        }
      }, 6000);
    };

    const particleInterval = setInterval(createDataParticle, 800);
    
    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="collaborators" 
      className="py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-coastal-800 via-coastal-900 to-coastal-800"></div>
      
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(97, 165, 194, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(97, 165, 194, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'grid-drift 25s linear infinite'
          }}
        />
      </div>
      
      {/* Holographic Beams */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-coastal-200/30 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-coastal-200/30 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="cyber-button px-6 py-3 rounded-lg flex items-center gap-3">
              <Shield className="h-5 w-5 text-coastal-200" />
              <span className="font-tech text-coastal-200 text-sm tracking-wider">
                ./STRATEGIC_ALLIANCES/
              </span>
              <Shield className="h-5 w-5 text-coastal-200" />
            </div>
          </div>
          
          <h2 className="text-heading-lg font-orbitron mb-6 cyber-text">
            CYBER <span className="hologram-text">ALLIANCE</span> NETWORK
          </h2>
          
          <p className="max-w-3xl mx-auto text-coastal-300 text-lg font-rajdhani leading-relaxed">
            Building a fortified ecosystem through strategic partnerships with leading 
            cybersecurity organizations, academic institutions, and industry pioneers.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center mt-12">
            <div className="grid grid-cols-3 gap-8">
              {[
                { label: "PARTNERS", value: "15+", icon: Users },
                { label: "PROJECTS", value: "8+", icon: Zap },
                { label: "SECURITY_LVLS", value: "99.9%", icon: Shield }
              ].map((stat, index) => (
                <div key={index} className="cyber-button p-4 text-center">
                  <stat.icon className="h-6 w-6 text-coastal-200 mx-auto mb-2" />
                  <div className="text-2xl font-orbitron font-bold text-coastal-100">{stat.value}</div>
                  <div className="text-xs font-tech text-coastal-300 tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Collaborators Grid */}
        <div className="grid grid-cols-2 place-content-center md:grid-cols-3 lg:grid-cols-6 gap-6">
          {collaborators.map((collaborator, index) => (
            <div 
              key={collaborator.id} 
              className="collaborator-logo group"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="cyber-button p-6 rounded-lg h-32 flex flex-col items-center justify-center bg-coastal-800/40 hover:bg-coastal-700/60 transition-all duration-500 group relative overflow-hidden">
                
                {/* Holographic Scan Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-coastal-200/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                
                {/* Logo */}
                <img 
                  src={collaborator.logo} 
                  alt={collaborator.name} 
                  className="max-h-full max-w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Type Badge */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-coastal-200 rounded-full animate-pulse"></div>
                </div>
                
                {/* Name */}
                <div className="text-xs font-tech text-coastal-300 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {collaborator.type.toUpperCase()}
                </div>
                
                {/* Corner Brackets */}
                <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-coastal-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-coastal-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-coastal-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-coastal-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Partnership CTA */}
        <div className="mt-20 text-center">
          <div className="cyber-button p-8 rounded-lg max-w-4xl mx-auto bg-coastal-800/60 border-coastal-700">
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-lg border border-coastal-200/20 opacity-50">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-coastal-200/10 to-transparent animate-pulse"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-coastal-200/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-coastal-200" />
                </div>
              </div>
              
              <h3 className="text-2xl font-orbitron font-bold text-coastal-100 mb-4">
                JOIN THE <span className="hologram-text">CYBER</span> ALLIANCE
              </h3>
              
              <p className="text-coastal-300 mb-8 max-w-2xl mx-auto font-rajdhani text-lg leading-relaxed">
                Partner with ACM SIGSAC to strengthen the global cybersecurity ecosystem. 
                Together, we build the future of digital security.
              </p>
              
              <button className="cyber-button bg-gradient-to-r from-coastal-400 to-coastal-200 text-coastal-900 hover:from-coastal-200 hover:to-coastal-100 px-8 py-4 rounded-lg font-orbitron font-semibold transition-all duration-300 group">
                <span className="flex items-center gap-2">
                  <Shield className="h-5 w-5 group-hover:animate-pulse" />
                  ESTABLISH_CONNECTION
                  <Zap className="h-5 w-5 group-hover:animate-pulse" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CyberpunkCollaboratorsSection;