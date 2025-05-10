
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams } from 'react-router-dom';
import RegistrationForm from '@/components/RegistrationForm';
import { setupScrollReveal } from '@/utils/scrollReveal';
import createCursorTrail from '@/utils/cursorTrail';
import { motion } from "framer-motion";
import SideAnimations from '@/components/SideAnimations';
import HackemonRegistrationForm from '@/components/HackemonRegistration';
import DemogoronRegistrationForm from '@/components/DemogoronRegistration';

const Registration = () => {
  const { eventType } = useParams();
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [formType, setFormType] = useState<'general' | 'competition' | 'hackemon'>('general');

  useEffect(() => {
    // Set up scroll reveal animations
    const cleanupScrollReveal = setupScrollReveal();
    
    // Setup cursor trail effect
    const cleanupCursorTrail = createCursorTrail();
    
    // Determine event details based on URL parameter
    if (eventType === 'hackemon-ctf') {
      setEventTitle('Hackemon CTF');
      setEventDescription('Capture the Flag Competition - Test your hacking skills and knowledge in cybersecurity with teams of up to 3 members.');
      setFormType('hackemon');
    } else if (eventType === 'demogoron-debuggers') {
      setEventTitle('Demogoron Debuggers');
      setEventDescription('Speed Programming Contest - Show off your problem-solving skills and coding speed with teams of up to 2 members.');
      setFormType('competition');
    } else {
      setEventTitle('Psyber Arena Seminars');
      setEventDescription('Register for our 2 Days Cyber Security Seminars');
      setFormType('general');
    }
    
    return () => {
      cleanupScrollReveal();
      cleanupCursorTrail();
    };
  }, [eventType]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    }
  };

  return (
    <div className="bg-cyber-dark text-white min-h-screen">
      <Navbar />
      <div className="hidden lg:block">
        <SideAnimations />
      </div>
      <main className="pt-24 pb-16">
        <motion.div 
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header section */}
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h1 
              className="text-heading-md mb-4 glitch relative" 
              data-text={eventTitle}
            >
              <motion.span 
                className="text-cyber-neon neon-text"
              >
                {eventTitle}
              </motion.span>
            </h1>
            <motion.p 
              className="max-w-2xl mx-auto text-white/70"
              variants={itemVariants}
            >
              {eventDescription}
            </motion.p>
          </motion.div>
          
          {/* Registration form */}
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={itemVariants}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { delay: 0.3, duration: 0.5 }
            }}
          >
            {formType === 'hackemon' ? (
              <HackemonRegistrationForm />
            ) : formType === 'competition' ? (
              <DemogoronRegistrationForm eventType={eventType || 'general'} />
            ) : (
              <RegistrationForm eventType={eventType || 'general'} />
            )}
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Registration;
