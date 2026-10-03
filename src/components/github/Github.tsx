"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import GradientRingButton from "@/components/common/GradientRingButton";
import TiltCard from "@/components/motion/TiltCard";
import Magnetic from "@/components/motion/Magnetic";
import { MOTION_EASE } from "@/components/motion/Reveal";

const SKILL_PILLS = ["React.js", "JavaScript", "Next.js", "Frontend"];

const HIGHLIGHT_CARDS = [
  { label: "Core Focus", value: "React.js" },
  { label: "Expertise", value: "Frontend" },
  { label: "Currently", value: "Learning Next.js" },
];

export default function Github() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="github"
      className="py-24 md:py-32 relative overflow-hidden rounded-t-[40px] -mt-10 bg-[#07060E]/95 border-t border-stroke/40 z-20 content-visibility-auto"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="section-container">
        {/* Section Header */}
        <SectionHeader
          eyebrow="GITHUB"
          titlePrefix="Open Source &"
          emphasizedWord="Code"
        />

        {/* Main Wide Card with Clip-Path Reveal */}
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
          className="w-full"
        >
          <TiltCard maxTilt={3} className="w-full">
            <div className="group relative rounded-3xl p-[1px] transition-all duration-300 hover:scale-[1.005] hover:-translate-y-1">
              {/* Gradient Ring on Hover */}
              <div
                className="absolute inset-[-1.5px] rounded-3xl accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] pointer-events-none"
                aria-hidden="true"
              />

              {/* Inner Card Container */}
              <div className="relative z-10 rounded-3xl bg-surface/90 border border-stroke p-6 sm:p-8 md:p-10 transition-colors duration-300 group-hover:bg-surface">
                {/* Top Profile Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 mb-7 sm:mb-8">
                  <div className="flex items-center gap-4">
                    {/* Avatar with slowly rotating animated ring */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                      <motion.div
                        animate={
                          shouldReduceMotion
                            ? {}
                            : { rotate: 360 }
                        }
                        transition={{
                          duration: 18,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-[-2px] rounded-2xl accent-gradient opacity-70 blur-[1px]"
                      />
                      <div className="relative z-10 w-full h-full rounded-2xl bg-surface border border-stroke flex items-center justify-center text-text-primary group-hover:text-accent transition-all duration-300 shadow-md">
                        <FaGithub size={26} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight group-hover:text-accent-lavender transition-colors duration-200">
                        jashem01
                      </h3>
                      <p className="text-accent text-xs sm:text-sm font-medium">
                        Frontend Developer
                      </p>
                    </div>
                  </div>

                  {/* Visit GitHub Button with Magnetic pull & Gradient Ring */}
                  <Magnetic maxDistance={25}>
                    <GradientRingButton
                      href="https://github.com/jashem01"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      className="rounded-full self-start md:self-auto"
                      innerClassName="px-6 py-2.5 bg-white text-black font-semibold text-xs sm:text-sm"
                    >
                      <span>Visit GitHub</span>
                      <ArrowUpRight size={16} />
                    </GradientRingButton>
                  </Magnetic>
                </div>

                {/* Bio Paragraph */}
                <p className="text-muted max-w-2xl leading-relaxed text-sm md:text-base font-normal mb-8 group-hover:text-text-primary/90 transition-colors duration-200">
                  Passionate about building web applications with React.js
                  and continuously exploring Next.js, Tailwind CSS,
                  and modern frontend technologies.
                </p>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8 sm:mb-10">
                  {SKILL_PILLS.map((pill) => (
                    <span
                      key={pill}
                      className="px-4 py-1.5 rounded-full text-xs font-medium bg-stroke/40 border border-stroke text-text-primary/90"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                {/* Three Info Cards (Core Focus / Expertise / Currently) with Stagger & TiltCard */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-6 border-t border-stroke/60">
                  {HIGHLIGHT_CARDS.map((card, idx) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.15 + 0.1 * idx,
                        ease: MOTION_EASE,
                      }}
                      className="w-full"
                    >
                      <TiltCard maxTilt={6} className="w-full h-full">
                        <div className="p-4 sm:p-5 rounded-2xl border border-stroke bg-surface/60 hover:border-accent/40 hover:bg-surface hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col justify-center">
                          <p className="text-[11px] text-accent uppercase tracking-wider mb-1 font-semibold font-mono">
                            {card.label}
                          </p>
                          <h4 className="text-base sm:text-lg font-bold text-text-primary">
                            {card.value}
                          </h4>
                        </div>
                      </TiltCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
