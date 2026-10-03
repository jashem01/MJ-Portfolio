"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const SKILL_TAGS = [
  { name: "React.js", initialPosition: [-1.7, 0.7, -0.28], speed: 0.88, delay: 0 },
  { name: "JavaScript", initialPosition: [1.6, 0.9, -0.18], speed: 1.05, delay: 1.2 },
  { name: "UI Design", initialPosition: [0.28, -0.8, -0.4], speed: 0.94, delay: 2.2 },
  { name: "Generative AI", initialPosition: [-0.95, 0.35, -1.05], speed: 0.78, delay: 3.3 },
  { name: "No Code", initialPosition: [1.05, -0.45, -0.92], speed: 0.72, delay: 4.4 },
];

function Laptop({ hovered, mouseX, mouseY }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Floating motion (always active)
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.12;

    // Target rotations
    let targetY = t * 0.2; // Slow auto-rotation by default
    let targetX = 0.2;     // Slight tilt to see the keyboard/screen clearly

    if (hovered) {
      // Map mouseX (-0.5 to 0.5) to a full 360-degree rotation (-Math.PI to Math.PI)
      targetY = mouseX.current * Math.PI * 2;
      // Map mouseY (-0.5 to 0.5) to pitch (-0.1 to 0.7 rad)
      targetX = 0.25 + mouseY.current * Math.PI * 0.35;
    }

    // Smooth transition using linear interpolation (lerp)
    // To prevent sudden "back-spins" when wrapping around, we calculate the shortest path difference
    let diffY = targetY - groupRef.current.rotation.y;
    diffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));

    groupRef.current.rotation.y += diffY * 0.08;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* 1. Base (bottom case) */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[2.4, 0.08, 1.7]} />
        <meshStandardMaterial color="#1c1c20" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 2. Trackpad */}
      <mesh position={[0, -0.015, 0.65]}>
        <boxGeometry args={[0.55, 0.01, 0.35]} />
        <meshStandardMaterial color="#2d2d34" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* 3. Keyboard recess/area */}
      <mesh position={[0, -0.015, 0.05]}>
        <boxGeometry args={[2.2, 0.01, 0.95]} />
        <meshStandardMaterial color="#0c0c0e" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* 4. Keyboard keys block */}
      <mesh position={[0, -0.005, 0.05]}>
        <boxGeometry args={[2.16, 0.01, 0.91]} />
        <meshStandardMaterial color="#1a1a20" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* 5. Screen Hinge */}
      <mesh position={[0, -0.01, -0.825]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 2.2, 16]} />
        <meshStandardMaterial color="#0f0f12" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* 6. Screen Lid Assembly */}
      {/* Open angle of ~108 degrees = 1.88 radians */}
      <group position={[0, -0.01, -0.825]} rotation={[1.88, 0, 0]}>
        {/* Lid Metal Outer Back */}
        <mesh position={[0, 0.8, -0.02]}>
          <boxGeometry args={[2.4, 1.6, 0.04]} />
          <meshStandardMaterial color="#1c1c20" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Screen Bezel (Inner black border) */}
        <mesh position={[0, 0.8, 0.002]}>
          <boxGeometry args={[2.36, 1.56, 0.015]} />
          <meshStandardMaterial color="#0b0b0d" roughness={0.6} />
        </mesh>

        {/* Screen Display (Glowing violet/blue display) */}
        <mesh position={[0, 0.8, 0.012]}>
          <planeGeometry args={[2.26, 1.46]} />
          <meshStandardMaterial
            color="#a194f7"
            emissive="#5a4cb7"
            emissiveIntensity={2.5}
            roughness={0.15}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

function FloatingSkill({ name, initialPosition, speed = 1.0, delay = 0 }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    if (!ref.current) return;

    const xOffset = Math.cos(t * speed * 0.86) * 0.22;
    const yOffset = Math.sin(t * speed * 0.75) * 0.07;
    const zOffset = Math.sin(t * speed * 0.72) * 0.18;

    ref.current.position.x = initialPosition[0] + xOffset;
    ref.current.position.y = initialPosition[1] + yOffset;
    ref.current.position.z = initialPosition[2] + zOffset;
    ref.current.rotation.y = t * 0.18;
  });

  return (
    <group ref={ref}>
      <Html distanceFactor={5.5} center>
        <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-[#111116]/90 backdrop-blur-md text-white text-xs font-semibold tracking-wide whitespace-nowrap shadow-[0_6px_20px_rgba(0,0,0,0.6)] flex items-center gap-2 select-none pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-[#A194F7] shadow-[0_0_8px_#A194F7]"></div>
          {name}
        </div>
      </Html>
    </group>
  );
}

export default function HeroLaptopCanvas({ hovered, mouseX, mouseY }) {
  return (
    <div className="w-full h-full relative z-10">
      <Canvas
        camera={{ position: [0, 0.4, 3.8], fov: 45 }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={2.0} />
        <pointLight position={[-5, 5, -5]} intensity={1.5} color="#a194f7" />
        <spotLight position={[0, -5, 5]} intensity={0.5} />

        <Laptop hovered={hovered} mouseX={mouseX} mouseY={mouseY} />

        {SKILL_TAGS.map((skill) => (
          <FloatingSkill key={skill.name} {...skill} />
        ))}
      </Canvas>
    </div>
  );
}
