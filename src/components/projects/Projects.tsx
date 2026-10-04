"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useVelocity,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import projects from "@/data/projects";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { MOTION_EASE } from "@/components/motion/Reveal";

// Desktop Horizontal Project Card Item
function HorizontalProjectCard({
  project,
  index,
  total,
  progress,
  tiltDisabled,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
  progress: any;
  travel: number;
  tiltDisabled: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  // Calculate normalized active center point for this card in scroll progress [0, 1]
  const cardCenter = total > 1 ? index / (total - 1) : 0.5;
  const spread = total > 1 ? 0.85 / (total - 1) : 0.5;
  const pStart = Math.max(0, cardCenter - spread);
  const pEnd = Math.min(1, cardCenter + spread);

  // Focus and Dimming: Opacity (0.55 -> 1 -> 0.55) & Scale (0.96 -> 1 -> 0.96)
  const opacity = useTransform(
    progress,
    [pStart, cardCenter, pEnd],
    [0.55, 1, 0.55]
  );
  const scale = useTransform(
    progress,
    [pStart, cardCenter, pEnd],
    [0.96, 1, 0.96]
  );

  // Parallax translation opposite to track movement (+-4%)
  const imageX = useTransform(
    progress,
    [0, 1],
    index % 2 === 0 ? ["4%", "-4%"] : ["-4%", "4%"]
  );

  return (
    <motion.div
      style={shouldReduceMotion ? {} : { opacity, scale }}
      className="w-[min(1100px,82vw)] flex-shrink-0 transition-transform duration-300"
    >
      <CardContainer
        containerClassName="w-full"
        className="w-full"
        maxTilt={4}
        disabled={tiltDisabled}
      >
        <CardBody className="rounded-3xl group relative bg-surface border border-stroke hover-card-border shadow-xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10 w-full">
            {/* Left Column: Details & Tech Stack (col-span-5) */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stroke/60">
              <div>
                <div className="flex justify-between items-start mb-5 sm:mb-6">
                  {/* Numbering */}
                  <CardItem
                    as="span"
                    translateZ={30}
                    className="font-display text-4xl sm:text-5xl text-accent font-normal tracking-tight inline-block"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </CardItem>

                  {/* Category Badge */}
                  <CardItem
                    as="span"
                    translateZ={40}
                    className="text-[10px] font-mono tracking-widest uppercase text-muted px-3.5 py-1.5 rounded-full bg-stroke/40 border border-stroke inline-block"
                  >
                    Web Project
                  </CardItem>
                </div>

                {/* Title */}
                <CardItem
                  as="h3"
                  translateZ={60}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3 sm:mb-4 group-hover:text-white transition-colors duration-200"
                >
                  {project.title}
                </CardItem>

                {/* Description */}
                <CardItem
                  as="p"
                  translateZ={35}
                  className="text-muted text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 font-normal"
                >
                  {project.description}
                </CardItem>
              </div>

              {/* Tech Stack Chips (Non-interactive) */}
              <div>
                <CardItem
                  as="div"
                  translateZ={20}
                  className="text-[11px] font-mono uppercase tracking-widest text-muted/80 mb-3"
                >
                  Technologies
                </CardItem>

                <CardItem
                  as="div"
                  translateZ={45}
                  className="flex flex-wrap gap-2"
                >
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
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-stroke/40 border border-stroke text-text-primary/90"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </CardItem>
              </div>
            </div>

            {/* Right Column: Parallax Image Showcase (col-span-7) */}
            <CardItem
              as="div"
              translateZ={20}
              className="lg:col-span-7 relative min-h-[260px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[440px] overflow-hidden rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl bg-bg"
            >
              {/* Project Screenshot with Parallax & Slow Zoom */}
              <motion.div
                style={shouldReduceMotion ? {} : { x: imageX, scale: 1.08 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  priority={index === 0}
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

              {/* Hover Overlay: View Project */}
              <div className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 z-20">
                <a
                  href={project.github || project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 hover-btn-primary"
                  aria-label={`View ${project.title}`}
                >
                  <span className="px-6 py-3 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold shadow-lg">
                    <span>View — </span>
                    <span className="font-display italic text-sm sm:text-base font-normal">
                      {project.title}
                    </span>
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </div>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

// Mobile Project Card Item (Native Scroll-Snap row)
function MobileProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <div className="w-[86vw] max-w-[420px] flex-shrink-0 snap-center">
      <div className="w-full">
        <div className="rounded-3xl group relative bg-surface border border-stroke shadow-lg w-full overflow-hidden hover-card-border">
          <div className="flex flex-col">
            {/* Top Image */}
            <div className="relative h-[220px] w-full overflow-hidden bg-bg">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="font-display text-3xl text-accent font-normal tracking-tight">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <span className="text-[10px] font-mono tracking-widest uppercase text-muted px-3 py-1 rounded-full bg-surface/90 border border-stroke">
                  Web Project
                </span>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="p-6 flex flex-col justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {project.title}
                </h3>
                <p className="text-muted text-xs leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-stroke/40 border border-stroke text-text-primary/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={project.github || project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full border border-stroke text-text-primary text-xs font-semibold flex items-center justify-center gap-2 hover-btn-secondary focus-visible:outline-none focus-visible:ring-2"
                aria-label={`View ${project.title}`}
              >
                <span>View Project</span>
                <ArrowUpRight size={14} className="text-accent" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const [isDesktop, setIsDesktop] = useState(false);
  const [travel, setTravel] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [tiltDisabled, setTiltDisabled] = useState(false);

  // Measure track scroll travel and set pinned section height
  const updateMeasurements = useCallback(() => {
    if (typeof window === "undefined") return;
    const desktop = window.innerWidth >= 768;
    setIsDesktop(desktop);

    if (desktop && trackRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const rightPad = window.innerWidth >= 1024 ? 64 : 40;
      const calculatedTravel = Math.max(0, trackWidth - viewportWidth + rightPad);
      setTravel(calculatedTravel);
      setSectionHeight(window.innerHeight + calculatedTravel * 1.0);
    }
  }, []);

  useEffect(() => {
    updateMeasurements();

    const resizeObserver = new ResizeObserver(() => {
      updateMeasurements();
    });

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }
    window.addEventListener("resize", updateMeasurements);

    if (document.fonts) {
      document.fonts.ready.then(updateMeasurements);
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMeasurements);
    };
  }, [updateMeasurements]);

  // Framer Motion Scroll & Spring setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0005,
  });

  // Track horizontal translation with holds at both ends [0..0.08] and [0.92..1.0]
  const x = useTransform(
    smoothProgress,
    [0, 0.08, 0.92, 1],
    [0, 0, -travel, -travel]
  );

  // Monitor scrubbing velocity: disable 3D tilt when velocity exceeds 400px/s
  const xVelocity = useVelocity(x);
  useMotionValueEvent(xVelocity, "change", (latest) => {
    const isFast = Math.abs(latest) > 400;
    if (isFast !== tiltDisabled) {
      setTiltDisabled(isFast);
    }
  });

  // Track active index based on scroll progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const total = projects.length;
    if (total <= 1) return;
    const idx = Math.min(
      total - 1,
      Math.max(0, Math.round(latest * (total - 1)))
    );
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  // Scroll hint opacity: fades out quickly as user scrolls
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  // Mobile scroll handler to update active index indicator
  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.offsetWidth * 0.86;
    const nextIdx = Math.round(scrollLeft / cardWidth);
    if (nextIdx !== mobileActiveIndex && nextIdx >= 0 && nextIdx < projects.length) {
      setMobileActiveIndex(nextIdx);
    }
  };

  // Fallback for prefers-reduced-motion or single project
  if (shouldReduceMotion || projects.length <= 1) {
    return (
      <section
        id="projects"
        className="py-24 md:py-32 relative overflow-hidden rounded-t-[40px] -mt-10 bg-[#08070F]/95 border-t border-stroke/40 z-20"
      >
        <div id="work" className="absolute top-0 pointer-events-none" aria-hidden="true" />
        <div className="section-container">
          <SectionHeader
            eyebrow="PORTFOLIO"
            titlePrefix="My"
            emphasizedWord="Work"
          />
          <div className="relative mt-12 sm:mt-16 space-y-8">
            {projects.map((project, index) => (
              <HorizontalProjectCard
                key={project.title}
                project={project}
                index={index}
                total={projects.length}
                progress={smoothProgress}
                travel={0}
                tiltDisabled={false}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        height: isDesktop && sectionHeight > 0 ? `${sectionHeight}px` : "auto",
      }}
      className="relative bg-[#08070F]/95 rounded-t-[40px] -mt-10 border-t border-stroke/40 z-20"
    >
      {/* Anchor alias for #work */}
      <div id="work" className="absolute top-0 pointer-events-none" aria-hidden="true" />

      {/* Desktop Pinned Horizontal Stage (≥ 768px) */}
      <div className="hidden md:flex sticky top-0 h-[100svh] overflow-hidden flex-col justify-between py-6 lg:py-8 select-none">
        {/* Pinned Section Header */}
        <div className="w-full section-container pt-2">
          <SectionHeader
            eyebrow="PORTFOLIO"
            titlePrefix="My"
            emphasizedWord="Work"
          />
        </div>

        {/* Horizontal Card Track */}
        <div className="relative w-full overflow-hidden my-auto py-2">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-8 lg:gap-12 will-change-transform px-8 md:px-12 lg:px-20 items-center"
          >
            {projects.map((project, index) => (
              <HorizontalProjectCard
                key={project.title}
                project={project}
                index={index}
                total={projects.length}
                progress={smoothProgress}
                travel={travel}
                tiltDisabled={tiltDisabled}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Stage Progress & Counter Bar UI */}
        <div className="w-full section-container pb-2">
          <div className="flex flex-col gap-3">
            {/* 2px Hairline Progress Bar */}
            <div className="relative w-full h-[2px] bg-stroke/60 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full w-full accent-gradient origin-left"
              />
            </div>

            {/* Bottom Controls Row: Counter & Scroll Hint */}
            <div className="flex items-center justify-between text-xs font-mono text-muted tracking-[0.25em]">
              {/* Dynamic Counter */}
              <div className="flex items-center gap-1">
                <span className="text-accent font-semibold">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="opacity-40">/</span>
                <span className="opacity-70">
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              {/* Scroll Hint */}
              <motion.div
                style={{ opacity: scrollHintOpacity }}
                className="flex items-center gap-2 text-muted/80 tracking-widest text-[11px]"
              >
                <span>SCROLL</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                >
                  <ArrowRight size={13} className="text-accent" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Native Horizontal Scroll-Snap Row (< 768px) */}
      <div className="md:hidden py-20">
        <div className="section-container mb-8">
          <SectionHeader
            eyebrow="PORTFOLIO"
            titlePrefix="My"
            emphasizedWord="Work"
          />
        </div>

        {/* Scroll-Snap Track */}
        <div
          onScroll={handleMobileScroll}
          className="flex gap-4 px-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
        >
          {projects.map((project, index) => (
            <MobileProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {projects.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                mobileActiveIndex === idx
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-stroke/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
