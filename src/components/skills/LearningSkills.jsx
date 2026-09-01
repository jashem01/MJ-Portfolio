"use client";

import { motion } from "framer-motion";

const exploringTech = [
  { name: "Next.js",  desc: "Full-stack React framework" },
  { name: "Tailwind CSS", desc: "Utility-first CSS framework" },
  { name: "React Three Fiber", desc: "3D graphics with React & Three.js" },
];

export default function LearningSkills() {
  return (
    <div className="dashed-frame p-8 backdrop-blur-sm bg-black/20">
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white"></div>

      <h3 className="text-3xl font-black text-white tracking-wide mb-8 uppercase">
        Exploring New Technologies
      </h3>
      <div className="flex flex-col gap-4">
        {exploringTech.map((tech, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#a194f7]/50 transition-colors cursor-none"
          >
            <div>
              <p className="text-white font-bold text-sm uppercase tracking-wider">{tech.name}</p>
              <p className="text-zinc-500 text-xs mt-1">{tech.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
