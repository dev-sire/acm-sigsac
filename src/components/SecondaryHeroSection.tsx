
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircuitBoard, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SideAnimations from '@/components/SideAnimations';
import SubmarineCablesGlobe from './BgGlobe';

const HeroSection = () => {
  
  return (
    <section
      id="hero-container"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Animated Grid Pattern / Globe */}
      <div className="absolute inset-0 opacity-50 flex items-center justify-center">
        <SubmarineCablesGlobe />
      </div>

      {/* Holographic Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-coastal-200/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-56 h-56 md:w-72 md:h-72 bg-coastal-100/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col items-center text-center">
          <div className="relative z-10 max-w-5xl mx-auto hero-content">
            {/* Cyberpunk Badge */}
            <div className="mb-6 md:mb-8 inline-block">
              <div className="cyber-button flex items-center gap-2 md:gap-3 py-2 px-4 md:py-3 md:px-6 rounded-lg">
                <div className="w-2 h-2 bg-coastal-200 rounded-full animate-pulse"></div>
                <span className="font-tech text-coastal-200 text-xs md:text-sm tracking-wider">
                  GLOBAL_CYBER_SECURITY_COMMUNITY.exe
                </span>
                <div
                  className="w-2 h-2 bg-coastal-200 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 md:mb-8 leading-tight font-orbitron cyber-text">
              {/* Hidden on mobile */}
              <span className="hidden md:block mb-2 text-heading-xl">
                Guardians of the
              </span>

              {/* Only visible on desktop */}
              <span className="hidden md:block hologram-text text-5xl md:text-7xl lg:text-8xl font-black">
                DIGITAL REALM
              </span>

              {/* Always visible */}
              <span className="font-orbitron block mt-2 text-coastal-200 text-4xl">
                ACM SIGSAC DUET
              </span>
            </h1>

            {/* Glitch Effect Lines */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-20 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-coastal-200 to-transparent"></div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-coastal-100 mb-8 md:mb-10 max-w-2xl md:max-w-3xl mx-auto font-rajdhani font-medium leading-relaxed">
              Join{" "}
              <span className="text-coastal-100 font-semibold">
                ACM SIGSAC DUET
              </span>
              , Dawood University's premier cybersecurity community. Learn
              cutting-edge techniques, compete in global challenges, and connect
              with elite security professionals.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 md:mb-12">
              <Button
                asChild
                className="cyber-button bg-gradient-to-r from-coastal-400 to-coastal-200 text-coastal-900 hover:from-coastal-200 hover:to-coastal-100 text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 font-orbitron font-semibold tracking-wide transition-all duration-300"
              >
                <Link to="/registration">
                  <span className="flex items-center gap-2">
                    <Zap size={16} className="md:size-18" />
                    INITIALIZE_REGISTRATION
                  </span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="cyber-button border-2 border-coastal-200 text-coastal-200 hover:bg-coastal-200/10 text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 font-orbitron font-medium tracking-wide"
              >
                <Link to="/about-us">
                  <span className="flex items-center gap-2">
                    <Shield size={16} className="md:size-18" />
                    LEARN_MORE
                  </span>
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-xs sm:max-w-lg md:max-w-3xl mx-auto hero-stats">
              {[
                { icon: CircuitBoard, label: "WORKSHOPS_COMPLETED", value: "3+" },
                { icon: Shield, label: "CTF_EVENTS_HOSTED", value: "5+" },
                { icon: Zap, label: "ACTIVE_MEMBERS", value: "100+" },
              ].map((stat, index) => (
                <div key={index} className="cyber-button p-2 md:p-4 text-center group">
                  <div className="flex flex-col items-center gap-1 md:gap-2">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-coastal-200/10 flex items-center justify-center mb-1 md:mb-2 group-hover:bg-coastal-200/20 transition-colors">
                      <stat.icon size={18} className="md:size-24 text-coastal-200" />
                    </div>
                    <span className="text-lg md:text-2xl font-orbitron font-bold text-coastal-100">
                      {stat.value}
                    </span>
                    <span className="text-[10px] md:text-sm font-tech text-coastal-300 tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;