"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader/Loader";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/common/Navbar";
import Hero from "@/components/hero/Hero";

// Lazy load all below-the-fold components to improve initial page load speed
const Reveal = dynamic(() => import("@/components/common/Reveal"));
const About = dynamic(() => import("@/components/about/About"), { ssr: false });
const Skills = dynamic(() => import("@/components/skills/Skills"), { ssr: false });
const Experience = dynamic(() => import("@/components/experience/Experience"), { ssr: false });
const Projects = dynamic(() => import("@/components/projects/Projects"), { ssr: false });
const Github = dynamic(() => import("@/components/github/Github"), { ssr: false });
const Contact = dynamic(() => import("@/components/contact/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/Footer"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/cursor/CustomCursor"), { ssr: false });
const BackgroundEffects = dynamic(() => import("@/components/common/BackgroundEffects"), { ssr: false });
const GlowCursor = dynamic(() => import("../components/common/GlowCursor"), { ssr: false });
const Spotlight = dynamic(() => import("@/components/common/Spotlight"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader loading={loading} />

      {!loading && (
        <>
          <Sidebar />
          <Navbar />
          <Hero />
          
          <Reveal>
            <About />
          </Reveal>
          <Reveal>
            <Skills />
          </Reveal>
          <Reveal>
            <Experience />
          </Reveal>
          <Reveal>
            <Projects />
          </Reveal>
          <Reveal>
            <Github />
          </Reveal>
          <Reveal>
            <Contact />
          </Reveal>
          
          <Footer />
          <CustomCursor />
          <BackgroundEffects />
          <GlowCursor />
          <Spotlight />
        </>
      )}
    </>
  );
}