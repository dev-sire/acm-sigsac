import React, { useEffect, useState, useRef } from 'react';
import Footer from '@/components/Footer';
import { CircuitBoard, Shield, Network, Cpu, Database, BrainCircuit, AlertTriangle, Globe, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import CyberpunkNavbar from '@/components/CyberpunkNavbar';
import HexPatternBackground from '@/components/HexBackground';

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

  // useEffect(() => {
  //   // Setup scroll reveal animations
  //   const cleanupScrollReveal = setupScrollReveal();
    
  //   // Setup cursor trail effect
  //   const cleanupCursorTrail = createCursorTrail();
    
  //   // Setup intersection observers for sections
  //   const observeSection = (ref: React.RefObject<HTMLElement>, id: string) => {
  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         if (entry.isIntersecting) {
  //           setActiveSection(id);
  //         }
  //       },
  //       { threshold: 0.6 }
  //     );
      
  //     if (ref.current) {
  //       observer.observe(ref.current);
  //     }
      
  //     return () => {
  //       if (ref.current) {
  //         observer.unobserve(ref.current);
  //       }
  //     };
  //   };
    
  //   const cleanup1 = observeSection(headerRef, 'header');
  //   const cleanup2 = observeSection(advocacyRef, 'advocacy');
  //   const cleanup3 = observeSection(executiveRef, 'executive');
  //   const cleanup4 = observeSection(teamsRef, 'teams');
    
  //   // Create cyber grid effect
  //   const createCyberGrid = () => {
  //     const container = document.getElementById('cyber-grid-container');
  //     if (!container) return;
      
  //     // Create grid cells
  //     const createGridCell = () => {
  //       const cell = document.createElement('div');
  //       cell.className = 'absolute rounded-sm bg-cyber-neon/5 border border-cyber-neon/10 backdrop-blur-sm';
        
  //       // Random positioning and size
  //       const size = 20 + Math.random() * 60;
  //       const startX = Math.random() * container.offsetWidth;
  //       const startY = Math.random() * container.offsetHeight;
        
  //       cell.style.width = `${size}px`;
  //       cell.style.height = `${size}px`;
  //       cell.style.left = `${startX}px`;
  //       cell.style.top = `${startY}px`;
  //       cell.style.opacity = '0';
        
  //       container.appendChild(cell);
        
  //       // Animate the cell
  //       const animation = cell.animate(
  //         [
  //           { opacity: 0, transform: 'scale(0.8) rotate(0deg)' },
  //           { opacity: 0.4, transform: 'scale(1) rotate(45deg)' },
  //           { opacity: 0, transform: 'scale(1.2) rotate(90deg)' }
  //         ],
  //         {
  //           duration: 3000 + Math.random() * 3000,
  //           easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)'
  //         }
  //       );
        
  //       animation.onfinish = () => {
  //         if (cell.parentNode === container) {
  //           container.removeChild(cell);
  //         }
  //       };
  //     };
      
  //     const interval = setInterval(() => {
  //       if (document.visibilityState === 'visible') {
  //         createGridCell();
  //       }
  //     }, 800);
      
  //     return () => clearInterval(interval);
  //   };
    
  //   const gridCleanup = createCyberGrid();
    
  //   // Create data packets animation
  //   const createDataPackets = () => {
  //     const container = document.getElementById('data-packets-container');
  //     if (!container) return;
      
  //     // Create a data packet
  //     const createPacket = () => {
  //       // Only create on larger screens
  //       if (window.innerWidth < 768) return;
        
  //       const packet = document.createElement('div');
  //       packet.className = 'absolute w-2 h-2 rounded-full bg-cyber-neon shadow-glow';
        
  //       // Random path setup
  //       const startX = Math.random() * container.offsetWidth;
  //       const startY = Math.random() * container.offsetHeight;
  //       const endX = Math.random() * container.offsetWidth;
  //       const endY = Math.random() * container.offsetHeight;
        
  //       packet.style.left = `${startX}px`;
  //       packet.style.top = `${startY}px`;
  //       packet.style.opacity = '0';
        
  //       container.appendChild(packet);
        
  //       // Create trail effect
  //       const trail = document.createElement('div');
  //       trail.className = 'absolute h-px bg-cyber-neon/30';
  //       trail.style.left = `${startX}px`;
  //       trail.style.top = `${startY}px`;
  //       trail.style.transformOrigin = 'left center';
  //       trail.style.opacity = '0';
        
  //       container.appendChild(trail);
        
  //       // Calculate angle and distance for trail
  //       const angle = Math.atan2(endY - startY, endX - startX);
  //       const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        
  //       // Animate the packet and trail
  //       const duration = 1500 + Math.random() * 1500;
        
  //       trail.animate(
  //         [
  //           { opacity: 0, width: '0px', transform: `rotate(${angle}rad)` },
  //           { opacity: 0.7, width: `${distance}px`, transform: `rotate(${angle}rad)` },
  //           { opacity: 0, width: `${distance}px`, transform: `rotate(${angle}rad)` }
  //         ],
  //         {
  //           duration: duration,
  //           easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)'
  //         }
  //       );
        
  //       const packetAnimation = packet.animate(
  //         [
  //           { opacity: 0, transform: 'scale(0.5)' },
  //           { opacity: 1, transform: 'scale(1)' },
  //           { opacity: 1, transform: 'scale(1)' },
  //           { opacity: 0, transform: 'scale(0.5)', offset: 0.9 },
  //           { opacity: 0, transform: 'scale(0)', offset: 1 }
  //         ],
  //         {
  //           duration: duration,
  //           easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)'
  //         }
  //       );
        
  //       packetAnimation.onfinish = () => {
  //         if (packet.parentNode === container) {
  //           container.removeChild(packet);
  //         }
  //         if (trail.parentNode === container) {
  //           container.removeChild(trail);
  //         }
  //       };
        
  //       // Animated movement from start to end point
  //       packet.animate(
  //         [
  //           { transform: 'translate(0, 0)' },
  //           { transform: `translate(${endX - startX}px, ${endY - startY}px)` }
  //         ],
  //         {
  //           duration: duration,
  //           easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
  //           fill: 'forwards'
  //         }
  //       );
  //     };
      
  //     const interval = setInterval(() => {
  //       if (document.visibilityState === 'visible') {
  //         createPacket();
  //       }
  //     }, 500);
      
  //     return () => clearInterval(interval);
  //   };
    
  //   const packetsCleanup = createDataPackets();
    
  //   // Create circuit paths
  //   const createCircuitPaths = () => {
  //     const container = document.getElementById('circuit-paths-container');
  //     if (!container) return;
      
  //     // Create a circuit path
  //     const createPath = () => {
  //       // Only create on larger screens
  //       if (window.innerWidth < 768) return;
        
  //       const path = document.createElement('div');
  //       path.className = 'absolute bg-gradient-to-r from-transparent via-cyber-neon/30 to-transparent h-px';
        
  //       // Random positioning and size
  //       const startY = Math.random() * container.offsetHeight;
  //       const width = 50 + Math.random() * 200;
        
  //       path.style.top = `${startY}px`;
  //       path.style.width = `${width}px`;
  //       path.style.right = '0';
  //       path.style.opacity = '0';
        
  //       container.appendChild(path);
        
  //       // Animate the path
  //       const animation = path.animate(
  //         [
  //           { opacity: 0, transform: 'translateX(0)' },
  //           { opacity: 0.7, transform: 'translateX(-100px)' },
  //           { opacity: 0.7, transform: 'translateX(-200px)' },
  //           { opacity: 0, transform: 'translateX(-300px)' }
  //         ],
  //         {
  //           duration: 4000,
  //           easing: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)'
  //         }
  //       );
        
  //       animation.onfinish = () => {
  //         container.removeChild(path);
  //       };
  //     };
      
  //     const interval = setInterval(() => {
  //       if (document.visibilityState === 'visible') {
  //         createPath();
  //       }
  //     }, 1000);
      
  //     return () => clearInterval(interval);
  //   };
    
  //   const circuitCleanup = createCircuitPaths();
    
  //   // Create subtle binary effect in background
  //   const createBinaryBackground = () => {
  //     const container = document.getElementById('binary-background-container');
  //     if (!container) return;
      
  //     // Generate random binary string
  //     const generateBinary = (length: number) => {
  //       let result = '';
  //       for (let i = 0; i < length; i++) {
  //         result += Math.floor(Math.random() * 2);
  //       }
  //       return result;
  //     };
      
  //     // Create a binary element
  //     const createBinaryElement = () => {
  //       // Only create on larger screens
  //       if (window.innerWidth < 768) return;
        
  //       const binary = document.createElement('div');
  //       binary.className = 'absolute text-xs font-orbitron';
  //       binary.textContent = generateBinary(8 + Math.floor(Math.random() * 12));
        
  //       // Random positioning
  //       const posX = Math.random() * container.offsetWidth;
  //       const posY = Math.random() * container.offsetHeight;
        
  //       binary.style.left = `${posX}px`;
  //       binary.style.top = `${posY}px`;
  //       binary.style.color = 'rgba(51, 195, 240, 0.08)'; // Very subtle color
  //       binary.style.opacity = '0';
  //       binary.style.fontSize = `${8 + Math.random() * 6}px`;
        
  //       container.appendChild(binary);
        
  //       // Animate the binary element
  //       const animation = binary.animate(
  //         [
  //           { opacity: 0 },
  //           { opacity: 0.6 },
  //           { opacity: 0.6 },
  //           { opacity: 0 }
  //         ],
  //         {
  //           duration: 6000 + Math.random() * 4000,
  //           easing: 'ease-in-out'
  //         }
  //       );
        
  //       animation.onfinish = () => {
  //         if (binary.parentNode === container) {
  //           container.removeChild(binary);
  //         }
  //       };
  //     };
      
  //     const interval = setInterval(() => {
  //       if (document.visibilityState === 'visible') {
  //         createBinaryElement();
  //       }
  //     }, 300);
      
  //     return () => clearInterval(interval);
  //   };
    
  //   const binaryCleanup = createBinaryBackground();
    
  //   return () => {
  //     cleanupScrollReveal();
  //     cleanupCursorTrail();
  //     cleanup1();
  //     cleanup2();
  //     cleanup3();
  //     cleanup4();
  //     gridCleanup();
  //     packetsCleanup();
  //     circuitCleanup();
  //     binaryCleanup();
  //   };
  // }, []);

  const executiveTeam = {
    name: "Executive Body",
    description: "The Central Planning and Leadership Group: Focuses on their role in planning and overall leadership.",
    image: "/executive_body.svg",
    members: "Aayesha, Rabia, Bushra, Ammara, Wasay, Usaiym, Sabat"
  };

  const teams: TeamType[] = [
    {
      name: "Social Media Team",
      description: "Responsible for managing our online presence and community engagement.",
      image: "/social-media.svg",
      members: "Hafsah, Shaheer, Taha Shakeel, Zoha, Hooria, Razzaque, Nouman",
      icon: <Network size={24} className="text-cyber-neon" />
    },
    {
      name: "Directors",
      description: "The directorial team responsible for charting the future course and strategic priorities of our society.",
      image: "/directors.svg",
      members: "Nimra, Bilal, Ubaid, razi, Hamza",
      icon: <CircuitBoard size={24} className="text-cyber-neon" />
    },
    {
      name: "CTF Team",
      description: "Participates in cybersecurity competitions and develops training materials.",
      image: "/ctf-team.svg",
      members: "Aman, Wasay, Hafsah, Rabia, Ammara, Ayesha, Haris, Ubaid, Ateeb",
      icon: <Shield size={24} className="text-cyber-neon" />
    },
    {
      name: "Ambassadors",
      description: "The dedicated individuals who act as our society's representatives and champions, promoting our vision and values.",
      image: "/placeholder-can2.png",
      members: "Talha, Haider",
      icon: <BrainCircuit size={24} className="text-cyber-neon" />
    },
    {
      name: "Event Management Team",
      description: "Plans and executes workshops, seminars, and networking events.",
      image: "/placeholder-can2.png",
      members: "Leila Patel, James Wilson, Aisha Johnson, Carlos Mendez",
      icon: <BrainCircuit size={24} className="text-cyber-neon" />
    },
    {
      name: "Photography Team",
      description: "Documents our events and creates visual content for our platforms.",
      image: "/placeholder-can2.png",
      members: "Nathan Lee, Priya Sharma, Leo Martinez",
      icon: <Database size={24} className="text-cyber-neon" />
    },
  ];

  return (
    <div className="bg-cyber-dark text-white min-h-screen relative overflow-hidden">
      <HexPatternBackground className="text-coastal-200" size={70} opacity={0.1} />
      <CyberpunkNavbar />
        <main className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header section */}
            <div className="text-center mb-16 scroll-fx" ref={headerRef}>
              <div className="mb-4 inline-block relative">
                <h1 className="font-tech text-4xl text-heading-md mb-4 glitch relative z-10" data-text="About Us">
                  About <span className="text-cyber-neon neon-text">Us</span>
                </h1>
              </div>

              <p className="font-rajdhani max-w-3xl mx-auto text-white/70 relative">
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
                <Button asChild variant="outline" size="sm" className="font-rajdhani border-cyber-neon/30 text-cyber-neon hover:bg-cyber-neon/10">
                  <Link to="/">
                    <span className="mr-2">←</span> Back to Homepage
                  </Link>
                </Button>
              </div>
            </div>
            <div id="advocacy" className="mb-24 scroll-fx" ref={advocacyRef}>
              <div className="text-center mb-8">
                <h2 className="text-heading-sm mb-2 text-xl font-bold relative inline-block">
                  <span className="font-orbitron text-cyber-neon">Tech Tayari</span> 1.0
                  <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-neon to-transparent"></div>
                </h2>
                <div className="max-w-3xl mx-auto px-4 relative">
                  <div className="text-2xl text-cyber-neon/80 absolute -left-2 top-0 md:-left-6">🏆</div>
                  <p className="italic text-white/80 px-6">
                    ACM SIGSAC DUET is proud to be an official collaborator in Tech Tayari 1.0, a groundbreaking initiative that bridges the gap between academic learning and industry demands.
                  </p>
                  <div className="text-2xl text-cyber-neon/80 absolute -right-2 top-0 md:-right-6">🏆</div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden card-hover relative">
                {/* Success indicator */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/30 via-cyber-neon/70 to-green-500/30"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/30 via-cyber-neon/70 to-green-500/30"></div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 relative">
                    <div className="bg-cyber-dark/50 border border-white/5 rounded-lg p-5 h-full flex flex-col justify-center relative overflow-hidden">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-cyber-neon/10 flex items-center justify-center border border-cyber-neon/30">
                          <BrainCircuit size={24} className="text-cyber-neon" />
                        </div>
                        <h3 className="font-orbitron text-xl font-semibold text-white">Education Initiative</h3>
                      </div>

                      <p className="font-rajdhani mb-4 text-white/80 leading-relaxed">
                        Tech Tayari 1.0 is a collaborative initiative between NanoTechx and Cisco Networking Academy,
                        designed to provide cutting-edge technical education through Cisco's NetAcad Portal.
                        ACM SIGSAC's participation represents our commitment to advancing cybersecurity education.
                      </p>

                      <div className="font-rajdhani mb-4 flex items-center">
                        <div className="w-8 h-8 mr-3 rounded-full bg-cyber-neon/10 flex items-center justify-center">
                          <Globe size={18} className="text-cyber-neon" />
                        </div>
                        <span className="text-cyber-neon font-medium">Official Outreach Partner</span>
                      </div>

                      <div className="bg-white/5 border border-cyber-neon/20 rounded-md p-3 mb-4 relative">
                        <div className="font-rajdhani text-sm text-white/90">
                          ACM SIGSAC DUET is an official collaborator on the Tech Tayari 1.0, <span className="text-cyber-neon font-medium hover:underline"><a href="https://nanotechx.org/tech-tayari" target='_blank'>Visit their website, to get yourself enrolled!</a></span>
                        </div>
                      </div>

                      <p className="font-rajdhani text-sm text-white/70">
                        This collaboration reinforces our dedication to bridging the skills gap in technology
                        and providing our members with industry-relevant training opportunities.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="font-orbitron text-xl font-semibold mb-4 text-white">Training Domains</h3>

                    <div className="font-rajdhani space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <CircuitBoard size={16} className="text-blue-400" />
                        </div>
                        <span className="text-white/80">Programming</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                          <Shield size={16} className="text-red-400" />
                        </div>
                        <span className="text-white/80">Cybersecurity</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Network size={16} className="text-green-400" />
                        </div>
                        <span className="text-white/80">Networking</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <BrainCircuit size={16} className="text-purple-400" />
                        </div>
                        <span className="text-white/80">Artificial Intelligence</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <Database size={16} className="text-orange-400" />
                        </div>
                        <span className="text-white/80">Data Science</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <Cpu size={16} className="text-cyan-400" />
                        </div>
                        <span className="text-white/80">DevNet Associate</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-xs text-cyber-neon/70 mb-2">Powered by</div>
                      <div className="flex items-center gap-2 text-white/80">
                        <span className="font-medium">NanoTechx</span>
                        <span className="text-cyber-neon">×</span>
                        <span className="font-medium">Cisco Networking Academy</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Binary code decoration */}
                <div className="absolute bottom-2 right-2 text-[10px] font-orbitron text-cyber-neon/10 select-none pointer-events-none">
                  01010100 01100101 01100011 01101000<br />
                  01010100 01100001 01111001 01100001<br />
                  01010010 01001001 00100000 00110001
                </div>
              </div>
            </div>

            {/* Executive Team */}
            <div id="executive" className="mb-24 scroll-fx" ref={executiveRef}>
              <div className="text-center mb-12">
                <h2 className="font-orbitron text-heading-sm mb-2 relative inline-block">
                  <span className="text-cyber-neon">Executive</span> Body
                  <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-neon to-transparent"></div>
                </h2>
                <p className="font-rajdhani max-w-2xl mx-auto text-white/70">
                  Meet the leadership team guiding our chapter's initiatives and strategic direction.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden card-hover relative">
                {/* Binary background decoration */}
                <div className="absolute top-2 right-2 text-[12px] font-orbitron text-cyber-neon/10 select-none">
                  01010011 01001001 01000111 01010011 01000001 01000111<br />
                  10101010 01010101 01001110 01001001 01010110 01000101<br />
                  01010010 01010011 01001001 01010100 01011001 00100000
                </div>

                <div className="font-rajdhani grid md:grid-cols-2 gap-6">
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
                      {/* {executiveNames.map((name, index) => (
                          <Avatar key={index} className="border-2 border-cyber-dark relative group">
                            <img src='/aayesha.jpg' />
                            <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            <div className="absolute inset-0 rounded-full border border-cyber-neon/0 group-hover:border-cyber-neon/50 transition-all"></div>
                          </Avatar>
                        ))}
                        {executiveTeam.members.split(", ").length > 5 && (
                          <Avatar className="bg-cyber-neon text-cyber-dark border-2 border-cyber-dark">
                            <AvatarFallback>+{executiveTeam.members.split(", ").length - 5}</AvatarFallback>
                          </Avatar>
                        )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teams Section */}
            <div id="teams" className="scroll-fx" ref={teamsRef}>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-orbitron text-heading-sm mb-2 relative inline-block">
                  Our <span className=" text-cyber-neon">Teams</span>
                  <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-neon to-transparent"></div>
                </h2>
                <p className="font-rajdhani max-w-2xl mx-auto text-white/70">
                  Discover the specialized teams that make our chapter successful and impactful.
                </p>
              </div>

              <div className="font-rajdhani grid md:grid-cols-2 gap-8">
                {teams.map((team, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-lg overflow-hidden card-hover relative group"
                    style={{ animationDelay: `${index * 0.15}s` }}
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
                        className="w-full h-60 object-cover rounded-lg border border-cyber-neon/30 mb-6 relative z-10"
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