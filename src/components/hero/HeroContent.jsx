"use client";

import { motion } from "framer-motion";
import personal from "@/data/personal";
import HeroButtons from "./HeroButtons";
import CurrentRoleCard from "./CurrentRoleCard";

export default function HeroContent() {
  return (
    <div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-zinc-500 uppercase tracking-[0.3em] text-sm mb-4"
      >
        {personal.role}
      </motion.h2>

      <motion.h1 
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl sm:text-6xl md:text-7xl xl:text-[7rem] font-bold leading-[0.95] tracking-tight"
      >
        {personal.name}
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-zinc-400 text-lg max-w-xl mt-6 leading-relaxed"
      >
        {personal.heroDescription}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap gap-3 mt-8"
      >
        {[
          "React.js",
          "Next.js",
          "JavaScript",
          "Node.js",
          "MongoDB",
        ].map((tech, index) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.9 + index * 0.1, ease: "easeOut" }}
            className="
              px-4
              py-2
              rounded-full
              border
              border-zinc-800
              text-sm
              text-zinc-400
            "
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      <HeroButtons />
      <CurrentRoleCard />
    </div>
  );
}