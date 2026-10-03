"use client";

import dynamic from "next/dynamic";
import React from "react";

const CanvasContainer = dynamic(
  () => import("./CanvasContainer"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(161,148,247,0.08)_0%,_rgba(6,6,9,0.95)_70%)] pointer-events-none" />
    ),
  }
);

export default function Scene3D() {
  return (
    <div
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      <CanvasContainer />
    </div>
  );
}
