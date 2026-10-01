"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#030303] py-16 relative z-10">
      <div className="section-container">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Left */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Mohammed Jashem</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#a194f7]" />
            </h3>
            <p className="text-zinc-400 mt-1 text-xs md:text-sm font-medium">
              Frontend Developer
            </p>
          </div>

          {/* Center */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/jashem01"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-[#a194f7]/20 border border-white/10 hover:border-[#a194f7]/40 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/mohammed-jashem-s-5633b5251"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-[#a194f7]/20 border border-white/10 hover:border-[#a194f7]/40 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={18} />
            </a>
          </div>

          {/* Right - Back to top */}
          <div>
            <motion.button 
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:border-[#a194f7]/50 hover:bg-[#a194f7]/15 transition-all shadow-lg"
              aria-label="Back to top"
            >
              <FiChevronUp size={20} />
            </motion.button>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-zinc-400 text-xs font-medium tracking-wider uppercase">
            © 2026 Mohammed Jashem.
          </p>
          <p className="text-zinc-400 text-xs font-medium tracking-wider uppercase">
            Designed &amp; Developed with Passion.
          </p>
        </div>

      </div>
    </footer>
  );
}