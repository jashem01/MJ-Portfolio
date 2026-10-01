"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function CaseStudyModal({ project, isOpen, onClose, onSelectNext }) {
  if (!project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="dashed-frame relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#08070d] border border-white/15 p-6 sm:p-10 text-white z-10 shadow-2xl"
          >
            {/* L-shaped corner notches */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white z-20"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white z-20"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white z-20"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white z-20"></div>

            {/* Header & Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="text-xs font-mono text-[#a194f7] tracking-widest uppercase">
                  // CASE STUDY ARCHIVE
                </span>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight mt-1 text-white">
                  {project.title}
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/10 mb-8">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08070d] via-transparent to-transparent opacity-60" />
            </div>

            {/* Project Overview Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/10 mb-8 font-mono text-xs">
              <div>
                <span className="text-zinc-500 uppercase block mb-1">ROLE</span>
                <span className="text-white font-semibold">{project.role || "Lead Frontend"}</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase block mb-1">TIMELINE</span>
                <span className="text-white font-semibold">{project.timeline || "3 Weeks"}</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase block mb-1">YEAR</span>
                <span className="text-white font-semibold">{project.year}</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase block mb-1">CATEGORY</span>
                <span className="text-[#a194f7] font-semibold">{project.category}</span>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="mb-8">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-3">
                // TECHNOLOGIES &amp; ARCHITECTURE
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-[#8b7cf6]/10 border border-[#a194f7]/30 text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Problem & Solution */}
            {caseStudy && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    THE PROBLEM
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    THE SOLUTION
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>
            )}

            {/* Key Results / Highlights */}
            {caseStudy?.highlights && (
              <div className="mb-8 p-6 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-xs font-mono text-[#a194f7] uppercase tracking-widest mb-4">
                  // CORE HIGHLIGHTS &amp; METRICS
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {caseStudy.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#a194f7] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons & Next Project */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] border border-white/15 text-xs font-mono hover:bg-white/10 hover:border-white/30 transition-colors"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b7cf6] to-[#c4b8ff] text-black font-semibold text-xs font-mono hover:opacity-90 transition-opacity"
                  >
                    <span>Launch Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>

              {onSelectNext && (
                <button
                  onClick={onSelectNext}
                  className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  <span>NEXT PROJECT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
