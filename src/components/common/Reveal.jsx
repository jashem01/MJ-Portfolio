"use client";

import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 28,
        filter: "blur(4px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        margin: "-40px"
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
