"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-[#030303]">
      <div className="section-container text-center relative z-10">
        
        <Reveal>
          <p className="text-[#a194f7] uppercase tracking-[0.25em] text-sm font-bold mb-6">
            WHAT'S NEXT
          </p>
          <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] text-white">
            Let's Work <br />
            <span className="text-gradient-accent">Together.</span>
          </h2>
          <p className="text-zinc-400 mt-12 max-w-2xl mx-auto text-lg leading-relaxed">
            Interested in frontend development, React.js projects, or collaboration opportunities. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          <Reveal delay={0.2}>
            <a href="mailto:mohammedjashemofficial564@gmail.com" className="dashed-frame p-10 block backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors duration-300 group cursor-none">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#a194f7]/50"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#a194f7]/50"></div>
              <FaEnvelope className="text-4xl text-white mb-6 mx-auto group-hover:scale-110 group-hover:text-[#a194f7] transition-all" />
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Email</h3>
              <p className="text-zinc-500 text-sm">connect@mohammedjashem</p>
            </a>
          </Reveal>
          
          <Reveal delay={0.4}>
            <a href="https://www.linkedin.com/in/mohammed-jashem-s-5633b5251" target="_blank" className="dashed-frame p-10 block backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors duration-300 group cursor-none">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#a194f7]/50"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#a194f7]/50"></div>
              <FaLinkedinIn className="text-4xl text-white mb-6 mx-auto group-hover:scale-110 group-hover:text-[#a194f7] transition-all" />
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">LinkedIn</h3>
              <p className="text-zinc-500 text-sm">Mohammed Jashem</p>
            </a>
          </Reveal>
          
          <Reveal delay={0.6}>
            <a href="https://github.com/jashem01" target="_blank" className="dashed-frame p-10 block backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors duration-300 group cursor-none">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#a194f7]/50"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#a194f7]/50"></div>
              <FaGithub className="text-4xl text-white mb-6 mx-auto group-hover:scale-110 group-hover:text-[#a194f7] transition-all" />
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">GitHub</h3>
              <p className="text-zinc-500 text-sm">@jashem01</p>
            </a>
          </Reveal>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a194f7]/10 rounded-full blur-[150px] pointer-events-none -z-10" />
    </section>
  );
}