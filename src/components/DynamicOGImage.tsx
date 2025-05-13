import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const DynamicOGImage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [searchParams] = useSearchParams();
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  
  // Get the name from URL params
  const name = searchParams.get('name') || 'Friend';
  const event = searchParams.get('event') || 'Cyber Event';
  
  // Set cache control headers to ensure the image is not cached
  useEffect(() => {
    document.title = `Invitation for ${name} - ${event}`;
  }, [name, event]);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Canvas dimensions (1200x630 is standard for Open Graph images)
    canvas.width = 1200;
    canvas.height = 630;
    
    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1A1F2C');
    gradient.addColorStop(1, '#1A1F2C');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw circuit-like pattern
    drawCircuitPattern(ctx, canvas.width, canvas.height);
    
    // Draw neon border
    ctx.strokeStyle = '#33C3F0';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Add glow effect
    ctx.shadowColor = '#33C3F0';
    ctx.shadowBlur = 20;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    ctx.shadowBlur = 0;
    
    // Logo
    ctx.fillStyle = '#33C3F0';
    ctx.beginPath();
    ctx.arc(150, 150, 50, 0, 2 * Math.PI);
    ctx.fill();
    
    // Text shadow for glow effect
    ctx.shadowColor = '#33C3F0';
    ctx.shadowBlur = 10;
    
    // Title text
    ctx.font = 'bold 60px Inter, sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('ACM SIGSAC', 240, 160);
    
    // Event text
    ctx.font = 'bold 80px Inter, sans-serif';
    ctx.fillStyle = '#33C3F0';
    ctx.fillText(event, 150, 280);
    
    // Personalized message
    ctx.font = '40px Inter, sans-serif';
    ctx.fillStyle = 'white';
    const personalMessage = `Hey ${name}, you're invited!`;
    ctx.fillText(personalMessage, 150, 380);
    
    // Call to action
    ctx.font = 'bold 50px Inter, sans-serif';
    ctx.fillText('Join us for this exciting event!', 150, 480);
    
    // Website URL
    ctx.font = '30px Inter, sans-serif';
    ctx.fillStyle = '#33C3F0';
    ctx.fillText('acm-sigsac.vercel.app', 150, 550);

    // Convert canvas to image data URL
    const dataUrl = canvas.toDataURL('image/png');
    setImageDataUrl(dataUrl);
    
  }, [name, event]);
  
  // Helper function to draw circuit-like pattern
  const drawCircuitPattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(51, 195, 240, 0.1)';
    ctx.lineWidth = 2;
    
    // Horizontal lines
    for (let i = 0; i < height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
    
    // Vertical lines
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    
    // Add some circuit nodes
    ctx.fillStyle = 'rgba(51, 195, 240, 0.2)';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 10 + 5;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  // Return both the image and special meta tags for this route
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyber-dark p-4">
      
      <h1 className="text-cyber-neon text-2xl mb-6">Dynamic OG Image Generator</h1>
      
      <div className="bg-cyber-dark/50 border border-cyber-neon p-6 rounded-lg shadow-lg max-w-full">
        <canvas 
          ref={canvasRef} 
          className="hidden" 
        />
        
        {imageDataUrl && (
          <div className="space-y-6">
            <h2 className="text-white text-xl mb-2">Preview:</h2>
            <img 
              src={imageDataUrl} 
              alt="Generated OG Image" 
              className="max-w-full h-auto rounded-md shadow-lg border border-cyber-neon/50" 
            />
            
            <div className="space-y-4">
              <h3 className="text-white text-lg">Image URL:</h3>
              <div className="flex items-center space-x-2">
                <input 
                  type="text"
                  value={`${window.location.origin}/og-image?name=${encodeURIComponent(name)}&event=${encodeURIComponent(event)}`}
                  readOnly
                  className="w-full bg-cyber-dark border border-cyber-neon/50 rounded px-3 py-2 text-white"
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/og-image?name=${encodeURIComponent(name)}&event=${encodeURIComponent(event)}`
                    );
                    alert('URL copied to clipboard!');
                  }}
                  className="bg-cyber-neon text-cyber-dark px-4 py-2 rounded hover:bg-cyber-neon/80"
                >
                  Copy
                </button>
              </div>
              
              <p className="text-white/70 text-sm mt-2">
                Use this URL in your Open Graph meta tags or when sharing links.
              </p>
              
              <div className="space-y-2 mt-4">
                <label className="block text-white">
                  Test with different name:
                </label>
                <div className="flex space-x-2">
                  <input 
                    type="text"
                    placeholder="Enter name"
                    className="flex-grow bg-cyber-dark border border-cyber-neon/50 rounded px-3 py-2 text-white"
                    onChange={(e) => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('name', e.target.value);
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  />
                  <button 
                    className="bg-cyber-neon text-cyber-dark px-4 py-2 rounded hover:bg-cyber-neon/80"
                    onClick={() => window.location.reload()}
                  >
                    Generate
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-white">
                  Test with different event:
                </label>
                <div className="flex space-x-2">
                  <input 
                    type="text"
                    placeholder="Enter event name"
                    className="flex-grow bg-cyber-dark border border-cyber-neon/50 rounded px-3 py-2 text-white"
                    onChange={(e) => {
                      const url = new URL(window.location.href);
                      url.searchParams.set('event', e.target.value);
                      window.history.replaceState({}, '', url);
                      window.location.reload();
                    }}
                  />
                  <button 
                    className="bg-cyber-neon text-cyber-dark px-4 py-2 rounded hover:bg-cyber-neon/80"
                    onClick={() => window.location.reload()}
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicOGImage;
