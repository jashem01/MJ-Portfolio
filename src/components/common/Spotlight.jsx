"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Spotlight() {
  // Start off-screen
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);

  // Smooth interpolation
  const springConfig = { damping: 40, stiffness: 300 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMove = (e) => {
      // 225 is half of the 450px size to center it on cursor
      cursorX.set(e.clientX - 225);
      cursorY.set(e.clientY - 225);
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="
      fixed
      pointer-events-none
      z-0
      w-[450px]
      h-[450px]
      rounded-full
      blur-[140px]
      "
      style={{
        left: smoothX,
        top: smoothY,
        background: "radial-gradient(circle, rgba(250, 210, 140, 0.05), transparent 60%)"
      }}
    />
  );
}