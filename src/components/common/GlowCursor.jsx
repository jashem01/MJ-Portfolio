"use client";

import { motion } from "framer-motion";

export default function GlowCursor() {
  return (
    <motion.div
      className="fixed h-[300px] w-[300px] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none z-0"
      animate={{
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
  );
}
