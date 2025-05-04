import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoaded: () => void; // Add a callback prop
}

const LoadingScreen = ({ onLoaded }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          setLoadingComplete(true); // Set loadingComplete when progress reaches 100
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loadingComplete) {
      // Add a delay before calling onLoaded
      const delayTimeout = setTimeout(() => {
        onLoaded(); // Notify the parent component that loading is done
      }, 300); // Short delay

      return () => clearTimeout(delayTimeout);
    }
  }, [loadingComplete, onLoaded]);

  return (
    <motion.div
      className="fixed inset-0 bg-cyber-dark z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: loadingComplete ? 0 : 1 }} // Fade out when loading is complete
      transition={{ duration: 0.3, ease: 'easeInOut' }} // Add a smooth transition
      style={{
        pointerEvents: loadingComplete ? 'none' : 'auto', // Make it non-clickable
      }}
    >
      <div className="text-center flex items-center justify-center flex-col">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-5xl font-bold text-cyber-neon mb-2">ACM SIGSAC</div>
          <div className="text-xl text-white/70">Cybersecurity Student Society</div>
        </motion.div>

        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyber-primary to-cyber-neon"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="mt-3 text-white/50 text-sm">Loading resources...</div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
