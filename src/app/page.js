"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader/Loader";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/common/Navbar";
import Hero from "@/components/hero/Hero";

// Lazy load components below hero for optimal performance
const About = dynamic(() => import("@/components/about/About"), { ssr: false });
const Skills = dynamic(() => import("@/components/skills/Skills"), { ssr: false });
const Experience = dynamic(() => import("@/components/experience/Experience"), { ssr: false });
const Projects = dynamic(() => import("@/components/projects/Projects"), { ssr: false });
const Github = dynamic(() => import("@/components/github/Github"), { ssr: false });
const Contact = dynamic(() => import("@/components/contact/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/Footer"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/cursor/CustomCursor"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Loader onComplete={() => setLoading(false)} />

      {!loading && (
        <div className="relative min-h-screen bg-bg text-text-primary selection:bg-accent/30 selection:text-white">
          <Sidebar />
          <Navbar />
          
          <main className="relative z-10 flex flex-col gap-0">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Github />
            <Contact />
          </main>
          
          <Footer />
          <CustomCursor />
        </div>
      )}
    </>
  );
}