"use client";

import { motion } from "framer-motion";

export default function HeroContentLeft() {
  return (
    <div className="flex h-full items-center">
      {/* WHAT I DO Heading */}
      <div className="flex flex-col select-none text-center lg:text-left">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-[0.25em] text-[#a194f7] font-semibold mb-3 block"
        >
          Overview
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-black leading-[0.9] tracking-tighter text-white"
        >
          WHAT
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-black leading-[0.9] tracking-tighter text-gradient-accent mt-1"
        >
          I DO
        </motion.h1>
      </div>
    </div>
  );
}

