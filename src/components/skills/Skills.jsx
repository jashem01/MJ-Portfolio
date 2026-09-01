"use client";

import CoreSkills from "./CoreSkills";
import LearningSkills from "./LearningSkills";
import OtherSkills from "./OtherSkills";

export default function Skills() {
  return (
    <section id="skills" className="py-12">
      <div className="section-container">

        {/* Header */}
        <div className="mb-24">
          <p className="text-[#a194f7] uppercase tracking-[0.25em] text-sm font-bold">SKILLS</p>
          <h2 className="text-5xl md:text-7xl font-bold mt-6 tracking-tight text-white">
            Technologies <span className="text-gradient-accent">&amp; Tools</span>
          </h2>
        </div>

        {/* Row 1 — Core (bars) + Exploring (cards) */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <CoreSkills />
          <LearningSkills />
        </div>

        {/* Row 2 — Other Skills (bars, full width) */}
        <OtherSkills />

      </div>
    </section>
  );
}