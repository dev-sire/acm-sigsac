
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';
import SideAnimations from './SideAnimations';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeCanvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Setup for the dot pattern canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize canvas size
    setCanvasSize();
    
    // Update canvas size on window resize
    window.addEventListener('resize', setCanvasSize);

    // Create dots
    const dots: {x: number, y: number, vx: number, vy: number}[] = [];
    const numDots = Math.floor(window.innerWidth * window.innerHeight / 10000); // Adjust number based on screen size
    
    for (let i = 0; i < numDots; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    // Function to draw lines between nearby dots
    const drawLines = (dots: {x: number, y: number}[]) => {
      ctx.strokeStyle = 'rgba(51, 195, 240, 0.15)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw lines if dots are close enough
          if (distance < 100) {
            // Make line opacity based on distance
            ctx.globalAlpha = (1 - distance / 100) * 0.8;
            
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 150;

    // Track mouse position
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update dots position
      dots.forEach(dot => {
        // Move dots
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        // Bounce off edges
        if (dot.x < 0 || dot.x > canvas.width) dot.vx = -dot.vx;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy = -dot.vy;
        
        // Interact with mouse
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          dot.vx += (dx / distance) * force * 0.2;
          dot.vy += (dy / distance) * force * 0.2;
        }
        
        // Apply friction to prevent infinite acceleration
        dot.vx *= 0.99;
        dot.vy *= 0.99;
        
        // Draw dots
        ctx.fillStyle = 'rgba(51, 195, 240, 0.7)';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw lines between dots
      drawLines(dots);
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  // Initialize the 3D Earth globe
  // useEffect(() => {
  //   // Check if we're in a browser environment
  //   if (typeof window === 'undefined') return;

  //   // Three.js setup for Earth globe
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
  //   // Create renderer
  //   const renderer = new THREE.WebGLRenderer({
  //     canvas: globeCanvasRef.current!,
  //     alpha: true,
  //     antialias: true
  //   });
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   renderer.setPixelRatio(window.devicePixelRatio);
    
  //   // Create Earth sphere
  //   const geometry = new THREE.SphereGeometry(2.5, 64, 64);
    
  //   // Digital Earth material
  //   const material = new THREE.MeshBasicMaterial({
  //     color: 0x33C3F0,
  //     wireframe: true,
  //     transparent: true,
  //     opacity: 0.4 // Dimmer
  //   });
    
  //   const globe = new THREE.Mesh(geometry, material);
  //   scene.add(globe);
    
  //   // Create atmosphere glow
  //   const atmosphereGeometry = new THREE.SphereGeometry(2.55, 64, 64);
  //   const atmosphereMaterial = new THREE.MeshBasicMaterial({
  //     color: 0x33C3F0,
  //     transparent: true,
  //     opacity: 0.05, // Dimmer glow
  //     side: THREE.BackSide
  //   });
  //   const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  //   scene.add(atmosphere);
    
  //   // Add data points on surface (simulating connected nodes)
  //   const createDataPoint = (lat: number, lng: number, size: number, color: number) => {
  //     const phi = (90 - lat) * (Math.PI / 180);
  //     const theta = (lng + 180) * (Math.PI / 180);
      
  //     const pointGeometry = new THREE.SphereGeometry(size, 8, 8);
  //     const pointMaterial = new THREE.MeshBasicMaterial({ color });
  //     const point = new THREE.Mesh(pointGeometry, pointMaterial);
      
  //     // Convert lat/lng to cartesian coordinates
  //     const x = -(2.5 * Math.sin(phi) * Math.cos(theta));
  //     const y = 2.5 * Math.cos(phi);
  //     const z = 2.5 * Math.sin(phi) * Math.sin(theta);
      
  //     point.position.set(x, y, z);
  //     return point;
  //   };
    
  //   // Add some data points randomly
  //   const points: THREE.Mesh[] = [];
  //   for (let i = 0; i < 20; i++) {
  //     const lat = Math.random() * 180 - 90;
  //     const lng = Math.random() * 360 - 180;
  //     const point = createDataPoint(lat, lng, 0.03 + Math.random() * 0.03, 0x9b87f5);
  //     globe.add(point);
  //     points.push(point);
  //   }
    
  //   // Create connection lines between points
  //   const connectionLines: THREE.Line[] = [];
    
  //   // Connect some points with lines
  //   for (let i = 0; i < 15; i++) {
  //     const startPoint = Math.floor(Math.random() * points.length);
  //     let endPoint = Math.floor(Math.random() * points.length);
      
  //     // Ensure we don't connect a point to itself
  //     while (endPoint === startPoint) {
  //       endPoint = Math.floor(Math.random() * points.length);
  //     }
      
  //     const lineGeometry = new THREE.BufferGeometry().setFromPoints([
  //       points[startPoint].position,
  //       points[endPoint].position
  //     ]);
      
  //     const lineMaterial = new THREE.LineBasicMaterial({ 
  //       color: 0x33C3F0, 
  //       transparent: true,
  //       opacity: 0.4
  //     });
      
  //     const line = new THREE.Line(lineGeometry, lineMaterial);
  //     scene.add(line);
  //     connectionLines.push(line);
      
  //     // Animate the line
  //     const animateLine = (line: THREE.Line) => {
  //       const material = line.material as THREE.LineBasicMaterial;
  //       let direction = 0.005;
  //       let opacity = material.opacity || 0.4;
        
  //       setInterval(() => {
  //         opacity += direction;
  //         if (opacity >= 0.8 || opacity <= 0.2) {
  //           direction = -direction;
  //         }
  //         material.opacity = opacity;
  //       }, 50);
  //     };
      
  //     animateLine(line);
  //   }
    
  //   // Position camera
  //   camera.position.z = 5;
    
  //   // Animation loop
  //   const animate = () => {
  //     requestAnimationFrame(animate);
      
  //     // Rotate the globe
  //     globe.rotation.y += 0.002;
  //     atmosphere.rotation.y += 0.002;
      
  //     renderer.render(scene, camera);
  //   };
    
  //   // Start animation
  //   animate();
    
  //   // Handle window resize
  //   const handleResize = () => {
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //   };
    
  //   window.addEventListener('resize', handleResize);
    
  //   // Cleanup function
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //     renderer.dispose();
  //     connectionLines.forEach(line => {
  //       scene.remove(line);
  //     });
  //   };
  // }, []);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      canvas: globeCanvasRef.current!,
      alpha: true,
      antialias: false, // Disable antialiasing for performance
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(0.8, window.devicePixelRatio)); // Limit pixel ratio

    // --- Globe Geometry ---
    const geometry = new THREE.SphereGeometry(2.5, 32, 32); // Reduced segments

    // --- Globe Material ---
    const material = new THREE.MeshBasicMaterial({
      color: 0x33C3F0,
      wireframe: true,
      transparent: true,
      opacity: 0.3, // Slightly more subtle
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // --- Atmosphere ---
    const atmosphereGeometry = new THREE.SphereGeometry(2.6, 32, 32); // Reduced segments
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x33C3F0,
      transparent: true,
      opacity: 0.04, // Even more subtle
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // --- Data Points ---
    const points: THREE.Mesh[] = [];
    const numPoints = 10; // Reduced number of points
    const pointSize = 0.025; // Smaller points

    const createDataPoint = (lat: number, lng: number, color: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);

      const pointGeometry = new THREE.SphereGeometry(pointSize, 6, 6); // Very low poly
      const pointMaterial = new THREE.MeshBasicMaterial({ color });
      const point = new THREE.Mesh(pointGeometry, pointMaterial);

      const x = -(2.5 * Math.sin(phi) * Math.cos(theta));
      const y = 2.5 * Math.cos(phi);
      const z = 2.5 * Math.sin(phi) * Math.sin(theta);

      point.position.set(x, y, z);
      return point;
    };

    for (let i = 0; i < numPoints; i++) {
      const lat = Math.random() * 180 - 90;
      const lng = Math.random() * 360 - 180;
      const color = 0x9b87f5;
      const point = createDataPoint(lat, lng, color);
      globe.add(point);
      points.push(point);
    }

    // --- Connection Lines ---
    const connectionLines: THREE.Line[] = [];
    const numConnections = 5; // Further reduced connections (was 8)
    for (let i = 0; i < numConnections; i++) {
      const startPointIndex = Math.floor(Math.random() * points.length);
      let endPointIndex = Math.floor(Math.random() * points.length);
      while (endPointIndex === startPointIndex) {
        endPointIndex = Math.floor(Math.random() * points.length);
      }

      const startPoint = points[startPointIndex].position;
      const endPoint = points[endPointIndex].position;

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x33C3F0,
        transparent: true,
        opacity: 0.15, // Very faint lines
        linewidth: 1,
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
      connectionLines.push(line);
    }

    // --- Camera Position ---
    camera.position.z = 4; // Closer camera

    // --- Animation ---
    let rotationSpeed = 0.001; // Even faster rotation (was 0.0005)
    const animate = () => {
      requestAnimationFrame(animate);

      globe.rotation.y += rotationSpeed;
      atmosphere.rotation.y += rotationSpeed;

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handling ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      points.forEach(point => {
        point.geometry.dispose();
        point.material.dispose();
      });
      connectionLines.forEach(line => {
        line.geometry.dispose();
        line.material.dispose();
        scene.remove(line); // Remove lines from scene
      });
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      <canvas
        ref={globeCanvasRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-5 opacity-40"
      />
      
      {/* Side animations for large screens */}
      <SideAnimations />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/90 to-cyber-dark -z-10"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 inline-block animate-fade-in">
            <div className="px-4 py-1 border border-cyber-neon text-cyber-neon text-sm font-mono rounded-full animate-pulse-glow">
              DAWOOD UNIVERSITY
            </div>
          </div>
          
          <h1 className="text-heading-xl mb-6 glitch animate-scale-in" data-text="ACM SIGSAC">
            ACM <span className="text-cyber-neon neon-text">SIGSAC</span>
          </h1>
          
          <p className="text-xl mb-8 text-white/80 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Nurturing Guardians of Digital Frontiers.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Button size="lg" className="bg-cyber-neon hover:bg-cyber-neon/80 text-cyber-dark">
              Join Our Community
            </Button>
            <Button asChild variant="outline" className="border-cyber-neon text-cyber-neon hover:bg-cyber-neon/10 text-lg px-6 py-6">
                <Link to="/about-us">Learn More</Link>
            </Button>
          </div>
          
          <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <a href="#events" className="inline-flex flex-col items-center text-cyber-neon animate-float">
              <span className="text-sm mb-2">Explore</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
