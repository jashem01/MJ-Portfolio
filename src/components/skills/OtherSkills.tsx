"use client";

import React from "react";
import { motion } from "framer-motion";
import SkillProgressBar from "./SkillProgressBar";
import { MOTION_EASE } from "@/components/motion/Reveal";

const OTHER_SKILLS_COL1 = [
  { name: "UI Design", level: 90 },
  { name: "Generative AI", level: 85 },
  { name: "No-Code Platforms", level: 85 },
];

const OTHER_SKILLS_COL2 = [
  { name: "Agentic AI", level: 85 },
  { name: "WordPress", level: 70 },
  { name: "MS Excel", level: 80 },
];

export default function OtherSkills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, delay: 0.2, ease: MOTION_EASE }}
      className="w-full"
    >
      <div className="group relative rounded-3xl p-[1px]">
        {/* Inner Card */}
        <div className="relative z-10 rounded-3xl bg-surface border border-stroke p-6 sm:p-8 md:p-9 hover-card-border">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight uppercase flex items-center gap-3">
              <span>Other Skills</span>
              <span className="w-2 h-2 rounded-full bg-accent opacity-70" />
            </h3>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono font-semibold">
              // TOOLS &amp; WORKFLOW
            </span>
          </div>

          {/* 2-Column Progress Bars Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-4">
            <div className="space-y-4">
              {OTHER_SKILLS_COL1.map((skill) => (
                <SkillProgressBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>

            <div className="space-y-4">
              {OTHER_SKILLS_COL2.map((skill) => (
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
