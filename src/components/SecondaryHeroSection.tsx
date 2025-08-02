
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircuitBoard, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SideAnimations from '@/components/SideAnimations';

const SecondaryHeroSection = () => {
  useEffect(() => {
    // Create binary streams effect
    const createBinaryStream = () => {
      if (typeof window === 'undefined') return;
      
      const container = document.getElementById('hero-container');
      if (!container) return;
      
      // Generate random binary string
      const generateBinary = () => {
        let result = '';
        for (let i = 0; i < 50; i++) {
          result += Math.floor(Math.random() * 2);
        }
        return result;
      };
      
      // Create a new binary line
      const binaryLine = document.createElement('div');
      binaryLine.className = 'binary-line';
      binaryLine.textContent = generateBinary();
      
      // Set random position and speed
      const startPosition = Math.random() * container.offsetWidth;
      const duration = 5 + Math.random() * 10;
      
      binaryLine.style.left = `${startPosition}px`;
      binaryLine.style.opacity = `${0.1 + Math.random() * 0.3}`;
      binaryLine.style.animationDuration = `${duration}s`;
      binaryLine.style.fontSize = `${10 + Math.random() * 8}px`;
      
      container.appendChild(binaryLine);
      
      // Remove element after animation completes
      setTimeout(() => {
        if (binaryLine.parentNode === container) {
          container.removeChild(binaryLine);
        }
      }, duration * 1000);
    };
    
    // Create multiple binary streams at random intervals
    const streamInterval = setInterval(() => {
      if (window.innerWidth > 768) { // Only on desktop
        createBinaryStream();
      }
    }, 500);
    
    // Create circuit paths
    const createCircuitPath = () => {
      if (typeof window === 'undefined') return;
      
      const container = document.getElementById('hero-container');
      if (!container) return;
      
      const circuitPath = document.createElement('div');
      circuitPath.className = 'circuit-path';
      
      // Set random position and dimensions
      const startTop = Math.random() * (container.offsetHeight - 100) + 50;
      const width = 50 + Math.random() * 200;
      
      circuitPath.style.top = `${startTop}px`;
      circuitPath.style.width = `${width}px`;
      circuitPath.style.left = `${-width}px`; // Start off-screen left
      
      // Add nodes to path
      const startNode = document.createElement('div');
      startNode.className = 'circuit-node';
      
      const endNode = document.createElement('div');
      endNode.className = 'circuit-node end-node';
      
      circuitPath.appendChild(startNode);
      circuitPath.appendChild(endNode);
      
      container.appendChild(circuitPath);
      
      // Animate the path across the screen
      const speed = 100 + Math.random() * 200;
      const distance = container.offsetWidth + width;
      const duration = distance / speed;
      
      circuitPath.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(${distance}px)` }
        ],
        {
          duration: duration * 1000,
          easing: 'linear',
          fill: 'forwards'
        }
      ).onfinish = () => {
        if (circuitPath.parentNode === container) {
          container.removeChild(circuitPath);
        }
      };
    };
    
    // Create circuit paths at random intervals
    const circuitInterval = setInterval(() => {
      if (window.innerWidth > 768) { // Only on desktop
        createCircuitPath();
      }
    }, 2000);
    
    // Clean up
    return () => {
      clearInterval(streamInterval);
      clearInterval(circuitInterval);
    };
  }, []);
  
  return (
    <section id="hero-container" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      {/* Animated cyber glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-neon/10 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="mb-6 inline-block">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm py-2 px-4 rounded-full border border-cyber-neon/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Zap size={16} className="text-cyber-neon" />
                <span className="text-sm">Global Cyber Security Community</span>
              </div>
            </div>
            
            <h1 className="animate-reveal-blur [animation-delay:200ms] opacity-0 text-heading-xl mb-6 leading-tight glitch" data-text="ACM SIGSAC DUET">
              ACM <span className="text-cyber-neon neon-text">SIGSAC</span> DUET
            </h1>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Join ACM SIGSAG, Dawood University's premier cybersecurity community. 
              Learn, compete, and connect with fellow security enthusiasts and professionals.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button asChild className="bg-cyber-neon text-cyber-dark hover:bg-cyber-neon/80 text-lg px-6 py-6">
                <Link to="/registration">Register Now</Link>
              </Button>
              
              <Button asChild variant="outline" className="border-cyber-neon text-cyber-neon hover:bg-cyber-neon/10 text-lg px-6 py-6">
                <Link to="/about-us">Learn More</Link>
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/50 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-2">
                <CircuitBoard size={16} className="text-cyber-neon" />
                <span>10+ Workshops</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-cyber-neon" />
                <span>5+ CTF Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-cyber-neon" />
                <span>1000+ Members</span>
              </div>
            </div>
          </div>
          
          {/* Side animations component - hidden on all screens */}
          <div className="hidden">
            <SideAnimations />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondaryHeroSection;