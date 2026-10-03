"use client";

import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-stroke bg-surface/50 backdrop-blur-md py-12 sm:py-14 md:py-16 relative z-10">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          
          {/* Left: Name and Role */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
              <span>Mohammed Jashem</span>
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#A194F7]" />
            </h3>
            <p className="text-muted mt-1 text-xs md:text-sm font-medium">
              Frontend Developer
            </p>
          </div>

          {/* Center: Circular Social Buttons with Gradient Ring Hover */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <a
              href="https://github.com/jashem01"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group rounded-full p-[1px] transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="GitHub Profile"
            >
              <span
                className="absolute inset-[-1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-muted group-hover:text-text-primary bg-surface border border-stroke shadow-sm">
                <FaGithub size={18} />
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/mohammed-jashem-s-5633b5251"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group rounded-full p-[1px] transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="LinkedIn Profile"
            >
              <span
                className="absolute inset-[-1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-muted group-hover:text-text-primary bg-surface border border-stroke shadow-sm">
                <FaLinkedin size={18} />
              </span>
            </a>
          </div>

          {/* Right: Scroll to Top Button */}
          <div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group rounded-full p-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Back to top"
            >
              <span
                className="absolute inset-[-1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-stroke bg-surface text-muted group-hover:text-text-primary shadow-sm">
                <ChevronUp size={18} />
              </span>
            </motion.button>
          </div>

        </div>

        {/* Bottom Attribution & Copyright */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-stroke/40 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-muted text-xs font-medium tracking-wider uppercase">
            © 2026 Mohammed Jashem.
          </p>
          <p className="text-muted text-xs font-medium tracking-wider uppercase">
            Designed &amp; Developed with Passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
