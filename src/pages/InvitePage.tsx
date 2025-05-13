
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import CountdownTimer from '@/components/CountdownTimer';

const InvitePage = () => {
  const [searchParams] = useSearchParams();
  const visitorName = searchParams.get('visitor') || 'Fellow Cybersecurity Enthusiast';
  const eventName = searchParams.get('event') || 'Our Upcoming Cyber Event';
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Create animated binary rain effect
  useEffect(() => {
    const binaryContainer = document.getElementById('binary-rain');
    if (!binaryContainer) return;
    
    const createBinaryRain = () => {
      const binaryStream = document.createElement('div');
      binaryStream.className = 'absolute text-cyber-neon/20 text-xs font-mono whitespace-nowrap';
      
      // Random binary string
      let binaryString = '';
      for (let i = 0; i < 50; i++) {
        binaryString += Math.floor(Math.random() * 2);
      }
      
      binaryStream.textContent = binaryString;
      
      // Random position and animation duration
      const left = Math.random() * 100;
      const animDuration = 5 + Math.random() * 15;
      
      binaryStream.style.left = `${left}%`;
      binaryStream.style.animationDuration = `${animDuration}s`;
      
      binaryContainer.appendChild(binaryStream);
      
      // Remove after animation completes
      setTimeout(() => {
        if (binaryStream.parentNode === binaryContainer) {
          binaryContainer.removeChild(binaryStream);
        }
      }, animDuration * 1000);
    };
    
    // Create initial batch
    for (let i = 0; i < 10; i++) {
      setTimeout(createBinaryRain, i * 300);
    }
    
    // Create more periodically
    const interval = setInterval(createBinaryRain, 800);
    
    return () => clearInterval(interval);
  }, []);

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are 0-indexed, so add 1
  const year = today.getFullYear();
  
  return (
    <div className="min-h-screen bg-cyber-dark overflow-hidden">
      {/* Binary rain background effect */}
      <div id="binary-rain" className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Binary stream elements will be added here by JS */}
      </div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 grid-pattern opacity-30 z-0"></div>
      
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Hero section */}
        <div className="relative pt-24 px-4 sm:pt-32 md:pt-40 lg:pt-48 max-w-6xl mx-auto text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-neon/5 via-transparent to-transparent"></div>
          
          <div className="inline-block mb-6 animate-fade-in">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm py-2 px-4 rounded-full border border-cyber-neon/20">
              <Calendar size={16} className="text-cyber-neon" />
              <span className="text-sm">{`${month}/${day}/${year}`}</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Hello <span className="text-cyber-neon neon-text">{visitorName}</span>!
          </h1>
          
          <div className="bg-gradient-to-r from-cyber-neon/20 to-transparent p-px rounded-lg mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">You're Invited to:</h2>
              <h3 className="text-3xl sm:text-4xl text-cyber-neon mb-4">{eventName}</h3>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                We're excited to personally invite you to this exclusive event. 
                Your expertise and enthusiasm would make a valuable contribution!
              </p>
            </div>
          </div>
          
          <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CountdownTimer endDate='19-May-2025' />
          </div>
        </div>
        
        {/* Event details */}
        <div className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-cyber-neon/20 backdrop-blur-sm overflow-hidden hover-scale">
                <AspectRatio ratio={16/9}>
                  <div className="w-full h-full bg-gradient-to-br from-cyber-neon/30 to-purple-600/30 flex items-center justify-center">
                    <div className="text-4xl font-bold text-white">Event Highlights</div>
                  </div>
                </AspectRatio>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-cyber-neon/20 p-1 mt-1">
                        <div className="w-2 h-2 rounded-full bg-cyber-neon"></div>
                      </div>
                      <span>Hands-on cybersecurity workshops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-cyber-neon/20 p-1 mt-1">
                        <div className="w-2 h-2 rounded-full bg-cyber-neon"></div>
                      </div>
                      <span>Networking with industry professionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-cyber-neon/20 p-1 mt-1">
                        <div className="w-2 h-2 rounded-full bg-cyber-neon"></div>
                      </div>
                      <span>Live hacking demonstrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-cyber-neon/20 p-1 mt-1">
                        <div className="w-2 h-2 rounded-full bg-cyber-neon"></div>
                      </div>
                      <span>Career opportunities in cybersecurity</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-cyber-neon/20 backdrop-blur-sm overflow-hidden hover-scale">
                <AspectRatio ratio={16/9}>
                  <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-cyber-neon/30 flex items-center justify-center">
                    <div className="text-4xl font-bold text-white">Why Join Us?</div>
                  </div>
                </AspectRatio>
                <CardContent className="p-6">
                  <p className="text-white/80 mb-4">
                    As a personal invitee, you'll receive:
                  </p>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-cyber-neon/20 p-1 mt-1">
                        <div className="w-2 h-2 rounded-full bg-cyber-neon"></div>
                      </div>
                      <span>Priority registration for all activities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-cyber-neon/20 p-1 mt-1">
                        <div className="w-2 h-2 rounded-full bg-cyber-neon"></div>
                      </div>
                      <span>Exclusive access to members-only workshops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-cyber-neon/20 p-1 mt-1">
                        <div className="w-2 h-2 rounded-full bg-cyber-neon"></div>
                      </div>
                      <span>Certificate of participation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-cyber-neon/20">
              <h2 className="text-3xl font-bold mb-4">Ready to join us, <span className="text-cyber-neon">{visitorName}</span>?</h2>
              <p className="text-white/70 mb-8">
                Secure your spot now for {eventName}. Places are limited and filling up fast!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="bg-cyber-neon text-cyber-dark hover:bg-cyber-neon/80 text-lg px-6 py-6">
                  <Link to="/registration">Register Now <ArrowRight className="ml-2" /></Link>
                </Button>
                
                <Button asChild variant="outline" className="border-cyber-neon text-cyber-neon hover:bg-cyber-neon/10">
                  <Link to="/">Explore More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitePage;
