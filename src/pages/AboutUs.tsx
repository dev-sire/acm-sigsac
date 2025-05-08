import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { setupScrollReveal } from '@/utils/scrollReveal';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import createCursorTrail from '@/utils/cursorTrail';
import { CircuitBoard, Shield, Network, Cpu, Database, BrainCircuit, AlertTriangle, Globe, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface TeamType {
  name: string;
  description: string;
  image: string;
  members: string;
  icon: React.ReactNode;
}

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const advocacyRef = useRef<HTMLDivElement>(null);
  const executiveRef = useRef<HTMLDivElement>(null);
  const teamsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const copyHashtagToClipboard = () => {
    navigator.clipboard.writeText('#DUETSocialmediawarriorsagainstindianaggression')
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Hashtag copied! Use it to spread awareness.",
          duration: 3000,
        });
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast({
          title: "Failed to copy",
          description: "Please try again or copy manually",
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  useEffect(() => {
    // Setup scroll reveal animations
    const cleanupScrollReveal = setupScrollReveal();
    
    // Setup cursor trail effect
    const cleanupCursorTrail = createCursorTrail();
    
    // Setup intersection observers for sections
    const observeSection = (ref: React.RefObject<HTMLElement>, id: string) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.6 }
      );
      
      if (ref.current) {
        observer.observe(ref.current);
      }
      
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    };
    
    const cleanup1 = observeSection(headerRef, 'header');
    const cleanup2 = observeSection(advocacyRef, 'advocacy');
    const cleanup3 = observeSection(executiveRef, 'executive');
    const cleanup4 = observeSection(teamsRef, 'teams');
    
    // Create cyber grid effect
    const createCyberGrid = () => {
      const container = document.getElementById('cyber-grid-container');
      if (!container) return;
      
      // Create grid cells
      const createGridCell = () => {
        const cell = document.createElement('div');
        cell.className = 'absolute rounded-sm bg-cyber-neon/5 border border-cyber-neon/10 backdrop-blur-sm';
        
        // Random positioning and size
        const size = 20 + Math.random() * 60;
        const startX = Math.random() * container.offsetWidth;
        const startY = Math.random() * container.offsetHeight;
        
        cell.style.width = `${size}px`;
        cell.style.height = `${size}px`;
        cell.style.left = `${startX}px`;
        cell.style.top = `${startY}px`;
        cell.style.opacity = '0';
        
        container.appendChild(cell);
        
        // Animate the cell
        const animation = cell.animate(
          [
            { opacity: 0, transform: 'scale(0.8) rotate(0deg)' },
            { opacity: 0.4, transform: 'scale(1) rotate(45deg)' },
            { opacity: 0, transform: 'scale(1.2) rotate(90deg)' }
          ],
          {
            duration: 3000 + Math.random() * 3000,
            easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)'
          }
        );
        
        animation.onfinish = () => {
          if (cell.parentNode === container) {
            container.removeChild(cell);
          }
        };
      };
      
      const interval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          createGridCell();
        }
      }, 800);
      
      return () => clearInterval(interval);
    };
    
    const gridCleanup = createCyberGrid();
    
    // Create data packets animation
    const createDataPackets = () => {
      const container = document.getElementById('data-packets-container');
      if (!container) return;
      
      // Create a data packet
      const createPacket = () => {
        // Only create on larger screens
        if (window.innerWidth < 768) return;
        
        const packet = document.createElement('div');
        packet.className = 'absolute w-2 h-2 rounded-full bg-cyber-neon shadow-glow';
        
        // Random path setup
        const startX = Math.random() * container.offsetWidth;
        const startY = Math.random() * container.offsetHeight;
        const endX = Math.random() * container.offsetWidth;
        const endY = Math.random() * container.offsetHeight;
        
        packet.style.left = `${startX}px`;
        packet.style.top = `${startY}px`;
        packet.style.opacity = '0';
        
        container.appendChild(packet);
        
        // Create trail effect
        const trail = document.createElement('div');
        trail.className = 'absolute h-px bg-cyber-neon/30';
        trail.style.left = `${startX}px`;
        trail.style.top = `${startY}px`;
        trail.style.transformOrigin = 'left center';
        trail.style.opacity = '0';
        
        container.appendChild(trail);
        
        // Calculate angle and distance for trail
        const angle = Math.atan2(endY - startY, endX - startX);
        const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        
        // Animate the packet and trail
        const duration = 1500 + Math.random() * 1500;
        
        trail.animate(
          [
            { opacity: 0, width: '0px', transform: `rotate(${angle}rad)` },
            { opacity: 0.7, width: `${distance}px`, transform: `rotate(${angle}rad)` },
            { opacity: 0, width: `${distance}px`, transform: `rotate(${angle}rad)` }
          ],
          {
            duration: duration,
            easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)'
          }
        );
        
        const packetAnimation = packet.animate(
          [
            { opacity: 0, transform: 'scale(0.5)' },
            { opacity: 1, transform: 'scale(1)' },
            { opacity: 1, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(0.5)', offset: 0.9 },
            { opacity: 0, transform: 'scale(0)', offset: 1 }
          ],
          {
            duration: duration,
            easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)'
          }
        );
        
        packetAnimation.onfinish = () => {
          if (packet.parentNode === container) {
            container.removeChild(packet);
          }
          if (trail.parentNode === container) {
            container.removeChild(trail);
          }
        };
        
        // Animated movement from start to end point
        packet.animate(
          [
            { transform: 'translate(0, 0)' },
            { transform: `translate(${endX - startX}px, ${endY - startY}px)` }
          ],
          {
            duration: duration,
            easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
            fill: 'forwards'
          }
        );
      };
      
      const interval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          createPacket();
        }
      }, 500);
      
      return () => clearInterval(interval);
    };
    
    const packetsCleanup = createDataPackets();
    
    // Create circuit paths
    const createCircuitPaths = () => {
      const container = document.getElementById('circuit-paths-container');
      if (!container) return;
      
      // Create a circuit path
      const createPath = () => {
        // Only create on larger screens
        if (window.innerWidth < 768) return;
        
        const path = document.createElement('div');
        path.className = 'absolute bg-gradient-to-r from-transparent via-cyber-neon/30 to-transparent h-px';
        
        // Random positioning and size
        const startY = Math.random() * container.offsetHeight;
        const width = 50 + Math.random() * 200;
        
        path.style.top = `${startY}px`;
        path.style.width = `${width}px`;
        path.style.right = '0';
        path.style.opacity = '0';
        
        container.appendChild(path);
        
        // Animate the path
        const animation = path.animate(
          [
            { opacity: 0, transform: 'translateX(0)' },
            { opacity: 0.7, transform: 'translateX(-100px)' },
            { opacity: 0.7, transform: 'translateX(-200px)' },
            { opacity: 0, transform: 'translateX(-300px)' }
          ],
          {
            duration: 4000,
            easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)'
          }
        );
        
        animation.onfinish = () => {
          container.removeChild(path);
        };
      };
      
      const interval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          createPath();
        }
      }, 1000);
      
      return () => clearInterval(interval);
    };
    
    const circuitCleanup = createCircuitPaths();
    
    // Create subtle binary effect in background
    const createBinaryBackground = () => {
      const container = document.getElementById('binary-background-container');
      if (!container) return;
      
      // Generate random binary string
      const generateBinary = (length: number) => {
        let result = '';
        for (let i = 0; i < length; i++) {
          result += Math.floor(Math.random() * 2);
        }
        return result;
      };
      
      // Create a binary element
      const createBinaryElement = () => {
        // Only create on larger screens
        if (window.innerWidth < 768) return;
        
        const binary = document.createElement('div');
        binary.className = 'absolute text-xs font-mono';
        binary.textContent = generateBinary(8 + Math.floor(Math.random() * 12));
        
        // Random positioning
        const posX = Math.random() * container.offsetWidth;
        const posY = Math.random() * container.offsetHeight;
        
        binary.style.left = `${posX}px`;
        binary.style.top = `${posY}px`;
        binary.style.color = 'rgba(51, 195, 240, 0.08)'; // Very subtle color
        binary.style.opacity = '0';
        binary.style.fontSize = `${8 + Math.random() * 6}px`;
        
        container.appendChild(binary);
        
        // Animate the binary element
        const animation = binary.animate(
          [
            { opacity: 0 },
            { opacity: 0.6 },
            { opacity: 0.6 },
            { opacity: 0 }
          ],
          {
            duration: 6000 + Math.random() * 4000,
            easing: 'ease-in-out'
          }
        );
        
        animation.onfinish = () => {
          if (binary.parentNode === container) {
            container.removeChild(binary);
          }
        };
      };
      
      const interval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          createBinaryElement();
        }
      }, 300);
      
      return () => clearInterval(interval);
    };
    
    const binaryCleanup = createBinaryBackground();
    
    return () => {
      cleanupScrollReveal();
      cleanupCursorTrail();
      cleanup1();
      cleanup2();
      cleanup3();
      cleanup4();
      gridCleanup();
      packetsCleanup();
      circuitCleanup();
      binaryCleanup();
    };
  }, []);

  const executiveTeam = {
    name: "Executive Body",
    description: "The leadership team that guides our chapter's vision and strategic direction.",
    image: "https://randomuser.me/api/portraits/group/1.jpg",
    members: "Alex Johnson, Sarah Williams, Michael Chen, Emily Rodriguez, David Lee, Lisa Kumar"
  };

  const teams: TeamType[] = [
    {
      name: "Social Media Team",
      description: "Responsible for managing our online presence and community engagement.",
      image: "https://randomuser.me/api/portraits/group/2.jpg",
      members: "Jason Wong, Alicia Freeman, Raj Patel",
      icon: <Network size={24} className="text-cyber-neon" />
    },
    {
      name: "Web Development Team",
      description: "Creates and maintains our digital platforms and web applications.",
      image: "https://randomuser.me/api/portraits/group/3.jpg",
      members: "Emma Zhang, Marcus Jefferson, Sophia Nguyen, Omar Hassan",
      icon: <CircuitBoard size={24} className="text-cyber-neon" />
    },
    {
      name: "CTF Team",
      description: "Participates in cybersecurity competitions and develops training materials.",
      image: "https://randomuser.me/api/portraits/group/4.jpg",
      members: "Daniel Kim, Maya Rodriguez, Victor Cheng, Zara Malik",
      icon: <Shield size={24} className="text-cyber-neon" />
    },
    {
      name: "Event Management Team",
      description: "Plans and executes workshops, seminars, and networking events.",
      image: "https://randomuser.me/api/portraits/group/5.jpg",
      members: "Leila Patel, James Wilson, Aisha Johnson, Carlos Mendez",
      icon: <BrainCircuit size={24} className="text-cyber-neon" />
    },
    {
      name: "Photography Team",
      description: "Documents our events and creates visual content for our platforms.",
      image: "https://randomuser.me/api/portraits/group/6.jpg",
      members: "Nathan Lee, Priya Sharma, Leo Martinez",
      icon: <Database size={24} className="text-cyber-neon" />
    }
  ];

  return (
    <div className="bg-cyber-dark text-white min-h-screen relative">
      {/* Cyber grid container */}
      <div id="cyber-grid-container" className="fixed inset-0 pointer-events-none z-0 overflow-hidden"></div>
      
      {/* Data packets container */}
      <div id="data-packets-container" className="fixed inset-0 pointer-events-none z-0 overflow-hidden"></div>
      
      {/* Circuit paths container */}
      <div id="circuit-paths-container" className="fixed inset-0 pointer-events-none z-0 overflow-hidden"></div>
      
      {/* Binary background container - new addition */}
      <div id="binary-background-container" className="fixed inset-0 pointer-events-none z-0 overflow-hidden"></div>
      
      <Navbar />
      
      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          {/* Header section */}
          <div className="text-center mb-16 scroll-fx" ref={headerRef}>
            <div className="mb-4 inline-block relative">
              <h1 className="text-heading-md mb-4 glitch relative z-10" data-text="About Us">
                About <span className="text-cyber-neon neon-text">Us</span>
              </h1>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-10 w-8 h-8 border border-cyber-neon/30 rounded-full opacity-40"></div>
              <div className="absolute -bottom-2 -right-12 w-6 h-6 border border-cyber-neon/30 rounded-full opacity-40"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-cyber-neon/5 filter blur-xl -z-10"></div>
            </div>
            
            <p className="max-w-3xl mx-auto text-white/70 relative">
              ACM SIGSAG is a student-led organization at Dawood University focused on cybersecurity education, 
              skill development, and community building. Our diverse teams work together to create impactful 
              experiences for our members and the broader tech community.
            </p>
            
            {/* Navigation dots */}
            <div className="mt-12 flex justify-center gap-4">
              <a 
                href="#advocacy" 
                className={`w-3 h-3 rounded-full transition-all ${activeSection === 'advocacy' ? 'bg-cyber-neon scale-125' : 'bg-white/30'}`}
                aria-label="Go to Media Advocacy section"
              />
              <a 
                href="#executive" 
                className={`w-3 h-3 rounded-full transition-all ${activeSection === 'executive' ? 'bg-cyber-neon scale-125' : 'bg-white/30'}`}
                aria-label="Go to Executive Team section"
              />
              <a 
                href="#teams" 
                className={`w-3 h-3 rounded-full transition-all ${activeSection === 'teams' ? 'bg-cyber-neon scale-125' : 'bg-white/30'}`}
                aria-label="Go to Teams section"
              />
            </div>
            
            {/* Quick return to home */}
            <div className="mt-8">
              <Button asChild variant="outline" size="sm" className="border-cyber-neon/30 text-cyber-neon hover:bg-cyber-neon/10">
                <Link to="/">
                  <span className="mr-2">←</span> Back to Homepage
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Media Advocacy Section - NEW */}
          <div id="advocacy" className="mb-24 scroll-fx" ref={advocacyRef}>
            <div className="text-center mb-8">
              <h2 className="text-heading-sm mb-2 relative inline-block">
                <span className="text-cyber-neon">Media</span> Advocacy
                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-neon to-transparent"></div>
              </h2>
              <div className="max-w-3xl mx-auto px-4 relative">
                <div className="text-2xl text-cyber-neon/80 absolute -left-2 top-0 md:-left-6">❝</div>
                <p className="italic text-white/80 px-6">
                  In the digital age, truth is our most powerful weapon against propaganda. We stand united against misinformation that threatens peace.
                </p>
                <div className="text-2xl text-cyber-neon/80 absolute -right-2 bottom-0 md:-right-6">❞</div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden md:overflow-visible card-hover relative">
              {/* Alert decorations */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-neon/30 via-cyber-neon/70 to-cyber-neon/30"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-neon/30 via-cyber-neon/70 to-cyber-neon/30"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 relative">
                  <div className="bg-cyber-dark/50 border border-white/5 rounded-lg p-5 h-full flex flex-col justify-center relative overflow-hidden">
                    {/* Pulsing alert indicator */}
                    <div className="absolute top-3 right-8 flex items-center">
                      <span className="flex h-3 w-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-neon opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-neon"></span>
                      </span>
                      <span className="text-xs text-cyber-neon">LIVE ISSUE</span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-cyber-neon/10 flex items-center justify-center border border-cyber-neon/30">
                        <AlertTriangle size={24} className="text-cyber-neon" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Digital Misinformation Alert</h3>
                    </div>
                    
                    <p className="mb-4 text-white/80 leading-relaxed">
                      As cybersecurity advocates, we are deeply concerned about the spread of false narratives and propaganda 
                      in the ongoing tensions between Pakistan and India. Digital warfare is as significant as physical confrontation, and manipulation 
                      of information threatens global peace and security.
                    </p>
                    
                    <div className="mb-4 flex items-center">
                      <div className="w-8 h-8 mr-3 rounded-full bg-cyber-neon/10 flex items-center justify-center">
                        <Globe size={18} className="text-cyber-neon" />
                      </div>
                      <span className="text-cyber-neon font-medium">Our Digital Response Initiative:</span>
                    </div>
                    
                    <div className="bg-white/5 border border-cyber-neon/20 rounded-md p-3 mb-4 relative">
                      <div className="text-sm font-mono text-cyber-neon opacity-80 pb-1 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-cyber-neon/20 scrollbar-track-transparent pr-10">
                        #DUETSocialmediawarriorsagainstindianaggression
                      </div>
                      <button 
                        onClick={copyHashtagToClipboard}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-cyber-neon/10 rounded hover:bg-cyber-neon/20 transition-colors"
                        aria-label="Copy hashtag to clipboard"
                        title="Copy to clipboard"
                      >
                        <Copy size={16} className="text-cyber-neon" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-white/70">
                      Join us in promoting fact-based discourse and countering digital propaganda that aims to distort reality. 
                      Truth is our strongest defensive measure in the age of information warfare.
                    </p>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-4 text-white">Our Advocacy Position</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 text-cyber-neon">01</div>
                      <p className="text-white/80">
                        <span className="text-cyber-neon font-medium">Fact Verification:</span> We are committed to combating false narratives by 
                        verifying information before sharing and encouraging critical media literacy among our community.
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 text-cyber-neon">02</div>
                      <p className="text-white/80">
                        <span className="text-cyber-neon font-medium">Digital Awareness:</span> We recognize how international media can be manipulated 
                        to shape global perception, and we stand against all forms of digital misinformation.
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 text-cyber-neon">03</div>
                      <p className="text-white/80">
                        <span className="text-cyber-neon font-medium">Responsible Engagement:</span> As technology students, we have a responsibility 
                        to ensure digital platforms serve as channels for truth rather than vehicles for propaganda.
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" className="border-cyber-neon/30 text-cyber-neon hover:bg-cyber-neon/10">
                        Join Our Initiative
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Binary code decoration */}
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-cyber-neon/10 select-none pointer-events-none">
                01010100 01110010 01110101 01110100 01101000<br />
                01000001 01100010 01101111 01110110 01100101<br />
                01010000 01110010 01101111 01110000 01100001
              </div>
            </div>
          </div>
          
          {/* Executive Team */}
          <div id="executive" className="mb-24 scroll-fx" ref={executiveRef}>
            <div className="text-center mb-12">
              <h2 className="text-heading-sm mb-2 relative inline-block">
                <span className="text-cyber-neon">Executive</span> Body
                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-neon to-transparent"></div>
              </h2>
              <p className="max-w-2xl mx-auto text-white/70">
                Meet the leadership team guiding our chapter's initiatives and strategic direction.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden card-hover relative">
              {/* Binary background decoration */}
              <div className="absolute top-2 right-2 text-[12px] font-mono text-cyber-neon/10 select-none">
                01010011 01001001 01000111 01010011 01000001 01000111<br />
                10101010 01010101 01001110 01001001 01010110 01000101<br />
                01010010 01010011 01001001 01010100 01011001 00100000
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-neon/3 to-transparent pointer-events-none"></div>
                  <img 
                    src={executiveTeam.image} 
                    alt="Executive Team" 
                    className="w-full h-64 object-cover rounded-lg border border-cyber-neon/30 relative z-10" 
                  />
                  {/* Corner accents */}
                  <div className="absolute top-8 left-8 w-3 h-3 border-l-2 border-t-2 border-cyber-neon opacity-70"></div>
                  <div className="absolute top-8 right-8 w-3 h-3 border-r-2 border-t-2 border-cyber-neon opacity-70"></div>
                  <div className="absolute bottom-8 left-8 w-3 h-3 border-l-2 border-b-2 border-cyber-neon opacity-70"></div>
                  <div className="absolute bottom-8 right-8 w-3 h-3 border-r-2 border-b-2 border-cyber-neon opacity-70"></div>
                </div>
                <div className="p-6 flex flex-col justify-center relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-cyber-neon/10 flex items-center justify-center">
                      <Cpu size={20} className="text-cyber-neon" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{executiveTeam.name}</h3>
                  </div>
                  <p className="mb-4 text-white/70">{executiveTeam.description}</p>
                  <div className="mb-4">
                    <span className="text-sm text-cyber-neon font-medium">Team Members:</span>
                    <p className="text-white/70">{executiveTeam.members}</p>
                  </div>
                  <div className="flex -space-x-2 overflow-hidden">
                    {executiveTeam.members.split(", ").slice(0, 5).map((member, index) => (
                      <Avatar key={index} className="border-2 border-cyber-dark relative group">
                        <AvatarImage src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`} />
                        <AvatarFallback>{member.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        <div className="absolute inset-0 rounded-full border border-cyber-neon/0 group-hover:border-cyber-neon/50 transition-all"></div>
                      </Avatar>
                    ))}
                    {executiveTeam.members.split(", ").length > 5 && (
                      <Avatar className="bg-cyber-neon text-cyber-dark border-2 border-cyber-dark">
                        <AvatarFallback>+{executiveTeam.members.split(", ").length - 5}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Teams Section */}
          <div id="teams" className="scroll-fx" ref={teamsRef}>
            <div className="text-center mb-12">
              <h2 className="text-heading-sm mb-2 relative inline-block">
                Our <span className="text-cyber-neon">Teams</span>
                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-neon to-transparent"></div>
              </h2>
              <p className="max-w-2xl mx-auto text-white/70">
                Discover the specialized teams that make our chapter successful and impactful.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {teams.map((team, index) => (
                <div 
                  key={index} 
                  className="bg-white/5 border border-white/10 rounded-lg overflow-hidden card-hover relative group"
                  style={{animationDelay: `${index * 0.15}s`}}
                >
                  {/* On hover circuit pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 grid-pattern"></div>
                  </div>
                  
                  <div className="p-6 relative">
                    <div className="absolute top-6 right-6 z-10">
                      <div className="w-10 h-10 rounded-full bg-cyber-neon/10 flex items-center justify-center">
                        {team.icon}
                      </div>
                    </div>
                    
                    <img 
                      src={team.image} 
                      alt={team.name} 
                      className="w-full h-48 object-cover rounded-lg border border-cyber-neon/30 mb-6 relative z-10" 
                    />
                    
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{team.name}</h3>
                    </div>
                    <p className="mb-4 text-white/70">{team.description}</p>
                    <div>
                      <span className="text-sm text-cyber-neon font-medium">Team Members:</span>
                      <p className="text-white/70">{team.members}</p>
                    </div>
                    
                    {/* Corner accents that show on hover */}
                    <div className="absolute top-8 left-8 w-2 h-2 border-l border-t border-cyber-neon/0 group-hover:border-cyber-neon/50 transition-all"></div>
                    <div className="absolute top-8 right-8 w-2 h-2 border-r border-t border-cyber-neon/0 group-hover:border-cyber-neon/50 transition-all"></div>
                    <div className="absolute bottom-8 left-8 w-2 h-2 border-l border-b border-cyber-neon/0 group-hover:border-cyber-neon/50 transition-all"></div>
                    <div className="absolute bottom-8 right-8 w-2 h-2 border-r border-b border-cyber-neon/0 group-hover:border-cyber-neon/50 transition-all"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;