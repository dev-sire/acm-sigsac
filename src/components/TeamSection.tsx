
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Github, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: "Aayesha Murtaza",
    role: "President",
    image: "/candidates/aayesha.jpg",
    bio: "Titles fade, but the impact of genuine leadership endures.",
    social: {
      linkedin: "https://www.linkedin.com/in/aayesha-murtaza-7859ba267/ ",
      github: "https://github.com/Aayesha-Murtaza"
    }
  },
  {
    id: 2,
    name: "Abdul Wasay Khan",
    role: "Vice President",
    image: "/candidates/wasay-2.jpg",
    bio: "Sainz May Drive Smooth, But I Lead Smoother!!",
    social: {
      linkedin: "https://www.linkedin.com/in/abdul-wasay-khan-a90532289/",
      github: "https://github.com/AlWasay125"
    }
  },
  {
    id: 3,
    name: "Rabia Ishtiaq",
    role: "Treasurer",
    image: "/candidates/rabia.jpg",
    bio: "Doing my part — multitasking wasn't in the job description, but here I am.",
    social: {
      linkedin: "https://www.linkedin.com/in/rabia-ishtiaq-08aa92218/",
      github: "https://github.com/rabbiya987"
    }
  },
  {
    id: 4,
    name: "Syed Usaiym Junaid",
    role: "General Secretary",
    image: "/candidates/usaiym.jpg",
    bio: "I'm the unsung hero of every task — always there, never noticed.",
    social: {
      linkedin: "https://www.linkedin.com/in/syed-usaiym-junaid-062a0129a/",
      github: "https://github.com/Usaim-12Junaid"
    }
  },
  {
    id: 5,
    name: "Ammara Qazi",
    role: "Joint Information Secretary",
    image: "/candidates/ammara.jpg",
    bio: "Society runs on my information — it goes dark when I blunder, and classified when I excel.",
    social: {
      linkedin: "https://www.linkedin.com/in/ammara-qazi-0363492a0",
      github: "https://github.com/ammara-qazi"
    }
  },
  {
    id: 6,
    name: "Aman Shahid",
    role: "Tech Leader",
    image: "/candidates/my-profile.jpg",
    bio: "AI can't replace me—my bugs are too advanced.",
    social: {
      linkedin: "https://www.linkedin.com/in/aman-shahid-32708a2b7/",
      github: "https://github.com/dev-sire"
    }
  },
  {
    id: 7,
    name: "Hafsah Anwaar Ali",
    role: "Media Manager",
    image: "/candidates/hafsa.jpg",
    bio: "I don't need a vacation. I need a hydration break... but let's post one more story.",
    social: {
      linkedin: "https://pk.linkedin.com/in/hafsah-anwaar-ali-026748290",
      github: "https://github.com/hafsa-anwaar"
    }
  },
  {
    id: 8,
    name: "Sofia Asif",
    role: "Director of Treasurer",
    image: "/candidates/sofia.jpg",
    bio: "Handles money so well, even our coins report to them!",
    social: {
      linkedin: "https://www.linkedin.com/in/sofia-asif-19bb5a2b3/",
      github: "https://github.com/SOFIA-ASIF"
    }
  },
  {
    id: 9,
    name: "Ubaid Raza",
    role: "Director of Photography",
    image: "/candidates/ubaid.jpg",
    bio: "Lens in one hand, stress in the other — still gets the perfect shot.",
    social: {
      linkedin: "https://www.linkedin.com/in/ubaid-raza-b41029299/",
      github: " https://github.com/UBAIDRAZA98"
    }
  },
];

