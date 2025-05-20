
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-cyber-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <div className="w-10 h-10 rounded-full bg-cyber-neon animate-pulse-glow"></div> */}
            <img src='/logo.png' className='w-[40px] h-[40px]' />
            <span className="text-xl font-bold text-white">
              WL&<span className="text-cyber-neon">WJ</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#" className="text-white hover-underline hover:text-cyber-neon transition-colors">Home</a>
            <a href="/#events" className="text-white hover-underline hover:text-cyber-neon transition-colors">Events</a>
            <a href="/#collaborators" className="text-white hover-underline hover:text-cyber-neon transition-colors">Collaborators</a>
            <a href="/#gallery" className="text-white hover-underline hover:text-cyber-neon transition-colors">Gallery</a>
            <a href="/#team" className="text-white hover-underline hover:text-cyber-neon transition-colors">Team</a>
            <Button className="bg-cyber-neon text-cyber-dark hover:bg-cyber-neon/80">Join Us</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white border-cyber-neon"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-cyber-dark/95 backdrop-blur-lg rounded-lg animate-fade-in">
            <div className="flex flex-col space-y-4 px-4">
              <a 
                href="/" 
                className="text-white py-2 hover:text-cyber-neon transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/#events" 
                className="text-white py-2 hover:text-cyber-neon transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </a>
              <a 
                href="/#collaborators" 
                className="text-white py-2 hover:text-cyber-neon transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collaborators
              </a>
              <a 
                href="/#gallery" 
                className="text-white py-2 hover:text-cyber-neon transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </a>
              <a 
                href="/#team" 
                className="text-white py-2 hover:text-cyber-neon transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </a>
              <Button className="bg-cyber-neon text-cyber-dark hover:bg-cyber-neon/80 w-full">
                Join Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
