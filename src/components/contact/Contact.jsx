"use client";

import Reveal from "@/components/common/Reveal";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-[#030303]">
      <div className="section-container text-center relative z-10">
        
        <Reveal>
          <span className="text-[#a194f7] uppercase tracking-[0.25em] text-xs font-bold block mb-4">
            WHAT'S NEXT
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] text-white">
            Let's Work <span className="text-gradient-accent">Together.</span>
          </h2>
          <p className="text-zinc-300 mt-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-normal">
            Interested in frontend development, React.js projects, or collaboration opportunities. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 max-w-5xl mx-auto">
          <Reveal delay={0.2}>
            <a 
              href="mailto:mohammedjashemofficial564@gmail.com" 
              className="dashed-frame p-8 md:p-10 block backdrop-blur-md bg-black/40 group relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
              
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 group-hover:border-[#a194f7]/50 group-hover:bg-[#a194f7]/10 group-hover:text-[#a194f7] transition-all duration-300">
                <FaEnvelope size={24} />
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#c4b9ff] transition-colors">
                Email
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm font-mono break-all">
                connect@mohammedjashem
              </p>
            </a>
          </Reveal>
          
          <Reveal delay={0.35}>
            <a 
              href="https://www.linkedin.com/in/mohammed-jashem-s-5633b5251" 
              target="_blank" 
              rel="noopener noreferrer"
              className="dashed-frame p-8 md:p-10 block backdrop-blur-md bg-black/40 group relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
              
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 group-hover:border-[#a194f7]/50 group-hover:bg-[#a194f7]/10 group-hover:text-[#a194f7] transition-all duration-300">
                <FaLinkedinIn size={24} />
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#c4b9ff] transition-colors">
                LinkedIn
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm">
                Mohammed Jashem
              </p>
            </a>
          </Reveal>
          
          <Reveal delay={0.5}>
            <a 
              href="https://github.com/jashem01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="dashed-frame p-8 md:p-10 block backdrop-blur-md bg-black/40 group relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 sm:col-span-2 md:col-span-1"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
              
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 group-hover:border-[#a194f7]/50 group-hover:bg-[#a194f7]/10 group-hover:text-[#a194f7] transition-all duration-300">
                <FaGithub size={24} />
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#c4b9ff] transition-colors">
                GitHub
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm font-mono">
                @jashem01
              </p>
            </a>
          </Reveal>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a194f7]/10 rounded-full blur-[150px] pointer-events-none -z-10" />
    </section>
  );
}