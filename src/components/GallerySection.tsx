
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const gallery = [
  {
    id: 1,
    title: "Cybersecurity Bootcamp 2024",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "February 2024",
    description: "An intensive hands-on bootcamp covering fundamental cybersecurity concepts and techniques."
  },
  {
    id: 2,
    title: "Capture The Flag Competition",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "December 2023",
    description: "A friendly hacking competition where teams competed to solve cybersecurity challenges and puzzles."
  },
  {
    id: 3,
    title: "Industry Expert Panel Discussion",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "November 2023",
    description: "Leading cybersecurity professionals shared insights on emerging threats and career opportunities."
  },
  {
    id: 4,
    title: "Networking Workshop",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "October 2023",
    description: "Hands-on workshop focused on network security fundamentals and practical defense strategies."
  },
  {
    id: 5,
    title: "Annual Cyber Conference",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "September 2023",
    description: "Our flagship event featuring keynote speakers, workshops, and networking opportunities."
  },
  {
    id: 6,
    title: "Student Hackathon",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "August 2023",
    description: "A 24-hour coding marathon where students built innovative security tools and applications."
  },
];

// Export the gallery data so it can be used in the Gallery page
export { gallery };

const GallerySection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const scrollFx = () => {
      const elements = document.querySelectorAll('.scroll-fx');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', scrollFx);
    scrollFx(); // Initial check
    
    // Auto-rotate featured images every 2 seconds when not hovering
    let interval;
    if (!isHovering) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % 3);
      }, 2000); // Changed to 2000ms (2 seconds)
    }
    
    return () => {
      window.removeEventListener('scroll', scrollFx);
      if (interval) clearInterval(interval);
    };
  }, [isHovering]);

  // Only show the first 3 events on the homepage
  const featuredGallery = gallery.slice(0, 3);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-fx">
          <h2 className="text-heading-md mb-4">
            Event <span className="text-cyber-neon">Gallery</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Explore our past events and see what makes ACM SIGSAG a thriving community 
            of cybersecurity enthusiasts.
          </p>
        </div>
        
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative h-[500px] sm:h-[400px]">
            <AnimatePresence mode="wait">
              {featuredGallery.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className={`overflow-hidden rounded-lg group absolute inset-0 cursor-pointer ${
                    index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
                  } ${
                    index === currentImage ? "sm:col-span-2 sm:row-span-2" : ""
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index === currentImage ? 1 : 0,
                    scale: index === currentImage ? 1 : 0.9,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.7 },
                    scale: { duration: 0.5 }
                  }}
                  onClick={() => setCurrentImage(index)}
                >
                  <div className="aspect-auto h-full overflow-hidden">
                    <motion.img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1.05 }}
                      transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-xl sm:text-2xl text-white font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-cyber-neon mb-2">
                      {item.date}
                    </p>
                    <motion.p 
                      className="text-white/80 text-sm hidden sm:block"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      {item.description}
                    </motion.p>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentImage ? "bg-cyber-neon w-6" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12 scroll-fx">
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-2 px-6 py-3 border border-cyber-neon text-cyber-neon rounded-md bg-cyber-dark/50 hover:bg-cyber-neon/10 transition-colors"
          >
            <span>View Full Gallery</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
