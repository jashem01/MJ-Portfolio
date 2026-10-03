"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MOTION_EASE } from "./Reveal";

interface SplitWordsProps {
  text: string;
  className?: string;
  italicWord?: string;
  italicClassName?: string;
  stagger?: number;
  duration?: number;
  scrub?: boolean; // Scroll-scrubbed opacity reveal (e.g. About heading)
}

function ScrubWord({
  word,
  index,
  total,
  containerRef,
  isItalic,
  italicClassName,
}: {
  word: string;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLHeadingElement | null>;
  isItalic: boolean;
  italicClassName?: string;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 40%"],
  });

  const step = 1 / total;
  const start = index * step;
  const end = Math.min(1, start + step * 1.5);
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const y = useTransform(scrollYProgress, [start, end], [6, 0]);

  return (
    <span className="inline-block mr-[0.28em] whitespace-nowrap">
      <motion.span
        style={{ opacity, y }}
        className={`inline-block ${
          isItalic ? (italicClassName || "font-display italic text-accent") : ""
        }`}
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function SplitWords({
  text,
  className = "",
  italicWord,
  italicClassName = "font-display italic text-accent",
  stagger = 0.08,
  duration = 0.85,
  scrub = false,
}: SplitWordsProps) {
  const words = text.split(" ");
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <span className={className}>
        {words.map((w, i) => {
          const isItalic = italicWord && w.toLowerCase().includes(italicWord.toLowerCase());
          return (
            <span
              key={i}
              className={`inline-block mr-[0.28em] ${
                isItalic ? italicClassName : ""
              }`}
            >
              {w}
            </span>
          );
        })}
      </span>
    );
  }

  if (scrub) {
    return (
      <span ref={headingRef} className={className}>
        {words.map((word, i) => {
          const isItalic = italicWord && word.toLowerCase().includes(italicWord.toLowerCase());
          return (
            <ScrubWord
              key={i}
              word={word}
              index={i}
              total={words.length}
              containerRef={headingRef}
              isItalic={!!isItalic}
              italicClassName={italicClassName}
            />
          );
        })}
      </span>
    );
  }

  return (
    <span className={className}>
      {words.map((word, i) => {
        const isItalic = italicWord && word.toLowerCase().includes(italicWord.toLowerCase());
        return (
          <span
            key={i}
            className="inline-block overflow-hidden pb-1 align-bottom mr-[0.28em] whitespace-nowrap"
          >
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration,
                delay: i * stagger,
                ease: MOTION_EASE,
              }}
              className={`inline-block ${
                isItalic ? italicClassName : ""
              }`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
