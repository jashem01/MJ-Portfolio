"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 28, stiffness: 350, mass: 0.35 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable completely on touch devices / coarse pointers
    if (typeof window !== "undefined") {
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      if (!finePointer) {
        setIsTouchDevice(true);
        return;
      }
      setIsTouchDevice(false);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.tagName?.toLowerCase() === "a" ||
        target.tagName?.toLowerCase() === "button" ||
        target.tagName?.toLowerCase() === "input" ||
        target.tagName?.toLowerCase() === "textarea" ||
        target.closest?.("a") ||
        target.closest?.("button") ||
        target.closest?.('[role="button"]') ||
        target.closest?.(".hero-orbit-pill") ||
        target.closest?.(".dashed-frame") ||
        target.closest?.(".glass-card") ||
        target.closest?.(".skill-pill") ||
        target.closest?.(".group")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
      aria-hidden="true"
    >
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <motion.div
          className="rounded-full border pointer-events-none -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isHovered ? 48 : 30,
            height: isHovered ? 48 : 30,
            borderColor: isHovered ? "rgba(161, 148, 247, 0.85)" : "rgba(161, 148, 247, 0.45)",
            backgroundColor: isHovered ? "rgba(161, 148, 247, 0.12)" : "rgba(161, 148, 247, 0.03)",
            boxShadow: isHovered ? "0 0 20px rgba(161, 148, 247, 0.4)" : "0 0 10px rgba(161, 148, 247, 0.15)",
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          animate={{
            scale: isHovered ? 1.6 : 1,
            backgroundColor: isHovered ? "#A194F7" : "#FFFFFF",
            boxShadow: isHovered ? "0 0 10px #A194F7" : "0 0 8px #FFFFFF",
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </div>
  );
}
