import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Hero Section Animation
    const heroTl = gsap.timeline();
    heroTl
      .from('.hero-content', {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      })
      .from('.hero-stats', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
      }, '-=0.6');

    // Section Animations
    const sections = gsap.utils.toArray('.scroll-section');
    sections.forEach((section: any) => {
      const content = section.querySelector('.section-content');
      
      if (content) {
        gsap.fromTo(content, 
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    // Gallery animations removed to fix carousel behavior

    // Team Section Reveal Animation
    const teamCards = gsap.utils.toArray('.team-card');
    gsap.fromTo(teamCards,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.team-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Events Cards Animation
    const eventCards = gsap.utils.toArray('.event-card');
    gsap.fromTo(eventCards,
      {
        opacity: 0,
        x: -50,
        rotationX: 15,
      },
      {
        opacity: 1,
        x: 0,
        rotationX: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.events-section',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Vision Cards Parallax Effect
    const visionCards = gsap.utils.toArray('.vision-card');
    visionCards.forEach((card: any) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      );
    });

    // Collaborators Section Animation
    const collaboratorLogos = gsap.utils.toArray('.collaborator-logo');
    gsap.fromTo(collaboratorLogos,
      {
        opacity: 0,
        scale: 0.8,
        rotation: 5,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.collaborators-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Text Reveal Animation for Headers
    const headers = gsap.utils.toArray('.section-header');
    headers.forEach((header: any) => {
      const text = header.querySelector('h2, h1', 'p');
      if (text) {
        gsap.fromTo(text,
          {
            opacity: 0,
            y: 50,
            rotationX: 90,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return {
    refreshScrollTrigger: () => ScrollTrigger.refresh(),
    killScrollTrigger: () => ScrollTrigger.getAll().forEach(trigger => trigger.kill()),
  };
};