"use client";

import React from "react";
import { motion } from "framer-motion";
import { MOTION_EASE } from "@/components/motion/Reveal";

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
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight uppercase flex items-center gap-3">
                <span>Core Skills</span>
                <span className="w-2 h-2 rounded-full bg-accent opacity-70" />
              </h3>
            </div>

            {/* Visual Skill Map Tree */}
            <div className="relative flex flex-col items-center justify-center py-2 select-none">
              
              {/* Level 1: React.js (Central & Strongest Primary Skill) */}
              <div className="flex flex-col items-center relative z-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: MOTION_EASE }}
                  className="px-6 py-3.5 rounded-2xl bg-surface border-2 border-accent/70 shadow-[0_0_25px_rgba(161,148,247,0.2)] flex flex-col items-center text-center group/node"
                >
                  <span className="text-base sm:text-lg font-bold text-text-primary tracking-tight group-hover/node:text-accent-lavender transition-colors">
                    React.js
                  </span>
                </motion.div>
                
                {/* Center Node Dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(161,148,247,0.8)] mt-2" />
                {/* Vertical Stem down to crossroad */}
                <div className="w-0.5 h-6 bg-accent/60" />
              </div>

              {/* Level 2: Horizontal Crossroad connecting JavaScript & HTML / CSS */}
              <div className="w-full max-w-md relative z-10 flex items-center justify-between">
                {/* Left Node: JavaScript */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: MOTION_EASE }}
                  className="w-[38%] p-3 rounded-xl bg-surface border border-stroke flex flex-col items-center text-center shadow-sm"
                >
                  <span className="text-xs sm:text-sm font-semibold text-text-primary">
                    JavaScript
                  </span>
                </motion.div>

                {/* Horizontal Connector Line passing through Center */}
                <div className="flex-1 relative flex items-center justify-center">
                  <div className="w-full h-0.5 bg-stroke relative">
                    {/* Active junction point */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/80" />
                  </div>
                </div>

                {/* Right Node: HTML / CSS */}
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: MOTION_EASE }}
                  className="w-[38%] p-3 rounded-xl bg-surface border border-stroke flex flex-col items-center text-center shadow-sm"
                >
                  <span className="text-xs sm:text-sm font-semibold text-text-primary">
                    HTML / CSS
                  </span>
                </motion.div>
              </div>

              {/* Vertical connector from crossroad to REST APIs */}
              <div className="w-0.5 h-6 bg-accent/50 relative z-10" />

              {/* Level 3: REST APIs (Web Development / Integration) */}
              <div className="flex flex-col items-center relative z-20">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, ease: MOTION_EASE }}
                  className="px-5 py-2.5 rounded-xl bg-surface border border-stroke flex flex-col items-center text-center shadow-sm min-w-[150px]"
                >
                  <span className="text-xs sm:text-sm font-semibold text-text-primary">
                    REST APIs
                  </span>
                </motion.div>

                {/* Vertical stem down to Backend & Database Fork */}
                <div className="w-0.5 h-6 bg-stroke" />
              </div>

              {/* Level 4: Backend & Database Fork (Node.js & MongoDB — Exploring) */}
              <div className="w-full max-w-md relative z-10">
                {/* Fork horizontal bar */}
                <div className="relative w-[60%] mx-auto h-0.5 bg-stroke mb-3">
                  <div className="absolute left-0 top-0 w-0.5 h-3 bg-stroke" />
                  <div className="absolute right-0 top-0 w-0.5 h-3 bg-stroke" />
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-stroke" />
                </div>

                {/* Fork Items */}
                <div className="flex items-center justify-between gap-4">
                  {/* Node.js — Exploring */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3, ease: MOTION_EASE }}
                    className="flex-1 p-3 rounded-xl bg-surface border border-stroke/80 flex flex-col items-center text-center"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-text-primary">
                      Node.js
                    </span>
                    <span className="text-[9px] font-mono text-accent/80 uppercase tracking-wider mt-1 px-2 py-0.5 rounded-md bg-accent/5 border border-accent/20">
                      Exploring
                    </span>
                  </motion.div>

                  {/* MongoDB — Exploring */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35, ease: MOTION_EASE }}
                    className="flex-1 p-3 rounded-xl bg-surface border border-stroke/80 flex flex-col items-center text-center"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-text-primary">
                      MongoDB
                    </span>
                    <span className="text-[9px] font-mono text-accent/80 uppercase tracking-wider mt-1 px-2 py-0.5 rounded-md bg-accent/5 border border-accent/20">
                      Exploring
                    </span>
                  </motion.div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

