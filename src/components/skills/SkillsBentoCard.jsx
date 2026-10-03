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
import { Code2 } from "lucide-react";

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
      className={`dashed-frame relative p-5 sm:p-6 rounded-xl bg-[#111116]/60 border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col justify-between group transition-colors duration-200 hover:border-[#A194F7]/40 ${
        skill.colSpan || "col-span-1"
      }`}
    >
      {/* Corner Bracket Notches */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white/60 z-20"></div>
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/60 z-20"></div>
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-white/60 z-20"></div>
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-white/60 z-20"></div>

      {/* Dynamic Cursor Violet Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-200 rounded-xl z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(161, 148, 247, 0.14), transparent 80%)`,
        }}
      />

      <div>
        {/* Card Header: Category & Level Badge */}
        <div className="flex items-center justify-between mb-5 relative z-10">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#9BA1AD]">
            {`// ${skill.category}`}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[#A194F7]">
            {skill.level}
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-center gap-3.5 mb-3 relative z-10">
          <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:text-[#A194F7] group-hover:border-[#A194F7]/50 group-hover:scale-105 transition-all duration-200 shadow-md">
            <IconComponent size={22} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#C4B9FF] transition-colors duration-200">
              {skill.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#9BA1AD] leading-relaxed font-normal mb-5 relative z-10">
          {skill.description}
        </p>
      </div>

      {/* Skill Tags */}
      <div className="pt-3.5 border-t border-white/[0.06] flex flex-wrap gap-1.5 relative z-10">
        {skill.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-white/[0.08] text-[#F1F0F7] group-hover:border-white/20 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
