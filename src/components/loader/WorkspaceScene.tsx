"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface WorkspaceSceneProps {
  isCompleted?: boolean;
}

export default function WorkspaceScene({ isCompleted }: WorkspaceSceneProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center select-none pointer-events-none flex-shrink-0">
      {/* 
        Slightly Reduced Avatar Size: ~60% of previous size (195px desktop / 135px mobile)
        Guarantees complete seated character, chair, desk, laptop, and shoes are visible without cropping.
      */}
      <div className="relative w-[135px] sm:w-[160px] md:w-[180px] lg:w-[195px] aspect-square flex items-center justify-center overflow-visible">
        {/* Subtle Torso Breathing Movement */}
        <motion.div
          animate={
            shouldReduceMotion
              ? { y: 0 }
              : {
                  y: [0, -1.4, 0],
                  scale: [1, 1.003, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Base Seamless Seated Avatar (Reserved layout space with fill, zero layout shift) */}
          <Image
            src="/images/MJ-character-seated-seamless.png"
            alt="Mohammed Jashem - Seated Developer Workspace"
            fill
            priority
            sizes="(max-width: 640px) 135px, (max-width: 768px) 160px, 195px"
            className="object-contain"
            draggable={false}
          />

          {/* LAYER 1: Animated Head Movement (Natural gentle tilt / focus tracking) */}
          {!shouldReduceMotion && (
            <motion.div
              style={{
                position: "absolute",
                top: "5.4%",
                left: "42.0%",
                width: "18.6%",
                height: "23.9%",
              }}
              animate={{
                y: [0, 0.7, -0.3, 0],
                rotate: [0, 0.6, -0.4, 0],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none"
            >
              <Image
                src="/images/MJ-head-feathered.png"
                alt=""
                fill
                sizes="40px"
                className="object-contain"
                draggable={false}
              />
            </motion.div>
          )}

          {/* LAYER 2: Left Hand Typing Keystrokes (Independent Natural Movement) */}
          {!shouldReduceMotion && (
            <motion.div
              style={{
                position: "absolute",
                top: "45.9%",
                left: "37.1%",
                width: "8.8%",
                height: "7.3%",
                transformOrigin: "bottom right",
              }}
              animate={{
                y: [0, -1.6, 0.3, -1.0, 0],
                rotate: [0, -1.2, 0.5, -0.8, 0],
              }}
              transition={{
                duration: 0.38,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none"
            >
              <Image
                src="/images/MJ-hand-left.png"
                alt=""
                fill
                sizes="25px"
                className="object-contain"
                draggable={false}
              />
            </motion.div>
          )}

          {/* LAYER 3: Right Hand & Wrist Typing Keystrokes (Independent Movement with Smartwatch) */}
          {!shouldReduceMotion && (
            <motion.div
              style={{
                position: "absolute",
                top: "44.9%",
                left: "43.5%",
                width: "11.2%",
                height: "8.3%",
                transformOrigin: "bottom left",
              }}
              animate={{
                y: [0, 0.4, -1.8, 0.3, -1.2, 0],
                rotate: [0, 1.3, -0.8, 0.6, 0],
              }}
              transition={{
                duration: 0.44,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.08,
              }}
              className="pointer-events-none"
            >
              <Image
                src="/images/MJ-hand-right.png"
                alt=""
                fill
                sizes="30px"
                className="object-contain"
                draggable={false}
              />
            </motion.div>
          )}

          {/* LAYER 4: Laptop Screen Illumination & Dynamic Typing Flicker */}
          <motion.div
            animate={
              shouldReduceMotion
                ? { opacity: 0.6 }
                : isCompleted
                ? {
                    opacity: [0.85, 1, 0.85],
                    scale: [1, 1.15, 1],
                  }
                : {
                    opacity: [0.45, 0.8, 0.5, 0.85, 0.45],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : isCompleted
                ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.7, repeat: Infinity, ease: "easeInOut" }
            }
            style={{
              position: "absolute",
              top: "26%",
              left: "20%",
              width: "30%",
              height: "30%",
              borderRadius: "50%",
              background: isCompleted
                ? "radial-gradient(circle, rgba(161, 148, 247, 0.45) 0%, rgba(56, 189, 248, 0.25) 45%, transparent 70%)"
                : "radial-gradient(circle, rgba(56, 189, 248, 0.36) 0%, rgba(14, 165, 233, 0.12) 50%, transparent 70%)",
              mixBlendMode: "screen",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </div>
  );
}
