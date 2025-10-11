import React from "react";
import { Github, LinkedinIcon, Mail } from "lucide-react";

const Footer = () => (
  <footer className="w-full py-3 px-4 border-t border-slate-800 bg-slate-950 text-slate-300 flex items-center justify-between text-xs shadow-lg">
    <span className="font-semibold tracking-wide text-sm">Somil Gupta © {new Date().getFullYear()}</span>
    <div className="flex gap-4">
      <a href="https://github.com/Somilg11" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-200">
        <Github size={20} />
      </a>
      <a href="https://www.linkedin.com/in/somil-1101s/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-200">
        <LinkedinIcon size={20} />
      </a>
      <a href="mailto:gsomil93@gmail.com" className="hover:text-blue-400 transition-colors duration-200">
        <Mail size={20} />
      </a>
    </div>
  </footer>
);

export default Footer;
