"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MOTION_EASE } from "@/components/motion/Reveal";

export default function AboutText() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }
      }
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.1, ease: MOTION_EASE }}
      className="h-full"
    >
      <div className="group relative h-full rounded-3xl p-[1px]">
        {/* Main Inner Card Container */}
        <div className="relative z-10 h-full rounded-3xl bg-surface border border-stroke p-6 sm:p-8 md:p-10 flex flex-col justify-between hover-card-border">
          <div>
            {/* Card Title */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary tracking-tight uppercase flex items-center gap-3">
                <span>About Me</span>
                <span className="w-2 h-2 rounded-full bg-accent opacity-70" />
              </h3>
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono font-semibold">
                // BIOGRAPHY
              </span>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-5 text-muted text-sm sm:text-base leading-relaxed font-normal">
              <p>
                I&apos;m a Frontend Developer specializing in React.js, UI Design, No Code Platforms,  
                Generative AI Tools, WordPress, MS Excel and Next.js,
                passionate about creating responsive, scalable, and user-centric
                web applications. My focus is on building clean interfaces,
                optimizing performance, and delivering seamless digital experiences.
              </p>

              <p className="pt-4 border-t border-stroke/60 text-muted">
                Frontend Developer currently working at MRG Engineering, focused on building responsive and scalable web applications using React.js.
                Passionate about modern frontend development, UI implementation, performance optimization, and continuously expanding expertise in Next.js and modern web technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
