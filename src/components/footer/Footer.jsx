"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiChevronUp } from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-[#030303] py-16 relative">
      <div className="section-container">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Left */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-white tracking-tighter">
              Mohammed Jashem
            </h3>
            <p className="text-zinc-500 mt-2 text-sm tracking-wide">
              Frontend Developer
            </p>
          </div>

          {/* Center */}
          <div className="flex items-center gap-8">
            <a
              href="https://github.com/jashem01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white hover:scale-110 transition-all cursor-none"
            >
              <FaGithub size={24} />
            </a>

            <a
              href="https://www.linkedin.com/in/mohammed-jashem-s-5633b5251"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white hover:scale-110 transition-all cursor-none"
            >
              <FaLinkedin size={24} />
            </a>
          </div>

          {/* Right - Back to top */}
          <div>
            <button 
              onClick={scrollToTop}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-none"
              aria-label="Back to top"
            >
              <FiChevronUp size={24} />
            </button>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-zinc-600 text-sm tracking-widest uppercase">
            © 2026 Mohammed Jashem.
          </p>
          <p className="text-zinc-600 text-sm tracking-widest uppercase">
            Designed & Developed with Passion.
          </p>
        </div>

      </div>
    </footer>
  );
}