"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "MRG Engineering",
    role: "Frontend Developer - React.js",
    year: "NOW",
    description: "Developing modern web applications using React.js, building reusable UI components, collaborating on scalable frontend solutions, and improving overall user experience and performance.",
  },
  {
    company: "Open Weaver",
    role: "Web Development Intern",
    year: "2025",
    description: "Built responsive websites using no-code/low-code platforms, worked with AI tools for UI/UX workflows, and delivered client-ready web projects.",
  },
  {
    company: "Accent Techno Soft",
    role: "Web Development Intern",
    year: "2021",
    description: "Worked with HTML, CSS and JavaScript. Participated in web application development and learned frontend development fundamentals.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="section-container relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-20 md:mb-24 flex flex-col items-center select-none">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#a194f7] uppercase tracking-[0.25em] text-xs font-bold block mb-3"
          >
            CAREER PATH
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            My career &amp;{" "}
            <span className="text-gradient-accent">experience</span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Glowing Line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-[#a194f7]/40 to-transparent -translate-x-1/2 hidden lg:block" />
          
          <div className="space-y-12 lg:space-y-20">
            {experiences.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="dashed-frame lg:border-dashed p-6 md:p-8 lg:p-10 backdrop-blur-md bg-black/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 relative group"
              >
                {/* Corner Notches */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>

                {/* Left: Role and Company */}
                <div className="w-full lg:w-[38%] text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#c4b9ff] transition-colors">
                    {item.role}
                  </h3>
                  <p className="text-[#a194f7] font-semibold text-sm md:text-base flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a194f7]" />
                    <span>{item.company}</span>
                  </p>
                </div>

                {/* Center: Year Pill */}
                <div className="w-full lg:w-[20%] flex lg:justify-center items-center relative">
                  <div className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 group-hover:border-[#a194f7]/50 group-hover:bg-[#a194f7]/10 transition-all">
                    <span 
                      className="text-2xl md:text-3xl font-black text-transparent select-none"
                      style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}
                    >
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Right: Description */}
                <div className="w-full lg:w-[42%] text-left text-zinc-300 leading-relaxed text-sm md:text-base border-t lg:border-t-0 pt-4 lg:pt-0 border-white/[0.06]">
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[#a194f7]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      </div>
    </section>
  );
}