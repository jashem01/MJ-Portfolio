"use client";

import React from "react";

export default function LightingAndFog() {
  return (
    <>
      <color attach="background" args={["#060609"]} />
      <fog attach="fog" args={["#0a0a0f", 8, 26]} />

      {/* Ambient Light 0.4 */}
      <ambientLight intensity={0.4} color="#C8C0FF" />

      {/* Violet Point Light (Accent) */}
      <pointLight
        position={[3, 2, 4]}
        intensity={2.5}
        color="#A194F7"
        distance={20}
        decay={2}
      />

      {/* Cool Violet / Cyan Rim Light */}
      <directionalLight
        position={[-5, 4, -4]}
        intensity={1.8}
        color="#E0DDFE"
      />

      {/* Secondary Soft Fill */}
      <pointLight
        position={[-3, -2, 2]}
        intensity={1.0}
        color="#7C65F6"
        distance={15}
        decay={2}
      />
    </>
  );
}
