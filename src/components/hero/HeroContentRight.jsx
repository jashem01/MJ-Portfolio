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
    <div className="flex flex-col gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="dashed-frame p-8 backdrop-blur-sm bg-black/20"
        >
          {/* Top border corner notches */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white"></div>
          {/* Bottom border corner notches */}
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white"></div>
          
          <h3 className="text-3xl font-black text-white tracking-wide mb-2 uppercase">
            {card.title}
          </h3>
          <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mb-4">Description</p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {card.description}
          </p>

          <div className="mt-6 flex justify-end">
            <div className="border border-white/20 p-2 rounded-sm hover:bg-white/10 transition-colors cursor-none">
              <FiChevronDown className="text-zinc-400" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
