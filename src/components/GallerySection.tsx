
import React, { useEffect } from 'react';

const gallery = [
  {
    id: 1,
    title: "Cybersecurity Bootcamp 2024",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "February 2024",
  },
  {
    id: 2,
    title: "Capture The Flag Competition",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "December 2023",
  },
  {
    id: 3,
    title: "Industry Expert Panel Discussion",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "November 2023",
  },
  {
    id: 4,
    title: "Networking Workshop",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "October 2023",
  },
  {
    id: 5,
    title: "Annual Cyber Conference",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "September 2023",
  },
  {
    id: 6,
    title: "Student Hackathon",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "August 2023",
  },
];

const GallerySection = () => {
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
    
    return () => window.removeEventListener('scroll', scrollFx);
  }, []);

  return (
    <section id="gallery" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-10 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-fx">
          <h2 className="text-heading-md mb-4">
            Event <span className="text-cyber-neon">Gallery</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Explore our past events and see what makes ACM SIGSAC a thriving community 
            of cybersecurity enthusiasts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <div 
              key={item.id} 
              className="scroll-fx overflow-hidden rounded-lg group relative"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl text-white font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-cyber-neon transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {item.date}
                </p>
              </div>
              
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3H21V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 21H3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 3L14 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 21L10 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 scroll-fx">
          <button className="px-6 py-3 border border-cyber-neon text-cyber-neon rounded-md hover:bg-cyber-neon/10 transition-colors">
            View Full Gallery
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
