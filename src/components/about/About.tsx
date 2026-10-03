"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SplitWords from "@/components/motion/SplitWords";
import AboutText from "./AboutText";
import AboutStats from "./AboutStats";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: stats column moves at 0.9x speed (-30px to 30px offset)
  const statsY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 relative overflow-hidden rounded-t-[40px] -mt-10 bg-[#08070E]/90 border-t border-stroke/40 z-20 content-visibility-auto"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="section-container">
        {/* Section Header with Eyebrow and Scroll-Scrubbed SplitWords Heading */}
        <div className="mb-12 sm:mb-16 md:mb-20 text-left select-none">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-8 h-px bg-stroke" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold font-mono">
              ABOUT ME
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-tight text-text-primary leading-[1.05]">
            <SplitWords
              text="Building modern digital experiences."
              italicWord="digital"
              italicClassName="font-display italic text-accent font-normal"
              scrub={true}
            />
          </h2>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Main narrative card (col-span-8) */}
          <div className="lg:col-span-8 h-full">
            <AboutText />
          </div>

          {/* Stacked highlight cards (col-span-4) with subtle parallax */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: statsY }}
            className="lg:col-span-4 h-full"
          >
            <AboutStats />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

