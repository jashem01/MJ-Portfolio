"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import SectionHeader from "@/components/common/SectionHeader";
import TiltCard from "@/components/motion/TiltCard";
import { MOTION_EASE } from "@/components/motion/Reveal";

const EXPERIENCES = [
  {
    company: "MRG Engineering",
    role: "Frontend Developer - React.js",
    year: "NOW",
    description:
      "Developing modern web applications using React.js, building reusable UI components, collaborating on scalable frontend solutions, and improving overall user experience and performance.",
  },
  {
    company: "Open Weaver",
    role: "Web Development Intern",
    year: "2025",
    description:
      "Built responsive websites using no-code/low-code platforms, worked with AI tools for UI/UX workflows, and delivered client-ready web projects.",
  },
  {
    company: "Accent Techno Soft",
    role: "Web Development Intern",
    year: "2021",
    description:
      "Worked with HTML, CSS and JavaScript. Participated in web application development and learned frontend development fundamentals.",
  },
];

function ExperienceItem({
  item,
  index,
}: {
  item: (typeof EXPERIENCES)[0];
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 85%", "start 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
  });

  const opacity = useTransform(smoothProgress, [0, 1], [0.45, 1]);
  const scale = useTransform(smoothProgress, [0, 1], [0.96, 1]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsActive(true);
      return;
    }

    const unsubscribe = smoothProgress.on("change", (v) => {
      setIsActive(v > 0.4);
    });

    return () => unsubscribe();
  }, [smoothProgress, shouldReduceMotion]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={itemRef}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: isEven ? -50 : 50, rotateX: 12 }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, x: 0, rotateX: 0 }
      }
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: MOTION_EASE,
      }}
      style={shouldReduceMotion ? {} : { opacity, scale }}
      className="w-full"
    >
      <TiltCard maxTilt={3} className="w-full">
        <div
          className={`group relative rounded-[40px] sm:rounded-3xl p-[1px] transition-all duration-500 ${
            isActive
              ? "shadow-[0_0_30px_rgba(161,148,247,0.18)]"
              : "opacity-75"
          }`}
        >
          {/* Accent Gradient Ring Border on Activation / Hover */}
          <div
            className={`absolute inset-[-1.5px] rounded-[40px] sm:rounded-3xl accent-gradient transition-opacity duration-500 blur-[1px] pointer-events-none ${
              isActive ? "opacity-90" : "opacity-0 group-hover:opacity-60"
            }`}
            aria-hidden="true"
          />

          {/* Inner Row Container */}
          <div
            className={`relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 sm:p-7 md:p-8 rounded-[40px] sm:rounded-3xl transition-all duration-300 ${
              isActive
                ? "bg-surface/95 border-accent/40 shadow-lg"
                : "bg-surface/90 border-stroke group-hover:bg-surface"
            } border`}
          >
            {/* Left: Role and Company */}
            <div className="w-full lg:w-[36%] text-left">
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-1.5 group-hover:text-accent-lavender transition-colors duration-200">
                {item.role}
              </h3>
              <p className="text-accent font-medium text-sm flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full bg-accent transition-all duration-300 ${
                    isActive
                      ? "scale-125 shadow-[0_0_8px_#A194F7]"
                      : "opacity-60"
                  }`}
                />
                <span>{item.company}</span>
              </p>
            </div>

            {/* Centre: Year Badge (stroke-only outline that fills on activation) */}
            <div className="w-full lg:w-[20%] flex lg:justify-center items-center">
              <div
                className={`px-5 py-2 rounded-full border transition-all duration-500 ${
                  isActive
                    ? "bg-accent/20 border-accent text-white shadow-[0_0_18px_rgba(161,148,247,0.4)]"
                    : "border-stroke bg-bg/50 text-text-primary group-hover:border-accent/40"
                }`}
              >
                <span className="font-display italic text-lg sm:text-xl tracking-wide font-normal">
                  {item.year}
                </span>
              </div>
            </div>

            {/* Right: Description */}
            <div className="w-full lg:w-[44%] text-left text-muted leading-relaxed text-xs sm:text-sm border-t lg:border-t-0 pt-4 lg:pt-0 border-stroke/60 group-hover:text-text-primary/90 transition-colors duration-200">
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
  });

  const dotTop = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="py-24 md:py-32 relative overflow-hidden rounded-t-[40px] -mt-10 bg-[#06050C]/90 border-t border-stroke/40 z-20 content-visibility-auto"
    >
      {/* Ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="section-container">
        {/* Centred Header */}
        <SectionHeader
          align="center"
          eyebrow="CAREER PATH"
          titlePrefix="My career &"
          emphasizedWord="experience"
        />

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto mt-12 sm:mt-16">
          {/* Vertical Track & Animated Fill Line with Traveling Glowing Dot */}
          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-stroke/60 -translate-x-1/2 hidden lg:block pointer-events-none">
            <motion.div
              style={{ scaleY }}
              className="w-full h-full accent-gradient origin-top shadow-[0_0_10px_rgba(161,148,247,0.5)]"
            />
            {/* Glowing Traveling Dot */}
            <motion.div
              style={{ top: dotTop }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_14px_#A194F7] z-10"
            />
          </div>

          {/* Experience Entries */}
          <div className="space-y-6 sm:space-y-8">
            {EXPERIENCES.map((item, index) => (
              <ExperienceItem
                key={item.company + item.year}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
