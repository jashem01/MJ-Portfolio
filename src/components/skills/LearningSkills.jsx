"use client";

import { motion } from "framer-motion";

const exploringTech = [
  { name: "Next.js", desc: "Full-stack React framework" },
  { name: "Tailwind CSS", desc: "Utility-first CSS framework" },
  { name: "React Three Fiber", desc: "3D graphics with React & Three.js" },
];

export default function LearningSkills() {
  return (
    <div className="dashed-frame p-8 md:p-10 backdrop-blur-md bg-black/40 group relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>

      <div>
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-wide mb-8 uppercase flex items-center gap-3">
          <span>Exploring New Technologies</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#a194f7]" />
        </h3>
        <div className="flex flex-col gap-4">
          {exploringTech.map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[#a194f7]/10 hover:border-[#a194f7]/40 transition-all duration-300 group/item"
            >
              <div>
                <p className="text-white font-bold text-sm uppercase tracking-wider group-hover/item:text-[#c4b9ff] transition-colors">
                  {tech.name}
                </p>
                <p className="text-zinc-400 text-xs mt-1">{tech.desc}</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-white/20 group-hover/item:bg-[#a194f7] group-hover/item:shadow-[0_0_8px_#a194f7] transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

