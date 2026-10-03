"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { damp3, damp } from "maath/easing";
import { sceneStore } from "@/lib/sceneStore";
import OrbitingChips from "./OrbitingChips";

export default function HeroObject() {
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const wireMeshRef = useRef<THREE.Mesh | null>(null);
  const outerRingRef = useRef<THREE.Mesh | null>(null);

  const targetPos = useRef(new THREE.Vector3(1.8, 0.1, -0.6));
  const currentScale = useRef(1.0);
  const targetScale = useRef(1.0);
  const currentOpacity = useRef(1.0);
  const targetOpacity = useRef(1.0);

  useFrame((_, delta) => {
    if (!rootGroupRef.current || !sceneStore.isTabVisible) return;

    const scroll = sceneStore.scrollProgress;

    // Scroll Keyframe Logic
    if (scroll < 0.15) {
      // Hero: Centred behind cards / content, slow rotation
      targetPos.current.set(1.8, 0.1, -0.6);
      targetScale.current = 1.0;
      targetOpacity.current = 1.0;
    } else if (scroll >= 0.15 && scroll < 0.35) {
      // About: Object drifts to the far right and shrinks to 60%
      targetPos.current.set(3.6, -0.3, -1.8);
      targetScale.current = 0.6;
      targetOpacity.current = 0.85;
    } else if (scroll >= 0.35 && scroll < 0.55) {
      // Skills: Object moves left and morphs scale
      targetPos.current.set(-3.2, 0.3, -1.2);
      targetScale.current = 0.85;
      targetOpacity.current = 0.9;
    } else {
      // Experience, Work, Contact: Fades to opacity 0.25 and sits in a corner
      targetPos.current.set(3.2, -2.4, -2.5);
      targetScale.current = 0.45;
      targetOpacity.current = 0.25;
    }

    // Smoothly interpolate position, scale and opacity
    damp3(rootGroupRef.current.position, targetPos.current, 0.35, delta);
    damp(currentScale, "current", targetScale.current, 0.35, delta);
    damp(currentOpacity, "current", targetOpacity.current, 0.35, delta);

    const s = currentScale.current;
    rootGroupRef.current.scale.set(s, s, s);

    // Continuous rotation unless reduced motion
    if (!sceneStore.isReducedMotion) {
      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.y += delta * 0.25;
        coreMeshRef.current.rotation.x += delta * 0.15;
      }
      if (wireMeshRef.current) {
        wireMeshRef.current.rotation.y -= delta * 0.18;
        wireMeshRef.current.rotation.z += delta * 0.12;
      }
      if (outerRingRef.current) {
        outerRingRef.current.rotation.x += delta * 0.1;
        outerRingRef.current.rotation.y -= delta * 0.15;
      }
    }
  });

  return (
    <group ref={rootGroupRef} position={[1.8, 0.1, -0.6]}>
      <Float
        speed={sceneStore.isReducedMotion ? 0 : 2}
        rotationIntensity={sceneStore.isReducedMotion ? 0 : 0.6}
        floatIntensity={sceneStore.isReducedMotion ? 0 : 1.0}
      >
        {/* Core High-Performance Metallic Torus Knot */}
        <mesh ref={coreMeshRef}>
          <torusKnotGeometry args={[1.0, 0.3, 64, 24]} />
          <meshStandardMaterial
            color="#9685FF"
            emissive="#4B3A99"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Outer Accent Wireframe Icosahedron */}
        <mesh ref={wireMeshRef}>
          <icosahedronGeometry args={[1.7, 1]} />
          <meshStandardMaterial
            wireframe
            color="#A194F7"
            emissive="#A194F7"
            emissiveIntensity={0.4}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Orbiting Subtle Ring */}
        <mesh ref={outerRingRef} rotation={[Math.PI / 4, 0, 0]}>
          <ringGeometry args={[2.0, 2.03, 64]} />
          <meshBasicMaterial
            color="#C8C0FF"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Orbiting Skill Chips around the hero object */}
        <OrbitingChips />
      </Float>
    </group>
  );
}
