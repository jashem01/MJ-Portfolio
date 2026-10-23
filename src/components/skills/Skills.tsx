"use client";

import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import Skills3DCarousel from "./Skills3DCarousel";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 md:py-32 relative overflow-hidden rounded-t-[40px] -mt-10 bg-[#07060D]/90 border-t border-stroke/40 z-20 content-visibility-auto"
    >
      <div className="section-container">
        {/* Section Header with Eyebrow and Italic Serif Emphasis */}
        <SectionHeader
          eyebrow="SKILLS"
          titlePrefix="Technologies &"
          emphasizedWord="Tools"
        />

        {/* 3D Rotating Skill-Card Carousel */}
        <div className="w-full mt-6 md:mt-8">
          <Skills3DCarousel />
        </div>
      </div>
    </section>
  );
}
