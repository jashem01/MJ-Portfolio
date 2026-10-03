"use client";

import React from "react";
import { motion } from "framer-motion";
import SkillProgressBar from "./SkillProgressBar";
import TiltCard from "@/components/motion/TiltCard";
import { MOTION_EASE } from "@/components/motion/Reveal";

const CORE_SKILLS = [
  { name: "React.js", level: 85 },
  { name: "JavaScript", level: 85 },
  { name: "HTML5", level: 92 },
  { name: "CSS3", level: 90 },
];

export default function CoreSkills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease: MOTION_EASE }}
      className="h-full"
    >
      <TiltCard maxTilt={4} className="h-full">
        <div className="group relative h-full rounded-3xl p-[1px] transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1">
          {/* Gradient Ring on Hover */}
          <div
            className="absolute inset-[-1.5px] rounded-3xl accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Inner Card Container */}
          <div className="relative z-10 h-full rounded-3xl bg-surface/90 border border-stroke p-6 sm:p-8 md:p-9 flex flex-col justify-between transition-colors duration-300 group-hover:bg-surface">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight uppercase flex items-center gap-3">
                  <span>Core Technologies</span>
                  <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_#A194F7] animate-pulse" />
                </h3>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono font-semibold">
                  // PRODUCTION
                </span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                {CORE_SKILLS.map((skill) => (
                  <SkillProgressBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
