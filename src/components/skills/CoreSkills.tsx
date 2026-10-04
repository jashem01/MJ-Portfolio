"use client";

import React from "react";
import { motion } from "framer-motion";
import SkillProgressBar from "./SkillProgressBar";
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
      <div className="group relative h-full rounded-3xl p-[1px]">
        {/* Inner Card Container */}
        <div className="relative z-10 h-full rounded-3xl bg-surface border border-stroke p-6 sm:p-8 md:p-9 flex flex-col justify-between hover-card-border">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight uppercase flex items-center gap-3">
                <span>Core Technologies</span>
                <span className="w-2 h-2 rounded-full bg-accent opacity-70" />
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
    </motion.div>
  );
}
