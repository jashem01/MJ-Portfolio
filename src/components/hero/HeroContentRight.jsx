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

export default function HeroContentRight() {
  return (
    <div className="flex flex-col gap-5">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="dashed-frame p-6 md:p-7 backdrop-blur-md bg-black/40 group relative overflow-hidden"
        >
          {/* Refined Top border corner notches */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
          {/* Refined Bottom border corner notches */}
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
          
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-wide mb-1 uppercase group-hover:text-[#c4b9ff] transition-colors">
            {card.title}
          </h3>
          <p className="text-[10px] text-[#a194f7] uppercase tracking-[0.25em] font-semibold mb-3">Description</p>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-normal">
            {card.description}
          </p>

          <div className="mt-5 flex justify-end">
            <div className="border border-white/15 p-1.5 rounded bg-white/[0.02] group-hover:border-[#a194f7]/50 group-hover:bg-[#a194f7]/10 transition-all">
              <FiChevronDown className="text-zinc-400 group-hover:text-white group-hover:translate-y-0.5 transition-all text-sm" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

