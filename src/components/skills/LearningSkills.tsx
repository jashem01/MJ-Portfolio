"use client";

import React from "react";
import { motion } from "framer-motion";
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
      <div className="group relative h-full rounded-3xl p-[1px]">
        {/* Inner Card Container */}
        <div className="relative z-10 h-full rounded-3xl bg-surface border border-stroke p-6 sm:p-8 md:p-9 flex flex-col justify-between hover-card-border">
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight uppercase flex items-center gap-3">
                <span>Exploring New Technologies</span>
                <span className="w-2 h-2 rounded-full bg-accent opacity-70" />
              </h3>
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono font-semibold">
                // ACTIVE
              </span>
            </div>

            {/* Non-interactive exploration rows */}
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
                  className="flex items-center justify-between p-4 rounded-2xl border border-stroke bg-surface"
                >
                  <div>
                    <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide">
                      {tech.name}
                    </h4>
                    <p className="text-xs text-muted mt-0.5 font-normal">
                      {tech.desc}
                    </p>
                  </div>

                  {/* Status Dot */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-accent/60" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
