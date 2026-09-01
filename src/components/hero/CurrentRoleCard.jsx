"use client";

import { motion } from "framer-motion";

export default function CurrentRoleCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -5,
        boxShadow: "0 0 30px rgba(250, 210, 140, 0.08)",
        borderColor: "rgba(250, 210, 140, 0.2)"
      }}
      className="glass-card p-5 mt-8 max-w-md transition-colors duration-300"
    >
      <p className="text-sm text-zinc-500 mb-2">
        CURRENTLY WORKING AT
      </p>

      <h3 className="text-xl font-semibold">
        MRG Engineering
      </h3>

      <p className="text-zinc-400 mt-2">
        Frontend Developer - React.js
      </p>

      <p className="text-zinc-500 text-sm mt-1">
        Feb 2026 – Present
      </p>
    </motion.div>
  );
}