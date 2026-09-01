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
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference pointer-events-none">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 py-8 flex items-center justify-between pointer-events-auto">
        
        {/* Left: Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-1/3 flex justify-start"
        >
          <a href="#" className="font-bold text-white text-lg tracking-tight hover:text-zinc-300 transition-colors">
            Mohammed Jashem
          </a>
        </motion.div>

        {/* Center: Email */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="hidden md:flex w-1/3 justify-center"
        >
          <a href="mailto:mohammedjashemofficial564@gmail.com" className="font-medium text-white text-sm tracking-widest hover:text-[#a194f7] transition-colors">
            connect@mohammedjashem
          </a>
        </motion.div>

        {/* Right: Navigation Links */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-1/3 flex justify-end"
        >
          <ul className="flex gap-8 text-xs font-bold tracking-[0.15em] text-white uppercase">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="hover:text-[#a194f7] transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>

      </div>
    </header>
  );
}