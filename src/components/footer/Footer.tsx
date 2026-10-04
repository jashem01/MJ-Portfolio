"use client";

import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-stroke bg-surface py-12 sm:py-14 md:py-16 relative z-10">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          
          {/* Left: Name and Role */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
              <span>Mohammed Jashem</span>
              <span className="w-2 h-2 rounded-full bg-accent opacity-70" />
            </h3>
            <p className="text-muted mt-1 text-xs md:text-sm font-medium">
              Frontend Developer
            </p>
          </div>

          {/* Center: Circular Social Buttons */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <a
              href="https://github.com/jashem01"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-10 h-10 rounded-full flex items-center justify-center border border-stroke hover-icon focus-visible:outline-none focus-visible:ring-2 shadow-sm"
              aria-label="GitHub Profile"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/mohammed-jashem-s-5633b5251"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-10 h-10 rounded-full flex items-center justify-center border border-stroke hover-icon focus-visible:outline-none focus-visible:ring-2 shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={18} />
            </a>
          </div>

          {/* Right: Scroll to Top Button */}
          <div>
            <button
              onClick={scrollToTop}
              className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-stroke bg-surface hover-icon focus-visible:outline-none focus-visible:ring-2 shadow-sm"
              aria-label="Back to top"
            >
              <ChevronUp size={18} />
            </button>
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
