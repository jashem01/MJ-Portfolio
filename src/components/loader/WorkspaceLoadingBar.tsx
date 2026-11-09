"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WorkspaceLoadingBarProps {
  progress: number;
  isCompleted: boolean;
}

export default function WorkspaceLoadingBar({
  progress,
  isCompleted,
}: WorkspaceLoadingBarProps) {
  const roundedProgress = Math.min(Math.max(Math.round(progress), 0), 100);

  return (
    <div className="w-full flex flex-col items-center justify-center text-center select-none">
      {/* 1. Loading Percentage (Directly Below Avatar) */}
      <div className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums tracking-tight leading-none">
        {roundedProgress}
        <span className="text-sm sm:text-base text-zinc-500 font-normal ml-0.5">%</span>
      </div>

      {/* 2. Minimal Progress Bar (Directly Below Percentage) */}
      <div
        className="w-40 sm:w-52 md:w-56 h-1 rounded-full bg-zinc-900 border border-zinc-800/80 overflow-hidden relative mt-2 sm:mt-2.5"
        role="progressbar"
        aria-valuenow={roundedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Workspace loading progress"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-accent transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(161,148,247,0.4)]"
          style={{ width: `${roundedProgress}%` }}
        />
      </div>

      {/* 3. Loading Text (Directly Below Progress Bar) */}
      <div className="text-[11px] sm:text-xs text-zinc-400 font-medium tracking-wide mt-2 min-h-[1.25rem] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.span
              key="ready-text"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.25 }}
              className="text-white font-medium"
            >
              Ready to explore?
            </motion.span>
          ) : (
            <motion.span
              key="loading-text"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.25 }}
            >
              Building something awesome...
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
