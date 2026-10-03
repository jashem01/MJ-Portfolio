"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROTATING_WORDS = ["Design", "Create", "Inspire"];
const TOTAL_DURATION_MS = 1200;
const WORD_INTERVAL_MS = 400;
const EXIT_DELAY_MS = 150;

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check sessionStorage to show once per session
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("portfolio_loaded");
      if (hasLoaded === "true") {
        setShow(false);
        onComplete?.();
        return;
      }
    }

    // Word rotation interval
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, WORD_INTERVAL_MS);

    // requestAnimationFrame Counter 000 -> 100 over 1200ms
    const animateCount = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / TOTAL_DURATION_MS, 1);
      
      // Smooth cubic ease out
      const easedProgress = 1 - Math.pow(1 - progress, 2.5);
      const currentVal = Math.floor(easedProgress * 100);
      setCount(currentVal);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animateCount);
      } else {
        setCount(100);
        setTimeout(() => {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("portfolio_loaded", "true");
          }
          setShow(false);
          onComplete?.();
        }, EXIT_DELAY_MS);
      }
    };

    rafRef.current = requestAnimationFrame(animateCount);

    return () => {
      clearInterval(wordTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none overflow-hidden"
          aria-live="polite"
          aria-label="Loading page"
        >
          {/* Subtle Ambient Radial Lights */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(161,148,247,0.12)_0%,rgba(124,101,246,0.03)_50%,transparent_70%)] blur-[140px] pointer-events-none" />

          {/* Top-Left: "Portfolio" Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 relative z-10"
          >
            <span className="w-8 h-px bg-stroke" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted font-semibold">
              Portfolio
            </span>
          </motion.div>

          {/* Centre: Rotating Words ("Design", "Create", "Inspire") */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROTATING_WORDS[wordIndex]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-display italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary/80 tracking-tight text-center px-4"
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Bottom Row: Counter (Bottom-Right) */}
          <div className="flex items-end justify-end w-full relative z-10">
            <div className="text-right">
              <span className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tabular-nums font-normal text-text-primary leading-none tracking-tight">
                {String(count).padStart(3, "0")}
              </span>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50 overflow-hidden z-20">
            <motion.div
              className="h-full accent-gradient origin-left shadow-[0_0_8px_rgba(161,148,247,0.35)]"
              style={{
                width: `${count}%`,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
