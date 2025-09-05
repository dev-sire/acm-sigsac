import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Zap, Binary } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CyberpunkNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about-us' },
    { name: 'EVENTS', href: '/#events' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'TEAM', href: '/#team' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href.startsWith('#')) return false; // Handle scroll links differently
    return location.pathname === href;
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-coastal-900/95 backdrop-blur-lg border-b border-coastal-200/20' 
            : 'bg-transparent'
        }`}
      >
        {/* Cyberpunk scan line effect */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-coastal-200 to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-coastal-200/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <img src='/logo.png' className='w-[40px] h-[40px]' />
              </div>
              <div className="block">
                <div className="font-orbitron font-bold text-lg text-coastal-100">
                  ACM <span className="text-coastal-200">SIGSAC</span> DUET
                </div>
                <div className="font-tech text-xs text-coastal-300 tracking-wider">
                  DUET.CYBERSEC.ORG
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`cyber-button px-4 py-2 rounded-md font-rajdhani font-medium text-sm tracking-wider transition-all duration-300 ${
                    isActive(link.href)
                      ? 'text-coastal-100 bg-coastal-200/10 border-coastal-200/30'
                      : 'text-coastal-300 hover:text-coastal-100 hover:bg-coastal-200/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                asChild
                className="cyber-button bg-gradient-to-r from-coastal-400 to-coastal-200 text-coastal-900 hover:from-coastal-200 hover:to-coastal-100 font-orbitron font-semibold text-sm px-6 py-2"
              >
                <Link to="/registration">
                  <Zap size={16} className="mr-2" />
                  JOIN_US
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden cyber-button p-2 rounded-md text-coastal-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden absolute top-full left-0 right-0 bg-coastal-900 backdrop-blur-lg border-b border-coastal-200/20 transition-all duration-300 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block cyber-button px-4 py-3 rounded-md font-rajdhani font-medium tracking-wider transition-all duration-300 ${
                    isActive(link.href)
                      ? 'text-coastal-100 bg-coastal-200/10 border-coastal-200/30'
                      : 'text-coastal-300 hover:text-coastal-100 hover:bg-coastal-200/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Binary size={16} className="text-coastal-200" />
                    {link.name}
                  </div>
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-coastal-200/20">
                <Button 
                  asChild
                  className="w-full cyber-button bg-gradient-to-r from-coastal-400 to-coastal-200 text-coastal-900 hover:from-coastal-200 hover:to-coastal-100 font-orbitron font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/registration">
                    <Zap size={16} className="mr-2" />
                    JOIN_COMMUNITY
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default CyberpunkNavbar;