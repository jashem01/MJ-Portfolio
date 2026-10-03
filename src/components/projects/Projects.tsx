"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import projects from "@/data/projects";
import TiltCard from "@/components/motion/TiltCard";
import { MOTION_EASE } from "@/components/motion/Reveal";

function ProjectCard({
  project,
  index,
  total,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
}) {
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
  });

  // Stacking transform: scale 1 to 0.92, opacity 1 to 0.65, rotateX 0 to 4deg
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(smoothProgress, [0, 1], [1, 0.65]);
  const rotateX = useTransform(smoothProgress, [0, 1], [0, 4]);

  // Image internal parallax: y -8% to 8%
  const imageY = useTransform(smoothProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={cardContainerRef}
      className="sticky top-[12vh] sm:top-[14vh] mb-12 sm:mb-16 last:mb-0 w-full"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : {
                scale,
                opacity,
                rotateX,
                transformPerspective: 1000,
              }
        }
        className="w-full origin-top"
      >
        <TiltCard maxTilt={3} className="w-full">
          <div className="rounded-3xl overflow-hidden group relative bg-surface/95 border border-stroke shadow-2xl transition-all duration-300 hover:border-accent/40">
            {/* Accent border glow */}
            <div
              className="absolute inset-[-1.5px] rounded-3xl accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10">
              {/* Left Column: Details & Tech Stack (col-span-5) */}
              <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stroke/60">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    {/* Numbering */}
                    <span className="font-display text-4xl sm:text-5xl text-accent font-normal tracking-tight">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Category Badge */}
                    <span className="text-[10px] font-mono tracking-widest uppercase text-muted px-3.5 py-1.5 rounded-full bg-stroke/40 border border-stroke">
                      Web Project
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-4 group-hover:text-accent-lavender transition-colors duration-200">
                    {project.title}
                  </h3>

                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-8 font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Chips popping in with stagger */}
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-muted/80 mb-3">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIdx) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1 + techIdx * 0.05,
                          ease: MOTION_EASE,
                        }}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-stroke/40 border border-stroke text-text-primary/90 hover:border-accent/40 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Parallax Image Showcase (col-span-7) */}
              <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] md:min-h-[420px] overflow-hidden bg-bg/95">
                {/* Project Screenshot with Parallax */}
                <motion.div
                  style={shouldReduceMotion ? {} : { y: imageY, scale: 1.15 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>

                {/* Halftone Overlay */}
                <div
                  style={{
                    backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "4px 4px",
                  }}
                  className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none z-10"
                />

                {/* Hover Overlay: bg-bg/85 fade-in with animated pill button */}
                <div className="absolute inset-0 bg-bg/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6 z-20">
                  <a
                    href={project.github || project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group/btn inline-flex rounded-full p-[1.5px] animate-gradient-shift accent-gradient shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`View ${project.title}`}
                  >
                    <span className="bg-white text-black font-semibold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 group-hover/btn:scale-105 transition-transform duration-200 shadow-xl">
                      <span>View — </span>
                      <span className="font-display italic text-sm sm:text-base font-normal">
                        {project.title}
                      </span>
                      <ArrowUpRight size={16} className="text-black" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative overflow-hidden rounded-t-[40px] -mt-10 bg-[#08070F]/95 border-t border-stroke/40 z-20 content-visibility-auto"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="section-container">
        {/* Section Header */}
        <SectionHeader
          eyebrow="PORTFOLIO"
          titlePrefix="My"
          emphasizedWord="Work"
        />

        {/* Pinned Stacking Cards Stack */}
        <div className="relative mt-12 sm:mt-16 pb-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
