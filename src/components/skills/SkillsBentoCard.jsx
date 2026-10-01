"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaFigma,
  FaWordpress,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiOpenai,
} from "react-icons/si";
import { Sparkles, Code2, Layers } from "lucide-react";

const ICON_MAP = {
  FaReact: FaReact,
  SiNextdotjs: SiNextdotjs,
  SiJavascript: SiJavascript,
  SiTypescript: SiTypescript,
  SiTailwindcss: SiTailwindcss,
  FaNodeJs: FaNodeJs,
  FaFigma: FaFigma,
  FaWordpress: FaWordpress,
  SiOpenai: SiOpenai,
};

export default function SkillsBentoCard({ skill, index }) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const IconComponent = ICON_MAP[skill.iconName] || Code2;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`dashed-frame relative p-6 sm:p-7 rounded-2xl bg-[#08070d]/60 border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col justify-between group transition-colors duration-300 hover:border-[#a194f7]/40 ${
        skill.colSpan || "col-span-1"
      }`}
    >
      {/* Corner Bracket Notches */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white/70 z-20"></div>
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/70 z-20"></div>
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-white/70 z-20"></div>
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-white/70 z-20"></div>

      {/* Dynamic Cursor Violet Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(161, 148, 247, 0.18), transparent 80%)`,
        }}
      />

      <div>
        {/* Card Header: Category & Level Badge */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">
            // {skill.category}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[#a194f7]">
            {skill.level}
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-center gap-3.5 mb-3 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:text-[#a194f7] group-hover:border-[#a194f7]/50 group-hover:scale-110 transition-all duration-300 shadow-md">
            <IconComponent size={24} />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
              {skill.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal mb-6 relative z-10">
          {skill.description}
        </p>
      </div>

      {/* Skill Tags */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5 relative z-10">
        {skill.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-white/[0.08] text-zinc-300 group-hover:border-white/20 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
