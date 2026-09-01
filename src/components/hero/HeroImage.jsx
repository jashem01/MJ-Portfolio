"use client";

import React, { useEffect, useRef } from "react";

const SKILLS = [
  "JavaScript",
  "React.js",
  "Generative AI",
  "No Code",
  "UI Design",
  "Node.js",
];

export default function HeroImage() {
  const containerRef = useRef(null);
  const pillRefs = useRef([]);

  useEffect(() => {
    let animationFrameId;
    const speed = 0.00022;

    const getDimensions = () => {
      if (!containerRef.current) return { radiusX: 390, radiusY: 110 };
      const width = containerRef.current.clientWidth;
      if (width < 500) {
        return { radiusX: 180, radiusY: 65 };
      } else if (width < 768) {
        return { radiusX: 240, radiusY: 80 };
      } else if (width < 1200) {
        return { radiusX: 320, radiusY: 95 };
      }
      return { radiusX: 390, radiusY: 110 };
    };

    let { radiusX, radiusY } = getDimensions();

    const handleResize = () => {
      const dims = getDimensions();
      radiusX = dims.radiusX;
      radiusY = dims.radiusY;
    };

    window.addEventListener("resize", handleResize);

    const animate = (time) => {
      pillRefs.current.forEach((el, i) => {
        if (!el) return;
        const offset = i * ((Math.PI * 2) / SKILLS.length);
        const angle = time * speed + offset;
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY * 0.45;
        const depth = Math.sin(angle); // -1 (back) to +1 (front)
        const scale = 0.85 + ((depth + 1) / 2) * 0.28;
        const opacity = 0.5 + ((depth + 1) / 2) * 0.5;
        const zIndex = 10 + Math.round(depth * 10);

        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y - 35}px, 0) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-stage w-full h-full relative flex items-center justify-center select-none"
    >
      {/* Ambient background glow & rings */}
      <div className="hero-ambient-ring" />
      <div className="hero-ambient-ring r2" />
      <div className="hero-ambient-glow" />

      {/* 3D Wireframe Glowing Laptop */}
      <div className="hero-object-wrap">
        <div className="hero-3d-laptop">
          {/* Front Screen Display */}
          <div className="hero-laptop-face hero-laptop-screen">
            <div className="hero-screen-inner">
              <div>
                &gt; building<span className="hero-screen-cursor"></span>
              </div>
              <div className="text-zinc-400 font-medium">react.js</div>
              <div className="text-zinc-500">Agentic AI</div>
            </div>
          </div>

          {/* Back Screen Lid (prevents backwards mirror artifact) */}
          <div className="hero-laptop-face hero-laptop-lid">
            <div className="hero-laptop-lid-logo">
              <div className="w-2.5 h-2.5 rounded-full bg-[#a99bff] shadow-[0_0_8px_#a99bff]" />
            </div>
          </div>

          {/* Laptop Hinge */}
          <div className="hero-laptop-face hero-laptop-hinge"></div>

          {/* Laptop Base */}
          <div className="hero-laptop-face hero-laptop-base"></div>

          {/* Laptop Sides */}
          <div className="hero-laptop-face hero-laptop-side left"></div>
          <div className="hero-laptop-face hero-laptop-side right"></div>
        </div>
      </div>

      {/* Orbiting Skill Pills */}
      <div className="absolute inset-0 pointer-events-none">
        {SKILLS.map((skill, index) => (
          <div
            key={skill}
            ref={(el) => (pillRefs.current[index] = el)}
            className="hero-orbit-pill pointer-events-auto cursor-pointer"
          >
            <span className="dot" />
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}