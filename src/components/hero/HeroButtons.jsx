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
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:scale-105 transition"
      >
        <Download size={18} />
        Resume
      </a>

      <a
        href="https://github.com/jashem01"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 hover:border-[rgba(250,210,140,0.4)] hover:shadow-[0_0_15px_rgba(250,210,140,0.1)] transition-all duration-300"
      >
        <Code size={20} />
        GitHub
      </a>
    </motion.div>
  );
}