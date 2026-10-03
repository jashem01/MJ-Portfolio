"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: number;
  className?: string;
}

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  y = 40,
  blur = 8,
  className = "",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
        filter: blur > 0 ? `blur(${blur}px)` : "none",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration,
        delay,
        ease: MOTION_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
