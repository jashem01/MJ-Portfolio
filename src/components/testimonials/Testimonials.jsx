"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import testimonials from "@/data/testimonials";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="section-container relative z-10">
        
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 md:mb-14 gap-6 select-none">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#A194F7] uppercase tracking-[0.25em] text-xs font-mono font-bold">
                  {"// ENDORSEMENTS"}
                </span>
                <span className="h-[1px] w-12 bg-white/20"></span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Client &amp; Peer <span className="text-gradient-accent">Feedback</span>
              </h2>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 flex items-center justify-center text-[#9BA1AD] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A194F7]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 flex items-center justify-center text-[#9BA1AD] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A194F7]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Draggable Cards Grid / Slider */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => {
            const isHighlight = index === activeIndex;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveIndex(index)}
                className={`dashed-frame p-6 sm:p-7 rounded-xl bg-[#111116]/60 backdrop-blur-md border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isHighlight
                    ? "border-[#A194F7]/50 shadow-[0_0_25px_rgba(161,148,247,0.12)]"
                    : "border-white/10 hover:border-white/20 opacity-80 hover:opacity-100"
                }`}
              >
                {/* Corner Notches */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white/60"></div>
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/60"></div>
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-white/60"></div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-white/60"></div>

                <div>
                  {/* Top Quote Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono text-[#A194F7] tracking-widest uppercase">
                      {`// ${item.tag}`}
                    </span>
                    <div className="flex items-center gap-1 text-[#A194F7]">
                      {[...Array(item.rating)].map((_, rIdx) => (
                        <Star key={rIdx} className="w-3 h-3 fill-[#A194F7]" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="text-[#9BA1AD] text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#A194F7]">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {item.name}
                    </h4>
                    <p className="text-[11px] font-mono text-[#9BA1AD]">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Ambient Glow */}
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-[#A194F7]/06 rounded-full blur-[140px] pointer-events-none -z-10" />
    </section>
  );
}
