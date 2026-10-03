"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MOTION_EASE } from "@/components/motion/Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  titlePrefix?: string;
  emphasizedWord: string;
  titleSuffix?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  titlePrefix = "",
  emphasizedWord,
  titleSuffix = "",
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease: MOTION_EASE }}
      className={`mb-12 sm:mb-16 md:mb-20 select-none flex flex-col ${alignClasses[align]} ${className}`}
    >
      {/* Eyebrow badge with decorative stroke line (12px, tracking-[0.3em]) */}
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-8 h-px bg-stroke" aria-hidden="true" />
        <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold font-mono">
          {eyebrow}
        </span>
        {align === "center" && (
          <span className="w-8 h-px bg-stroke" aria-hidden="true" />
        )}
      </div>

      {/* Main Heading with clamp(2.5rem, 6vw, 5rem), tight tracking, leading-[1.05], and 1 emphasised italic serif word */}
      <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-tight text-text-primary leading-[1.05]">
        {titlePrefix && `${titlePrefix} `}
        <span className="font-display italic font-normal text-accent-gradient">
          {emphasizedWord}
        </span>
        {titleSuffix && ` ${titleSuffix}`}
      </h2>

      {/* Optional Description (15px to 16px, leading-relaxed) */}
      {description && (
        <p className="mt-4 text-muted text-[15px] sm:text-base leading-relaxed max-w-2xl font-normal">
          {description}
        </p>
      )}
    </motion.div>
  );
}
