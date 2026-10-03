"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max degrees, default 6
  glareOpacity?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  glareOpacity = 0.12,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 280, damping: 28 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // RotateX based on Y offset (-maxTilt to maxTilt)
  const rotateX = useTransform(smoothMouseY, [0, 1], [maxTilt, -maxTilt]);
  // RotateY based on X offset (-maxTilt to maxTilt)
  const rotateY = useTransform(smoothMouseX, [0, 1], [-maxTilt, maxTilt]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {children}

        {/* Dynamic Glare Gradient following cursor */}
        <div
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: `radial-gradient(350px circle at 50% 50%, rgba(200, 192, 255, 0.15), transparent 70%)`,
          }}
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-20"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}

