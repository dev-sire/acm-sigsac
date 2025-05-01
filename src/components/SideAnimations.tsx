
import React, { useEffect, useRef } from 'react';

// Component for displaying cyber-themed animations on the sides of the hero section
const SideAnimations = () => {
  const leftAnimationRef = useRef<HTMLDivElement>(null);
  const rightAnimationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on large screens
    if (window.innerWidth < 1024) return;

    // Create binary cascades in the left animation
    const createBinaryCascade = (container: HTMLDivElement) => {
      const lines = 15;
      const binaryPerLine = 5;
      
      for (let i = 0; i < lines; i++) {
        const line = document.createElement('div');
        line.className = 'binary-line';
        line.style.opacity = `${Math.random() * 0.6 + 0.2}`;
        line.style.animationDelay = `${Math.random() * 2}s`;
        line.style.animationDuration = `${Math.random() * 8 + 5}s`;
        line.style.left = `${Math.random() * 100}%`;
        // line.style.top = `${-binaryPerLine * 16}px`;
        
        let binaryString = '';
        for (let j = 0; j < binaryPerLine; j++) {
          binaryString += Math.random() > 0.5 ? '1' : '0';
        }
        
        line.textContent = binaryString;
        container.appendChild(line);
      }
    };

    if (leftAnimationRef.current) {
      createBinaryCascade(leftAnimationRef.current);
    }
    
    if (rightAnimationRef.current) {
      createBinaryCascade(rightAnimationRef.current);
    }

  }, []);

  return (
    <>
      <div 
        ref={leftAnimationRef}
        className="absolute top-0 left-0 h-full w-1/6 overflow-hidden pointer-events-none hidden lg:block"
      />
      <div 
        ref={rightAnimationRef}
        className="absolute top-0 right-0 h-full w-1/6 overflow-hidden pointer-events-none hidden lg:block"
      />
    </>
  );
};

export default SideAnimations;