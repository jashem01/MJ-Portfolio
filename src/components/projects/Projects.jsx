"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import projects from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative bg-[#030303]/80">
      <div className="section-container relative z-10">
        
        {/* Heading */}
        <div className="mb-14 select-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              My <span className="text-gradient-accent">Work</span>
            </h2>
          </motion.div>
        </div>

        {/* Responsive Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="dashed-frame p-8 md:p-10 backdrop-blur-md bg-black/40 group relative overflow-hidden flex flex-col justify-between"
            >
              {/* Corner Notches */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>

              <div>
                {/* Number and Title Header */}
                <div className="flex justify-between items-start mb-8 relative">
                  {/* Subtle Soft Glow behind Number */}
                  <div className="absolute -top-2 -left-2 w-16 h-16 bg-[#a194f7]/20 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                  
                  <span 
                    className="text-5xl md:text-6xl font-black text-transparent relative z-10 tracking-tighter select-none"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="text-right">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-[#c4b9ff] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#a194f7] text-xs font-semibold uppercase tracking-[0.2em]">
                      Web Project
                    </p>
                  </div>
                </div>

                {/* Description if present */}
                {project.description && (
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>
                )}

                {/* Tools and Description */}
                <div className="mb-8">
                  <p className="text-zinc-400 font-semibold text-xs uppercase tracking-wider mb-3">
                    Tools &amp; Features
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="skill-pill text-xs py-1 px-3">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Screenshot */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 border border-white/10 group-hover:border-[#a194f7]/40 transition-colors duration-500">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}