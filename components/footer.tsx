import React from "react";
import { Github, LinkedinIcon, Mail } from "lucide-react";

const Footer = () => (
  <footer className="w-full py-4 px-6 border-t border-zinc-900 bg-black text-zinc-500 flex items-center justify-between text-xs">
    <span className="font-semibold tracking-wide text-sm">Somil Gupta © {new Date().getFullYear()}</span>
    <div className="flex gap-5">
      <a href="https://github.com/Somilg11" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
        <Github size={18} />
      </a>
      <a href="https://www.linkedin.com/in/somil-1101s/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
        <LinkedinIcon size={18} />
      </a>
      <a href="mailto:gsomil93@gmail.com" className="hover:text-white transition-colors duration-200">
        <Mail size={18} />
      </a>
    </div>
  </footer>
);

export default Footer;
