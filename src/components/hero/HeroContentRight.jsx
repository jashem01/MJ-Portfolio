"use client";

import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const cards = [
  {
    title: "DEVELOP",
    description: "Building responsive and scalable web applications with React.js, JavaScript, and modern frontend technologies, focused on delivering clean user experiences and high-performance interfaces.",
  },
  {
    title: "DESIGN",
    description: "Exploring design sparked my interest in digital creation. Today, I leverage UI design principles, no-code platforms, and Generative AI tools to build modern, efficient, and user-centric experiences.",
  }
];

import Card3D from "@/components/common/Card3D";

export default function HeroContentRight() {
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 25, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.35 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card3D
            maxTilt={6}
            className="dashed-frame p-5 sm:p-6 md:p-6.5 group relative overflow-hidden"
          >
            {/* Top border corner notches */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40 group-hover:border-[#A194F7] group-hover:shadow-[0_0_8px_#A194F7] transition-all duration-300"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/40 group-hover:border-[#A194F7] group-hover:shadow-[0_0_8px_#A194F7] transition-all duration-300"></div>
            {/* Bottom border corner notches */}
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/40 group-hover:border-[#A194F7] group-hover:shadow-[0_0_8px_#A194F7] transition-all duration-300"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40 group-hover:border-[#A194F7] group-hover:shadow-[0_0_8px_#A194F7] transition-all duration-300"></div>
            
            {/* Module Status Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-[#A194F7] uppercase tracking-[0.25em] font-semibold drop-shadow-[0_0_6px_rgba(161,148,247,0.3)]">
                Description
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A194F7] shadow-[0_0_6px_#A194F7] opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide mb-2 uppercase group-hover:text-[#C4B9FF] transition-colors duration-200">
              {card.title}
            </h3>
            
            <p className="text-xs sm:text-[13px] text-[#9BA1AD] leading-relaxed font-normal group-hover:text-[#E2E1EC] transition-colors duration-200">
              {card.description}
            </p>

            <div className="mt-4 flex justify-end">
              <div className="border border-white/10 p-1.5 rounded-lg bg-white/[0.02] group-hover:border-[#A194F7]/50 group-hover:bg-[#A194F7]/15 group-hover:shadow-[0_0_12px_rgba(161,148,247,0.3)] transition-all duration-200">
                <FiChevronDown className="text-[#9BA1AD] group-hover:text-white group-hover:translate-y-0.5 transition-all duration-200 text-sm" />
              </div>
            </div>
          </Card3D>
        </motion.div>
      ))}
    </div>
  );
}

