"use client";

import { motion } from "framer-motion";

export default function HeroContentLeft() {
  return (
    <div className="flex h-full items-center relative">
      {/* Subtle ambient focal light */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#A194F7]/12 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* WHAT I DO Heading */}
      <div className="flex flex-col select-none text-center lg:text-left relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-[0.25em] text-[#A194F7] font-semibold mb-3 block drop-shadow-[0_0_12px_rgba(161,148,247,0.3)]"
        >
          Overview
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
        >
          <span className="block">WHAT</span>
          <span className="block text-gradient-accent mt-1 drop-shadow-[0_0_24px_rgba(161,148,247,0.35)]">I DO</span>
        </motion.h1>
      </div>
    </div>
  );
}

