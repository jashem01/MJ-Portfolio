"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

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
    <div className="mb-4 last:mb-0">
      {/* Skill Label & Percentage */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-text-primary/90 font-medium text-xs sm:text-sm tracking-wide">
          {name}
        </span>
        <span className="text-accent text-xs font-mono font-semibold tabular-nums">
          {level}%
        </span>
      </div>

      {/* Progress Bar Track: h-1 bg-stroke rounded-full */}
      <div className="h-1 w-full bg-stroke rounded-full overflow-hidden relative">
        <motion.div
          className="h-full accent-gradient origin-left rounded-full"
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
