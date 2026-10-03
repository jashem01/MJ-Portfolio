"use client";

import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import CoreSkills from "./CoreSkills";
import LearningSkills from "./LearningSkills";
import OtherSkills from "./OtherSkills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 md:py-32 relative overflow-hidden rounded-t-[40px] -mt-10 bg-[#07060D]/90 border-t border-stroke/40 z-20 content-visibility-auto"
    >
      {/* Ambient background energy glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="section-container">
        {/* Section Header with Eyebrow and Italic Serif Emphasis */}
        <SectionHeader
          eyebrow="SKILLS"
          titlePrefix="Technologies &"
          emphasizedWord="Tools"
        />

        {/* Bento Grid Layout */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Row 1 — Core (col-span-7) + Exploring (col-span-5) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-7 h-full">
              <CoreSkills />
            </div>
            <div className="lg:col-span-5 h-full">
              <LearningSkills />
            </div>
          </div>

          {/* Row 2 — Other Skills (col-span-12 in two columns) */}
          <div className="w-full">
            <OtherSkills />
          </div>
        </div>
      </div>
    </section>
  );
}
