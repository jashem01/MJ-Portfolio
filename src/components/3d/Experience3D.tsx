"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { damp3, dampE } from "maath/easing";
import { sceneStore } from "@/lib/sceneStore";
import LightingAndFog from "./LightingAndFog";
import Starfield from "./Starfield";
import HeroObject from "./HeroObject";

export default function Experience3D() {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetCamRot = useRef(new THREE.Euler(0, 0, 0));

  useFrame((_, delta) => {
    if (!cameraRef.current || !sceneStore.isTabVisible) return;

    const scroll = sceneStore.scrollProgress;

    // Camera keyframes per section
    if (scroll < 0.15) {
      // Hero (0 to 0.15): default perspective
      targetCamPos.current.set(0, 0, 8);
      targetCamRot.current.set(0, 0, 0);
    } else if (scroll >= 0.15 && scroll < 0.35) {
      // About (0.15 to 0.35): camera dollies in ~20%
      targetCamPos.current.set(0.3, -0.1, 6.4);
      targetCamRot.current.set(0.02, 0.04, 0);
    } else if (scroll >= 0.35 && scroll < 0.55) {
      // Skills (0.35 to 0.55): camera pans slightly
      targetCamPos.current.set(-0.4, 0.1, 7.2);
      targetCamRot.current.set(-0.02, -0.04, 0);
    } else {
      // Experience, Work, Contact (0.55 to 1.0): camera tilts
      targetCamPos.current.set(0, 0.5, 7.8);
      targetCamRot.current.set(0.08, -0.04, 0.02);
    }

    if (!sceneStore.isReducedMotion) {
      // Add subtle mouse parallax offset to camera
      const px = sceneStore.pointer.x * 0.25;
      const py = sceneStore.pointer.y * 0.2;
      const currentTarget = targetCamPos.current.clone().add(new THREE.Vector3(px, py, 0));

      damp3(cameraRef.current.position, currentTarget, 0.4, delta);
      dampE(cameraRef.current.rotation, targetCamRot.current, 0.4, delta);
    } else {
      damp3(cameraRef.current.position, targetCamPos.current, 0.4, delta);
      dampE(cameraRef.current.rotation, targetCamRot.current, 0.4, delta);
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 8]}
        fov={40}
        near={0.1}
        far={100}
      />

      {/* Lighting and Fog setup */}
      <LightingAndFog />

      {/* Global Starfield with custom 1500 particles */}
      <Starfield />

      {/* Centerpiece 3D Hero Object with Orbiting Chips */}
      <HeroObject />
    </>
  );
}
