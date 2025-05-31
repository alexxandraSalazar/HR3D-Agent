import React from "react";
import { Youtube, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="border-t border-gray-200 mx-4" />
      <div className="flex flex-col items-center justify-center py-6 gap-4">
        <div className="flex items-center justify-center gap-6">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition-colors"
          >
            <Youtube size={20} className="text-gray-500" />
            <span className="sr-only">YouTube</span>
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition-colors"
          >
            <Linkedin size={20} className="text-gray-500" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition-colors"
          >
            <Github size={20} className="text-gray-500" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
        <p className="text-sm text-gray-600">
          © 2025 Selenyon feat Danny Chávez. Todos los derechos reservados.
        </p>
      </div>
      <div className="border-t border-gray-200 mx-4" />
    </footer>
  );
};

export default Footer;
