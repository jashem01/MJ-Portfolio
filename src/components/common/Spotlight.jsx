"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Spotlight() {
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);

  const springConfig = { damping: 45, stiffness: 280 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMove = (e) => {
      cursorX.set(e.clientX - 225);
      cursorY.set(e.clientY - 225);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 w-[450px] h-[450px] rounded-full blur-[140px] opacity-70"
      style={{
        left: smoothX,
        top: smoothY,
        background: "radial-gradient(circle, rgba(161, 148, 247, 0.08) 0%, rgba(161, 148, 247, 0) 70%)"
      }}
    />
  );
}