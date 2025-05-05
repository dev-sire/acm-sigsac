
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Lightbulb, Target, CircuitBoard } from 'lucide-react';

const VisionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const visionCards = [
    {
      title: "Chairperson's Vision",
      name: "Dr. Asif Aziz",
      image: "https://aug5orynmq.ufs.sh/f/2UpMAj3GExWCMeDUhl2bcCQSTWuXnByIL6j2Z89Vtd4HgJ73",
      vision: "To foster a community where cybersecurity knowledge is openly shared, creating opportunities for students to develop practical skills that address real-world security challenges.",
      position: "Chairperson, Department of Cybersecurity",
      icon: <ShieldCheck className="text-cyber-neon" size={24} />
    },
    {
      title: "Dean's Vision",
      name: "Prof. Dr. Engr. Atif Jamil",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
      vision: "To cultivate leaders in cybersecurity through innovative education, research contributions, and community engagement that shapes the future security landscape.",
      position: "Dean, Faculty of Computing & Information Sciences",
      icon: <ShieldCheck className="text-cyber-neon" size={24} />
    }
  ];

  const coreValues = [
    {
      title: "Innovation",
      description: "Pioneering new approaches to cybersecurity challenges",
      icon: <Lightbulb className="text-cyber-neon" size={22} />
    },
    {
      title: "Excellence",
      description: "Striving for the highest standards in all our initiatives",
      icon: <Target className="text-cyber-neon" size={22} />
    },
    {
      title: "Collaboration",
      description: "Building strong partnerships within the community",
      icon: <CircuitBoard className="text-cyber-neon" size={22} />
    }
  ];

  return (
    <section id="vision" className="py-24 relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-neon/5 to-transparent -z-10"></div>
      
      {/* Animated circuit lines */}
      <div className="absolute top-0 left-0 w-32 h-full opacity-20 pointer-events-none">
        <div className="absolute left-12 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-cyber-neon to-transparent"></div>
        <div className="absolute left-12 top-1/4 w-12 h-[1px] bg-cyber-neon"></div>
        <div className="absolute left-12 top-2/4 w-20 h-[1px] bg-cyber-neon"></div>
        <div className="absolute left-12 top-3/4 w-6 h-[1px] bg-cyber-neon"></div>
      </div>
      
      <div className="absolute top-0 right-0 w-32 h-full opacity-20 pointer-events-none">
        <div className="absolute right-12 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-cyber-neon to-transparent"></div>
        <div className="absolute right-12 top-1/4 w-12 h-[1px] bg-cyber-neon"></div>
        <div className="absolute right-12 top-2/4 w-20 h-[1px] bg-cyber-neon"></div>
        <div className="absolute right-12 top-3/4 w-6 h-[1px] bg-cyber-neon"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 scroll-fx ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-heading-md mb-4 relative inline-block">
            Our <span className="text-cyber-neon">Vision</span>
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-neon to-transparent"></div>
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            ACM SIGSAC aims to create a vibrant community of cybersecurity enthusiasts, practitioners, and leaders who are equipped with cutting-edge knowledge and skills to excel in the rapidly evolving field of information security.
          </p>
        </div>
        
        <div className={`mt-8 p-6 border border-cyber-neon/30 bg-white/5 rounded-lg max-w-3xl mx-auto relative overflow-hidden scroll-fx ${isVisible ? 'visible' : ''}`}>
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 grid-pattern"></div>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-cyber-neon/10 border border-cyber-neon/30 flex items-center justify-center">
              <Lightbulb className="text-cyber-neon" size={28} />
            </div>
          </div>
          
          <p className="italic text-white/80 text-center relative z-10">
            "We envision a future where our members are at the forefront of cybersecurity innovation, ethical practices, and research, contributing to a safer digital world through education, collaboration, and community service."
          </p>
          
          {/* Animated dots */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-cyber-neon/50 animate-pulse"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-cyber-neon/50 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyber-neon/50 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-cyber-neon/50 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        {/* Core values section */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 scroll-fx ${isVisible ? 'visible' : ''}`}>
          {coreValues.map((value, index) => (
            <div 
              key={index} 
              className="bg-white/5 border border-white/10 p-6 rounded-lg text-center hover:border-cyber-neon/30 transition-all cursor-default"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-cyber-neon/10 flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-white/70">{value.description}</p>
            </div>
          ))}
        </div>
        
        <div className={`grid md:grid-cols-2 gap-8 mt-16 scroll-fx ${isVisible ? 'visible' : ''}`}>
          {visionCards.map((card, index) => (
            <Card 
              key={index} 
              className="bg-white/5 border border-white/10 overflow-hidden card-hover" 
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="relative w-20 h-20 mr-4">
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 rounded-full bg-cyber-neon/20 animate-pulse-glow"></div>
                    <img 
                      src={card.image} 
                      alt={card.name} 
                      className="w-full h-full object-cover rounded-full border-2 border-cyber-neon p-1"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {card.icon}
                      <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                    </div>
                    <p className="text-cyber-neon">{card.name}</p>
                    <p className="text-sm text-white/70">{card.position}</p>
                  </div>
                </div>
                
                <blockquote className="border-l-2 border-cyber-neon pl-4 py-2 italic text-white/80 relative">
                  {/* Binary decorations */}
                  <div className="absolute -right-2 top-0 text-[10px] text-cyber-neon/20 font-mono">
                    01010101
                  </div>
                  <div className="absolute -left-8 bottom-0 text-[10px] text-cyber-neon/20 font-mono">
                    10101010
                  </div>
                  {card.vision}
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
