"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
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
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      <div className="section-container relative z-10">
        
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 select-none">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#a194f7] uppercase tracking-[0.25em] text-xs font-mono font-bold">
                  // 05 ENDORSEMENTS
                </span>
                <span className="h-[1px] w-12 bg-white/20"></span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                Client &amp; Peer <span className="text-gradient-accent">Feedback</span>
              </h2>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
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
                className={`dashed-frame p-8 rounded-2xl bg-[#08070d]/60 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isHighlight
                    ? "border-[#a194f7]/50 shadow-[0_0_30px_rgba(161,148,247,0.15)]"
                    : "border-white/10 hover:border-white/20 opacity-80 hover:opacity-100"
                }`}
              >
                {/* Corner Notches */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white/70"></div>
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/70"></div>
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-white/70"></div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-white/70"></div>

                <div>
                  {/* Top Quote Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono text-[#a194f7] tracking-widest uppercase">
                      // {item.tag}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, rIdx) => (
                        <Star key={rIdx} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    "{item.content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#a194f7]">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {item.name}
                    </h4>
                    <p className="text-[11px] font-mono text-zinc-500">
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
      <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-[#8b7cf6]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
    </section>
  );
}
