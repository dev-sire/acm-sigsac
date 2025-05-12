
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, ShieldAlert } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [showGlitch, setShowGlitch] = useState(false);
  const [binaryLines, setBinaryLines] = useState<JSX.Element[]>([]);

  // Log the 404 error to console
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Create binary matrix effect
  useEffect(() => {
    const createBinaryLines = () => {
      const lines = [];
      const numLines = 8;
      
      for (let i = 0; i < numLines; i++) {
        const delay = Math.random() * 5;
        const duration = 10 + Math.random() * 20;
        const left = Math.random() * 100;
        
        lines.push(
          <div
            key={i}
            className="binary-line absolute"
            style={{
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity: 0.3
            }}
          >
            {generateRandomBinary()}
          </div>
        );
      }
      
      setBinaryLines(lines);
    };
    
    createBinaryLines();
    
    // Trigger glitch effect every few seconds
    const glitchInterval = setInterval(() => {
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 200);
    }, 3000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Generate random binary string
  const generateRandomBinary = () => {
    let result = '';
    for (let i = 0; i < 100; i++) {
      result += Math.round(Math.random()) ? '1' : '0';
    }
    return result;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-dark relative overflow-hidden">
      {/* Binary rain effect */}
      {binaryLines}
      
      {/* Grid pattern */}
      <div className="absolute inset-0 data-grid opacity-10"></div>
      
      {/* Circuit lines */}
      <div className="absolute top-1/4 left-0 w-full h-px">
        <div className="circuit-path-animated"></div>
      </div>
      <div className="absolute bottom-1/4 left-0 w-full h-px">
        <div className="circuit-path-animated"></div>
      </div>
      
      <div className="relative z-10 text-center px-4">
        <div className={`mb-8 transition-all transform ${showGlitch ? 'translate-x-1 skew-x-3' : ''}`}>
          <ShieldAlert size={80} className="mx-auto text-cyber-neon animate-pulse-glow mb-4" />
        </div>
        
        <h1 className={`text-7xl font-bold mb-2 text-cyber-neon ${showGlitch ? 'glitch' : ''}`} data-text="404">
          <span className="animate-pulse-glow">4</span>
          <span className="inline-block mx-1 animate-float">0</span>
          <span className="animate-pulse-glow">4</span>
        </h1>
        
        <div className={`text-2xl text-white/70 mb-8 ${showGlitch ? 'glitch' : ''}`} data-text="ACCESS DENIED">
          <span className="font-mono">ACCESS_DENIED</span>
        </div>
        
        <p className="text-xl text-white/70 mb-6 max-w-md">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable in this security layer.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <Link 
            to="/" 
            className="px-6 py-3 bg-cyber-dark border border-cyber-neon text-cyber-neon hover:bg-cyber-neon/10 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Return to Home Base</span>
          </Link>
        </div>
        
        <div className="mt-12 font-mono text-sm text-white/40 p-2 border border-white/20 bg-cyber-dark/50 max-w-md mx-auto">
          <div className="mb-2">Error Code: 0x8007045A</div>
          <div className="mb-2">Timestamp: {new Date().toISOString()}</div>
          <div>Path: {location.pathname}</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;