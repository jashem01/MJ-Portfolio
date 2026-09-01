"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import projects from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="section-container relative z-10">
        
        {/* Heading */}
        <div className="mb-24 select-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-white">
              My
            </h2>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-gradient-accent">
              Work
            </h2>
          </motion.div>
        </div>

      </div>

      {/* Horizontal Project Grid */}
      <div className="w-full border-t border-zinc-800/50">
        <div className="flex flex-col lg:flex-row w-full overflow-x-auto pb-12 hide-scrollbar">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, opacity: 0 }}
              whileInView={{ opacity: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="w-full lg:min-w-[600px] lg:w-[45vw] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-zinc-800/50 p-8 md:p-16 relative group"
            >
              
              {/* Number and Title Header */}
              <div className="flex justify-between items-start mb-16 relative">
                {/* Glowing Circle behind Number */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-[#d0c8ff] rounded-full mix-blend-screen blur-xl opacity-60 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                
                <h3 className="text-7xl font-black text-white relative z-10 tracking-tighter">
                  {String(index + 1).padStart(2, '0')}
                </h3>
                <div className="text-right">
                  <h4 className="text-2xl font-bold text-white mb-1">{project.title}</h4>
                  <p className="text-zinc-500 font-medium">Web Project</p>
                </div>
              </div>

              {/* Tools and Description */}
              <div className="mb-12">
                <p className="text-white font-medium text-lg mb-4">Tools and features</p>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md">
                  {project.technologies.join(", ")}
                </p>
              </div>

              {/* Project Screenshot */}
              <div className="relative w-full aspect-video rounded-md overflow-hidden bg-zinc-900 border border-zinc-800/50 group-hover:border-zinc-700 transition-colors duration-500">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}