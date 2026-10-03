"use client";

import React from "react";
import { motion } from "framer-motion";
import TiltCard from "@/components/motion/TiltCard";
import { MOTION_EASE } from "@/components/motion/Reveal";

const EXPLORING_TECH = [
  { name: "Next.js", desc: "Full-stack React framework" },
  { name: "Tailwind CSS", desc: "Utility-first CSS framework" },
  { name: "React Three Fiber", desc: "3D graphics with React & Three.js" },
];

export default function LearningSkills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, delay: 0.15, ease: MOTION_EASE }}
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
                  <span>Exploring New Technologies</span>
                  <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_#A194F7] animate-pulse" />
                </h3>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono font-semibold">
                  // ACTIVE
                </span>
              </div>

              {/* Hover-lift rows with status dot that slide up one by one */}
              <div className="flex flex-col gap-3 sm:gap-3.5">
                {EXPLORING_TECH.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + index * 0.1,
                      ease: MOTION_EASE,
                    }}
                    className="group/row flex items-center justify-between p-4 rounded-2xl border border-stroke bg-surface/80 hover:bg-surface hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide group-hover/row:text-accent-lavender transition-colors duration-200">
                        {tech.name}
                      </h4>
                      <p className="text-xs text-muted mt-0.5 font-normal group-hover/row:text-text-primary/80 transition-colors duration-200">
                        {tech.desc}
                      </p>
                    </div>

                    {/* Status Dot */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-accent/40 group-hover/row:bg-accent group-hover/row:shadow-[0_0_8px_#A194F7] transition-all duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
