"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
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
          <div className="group relative rounded-3xl p-[1px]">
            {/* Inner Card Container */}
            <div className="relative z-10 rounded-3xl bg-surface border border-stroke p-6 sm:p-8 md:p-10 hover-card-border">
              {/* Top Profile Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 mb-7 sm:mb-8">
                <div className="flex items-center gap-4">
                  {/* Avatar with clean static border */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                    <div className="relative z-10 w-full h-full rounded-2xl bg-surface border border-stroke flex items-center justify-center text-text-primary shadow-sm">
                      <FaGithub size={26} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                      jashem01
                    </h3>
                    <p className="text-accent text-xs sm:text-sm font-medium">
                      Frontend Developer
                    </p>
                  </div>
                </div>

                {/* Visit GitHub Button (Clean Primary Button) */}
                <a
                  href="https://github.com/jashem01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover-btn-primary focus-visible:outline-none focus-visible:ring-2 self-start md:self-auto"
                >
                  <span>Visit GitHub</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>

              {/* Bio Paragraph */}
              <p className="text-muted max-w-2xl leading-relaxed text-sm md:text-base font-normal mb-8">
                Passionate about building web applications with React.js
                and continuously exploring Next.js, Tailwind CSS,
                and modern frontend technologies.
              </p>

              {/* Skill Chips (Non-interactive) */}
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

              {/* Three Info Cards (Core Focus / Expertise / Currently) */}
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
                    <div className="p-4 sm:p-5 rounded-2xl border border-stroke bg-surface hover-card-border h-full flex flex-col justify-center">
                      <p className="text-[11px] text-accent uppercase tracking-wider mb-1 font-semibold font-mono">
                        {card.label}
                      </p>
                      <h4 className="text-base sm:text-lg font-bold text-text-primary">
                        {card.value}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
