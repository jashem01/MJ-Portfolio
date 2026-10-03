"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { damp } from "maath/easing";
import { sceneStore } from "@/lib/sceneStore";

export default function Starfield() {
  const groupRef = useRef<THREE.Group | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);

  // 600 custom points with violet gradient tint (reduced by 60% for 60fps performance)
  const pointsGeometry = useMemo(() => {
    const count = 600;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#A194F7"), // Accent violet
      new THREE.Color("#C8C0FF"), // Lavender
      new THREE.Color("#7C65F6"), // Deep violet
      new THREE.Color("#B3A7FF"), // Soft violet
    ];

    for (let i = 0; i < count; i++) {
      // Distribute points in a spherical volume
      const radius = 8 + Math.random() * 26;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color variation
      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(col, 3));

    return geom;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || !sceneStore.isTabVisible) return;

    if (!sceneStore.isReducedMotion) {
      // Speed up slightly during Skills section (0.35 to 0.55)
      const scroll = sceneStore.scrollProgress;
      const isSkills = scroll >= 0.35 && scroll <= 0.55;
      const rotationSpeed = isSkills ? 0.08 : 0.03;

      if (pointsRef.current) {
        pointsRef.current.rotation.y += delta * rotationSpeed;
        pointsRef.current.rotation.x += delta * (rotationSpeed * 0.4);
      }

      // Mouse Parallax: rotate group up to 0.05 rad toward pointer
      const targetRotY = sceneStore.pointer.x * 0.05;
      const targetRotX = -sceneStore.pointer.y * 0.05;

      damp(groupRef.current.rotation, "y", targetRotY, 0.25, delta);
      damp(groupRef.current.rotation, "x", targetRotX, 0.25, delta);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Drei Stars background layer */}
      <Stars
        radius={45}
        depth={40}
        count={900}
        factor={3.5}
        saturation={1}
        fade
        speed={sceneStore.isReducedMotion ? 0 : 0.6}
      />

      {/* 1500 custom violet-tinted particles */}
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
