"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import LaptopScrubBackground from "./LaptopScrubBackground";
import GradientRingButton from "@/components/common/GradientRingButton";
import { ChevronDown, Download, Mail } from "lucide-react";
import TiltCard from "@/components/motion/TiltCard";
import Magnetic from "@/components/motion/Magnetic";
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
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mx", `${x}px`);
    cardRef.current.style.setProperty("--my", `${y}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, rotateY: -8 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{
        duration: 1.0,
        delay: 0.35 + index * 0.15,
        ease: MOTION_EASE,
      }}
      className="flex-1 flex flex-col w-full"
    >
      <TiltCard maxTilt={5} className="w-full h-full flex-1 flex flex-col">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="group relative rounded-3xl p-[1px] transition-all duration-300 hover:-translate-y-1 flex-1 flex flex-col h-full"
        >
          {/* Accent Gradient Ring Border on Hover */}
          <div
            className="absolute inset-[-1.5px] rounded-3xl accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Inner Card Container */}
          <div className="relative z-10 h-full w-full rounded-3xl bg-surface/90 border border-stroke p-7 lg:p-8 flex flex-col justify-between transition-colors duration-250 group-hover:bg-surface overflow-hidden">
            {/* Soft Cursor Following Radial Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background:
                  "radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), rgba(161, 148, 247, 0.12), transparent 70%)",
              }}
            />

            <div>
              {/* Top Row: Eyebrow "DESCRIPTION" + Status Dot */}
              <div className="flex items-center justify-between relative z-10">
                <span className="text-xs uppercase tracking-[0.3em] text-muted font-semibold">
                  DESCRIPTION
                </span>
                <span className="w-2 h-2 rounded-full bg-accent opacity-60 group-hover:opacity-100 shadow-[0_0_8px_#A194F7] transition-opacity" />
              </div>

              {/* Title with mt-3: text-3xl font-semibold tracking-tight */}
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary uppercase group-hover:text-accent-lavender transition-colors duration-200 relative z-10">
                {title}
              </h3>

              {/* Body with mt-3: text-[15px] leading-relaxed text-muted max-w-[44ch] */}
              <p className="mt-3 text-[15px] leading-relaxed text-muted max-w-[44ch] font-normal group-hover:text-text-primary/90 transition-colors duration-200 relative z-10">
                {description}
              </p>
            </div>

            {/* Chevron Button Pinned Bottom-Right with mt-auto, 36px circle */}
            <div className="mt-auto pt-6 flex justify-end relative z-10">
              <div className="w-9 h-9 rounded-full border border-stroke flex items-center justify-center text-muted group-hover:text-text-primary group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-200 shadow-sm">
                <ChevronDown
                  size={18}
                  className="group-hover:translate-y-0.5 transition-transform duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
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
          className="relative z-10 w-full h-full flex items-center justify-center pt-28 pb-20 overflow-hidden"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Main 12-Column Grid Container */}
          <div className="max-w-[1320px] w-full mx-auto px-6 md:px-10 lg:px-16 xl:pl-28 xl:pr-16 relative z-10">
            <div className="grid grid-cols-12 gap-6 lg:gap-10 items-center w-full">
              {/* Left Column (col-span-12 lg:col-span-5): Eyebrow, Heading, Role line, 2 Buttons */}
              <div className="col-span-12 lg:col-span-5 flex flex-col justify-center text-left">
                {/* Eyebrow with mb-6 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: MOTION_EASE }}
                  className="flex items-center gap-2.5 mb-6"
                >
                  <span className="w-8 h-px bg-stroke" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted font-semibold">
                    OVERVIEW
                  </span>
                </motion.div>

                {/* Heading "WHAT I DO" with staggered letter reveal */}
                <h1 className="font-display italic text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-9xl leading-[0.9] tracking-tight text-text-primary select-none mb-8">
                  <span className="block not-italic font-bold tracking-tight font-body text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-text-primary mb-1">
                    {"WHAT".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
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
                        initial={{ opacity: 0, y: 40 }}
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

                {/* Cycling Role Line with mb-10 */}
                <motion.div
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.5, ease: MOTION_EASE }}
                  className="flex items-center gap-2 text-base sm:text-lg text-muted mb-10 min-h-[2rem]"
                >
                  <span>Specializing in</span>
                  <span
                    key={roleIndex}
                    className="inline-block font-display italic text-xl sm:text-2xl text-accent animate-role-fade-in font-normal"
                  >
                    {ROLES[roleIndex]}
                  </span>
                </motion.div>

                {/* Two Rounded-Full CTA Buttons with Magnetic wrapper */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: MOTION_EASE }}
                  className="flex flex-wrap gap-4 items-center"
                >
                  {/* Solid Button with Magnetic pull */}
                  <Magnetic maxDistance={30}>
                    <GradientRingButton
                      href="mailto:mohammedjashemofficial564@gmail.com"
                      variant="primary"
                      className="rounded-full"
                      innerClassName="px-7 py-3.5 bg-text-primary text-bg font-semibold group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300"
                    >
                      <Mail size={16} />
                      <span>Get in Touch</span>
                    </GradientRingButton>
                  </Magnetic>

                  {/* Outlined Button with Magnetic pull */}
                  <Magnetic maxDistance={30}>
                    <GradientRingButton
                      href="/resume/Mohammed-Jashem-Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      className="rounded-full"
                      innerClassName="px-7 py-3.5 border-2 border-stroke bg-surface/80 backdrop-blur-sm text-text-primary group-hover:border-transparent transition-colors duration-300"
                    >
                      <Download size={16} />
                      <span>Resume</span>
                    </GradientRingButton>
                  </Magnetic>
                </motion.div>
              </div>

              {/* Right Column (col-span-12 lg:col-span-5 lg:col-start-8): DEVELOP & DESIGN Stack */}
              <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col gap-6 h-full justify-center">
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

          {/* Bottom-Centre Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: MOTION_EASE }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 pointer-events-none select-none"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted font-semibold">
              SCROLL
            </span>
            <div className="w-px h-10 bg-stroke/60 relative overflow-hidden rounded-full">
              <div className="w-full h-3.5 bg-accent rounded-full animate-scroll-down shadow-[0_0_8px_#A194F7]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