const TeamSection = () => {
  const [decryptedItems, setDecryptedItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrambledTextCache, setScrambledTextCache] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionHeight = sectionRef.current.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;

      // Calculate scroll position (clamped between 0 and 1)
      let scrollPosition = (windowHeight - sectionTop) / windowHeight;
      scrollPosition = Math.max(0, Math.min(1, scrollPosition)); // Clamp the value

      // Introduce a delay: Start decrypting when the section is halfway through the screen
      const decryptionStartThreshold = 0.6; // Adjust this value as needed
      if (scrollPosition > decryptionStartThreshold) {
        // Calculate adjusted scroll position (0 to 1) relative to the threshold
        const adjustedScrollPosition = (scrollPosition - decryptionStartThreshold) / (1 - decryptionStartThreshold);
        const itemsToDecrypt = Math.ceil(teamMembers.length * adjustedScrollPosition);
        setDecryptedItems(Array.from({ length: Math.min(itemsToDecrypt, teamMembers.length) }, (_, i) => i));
      }
      else{
        setDecryptedItems([])
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text scramble effect with caching
  const scrambleText = (text: string, isDecrypted: boolean, index: number): string => {
      if (isDecrypted) return text;

      const cacheKey = `${text}-${index}`; // Include index in key
      if (scrambledTextCache[cacheKey]) {
          return scrambledTextCache[cacheKey];
      }

      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_-+=[]{}|;:,.<>?';
      const scrambled = text
          .split('')
          .map(() => letters[Math.floor(Math.random() * letters.length)])
          .join('');

      setScrambledTextCache(prev => ({ ...prev, [cacheKey]: scrambled })); //update cache

      return scrambled;
  };


  return (
    <section 
      id="team" 
      className="py-24 relative bg-cyber-dark/50"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-neon/5 to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-fx">
          <h2 className="text-heading-md mb-4">
            Meet Our <span className="text-cyber-neon">Team</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Our dedicated executive committee works tirelessly to organize events, 
            workshops, and create opportunities for our members.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => {
            const isDecrypted = decryptedItems.includes(index);
            
            return (
              <div 
                key={member.id} 
                className={`transition-all duration-700 ${isDecrypted ? 'opacity-100' : 'opacity-80'}`}
              >
                <Card className={`bg-white/5 border border-white/10 overflow-hidden card-hover h-full ${isDecrypted ? 'border-cyber-neon/30' : ''}`}>
                  <div className="p-6">
                    <div className={`relative w-32 h-32 mx-auto mb-6 transition-all duration-700 ${isDecrypted ? 'scale-100' : 'scale-95 filter blur-sm'}`}>
                      <div className={`absolute inset-0 rounded-full ${isDecrypted ? 'bg-cyber-neon/20 animate-pulse-glow' : 'bg-white/10'}`}></div>
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className={`w-full h-full object-cover rounded-full border-2 ${isDecrypted ? 'border-cyber-neon' : 'border-white/30'} p-1`}
                      />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {scrambleText(member.name, isDecrypted, 0)}
                      </h3>
                      <p className={`mb-4 ${isDecrypted ? 'text-cyber-neon' : 'text-white/50'}`}>
                        {scrambleText(member.role, isDecrypted, 1)}
                      </p>
                      <p className={`mb-6 transition-all duration-500 ${isDecrypted ? 'text-white/70' : 'text-white/30'}`}>
                        {isDecrypted ? member.bio : scrambleText(member.bio, false, 2)}
                      </p>
                      
                      <div className={`flex justify-center space-x-4 transition-all duration-500 ${isDecrypted ? 'opacity-100' : 'opacity-30'}`}>
                        <a target='_blank' href={member.social.linkedin} className={`transition-colors ${isDecrypted ? 'text-white/70 hover:text-cyber-neon' : 'text-white/30'}`}>
                          <Linkedin size={18} />
                        </a>
                        <a target='_blank' href={member.social.github} className={`transition-colors ${isDecrypted ? 'text-white/70 hover:text-cyber-neon' : 'text-white/30'}`}>
                          <Github size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center scroll-fx">
          <div className="inline-block border border-cyber-neon/30 bg-white/5 rounded-lg p-6 max-w-3xl">
            <h3 className="text-xl mb-4 text-white">Join Our Team</h3>
            <p className="text-white/70 mb-6">
              Interested in becoming part of the executive committee? 
              We're always looking for passionate individuals to join our team.
            </p>
            <button className="px-6 py-2 bg-cyber-neon text-cyber-dark font-medium rounded-md hover:bg-cyber-neon/80 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;