"use client";

import CoreSkills from "./CoreSkills";
import LearningSkills from "./LearningSkills";
import OtherSkills from "./OtherSkills";

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="section-container">

        {/* Header */}
        <div className="mb-14 select-none">
          <span className="text-[#a194f7] uppercase tracking-[0.25em] text-xs font-bold block mb-3">
            SKILLS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Technologies <span className="text-gradient-accent">&amp; Tools</span>
          </h2>
        </div>

        {/* Row 1 — Core (bars) + Exploring (cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-stretch">
          <CoreSkills />
          <LearningSkills />
        </div>

        {/* Row 2 — Other Skills (bars, full width) */}
        <OtherSkills />

      </div>
    </section>
  );
}