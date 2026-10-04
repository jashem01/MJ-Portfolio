"use client";

import React from "react";
import { motion } from "framer-motion";
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
          <div className="group relative rounded-3xl p-[1px] flex-1 flex flex-col h-full">
            {/* Inner Card */}
            <div className="relative z-10 h-full rounded-3xl bg-surface border border-stroke p-5 sm:p-6 flex flex-col justify-center hover-card-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold font-mono">
                  {card.eyebrow}
                </span>
                {card.hasDot && (
                  <span className="w-2 h-2 rounded-full bg-accent opacity-70" />
                )}
              </div>

              <h3 className="text-base sm:text-lg md:text-xl font-bold text-text-primary tracking-tight">
                {card.title}
              </h3>

              {card.subtitle && (
                <p className="text-muted mt-1 text-xs sm:text-sm font-medium">
                  {card.subtitle}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
