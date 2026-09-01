"use client";

import { motion } from "framer-motion";

/**
 * TechBadge renders a floating badge with a label.
 * It uses Framer Motion to animate a subtle vertical bobbing motion.
 */
export default function TechBadge({ label, duration = 4, delay = 0 }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-8, 8, -8] }}
      transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
      className="
        pointer-events-none 
        absolute 
        text-xs 
        font-medium 
        text-zinc-300 
        bg-zinc-900/40 
        backdrop-blur-md 
        border 
        border-zinc-700/50 
        px-4 
        py-2 
        rounded-full 
        shadow-xl
        whitespace-nowrap
      "
    >
      {label}
    </motion.div>
  );
}
