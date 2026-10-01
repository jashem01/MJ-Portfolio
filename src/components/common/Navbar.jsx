"use client";

import { motion } from "framer-motion";

const navLinks = [
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "EXPERIENCE", href: "#experience" },
  { name: "WORK", href: "#projects" },
  { name: "CONTACT", href: "#contact" }
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-300">
      <div className="w-full bg-[#030303]/60 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between pointer-events-auto">
          
          {/* Left: Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center"
          >
            <a 
              href="#" 
              className="font-bold text-white text-base md:text-lg tracking-tight hover:text-[#c4b9ff] transition-colors flex items-center gap-2 group"
            >
              <span>Mohammed Jashem</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#a194f7] group-hover:scale-150 transition-transform" />
            </a>
          </motion.div>

          {/* Center: Email */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <a 
              href="mailto:mohammedjashemofficial564@gmail.com" 
              className="font-mono text-xs text-zinc-400 tracking-wider hover:text-white transition-colors px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-white/20"
            >
              connect@mohammedjashem
            </a>
          </motion.div>

          {/* Right: Navigation Links */}
          <motion.nav 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center"
          >
            <ul className="flex items-center gap-5 md:gap-7 text-[11px] md:text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors duration-200 py-1 relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#a194f7] group-hover:w-full transition-all duration-300 rounded-full" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

        </div>
      </div>
    </header>
  );
}