"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import LaptopScrubBackground from "./LaptopScrubBackground";
import { ChevronDown, Download, Mail } from "lucide-react";
import { MOTION_EASE } from "@/components/motion/Reveal";

const ROLES = ["Develop", "Design", "React.js", "UI Design"];

const CARDS_DATA = [
  {
    title: "DEVELOP",
    description:
      "Building responsive and scalable web applications with React.js, JavaScript, and modern frontend technologies, focused on delivering clean user experiences and high-performance interfaces.",
  },
  {
    title: "DESIGN",
    description:
      "Exploring design sparked my interest in digital creation. Today, I leverage UI design principles, no-code platforms, and Generative AI tools to build modern, efficient, and user-centric experiences.",
  },
];

function HeroCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, rotateY: -6 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.3 + index * 0.12,
        ease: MOTION_EASE,
      }}
      className="flex flex-col w-full"
    >
      <div className="group relative rounded-2xl sm:rounded-3xl p-[1px] flex flex-col w-full">
        {/* Inner Card Container */}
        <div className="relative z-10 w-full rounded-2xl sm:rounded-3xl bg-surface border border-stroke p-4 sm:p-5 lg:p-6 flex flex-col justify-between hover-card-border overflow-hidden">
          <div>
            {/* Top Row: Eyebrow "DESCRIPTION" + Status Dot */}
            <div className="flex items-center justify-between relative z-10 mb-1">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-muted font-semibold font-mono">
                DESCRIPTION
              </span>
              <span className="w-2 h-2 rounded-full bg-accent opacity-60" />
            </div>

            {/* Title */}
            <h3 className="mt-1 text-xl sm:text-2xl lg:text-[1.7rem] font-bold tracking-tight text-text-primary uppercase relative z-10">
              {title}
            </h3>

            {/* Body */}
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-[13px] lg:text-sm leading-relaxed text-muted max-w-[44ch] font-normal relative z-10">
              {description}
            </p>
          </div>

          {/* Chevron Indicator Pinned Bottom-Right */}
          <div className="mt-3 sm:mt-4 pt-1 sm:pt-2 flex justify-end relative z-10">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-stroke flex items-center justify-center text-muted">
              <ChevronDown size={15} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const trackRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Cycle role line every 2s
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);

    return () => clearInterval(roleTimer);
  }, []);

  return (
    <section
      ref={trackRef}
      id="hero-track"
      style={{
        height: shouldReduceMotion ? "auto" : "420vh",
        minHeight: shouldReduceMotion ? "auto" : 2600,
      }}
      className="relative"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center justify-center">
        {/* Pinned Scrubbed Laptop Background Behind Hero */}
        <LaptopScrubBackground trackRef={trackRef} contentRef={contentRef} />

        {/* Existing Hero Content (driven by scroll cues) */}
        <div
          ref={contentRef}
          data-hero-content
          className="relative z-10 w-full h-full flex flex-col justify-start lg:justify-center items-center pt-24 sm:pt-28 lg:pt-24 pb-10 sm:pb-14 overflow-y-auto lg:overflow-hidden no-scrollbar"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Main 12-Column Grid Container */}
          <div className="max-w-[1320px] w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-16 xl:pl-28 xl:pr-16 relative z-10 my-auto lg:my-0">
            <div className="grid grid-cols-12 gap-5 sm:gap-6 lg:gap-8 xl:gap-12 items-center w-full">
              {/* Left Column (col-span-12 lg:col-span-6 xl:col-span-5): Eyebrow, Heading, Role line, 2 Buttons */}
              <div className="col-span-12 lg:col-span-6 xl:col-span-5 flex flex-col justify-center text-left">
                {/* Eyebrow with mb-3 sm:mb-4 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: MOTION_EASE }}
                  className="flex items-center gap-2.5 mb-2.5 sm:mb-4"
                >
                  <span className="w-8 h-px bg-stroke" aria-hidden="true" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-muted font-semibold font-mono">
                    OVERVIEW
                  </span>
                </motion.div>

                {/* Heading "WHAT I DO" with staggered letter reveal */}
                <h1 className="font-display italic text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.5rem] leading-[0.92] tracking-tight text-text-primary select-none mb-4 sm:mb-6">
                  <span className="block not-italic font-bold tracking-tight font-body text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-text-primary mb-0.5 sm:mb-1">
                    {"WHAT".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.7,
                          delay: 0.15 + i * 0.05,
                          ease: MOTION_EASE,
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  <span className="block text-accent-gradient">
                    {"I DO".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.35 + i * 0.06,
                          ease: MOTION_EASE,
                        }}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </span>
                </h1>

                {/* Cycling Role Line with mb-5 sm:mb-7 */}
                <motion.div
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.5, ease: MOTION_EASE }}
                  className="flex items-center gap-2 text-xs sm:text-base text-muted mb-5 sm:mb-7 min-h-[1.5rem] sm:min-h-[1.75rem]"
                >
                  <span>Specializing in</span>
                  <span
                    key={roleIndex}
                    className="inline-block font-display italic text-base sm:text-xl text-accent animate-role-fade-in font-normal"
                  >
                    {ROLES[roleIndex]}
                  </span>
                </motion.div>

                {/* Two Rounded-Full CTA Buttons with Magnetic wrapper */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: MOTION_EASE }}
                  className="flex flex-wrap gap-3 sm:gap-3.5 items-center mb-6 lg:mb-0"
                >
                  {/* Solid Primary Button */}
                  <a
                    href="mailto:mohammedjashemofficial564@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold hover-btn-primary focus-visible:outline-none focus-visible:ring-2"
                  >
                    <Mail size={14} />
                    <span>Get in Touch</span>
                  </a>

                  {/* Outlined Secondary Button */}
                  <a
                    href="/resume/Mohammed-Jashem-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold border border-stroke hover-btn-secondary focus-visible:outline-none focus-visible:ring-2"
                  >
                    <Download size={14} />
                    <span>Resume</span>
                  </a>
                </motion.div>
              </div>

              {/* Right Column: DEVELOP & DESIGN Stack */}
              <div className="col-span-12 lg:col-span-6 xl:col-span-6 xl:col-start-7 flex flex-col gap-3.5 sm:gap-4 lg:gap-5 justify-center">
                {CARDS_DATA.map((card, idx) => (
                  <HeroCard
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom-Centre Scroll Indicator (Desktop only to prevent mobile overlap) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: MOTION_EASE }}
            className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 pointer-events-none select-none"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted font-semibold font-mono">
              SCROLL
            </span>
            <div className="w-px h-8 bg-stroke/60 relative overflow-hidden rounded-full">
              <div className="w-full h-3 bg-accent rounded-full animate-scroll-down" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

