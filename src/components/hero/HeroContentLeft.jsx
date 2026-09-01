"use client";

import { motion } from "framer-motion";

export default function HeroContentLeft() {
  return (
    <div className="flex h-full items-center gap-12">
      {/* WHAT I DO Heading */}
      <div className="flex flex-col select-none">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-8xl lg:text-[7rem] font-bold leading-[0.9] tracking-tighter text-white"
        >
          WHAT
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-8xl lg:text-[7rem] font-bold leading-[0.9] tracking-tighter text-gradient-accent"
        >
          I DO
        </motion.h1>
      </div>
    </div>
  );
}
