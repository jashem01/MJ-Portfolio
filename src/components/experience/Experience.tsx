"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { MOTION_EASE } from "@/components/motion/Reveal";

interface ExperienceItem {
  company: string;
  role: string;
  year: string;
  description: string;
  points?: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "MRG Engineering",
    role: "Web Developer — React.js",
    year: "Feb 2026 — Present",
    description:
      "Develop responsive web applications using React.js and JavaScript, with a focus on reusable UI components, responsive interfaces, and user-friendly experiences.",
    points: [
      "Integrating payment and email functionalities into web applications.",
      "Collaborating on frontend and backend solutions to improve functionality, performance, and user experience.",
      "Currently exploring Node.js and MongoDB to expand full-stack development capabilities.",
    ],
  },
  {
    company: "Open Weaver",
    role: "Web Development Intern",
    year: "Jul 2025 — Aug 2025",
    description:
      "Worked on responsive web projects using no-code and low-code development platforms along with Generative UI tools.",
    points: [
      "Explored modern UI/UX and web design workflows.",
      "Contributed to client-ready projects from development and customization through final implementation.",
      "Gained hands-on experience with modern web development and AI-assisted workflows.",
    ],
  },
];

// Reusable Experience Header with masked word reveal and expanding eyebrow lines
function ExperienceHeader() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mb-14 sm:mb-20 text-center select-none flex flex-col items-center">
      {/* Eyebrow badge with outward drawing stroke lines */}
      <div className="flex items-center gap-3 mb-4">
        <motion.span
          initial={shouldReduceMotion ? {} : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: MOTION_EASE }}
          style={{ originX: 1 }}
          className="w-10 sm:w-12 h-px bg-stroke"
          aria-hidden="true"
        />
        <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold font-mono">
          CAREER PATH
        </span>
        <motion.span
          initial={shouldReduceMotion ? {} : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: MOTION_EASE }}
          style={{ originX: 0 }}
          className="w-10 sm:w-12 h-px bg-stroke"
          aria-hidden="true"
        />
      </div>

      {/* Main Heading with Masked Word-by-Word Reveal */}
      <h2
        aria-label="My career & experience"
        className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-tight text-text-primary leading-[1.05] flex flex-wrap justify-center items-center gap-x-3 gap-y-1"
      >
        {["My", "career", "&"].map((word, i) => (
          <span key={word} className="overflow-hidden inline-block py-0.5" aria-hidden="true">
            <motion.span
              initial={shouldReduceMotion ? { opacity: 0 } : { y: "100%" }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { y: "0%" }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.1,
                ease: MOTION_EASE,
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}

        <span className="overflow-hidden inline-block py-0.5" aria-hidden="true">
          <motion.span
            initial={shouldReduceMotion ? { opacity: 0 } : { y: "100%" }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { y: "0%" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.42,
              ease: MOTION_EASE,
            }}
            className="inline-block font-display italic font-normal text-accent-gradient"
          >
            experience
          </motion.span>
        </span>
      </h2>
    </div>
  );
}

function ExperienceCard({
  item,
  index,
  isActive,
  isPassed,
}: {
  item: ExperienceItem;
  index: number;
  isActive: boolean;
  isPassed: boolean;
  isUpcoming: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const isOdd = index % 2 !== 0;

  // Compute depth styles based on activation state
  const targetOpacity = shouldReduceMotion ? 1 : isActive ? 1 : isPassed ? 0.75 : 0.4;
  const targetScale = shouldReduceMotion ? 1 : isActive ? 1 : isPassed ? 0.985 : 0.96;

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: isOdd ? 48 : -48, rotateX: 10 }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, x: 0, rotateX: 0 }
      }
      viewport={{ once: true, margin: "-6%" }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: MOTION_EASE,
      }}
      style={{
        transformOrigin: "center center",
      }}
      animate={{
        opacity: targetOpacity,
        scale: targetScale,
      }}
      className="w-full transition-all duration-500 ease-out"
    >
      <div className="group relative rounded-[32px] sm:rounded-3xl p-[1px]">
        {/* Main Inner Card Container */}
        <div
          className={`relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6 p-6 sm:p-7 md:p-8 rounded-[32px] sm:rounded-3xl border transition-colors duration-300 overflow-hidden ${
            isActive
              ? "bg-surface/95 border-accent/40 shadow-lg"
              : "bg-surface/90 border-stroke"
          }`}
        >
          {/* Left: Role and Company */}
          <div className="w-full lg:w-[32%] text-left relative z-10">
            {/* Role Title with Masked Entrance */}
            <div className="overflow-hidden mb-1.5">
              <motion.h3
                initial={shouldReduceMotion ? {} : { y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: MOTION_EASE }}
                className="text-lg sm:text-xl font-bold text-text-primary"
              >
                {item.role}
              </motion.h3>
            </div>

            {/* Company Line with dot */}
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 + index * 0.1, ease: MOTION_EASE }}
              className="text-accent font-medium text-sm flex items-center gap-2"
            >
              <motion.span
                initial={shouldReduceMotion ? {} : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className={`w-1.5 h-1.5 rounded-full bg-accent ${
                  isActive ? "scale-110" : "opacity-60"
                }`}
              />
              <span>{item.company}</span>
            </motion.p>
          </div>

          {/* Centre: Year Badge */}
          <div className="w-full lg:w-[22%] flex lg:justify-center items-center relative z-10">
            <div className="relative">
              {/* Year Badge Body */}
              <div
                className={`relative px-4 sm:px-5 py-2 rounded-full border overflow-hidden transition-all duration-300 ${
                  isActive
                    ? "border-accent text-white"
                    : "border-stroke bg-bg/50 text-text-primary"
                }`}
              >
                {/* Active Background Fill Layer */}
                <div
                  style={{
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left center",
                  }}
                  className="absolute inset-0 bg-accent/[0.14] transition-transform duration-300 pointer-events-none"
                />

                <span className="relative z-10 font-display italic text-sm sm:text-base md:text-lg tracking-wide font-normal whitespace-nowrap">
                  {item.year}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Description & Bullet Points */}
          <div className="w-full lg:w-[46%] text-left text-muted leading-relaxed text-xs sm:text-sm border-t lg:border-t-0 pt-4 lg:pt-0 border-stroke/60 relative z-10 space-y-3">
            {item.description && (
              <p className="text-text-primary/90 font-normal leading-relaxed">
                {item.description}
              </p>
            )}
            {item.points && item.points.length > 0 && (
              <ul className="space-y-1.5">
                {item.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/70 mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress tied to the entries list
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate active index with useMotionValueEvent: updates ONLY when index changes
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    let nextIndex = 0;
    if (EXPERIENCES.length <= 1) {
      nextIndex = 0;
    } else {
      const step = 1 / EXPERIENCES.length;
      nextIndex = Math.min(Math.floor(latest / step), EXPERIENCES.length - 1);
    }
    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
    }
  });

  // Scale & translation of traveling spine node
  const scaleY = smoothProgress;
  const dotTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="py-24 md:py-32 relative overflow-hidden rounded-t-[40px] -mt-10 bg-[#06050C]/90 border-t border-stroke/40 z-20 content-visibility-auto"
    >
      <div className="section-container relative z-10">
        {/* Custom Masked Header */}
        <ExperienceHeader />

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto mt-6 sm:mt-10">
          {/* Vertical Track & Animated Fill Line (Desktop centered, Mobile left) */}
          <div className="absolute left-6 lg:left-1/2 top-10 bottom-10 w-px bg-stroke/60 -translate-x-1/2 pointer-events-none">
            {/* Background Accent Fill Line */}
            <motion.div
              style={shouldReduceMotion ? { scaleY: 1 } : { scaleY }}
              className="w-full h-full accent-gradient origin-top"
            />

            {/* Traveling Dot */}
            {!shouldReduceMotion && (
              <motion.div
                style={{ top: dotTop }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent z-20"
              />
            )}

            {/* Anchor Nodes for each entry on the spine */}
            {EXPERIENCES.map((_, idx) => {
              const nodeActive = activeIndex === idx;
              const total = EXPERIENCES.length;
              const topPos = total === 1 ? "50%" : idx === 0 ? "25%" : "75%";

              return (
                <div
                  key={idx}
                  style={{ top: topPos }}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  {/* Spine Anchor Dot */}
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: nodeActive ? 1 : 0.6,
                            backgroundColor: nodeActive ? "#A194F7" : "rgba(255, 255, 255, 0.4)",
                          }
                    }
                    transition={{ duration: 0.35 }}
                    className="w-2 h-2 rounded-full pointer-events-none"
                  />
                </div>
              );
            })}
          </div>

          {/* Experience Entries Stack (with left padding on mobile to clear spine) */}
          <div className="space-y-6 sm:space-y-8 pl-10 sm:pl-12 lg:pl-0">
            {EXPERIENCES.map((item, index) => (
              <ExperienceCard
                key={item.company + item.year}
                item={item}
                index={index}
                isActive={activeIndex === index}
                isPassed={activeIndex > index}
                isUpcoming={activeIndex < index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

