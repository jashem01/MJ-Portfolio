"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import ErrorBoundary from "./ErrorBoundary";
import Experience3D from "./Experience3D";
import { sceneStore } from "@/lib/sceneStore";

function CanvasFallback() {
  return (
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(161,148,247,0.06)_0%,_rgba(6,6,9,0.95)_70%)] pointer-events-none" />
  );
}

export default function CanvasContainer() {
  const [canRender3D, setCanRender3D] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if device is low-powered, mobile, or prefers reduced motion
    const isMobile = window.innerWidth < 768;
    const isLowPower =
      typeof navigator !== "undefined" &&
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency < 4;
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || isLowPower || isReducedMotion) {
      setCanRender3D(false);
      return;
    }

    // Defer 3D Canvas initialization until main thread is idle
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => setCanRender3D(true));
    } else {
      setTimeout(() => setCanRender3D(true), 200);
    }
  }, []);

  if (!canRender3D) {
    return <CanvasFallback />;
  }

  return (
    <ErrorBoundary fallback={<CanvasFallback />}>
      <div
        ref={containerRef}
        className="fixed inset-0 -z-10 w-full h-full pointer-events-none overflow-hidden"
      >
        <Suspense fallback={<CanvasFallback />}>
          <Canvas
            dpr={[1, 1.25]}
            frameloop={sceneStore.isTabVisible ? "always" : "demand"}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: "high-performance",
              stencil: false,
              depth: true,
            }}
            camera={{
              fov: 40,
              position: [0, 0, 8],
            }}
            className="w-full h-full pointer-events-none"
          >
            <Experience3D />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
