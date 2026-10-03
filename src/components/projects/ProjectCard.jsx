"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index = 0 }) {
  const isFeatured = project.title === "Movie Station";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      whileHover={{
        y: -6,
        boxShadow: isFeatured 
          ? "0 16px 36px -8px rgba(0, 0, 0, 0.7), 0 0 25px rgba(161, 148, 247, 0.15)" 
          : "0 12px 28px -6px rgba(0, 0, 0, 0.6), 0 0 15px rgba(161, 148, 247, 0.1)",
        borderColor: "rgba(161, 148, 247, 0.35)"
      }}
      className={`glass-card p-6 group relative transition-colors duration-200 ${
        isFeatured ? "bg-zinc-900/60" : ""
      }`}
    >
      {/* Subtle glow for featured card */}
      {isFeatured && (
        <div className="absolute inset-0 bg-[#A194F7]/[0.03] rounded-[14px] pointer-events-none" />
      )}

      <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={500}
            className="
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-105
            "
          />
        </div>

        <div>
          {isFeatured && (
            <p className="text-sm font-semibold tracking-widest text-zinc-300 uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Featured Project
            </p>
          )}

          <h3 className="text-3xl font-bold text-white">
            {project.title}
          </h3>

          <p className="text-zinc-400 mt-4 leading-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  px-4
                  py-2
                  rounded-full
                  border
                  border-zinc-800
                  bg-zinc-900/50
                  text-sm
                  text-zinc-300
                "
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={project.demo}
            target="_blank"
            className="
              inline-flex
              items-center
              gap-2
              mt-8
              text-white
              font-medium
              hover:text-zinc-400
              transition-colors
            "
          >
            View Project →
          </a>
        </div>
      </div>
    </motion.div>
  );
}