"use client";

import { motion } from "framer-motion";
import { Code, Download } from "lucide-react";

export default function HeroButtons() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap gap-4 mt-8"
    >
      <a
        href="/resume/Mohammed-Jashem-Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-[#C8C0FF] hover:shadow-[0_0_20px_rgba(161,148,247,0.25)] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A194F7]"
      >
        <Download size={17} />
        Resume
      </a>

      <a
        href="https://github.com/jashem01"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 bg-white/[0.03] text-white font-semibold text-sm hover:border-[#A194F7]/50 hover:bg-[#A194F7]/10 hover:shadow-[0_0_20px_rgba(161,148,247,0.15)] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A194F7]"
      >
        <Code size={18} />
        GitHub
      </a>
    </motion.div>
  );
}