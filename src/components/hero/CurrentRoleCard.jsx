"use client";

import { motion } from "framer-motion";

export default function CurrentRoleCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -4,
        boxShadow: "0 14px 32px -6px rgba(0, 0, 0, 0.7), 0 0 20px rgba(161, 148, 247, 0.15)",
        borderColor: "rgba(161, 148, 247, 0.35)"
      }}
      className="glass-card p-5 mt-8 max-w-md transition-colors duration-200"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-[#A194F7] font-semibold mb-2">
        CURRENTLY WORKING AT
      </p>

      <h3 className="text-xl font-bold text-white tracking-tight">
        MRG Engineering
      </h3>

      <p className="text-[#9BA1AD] mt-1.5 text-sm">
        Frontend Developer - React.js
      </p>

      <p className="text-zinc-500 text-xs mt-1 font-mono">
        Feb 2026 – Present
      </p>
    </motion.div>
  );
}