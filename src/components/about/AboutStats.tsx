"use client";

import React from "react";
import { motion } from "framer-motion";
import TiltCard from "@/components/motion/TiltCard";
import { MOTION_EASE } from "@/components/motion/Reveal";

const STATS_CARDS = [
  {
    eyebrow: "CURRENT ROLE",
    title: "Frontend Developer",
    subtitle: "MRG Engineering",
    hasDot: true,
  },
  {
    eyebrow: "SPECIALIZATION",
    title: "React.js",
    subtitle: null,
    hasDot: false,
  },
  {
    eyebrow: "LOCATION",
    title: "Thanjavur, Tamil Nadu, India",
    subtitle: null,
    hasDot: false,
  },
];

export default function AboutStats() {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 h-full justify-between">
      {STATS_CARDS.map((card, index) => (
        <motion.div
          key={card.eyebrow}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{
            duration: 0.9,
            delay: 0.15 + 0.12 * index,
            ease: MOTION_EASE,
          }}
          className="flex-1 flex flex-col"
        >
          <TiltCard maxTilt={5} className="h-full flex-1 flex flex-col">
            <div className="group relative rounded-3xl p-[1px] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 flex-1 flex flex-col h-full">
              {/* Gradient Ring on Hover */}
              <div
                className="absolute inset-[-1.5px] rounded-3xl accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] pointer-events-none"
                aria-hidden="true"
              />

              {/* Inner Card */}
              <div className="relative z-10 h-full rounded-3xl bg-surface/90 border border-stroke p-5 sm:p-6 flex flex-col justify-center transition-colors duration-300 group-hover:bg-surface">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold font-mono">
                    {card.eyebrow}
                  </span>
                  {card.hasDot && (
                    <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#A194F7] animate-pulse" />
                  )}
                </div>

                <h3 className="text-base sm:text-lg md:text-xl font-bold text-text-primary tracking-tight group-hover:text-accent-lavender transition-colors duration-200">
                  {card.title}
                </h3>

                {card.subtitle && (
                  <p className="text-muted mt-1 text-xs sm:text-sm font-medium group-hover:text-text-primary/90 transition-colors duration-200">
                    {card.subtitle}
                  </p>
                )}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}

