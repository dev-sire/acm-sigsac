
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { gallery } from '@/components/GallerySection';
import ScrollToTop from '@/components/ScrollToTop';
import { setupScrollReveal } from '@/utils/scrollReveal';
import createCursorTrail from '@/utils/cursorTrail';
import { motion } from 'framer-motion';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<null | number>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Categories derived from gallery data
  const categories = ['all', ...Array.from(new Set(gallery.map(item => {
    // Extract month from date string
    const dateParts = item.date.split(' ');
    return dateParts[0]; // Return month
  })))];
  
  useEffect(() => {
    // Setup scroll reveal animations
    const cleanupScrollReveal = setupScrollReveal();
    
    // Setup cursor trail effect
    const cleanupCursorTrail = createCursorTrail();
    
    return () => {
      cleanupScrollReveal();
      cleanupCursorTrail();
    };
  }, []);
  
  // Filter gallery items
  const filteredGallery = filterCategory === 'all' 
    ? gallery 
    : gallery.filter(item => item.date.includes(filterCategory));

  return (
    <div className="bg-cyber-dark text-white min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-fx">
            <h1 className="text-heading-lg mb-2">Event <span className="text-cyber-neon">Gallery</span></h1>
            <p className="max-w-2xl mx-auto text-white/70">
              A showcase of our past events and activities that have brought our cybersecurity community together.
            </p>
          </div>
          
          {/* Filter categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-8 scroll-fx">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filterCategory === category 
                    ? 'bg-cyber-neon text-cyber-dark font-medium' 
                    : 'bg-cyber-dark/80 border border-white/20 text-white/70 hover:bg-white/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Gallery grid with animations */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredGallery.map((item, index) => (
              <motion.div 
                key={item.id}
                layoutId={`gallery-item-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  layout: { duration: 0.3 }
                }}
                onClick={() => setSelectedImage(item.id)}
                className="cursor-pointer rounded-lg overflow-hidden bg-cyber-dark/50 border border-white/10 hover:border-cyber-neon/50 transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <motion.img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-cyber-neon">{item.title}</h3>
                  <p className="text-sm text-white/50 mb-4">{item.date}</p>
                  <p className="text-white/80">{item.description}</p>
                </div>
                
                <div className="p-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs text-white/50">#{item.id}</span>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-cyber-neon text-sm hover:text-white"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Modal for selected image */}
          {selectedImage !== null && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
              <motion.div 
                layoutId={`gallery-item-${selectedImage}`}
                className="relative max-w-4xl w-full bg-cyber-dark/90 rounded-lg border border-cyber-neon/30 overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white z-10"
                  onClick={() => setSelectedImage(null)}
                >
                  ×
                </button>
                
                {gallery.find(item => item.id === selectedImage) && (
                  <>
                    <div className="aspect-video">
                      <img 
                        src={gallery.find(item => item.id === selectedImage)?.image} 
                        alt={gallery.find(item => item.id === selectedImage)?.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-2 text-cyber-neon">
                        {gallery.find(item => item.id === selectedImage)?.title}
                      </h2>
                      <p className="text-sm text-white/50 mb-4">
                        {gallery.find(item => item.id === selectedImage)?.date}
                      </p>
                      <p className="text-white/80">
                        {gallery.find(item => item.id === selectedImage)?.description}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          )}
          
          {/* Call to action */}
          <div className="text-center mt-16 scroll-fx">
            <div className="inline-block p-0.5 rounded-md bg-gradient-to-r from-cyber-neon to-cyber-accent">
              <div className="px-8 py-3 bg-cyber-dark rounded-md">
                <h3 className="text-lg font-medium mb-2">Want to join our future events?</h3>
                <p className="text-white/70 mb-4">Check our upcoming events and register today</p>
                <motion.a 
                  href="/registration"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-cyber-neon text-cyber-dark rounded hover:bg-opacity-80 transition-all inline-block"
                >
                  Register Now
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Gallery;