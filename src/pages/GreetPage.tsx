
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Heart, Star, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const GreetPage = () => {
  const [searchParams] = useSearchParams();
  const visitorName = searchParams.get('name') || 'Dear Friend';
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  
  const eidQuotes = [
    "May Allah's blessings be with you today, tomorrow, and always. Eid Mubarak!",
    "Eid Mubarak! May your sacrifices be accepted and your prayers answered.",
    "May this Eid bring joy, happiness, peace, and prosperity to your life. Eid Mubarak!",
    "Wishing you and your family a blessed Eid filled with happiness, peace, and prosperity.",
    "May Allah shower His countless blessings upon you and your family. Eid ul Adha Mubarak!"
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Cycle through quotes with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % eidQuotes.length);
        setQuoteVisible(true);
      }, 300);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Create falling stars effect
  useEffect(() => {
    const createFallingStar = () => {
      const star = document.createElement('div');
      star.className = 'fixed text-yellow-400/40 pointer-events-none z-0 animate-pulse';
      star.innerHTML = '★';
      
      const size = Math.random() * 16 + 12;
      const left = Math.random() * 100;
      const animDuration = Math.random() * 8 + 12;
      const delay = Math.random() * 2;
      
      star.style.left = `${left}%`;
      star.style.fontSize = `${size}px`;
      star.style.top = '-50px';
      star.style.animationDelay = `${delay}s`;
      
      // Apply falling animation
      star.style.animation = `starFall ${animDuration}s linear infinite`;
      
      document.body.appendChild(star);
      
      setTimeout(() => {
        if (star.parentNode === document.body) {
          document.body.removeChild(star);
        }
      }, (animDuration + delay) * 1000);
    };
    
    // Create initial stars
    for (let i = 0; i < 20; i++) {
      setTimeout(createFallingStar, i * 300);
    }
    
    const interval = setInterval(createFallingStar, 800);
    
    return () => {
      clearInterval(interval);
      // Clean up any remaining stars
      const stars = document.querySelectorAll('[style*="starFall"]');
      stars.forEach(star => {
        if (star.parentNode === document.body) {
          document.body.removeChild(star);
        }
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-purple-900/20 to-cyber-dark overflow-hidden">
      {/* Islamic pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Hero section */}
        <div className="relative pt-24 px-4 sm:pt-32 md:pt-40 lg:pt-48 max-w-6xl mx-auto text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/5 via-transparent to-transparent"></div>
          
          {/* Eid Greeting Header */}
          <div className="inline-block mb-6 animate-fade-in">
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm py-3 px-6 rounded-full border border-yellow-400/30">
              <Moon size={20} className="text-yellow-400" />
              <span className="text-lg font-semibold text-yellow-400">Eid ul Adha 1446 AH</span>
              <Moon size={20} className="text-yellow-400" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Eid Mubarak
          </h1>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white">
            <span className="text-cyber-neon">{visitorName}</span>!
          </h2>
          
          {/* Animated Quote Section with smooth transitions */}
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 p-px rounded-lg mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 min-h-[120px] flex items-center justify-center">
              <p className={`text-xl sm:text-2xl text-white/90 italic quote-marks transition-all duration-500 ease-in-out transform ${
                quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                {eidQuotes[currentQuote]}
              </p>
            </div>
          </div>
          
          {/* Traditional Islamic Design Elements */}
          <div className="flex justify-center items-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
            <div className="text-yellow-400 text-3xl">☪</div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-yellow-400"></div>
          </div>
        </div>
        
        {/* Eid Wishes Cards */}
        <div className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-gradient-to-br from-yellow-400/10 to-orange-400/10 border-yellow-400/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <Heart className="text-yellow-400 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">Peace & Blessings</h3>
                  <p className="text-white/80">
                    May Allah fill your heart with peace, your mind with wisdom, and your life with happiness.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-400/10 to-red-400/10 border-orange-400/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <Star className="text-orange-400 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-orange-400 mb-3">Sacrifice & Devotion</h3>
                  <p className="text-white/80">
                    May your sacrifices be accepted and your devotion be rewarded with Allah's countless blessings.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-400/10 to-emerald-400/10 border-green-400/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <Moon className="text-green-400 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-green-400 mb-3">Unity & Togetherness</h3>
                  <p className="text-white/80">
                    May this Eid bring families together and strengthen the bonds of love and brotherhood.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Traditional Eid Message */}
            <div className="text-center">
              <Card className="bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-400/10 border-yellow-400/30 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Traditional Eid Greeting</h3>
                  <div className="text-3xl font-arabic text-white mb-4 font-bold">
                    عِيد أَضْحَى مُبَارَك
                  </div>
                  <p className="text-white/80 text-lg mb-6">
                    "Eid Adha Mubarak" - May this blessed festival of sacrifice bring you closer to Allah 
                    and fill your life with His divine blessings. May your good deeds be accepted and your 
                    prayers answered.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button asChild className="bg-yellow-400 text-cyber-dark hover:bg-yellow-500">
                      <Link to="/">Visit Our Community <ArrowRight className="ml-2" /></Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetPage;