"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

interface SkillProgressBarProps {
  name: string;
  level: number;
}

export default function SkillProgressBar({
  name,
  level,
}: SkillProgressBarProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mb-4 last:mb-0 group/skill">
      {/* Skill Label & Scrubbed Percentage */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-text-primary/90 font-medium text-xs sm:text-sm tracking-wide group-hover/skill:text-white transition-colors duration-200">
          {name}
        </span>
        <span className="text-accent text-xs font-mono font-semibold tabular-nums">
          {level}%
        </span>
      </div>

      {/* Progress Bar Track: h-1 bg-stroke rounded-full */}
      <div className="h-1 w-full bg-stroke rounded-full overflow-hidden relative">
        <motion.div
          className="h-full accent-gradient origin-left rounded-full shadow-[0_0_8px_rgba(161,148,247,0.4)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: level / 100 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}
