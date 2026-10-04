"use client";

import React from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import HlsVideo from "@/components/common/HlsVideo";
import SplitWords from "@/components/motion/SplitWords";
import { FaEnvelope, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { MOTION_EASE } from "@/components/motion/Reveal";

const CONTACT_CARDS = [
  {
    icon: FaEnvelope,
    title: "Email",
    value: "connect@mohammedjashem",
    href: "mailto:mohammedjashemofficial564@gmail.com",
    target: "_self",
    rel: "",
  },
  {
    icon: FaLinkedinIn,
    title: "LinkedIn",
    value: "Mohammed Jashem",
    href: "https://www.linkedin.com/in/mohammed-jashem-s-5633b5251",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    icon: FaGithub,
    title: "GitHub",
    value: "@jashem01",
    href: "https://github.com/jashem01",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

const MARQUEE_TEXT = "MOHAMMED JASHEM • ".repeat(8);

function VelocityMarquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const skewX = useTransform(smoothVelocity, [-1200, 1200], [-10, 10]);
  const shouldReduceMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) return;
    // Base continuous drift speed
    let moveBy = -0.05 * (delta / 16);
    const velocity = smoothVelocity.get();
    if (velocity) {
      moveBy += (velocity / 1000) * (delta / 16) * -0.8;
    }

    let current = baseX.get() + moveBy;
    if (current <= -50) {
      current = 0;
    } else if (current > 0) {
      current = -50;
    }
    baseX.set(current);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 overflow-hidden pointer-events-none -z-10 select-none opacity-15">
      <motion.div
        style={{ x, skewX }}
        className="flex whitespace-nowrap will-change-transform"
      >
        <span
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase text-transparent px-4 font-normal inline-block"
          style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.7)" }}
        >
          {MARQUEE_TEXT}
        </span>
        <span
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase text-transparent px-4 font-normal inline-block"
          style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.7)" }}
        >
          {MARQUEE_TEXT}
        </span>
      </motion.div>
    </div>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden rounded-t-[40px] -mt-10 bg-[#06060A]/95 border-t border-stroke/40 z-20 content-visibility-auto"
    >
      {/* 1. Flipped HLS Stream Background Video */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="w-full h-full scale-y-[-1]">
          <HlsVideo
            src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        {/* Darkening & Violet Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(161,148,247,0.08)_0%,rgba(6,6,9,0.85)_70%)]" />
      </div>

      {/* 2. Velocity-Driven Skewing Marquee Background */}
      <VelocityMarquee />

      {/* 3. Section Container */}
      <div className="section-container relative z-10 text-center">
        {/* Section Header with Eyebrow and SplitWords */}
        <div className="mb-12 sm:mb-16 md:mb-20 text-center max-w-3xl mx-auto select-none">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <span className="w-8 h-px bg-stroke" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold font-mono">
              WHAT&apos;S NEXT
            </span>
            <span className="w-8 h-px bg-stroke" aria-hidden="true" />
          </div>

          <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-tight text-text-primary leading-[1.05] mb-5">
            <SplitWords
              text="Let's Work Together."
              italicWord="Together."
              italicClassName="font-display italic text-accent font-normal"
            />
          </h2>

          <p className="text-muted text-[15px] sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Interested in frontend development, React.js projects, or collaboration opportunities. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </div>

        {/* Contact Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12 md:mt-14 max-w-5xl mx-auto">
          {CONTACT_CARDS.map((card, index) => {
            const Icon = card.icon;
            const spanClass = index === 2 ? "sm:col-span-2 md:col-span-1" : "";

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                  ease: MOTION_EASE,
                }}
                className={`${spanClass} h-full`}
              >
                <a
                  href={card.href}
                  target={card.target}
                  rel={card.rel}
                  className="group relative block h-full rounded-3xl p-[1px] focus-visible:outline-none focus-visible:ring-2"
                >
                  {/* Inner Card */}
                  <div className="relative z-10 h-full rounded-3xl bg-surface border border-stroke p-6 sm:p-7 md:p-8 flex flex-col items-center justify-center hover-card-border">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface border border-stroke flex items-center justify-center text-muted group-hover:text-text-primary group-hover:border-white/20 group-hover:bg-stroke/50 transition-colors duration-200 mb-5 shadow-sm">
                      <Icon size={22} />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-text-primary mb-1.5 uppercase tracking-wide">
                      {card.title}
                    </h3>

                    <p className="text-muted text-xs sm:text-sm font-mono break-all group-hover:text-text-primary transition-colors duration-200">
                      {card.value}
                    </p>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
