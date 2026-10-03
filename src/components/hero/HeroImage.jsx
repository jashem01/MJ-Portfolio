"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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
  const [isTouch, setIsTouch] = useState(false);

  // Mouse tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const stageRotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const stageRotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
    }

    let animationFrameId;
    const speed = 0.00028;

    const getDimensions = () => {
      if (!containerRef.current) return { radiusX: 230, radiusY: 85 };
      const width = containerRef.current.clientWidth;
      if (width < 450) {
        return { radiusX: 140, radiusY: 55 };
      } else if (width < 768) {
        return { radiusX: 180, radiusY: 65 };
      } else if (width < 1200) {
        return { radiusX: 215, radiusY: 78 };
      }
      return { radiusX: 245, radiusY: 88 };
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
        const y = Math.sin(angle) * radiusY * 0.5;
        const depth = Math.sin(angle); // -1 (back) to +1 (front)
        const scale = 0.85 + ((depth + 1) / 2) * 0.24;
        const opacity = 0.4 + ((depth + 1) / 2) * 0.6;
        const zIndex = 10 + Math.round(depth * 10);

        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y - 25}px, 0) scale(${scale})`;
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

  const handlePointerMove = (e) => {
    if (isTouch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{
        perspective: 1200,
        rotateX: isTouch ? 0 : stageRotateX,
        rotateY: isTouch ? 0 : stageRotateY,
      }}
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
              <div className="font-semibold text-zinc-300">
                &gt; building<span className="hero-screen-cursor"></span>
              </div>
              <div className="text-zinc-400 font-medium">react.js</div>
              <div className="text-zinc-500 text-[11px]">Agentic AI</div>
            </div>
          </div>

          {/* Back Screen Lid */}
          <div className="hero-laptop-face hero-laptop-lid">
            <div className="hero-laptop-lid-logo">
              <div className="w-2.5 h-2.5 rounded-full bg-[#a194f7] shadow-[0_0_8px_#a194f7]" />
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
    </motion.div>
  );
}
