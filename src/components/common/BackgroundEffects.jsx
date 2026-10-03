"use client";

import { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* Perspective 3D Grid Plane at Top */}
      <div 
        className="absolute top-0 inset-x-0 h-[480px] opacity-[0.14] [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(161, 148, 247, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(161, 148, 247, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          transform: "perspective(800px) rotateX(60deg) translateY(-80px)",
          transformOrigin: "top center",
        }}
      />

      {/* Perspective 3D Grid Plane at Bottom */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[480px] opacity-[0.12] [mask-image:linear-gradient(to_top,black_0%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(161, 148, 247, 0.22) 1px, transparent 1px),
            linear-gradient(to top, rgba(161, 148, 247, 0.22) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          transform: "perspective(800px) rotateX(-60deg) translateY(80px)",
          transformOrigin: "bottom center",
        }}
      />

      {/* Ambient Radial Energy Nebulas */}
      <div className="absolute -top-[10%] left-[15%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(161,148,247,0.1)_0%,rgba(161,148,247,0.02)_50%,transparent_75%)] blur-[120px] animate-pulse" style={{ animationDuration: "9s" }} />
      <div className="absolute top-[40%] -right-[10%] w-[580px] h-[580px] rounded-full bg-[radial-gradient(circle,rgba(124,101,246,0.08)_0%,rgba(161,148,247,0.02)_50%,transparent_75%)] blur-[130px] animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-[10%] left-[5%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(161,148,247,0.07)_0%,transparent_70%)] blur-[110px]" />

      {/* Floating Spatial Micro-Nodes */}
      <div className="absolute top-[22%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#A194F7]/40 shadow-[0_0_12px_#A194F7] animate-float" style={{ animationDuration: "7s" }} />
      <div className="absolute top-[38%] right-[18%] w-1 h-1 rounded-full bg-[#C8C0FF]/50 shadow-[0_0_8px_#C8C0FF] animate-float" style={{ animationDuration: "10s", animationDelay: "2s" }} />
      <div className="absolute top-[65%] left-[24%] w-1.5 h-1.5 rounded-full bg-[#A194F7]/30 shadow-[0_0_10px_#A194F7] animate-float" style={{ animationDuration: "8.5s", animationDelay: "1s" }} />
      <div className="absolute top-[82%] right-[28%] w-1 h-1 rounded-full bg-[#C4B9FF]/40 shadow-[0_0_8px_#C4B9FF] animate-float" style={{ animationDuration: "11s", animationDelay: "3s" }} />
    </div>
  );
}