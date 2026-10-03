"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Card3D({
  children,
  className = "",
  style = {},
  maxTilt = 7,
  scale = 1.015,
  glare = true,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Normalized mouse coordinates (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { damping: 24, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normalizedX = mouseX / width - 0.5;
    const normalizedY = mouseY / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
    glareX.set((mouseX / width) * 100);
    glareY.set((mouseY / height) * 100);
  };

  const handleMouseEnter = () => {
    if (!isTouch) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX: isTouch ? 0 : rotateX,
        rotateY: isTouch ? 0 : rotateY,
        scale: isHovered && !isTouch ? scale : 1,
        ...style,
      }}
      transition={{ scale: { duration: 0.25, ease: "easeOut" } }}
      className={`relative ${className}`}
      {...props}
    >
      {children}

      {/* Dynamic Specular Glare Layer */}
      {glare && !isTouch && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-30"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 320px at ${glareX.get()}% ${glareY.get()}%, rgba(161, 148, 247, 0.14) 0%, rgba(200, 192, 255, 0.05) 40%, transparent 80%)`,
          }}
        />
      )}
    </motion.div>
  );
}
