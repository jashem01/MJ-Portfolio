"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import WorkspaceScene from "./WorkspaceScene";
import WorkspaceLoadingBar from "./WorkspaceLoadingBar";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const MIN_INTRO_DURATION_MS = 2100; // Sensible minimum duration to experience scene without screen flash
const MAX_SAFETY_TIMEOUT_MS = 5000; // Safety bailout to guarantee progress never hangs
const COMPLETION_HOLD_MS = 600;      // Brief hold of the 100% completed scene before transition
const TRANSITION_DURATION_S = 0.65;  // Cinematic exit transition duration

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const completionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const assetsReadyRef = useRef(false);

  // Synchronize ref for frame loop access
  const handleAssetsLoaded = useCallback(() => {
    assetsReadyRef.current = true;
  }, []);

  useEffect(() => {
    // 1. Session & Reload Check
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const forceIntro = urlParams.get("intro") === "true";
      const skipIntro = urlParams.get("skipIntro") === "true";

      if (skipIntro) {
        setTimeout(() => {
          setShow(false);
          onComplete?.();
        }, 0);
        return;
      }

      // Check if page load was a user refresh
      const navEntries = performance.getEntriesByType?.("navigation");
      const isReload =
        navEntries && navEntries.length > 0
          ? (navEntries[0] as PerformanceNavigationTiming).type === "reload"
          : false;

      if (isReload || forceIntro) {
        sessionStorage.removeItem("portfolio_loaded");
      } else {
        const hasLoaded = sessionStorage.getItem("portfolio_loaded");
        if (hasLoaded === "true") {
          setTimeout(() => {
            setShow(false);
            onComplete?.();
          }, 0);
          return;
        }
      }
    }

    // 2. Preload Essential Assets (Workspace Image & Typing Layers, Video Poster, Fonts)
    const essentialImages = [
      "/images/MJ-character-seated-seamless.png",
      "/images/MJ-head-feathered.png",
      "/images/MJ-hand-left.png",
      "/images/MJ-hand-right.png",
      "/videos/laptop-poster.jpg",
    ];

    let loadedCount = 0;
    const totalAssets = essentialImages.length + 1; // +1 for fonts

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount >= totalAssets) {
        handleAssetsLoaded();
      }
    };

    essentialImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = checkComplete;
      img.onerror = checkComplete; // Fail-safe fallback
    });

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready
        .then(() => checkComplete())
        .catch(() => checkComplete());
    } else {
      checkComplete();
    }

    // 3. Safety Timeout
    safetyTimerRef.current = setTimeout(() => {
      if (!assetsReadyRef.current) {
        handleAssetsLoaded();
      }
    }, MAX_SAFETY_TIMEOUT_MS);

    // 4. Smooth 0% -> 100% Progress Loop using requestAnimationFrame
    const animateProgress = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(elapsed / MIN_INTRO_DURATION_MS, 1);

      // Smooth ease-out cubic curve
      const easedTimeProgress = 1 - Math.pow(1 - rawProgress, 2.4);
      let calculatedVal = Math.floor(easedTimeProgress * 100);

      // Do not allow progress to reach 100% before essential assets are ready
      if (!assetsReadyRef.current && calculatedVal >= 88) {
        calculatedVal = 88;
      }

      setProgress(calculatedVal);

      if (calculatedVal < 100) {
        rafRef.current = requestAnimationFrame(animateProgress);
      } else {
        // Reached 100%
        setProgress(100);
        setIsCompleted(true);

        if (typeof window !== "undefined") {
          sessionStorage.setItem("portfolio_loaded", "true");
        }

        // Brief hold of completed scene before cinematic exit transition
        completionTimerRef.current = setTimeout(() => {
          onComplete?.();
          setShow(false);
        }, COMPLETION_HOLD_MS);
      }
    };

    rafRef.current = requestAnimationFrame(animateProgress);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (completionTimerRef.current) clearTimeout(completionTimerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, [onComplete, handleAssetsLoaded]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="workspace-intro-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: shouldReduceMotion ? 1 : 1.03,
            filter: shouldReduceMotion ? "none" : "blur(4px)",
            transition: {
              duration: TRANSITION_DURATION_S,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100svh",
            minHeight: "100svh",
            backgroundColor: "#000000",
            zIndex: 99999,
          }}
          className="fixed inset-0 z-[99999] bg-[#000000] text-white flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden"
          aria-live="polite"
          aria-label="Developer Workspace Loading Experience"
        >
          {/* Centered Composition: Standalone Avatar & Loading Section as One Centered Unit */}
          <div className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm">
            {/* 1. Standalone Seated 3D Avatar (Reduced to ~60%, Pure Black Background, Zero Card Frame) */}
            <WorkspaceScene isCompleted={isCompleted} />

            {/* 2. Loading Section Directly Underneath with Consistent Vertical Spacing */}
            <div className="w-full mt-3 sm:mt-3.5">
              <WorkspaceLoadingBar progress={progress} isCompleted={isCompleted} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
