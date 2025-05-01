
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EventsSection from '@/components/EventsSection';
import CollaboratorsSection from '@/components/CollaboratorsSection';
import GallerySection from '@/components/GallerySection';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { setupScrollReveal } from '@/utils/scrollReveal';
import createCursorTrail from '@/utils/cursorTrail';

const Index = () => {
  useEffect(() => {
    // Setup scroll reveal animations
    const cleanupScrollReveal = setupScrollReveal();
    
    // Setup cursor trail effect
    const cleanupCursorTrail = createCursorTrail();
    
    return () => {
      cleanupScrollReveal();
      cleanupCursorTrail();
    };
  }, []);

  return (
    <div className="bg-cyber-dark text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <EventsSection />
      <CollaboratorsSection />
      <GallerySection />
      <TeamSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
