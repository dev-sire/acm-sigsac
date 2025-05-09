
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams } from 'react-router-dom';
import RegistrationForm from '@/components/RegistrationForm';
import { setupScrollReveal } from '@/utils/scrollReveal';
import SideAnimations from '@/components/SideAnimations';

const Registration = () => {
  const { eventType } = useParams();
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  useEffect(() => {
    // Set up scroll reveal animations
    const cleanupScrollReveal = setupScrollReveal();
    
    // Determine event details based on URL parameter
    if (eventType === 'hackemon-ctf') {
      setEventTitle('Hackemon CTF');
      setEventDescription('Capture the Flag Competition - Test your hacking skills and knowledge in cybersecurity. Limited to 100 participants.');
    } else if (eventType === 'demogoron-debuggers') {
      setEventTitle('Demogoron Debuggers');
      setEventDescription('Speed Programming Contest - Show off your problem-solving skills and coding speed. Limited to 100 participants.');
    }
    else if (eventType === 'seminars') {
      setEventTitle('Psyber Arena Seminars');
      setEventDescription('2 Days seminars on blue and red teaming by industrial experts and seniors');
    } else {
      setEventTitle('Event Registration');
      setEventDescription('Register for our upcoming cybersecurity events.');
    }
    
    return () => {
      cleanupScrollReveal();
    };
  }, [eventType]);

  return (
    <div className="bg-cyber-dark text-white min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 relative overflow-hidden">
        {/* Side animations for larger screens */}
        <div className="hidden lg:block">
          <SideAnimations />
        </div>
        
        <div className="container mx-auto px-4">
          {/* Header section */}
          <div className="text-center mb-12">
            <h1 className="text-heading-md mb-4 glitch" data-text={eventTitle}>
              <span className="text-cyber-neon neon-text">{eventTitle}</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/70">
              {eventDescription}
            </p>
          </div>
          
          {/* Registration form */}
          <div className="max-w-3xl mx-auto">
            <RegistrationForm eventType={eventType || 'general'} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Registration;
