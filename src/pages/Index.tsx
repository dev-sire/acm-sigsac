
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import EventsSection from '@/components/EventsSection';
import CollaboratorsSection from '@/components/CollaboratorsSection';
import GallerySection from '@/components/GallerySection';
import VisionSection from '@/components/VisionSection';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import createCursorTrail from '@/utils/cursorTrail';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import SecondaryHeroSection from '@/components/SecondaryHeroSection';
import CyberpunkNavbar from '@/components/CyberpunkNavbar';

const Index = () => {
  // Initialize GSAP animations
  const { refreshScrollTrigger } = useGSAPAnimations();
  
  useEffect(() => {
    // Setup cursor trail effect
    const cleanupCursorTrail = createCursorTrail();
    
    // Refresh ScrollTrigger after component mount
    setTimeout(() => refreshScrollTrigger(), 100);
    
    return () => {
      cleanupCursorTrail();
    };
  }, [refreshScrollTrigger]);

  return (
    <div className="bg-cyber-dark text-white min-h-screen relative">
      <CyberpunkNavbar />
      <div className="scroll-section">
        <SecondaryHeroSection />
      </div>
      <div className="scroll-section events-section">
        <EventsSection />
      </div>
      <div className="scroll-section collaborators-section">
        <CollaboratorsSection />
      </div>
      <div className="scroll-section">
        <GallerySection />
      </div>
      <div className="scroll-section">
        <VisionSection />
      </div>
      <div className="scroll-section team-section">
        <TeamSection />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;