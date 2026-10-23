"use client";

import React from "react";
import { motion } from "framer-motion";
import { MOTION_EASE } from "@/components/motion/Reveal";

const TOOLS_PLATFORMS = [
  {
    name: "Git & GitHub",
    category: "Version Control",
    desc: "Source Control, Branching & Collaboration",
  },
  {
    name: "WordPress",
    category: "CMS Platform",
    desc: "CMS Architecture & Web Publishing",
  },
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
              <span>Tools & Platforms</span>
              <span className="w-2 h-2 rounded-full bg-accent opacity-70" />
            </h3>
          </div>

          {/* 3-Column Tools & Platforms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TOOLS_PLATFORMS.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 0.6,
                  delay: 0.25 + index * 0.08,
                  ease: MOTION_EASE,
                }}
                className="flex flex-col justify-between p-5 rounded-2xl border border-stroke bg-surface hover-card-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide">
                    {tool.name}
                  </h4>
                  <span className="text-[9px] font-mono text-accent uppercase tracking-wider px-2 py-0.5 rounded bg-accent/5 border border-accent/20">
                    {tool.category}
                  </span>
                </div>
                <p className="text-xs text-muted font-normal">
                  {tool.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

