import React from 'react';
import { Github, Linkedin, Globe, BarChart3 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/90 py-4 px-6 border-t border-golden/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Website Logo and Name */}
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-golden" />
          <span className="text-golden font-semibold">Sorting<span className="text-teal-400">Visualizer</span>
          </span>
        </div>

        {/* Copyright Text */}
        <p className="text-center text-golden/80 text-sm order-last md:order-none">
          ©2025 Copyright | All rights reserved. Designed and developed with{' '}
          <span className="text-red-500">❤️</span> by Dhiraj Sah
        </p>

        {/* Social Media Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/DhirajSah736"
            target="_blank"
            rel="noopener noreferrer"
            className="text-golden/70 hover:text-golden transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/dhiraj-sah-7a3522220/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-golden/70 hover:text-golden transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://www.dhirajsah99.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="text-golden/70 hover:text-golden transition-colors duration-300"
            aria-label="Portfolio"
          >
            <Globe className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;