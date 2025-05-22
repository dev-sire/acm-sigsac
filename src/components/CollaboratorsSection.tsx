
import React, { useEffect } from 'react';

const collaborators = [
  {
    id: 1,
    name: "IEEE Education Society (Karachi Section)",
    logo: "/ieee.jpeg",
  },
  {
    id: 2,
    name: "SFI",
    logo: "/sfi.jpeg",
  },
  {
    id: 3,
    name: "ACM Cyber",
    logo: "acm-cys.jpeg",
  },
  {
    id: 4,
    name: "ACM BAHRIA",
    logo: "/acm-bahria.jpeg",
  },
  {
    id: 5,
    name: "AICP",
    logo: "/aicp.jpeg",
  },
  {
    id: 6,
    name: "ACM-CSS-DUET",
    logo: "/acm-css.jpeg",
  },
];

const CollaboratorsSection = () => {
  useEffect(() => {
    const scrollFx = () => {
      const elements = document.querySelectorAll('.scroll-fx');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', scrollFx);
    scrollFx(); // Initial check
    
    return () => window.removeEventListener('scroll', scrollFx);
  }, []);

  return (
    <section id="collaborators" className="py-24 relative bg-cyber-dark/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-neon/5 to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-fx">
          <h2 className="text-heading-md mb-4">
            Our <span className="text-cyber-neon">Collaborators</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            We're proud to work with these leading organizations to advance cybersecurity 
            education and provide exceptional opportunities for our members.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {collaborators.map((collaborator, index) => (
            <div 
              key={collaborator.id} 
              className="flex items-center justify-center scroll-fx"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg hover:border-cyber-neon/50 transition-all duration-300 w-full h-40 flex items-center justify-center group">
                <img 
                  src={collaborator.logo} 
                  alt={collaborator.name} 
                  className="h-full w-full opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center scroll-fx">
          <div className="inline-block border border-white/10 bg-white/5 rounded-lg p-6 max-w-3xl">
            <h3 className="text-xl mb-4 text-cyber-neon">Become a Partner</h3>
            <p className="text-white/70 mb-6">
              Interested in collaborating with ACM SIGSAC DUET? We're always looking 
              for partners who share our passion for cybersecurity education.
            </p>
            <button className="px-6 py-2 bg-cyber-neon text-cyber-dark font-medium rounded-md hover:bg-cyber-neon/80 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorsSection;
