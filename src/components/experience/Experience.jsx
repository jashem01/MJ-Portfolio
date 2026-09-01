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
    <section id="experience" className="py-32 relative">
      <div className="section-container relative z-10">
        
        
        {/* Heading */}
        <div className="text-center mb-32 flex flex-col items-center select-none">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-transparent"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
          >
            My career &
          </motion.h2>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-gradient-accent mt-[-10px]"
          >
            experience
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Glowing Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#a194f7] to-transparent -translate-x-1/2 opacity-50 hidden md:block"></div>
          
          <div className="space-y-24 md:space-y-32">
            {experiences.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-center justify-between w-full relative group"
              >
                {/* Left: Role and Company */}
                <div className="w-full md:w-[40%] md:text-left mb-6 md:mb-0">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.role}</h3>
                  <p className="text-[#a194f7] font-medium text-lg">{item.company}</p>
                </div>

                {/* Center: Year */}
                <div className="w-full md:w-[20%] flex justify-center items-center relative py-8 md:py-0">
                  <h1 
                    className="text-6xl md:text-7xl font-bold text-transparent select-none group-hover:scale-110 transition-transform duration-500 z-10"
                    style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}
                  >
                    {item.year}
                  </h1>
                </div>

                {/* Right: Description */}
                <div className="w-full md:w-[40%] md:text-left text-zinc-400 leading-relaxed text-sm md:text-base">
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