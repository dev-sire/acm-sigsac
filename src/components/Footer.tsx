
import React from 'react';
import { Github, Twitter, Linkedin, Facebook, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cyber-dark relative">
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-8 lg:mb-0">
            <div className="flex items-center gap-2 mb-6">
              {/* <div className="w-8 h-8 rounded-full bg-cyber-neon"></div> */}
              <img src='/logo.png' className='w-[40px] h-[40px]' />
              <span className="text-xl font-bold text-white">
                ACM <span className="text-cyber-neon">SIGSAC</span> DUET
              </span>
            </div>
            
            <p className="text-white/70 mb-6">
              ACM SIGSAC DUET is the student club of the Cybersecurity department at Dawood University, 
              dedicated to advancing knowledge in cybersecurity through innovation, 
              collaboration, and hands-on learning.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-cyber-neon transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-cyber-neon transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-cyber-neon transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-cyber-neon transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-cyber-neon transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div className="mb-8 lg:mb-0">
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-white/70 hover:text-cyber-neon transition-colors hover-underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#events" className="text-white/70 hover:text-cyber-neon transition-colors hover-underline">
                  Events
                </a>
              </li>
              <li>
                <a href="#collaborators" className="text-white/70 hover:text-cyber-neon transition-colors hover-underline">
                  Collaborators
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-white/70 hover:text-cyber-neon transition-colors hover-underline">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#team" className="text-white/70 hover:text-cyber-neon transition-colors hover-underline">
                  Team
                </a>
              </li>
            </ul>
          </div>
          
          <div className="mb-8 lg:mb-0">
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-cyber-neon transition-colors hover-underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-cyber-neon transition-colors hover-underline">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-cyber-neon transition-colors hover-underline">
                  Tools
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-cyber-neon transition-colors hover-underline">
                  Podcasts
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-cyber-neon transition-colors hover-underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={18} className="text-cyber-neon mr-3 mt-1 flex-shrink-0" />
                <a href="mailto:contact@acmsigsac.edu" className="text-white/70 hover:text-cyber-neon transition-colors">
                  contact@acmsigsac.edu
                </a>
              </li>
              <li>
                <p className="text-white/70">
                  Department of Cybersecurity, Dawood University,
                  Karachi, Pakistan
                </p>
              </li>
            </ul>
            
            <div className="mt-6">
              <a href="#" className="px-5 py-2 bg-cyber-neon text-cyber-dark font-medium rounded-md hover:bg-cyber-neon/80 transition-colors inline-block">
                Join Newsletter
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/50">
            Developed By: <a target='_blank' href='https://github.com/dev-sire'></a>@dev-sire
          </p>
          <p className="text-white/50">
            © {new Date().getFullYear()} ACM SIGSAC DUET. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
