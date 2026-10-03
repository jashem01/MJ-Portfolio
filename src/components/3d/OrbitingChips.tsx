"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { sceneStore } from "@/lib/sceneStore";

interface ChipData {
  id: string;
  name: string;
  orbitIndex: number;
  angleOffset: number;
}

const CHIPS: ChipData[] = [
  { id: "js", name: "JavaScript", orbitIndex: 0, angleOffset: 0 },
  { id: "node", name: "Node.js", orbitIndex: 0, angleOffset: Math.PI },
  { id: "react", name: "React.js", orbitIndex: 1, angleOffset: Math.PI / 3 },
  { id: "ui", name: "UI Design", orbitIndex: 1, angleOffset: (4 * Math.PI) / 3 },
  { id: "nocode", name: "No Code", orbitIndex: 2, angleOffset: (2 * Math.PI) / 3 },
  { id: "genai", name: "Generative AI", orbitIndex: 2, angleOffset: (5 * Math.PI) / 3 },
];

const ORBIT_CONFIGS = [
  { rx: 2.8, ry: 2.0, euler: new THREE.Euler(0.4, 0.5, 0.2) },
  { rx: 3.3, ry: 2.3, euler: new THREE.Euler(-0.45, -0.3, 0.5) },
  { rx: 3.7, ry: 2.6, euler: new THREE.Euler(0.55, -0.4, -0.35) },
];

function SingleOrbitChip({
  chip,
  baseAngle,
}: {
  chip: ChipData;
  baseAngle: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<THREE.Group | null>(null);

  const config = ORBIT_CONFIGS[chip.orbitIndex];
  const totalAngle = baseAngle + chip.angleOffset;

  // Elliptical position before tilt
  const localX = config.rx * Math.cos(totalAngle);
  const localY = config.ry * Math.sin(totalAngle);
  const localZ = 0;

  // Apply tilt Euler
  const pos = new THREE.Vector3(localX, localY, localZ).applyEuler(config.euler);

  // Depth-based scaling and opacity (chips in front are z > 0, chips behind z < 0)
  const zNorm = THREE.MathUtils.clamp((pos.z + 3) / 6, 0, 1);
  const depthScale = 0.8 + zNorm * 0.4; // 0.8 to 1.2
  const depthOpacity = 0.45 + zNorm * 0.55; // 0.45 to 1.0

  return (
    <group ref={groupRef} position={[pos.x, pos.y, pos.z]}>
      <Html
        transform
        distanceFactor={11}
        position={[0, 0, 0]}
        style={{
          transition: "all 0.2s ease-out",
          opacity: isHovered ? 1 : depthOpacity,
          transform: `scale(${isHovered ? 1.2 : depthScale})`,
          pointerEvents: "auto",
        }}
      >
        <div
          onMouseEnter={() => {
            setIsHovered(true);
            sceneStore.hoveredChip = chip.name;
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            sceneStore.hoveredChip = null;
          }}
          className={`cursor-pointer select-none rounded-full px-3.5 py-1.5 backdrop-blur-md flex items-center gap-2 border transition-all duration-300 ${
            isHovered
              ? "bg-[#1C1A2E]/95 border-accent text-white shadow-[0_0_18px_rgba(161,148,247,0.6)]"
              : "bg-surface/85 border-stroke/70 text-text-primary/85 shadow-[0_0_10px_rgba(124,101,246,0.15)] hover:border-accent/60"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              isHovered
                ? "bg-accent scale-125 shadow-[0_0_8px_#A194F7]"
                : "bg-accent/60"
            }`}
          />
          <span className="text-[12px] font-mono font-medium tracking-tight whitespace-nowrap">
            {chip.name}
          </span>
        </div>
      </Html>
    </group>
  );
}

export default function OrbitingChips() {
  const angleRef = useRef(0);
  const [currentAngle, setCurrentAngle] = useState(0);

  useFrame((_, delta) => {
    if (!sceneStore.isTabVisible || sceneStore.isMobile) return;

    if (!sceneStore.isReducedMotion) {
      // Orbit speed 0.15 rad/s; slow down to 0.02 on hover
      const speed = sceneStore.hoveredChip ? 0.02 : 0.15;
      angleRef.current += delta * speed;
      setCurrentAngle(angleRef.current);
    }
  });

  const orbitGeometries = React.useMemo(() => {
    return ORBIT_CONFIGS.map((cfg) => {
      const positions = new Float32Array(
        Array.from({ length: 65 }).flatMap((_, i) => {
          const a = (i / 64) * Math.PI * 2;
          return [cfg.rx * Math.cos(a), cfg.ry * Math.sin(a), 0];
        })
      );
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      return geom;
    });
  }, []);

  if (sceneStore.isMobile) return null;

  return (
    <group>
      {/* 3 Elliptical Orbit Rings (Thin visual wire guide) */}
      {ORBIT_CONFIGS.map((cfg, idx) => (
        <group key={idx} rotation={[cfg.euler.x, cfg.euler.y, cfg.euler.z]}>
          <lineLoop geometry={orbitGeometries[idx]}>
            <lineBasicMaterial
              color="#A194F7"
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
            />
          </lineLoop>
        </group>
      ))}

      {/* 6 Skill Chips */}
      {CHIPS.map((chip) => (
        <SingleOrbitChip
          key={chip.id}
          chip={chip}
          baseAngle={currentAngle}
        />
      ))}
    </group>
  );
}
