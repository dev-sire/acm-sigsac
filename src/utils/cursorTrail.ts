
const createCursorTrail = () => {
  if (typeof window === 'undefined') return () => {};
  
  let mouseX = 0;
  let mouseY = 0;
  const particles: HTMLDivElement[] = [];
  const numParticles = 20; // More particles
  const colors = ['#33C3F0', '#9b87f5', '#7E69AB', '#1EAEDB', '#6E59A5'];
  
  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Create particles
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'cursor-trail';
    
    // Varying sizes for particles (larger overall)
    const size = Math.floor(Math.random() * 12 + 4); // Increased particle size
    particle.style.width = `${size}px`;
    particle.style.height = particle.style.width;
    particle.style.opacity = '0';
    document.body.appendChild(particle);
    particles.push(particle);
  }

  // Animation loop
  const animate = () => {
    let x = mouseX;
    let y = mouseY;

    particles.forEach((particle, i) => {
      // Offset each particle to create a trail effect
      setTimeout(() => {
        const size = parseInt(particle.style.width);
        
        // Make particles more visible with higher opacity
        particle.style.opacity = (0.95 - i * 0.04).toString();
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Rotate colors more frequently
        particle.style.backgroundColor = colors[i % colors.length];
        
        // More intense glow effect
        particle.style.boxShadow = `0 0 ${size + 12}px ${colors[i % colors.length]}`;
        
        // Add more prominent blur
        particle.style.filter = `blur(${i * 0.4}px)`;
      }, i * 25); // Faster trail update
    });

    requestAnimationFrame(animate);
  };

  animate();

  // Cleanup function
  return () => {
    particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
  };
};

export default createCursorTrail;
