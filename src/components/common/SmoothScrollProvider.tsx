"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sceneStore } from "@/lib/sceneStore";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check reduced motion & mobile
    const checkMedia = () => {
      sceneStore.isReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      sceneStore.isMobile = window.innerWidth < 768;
    };
    checkMedia();
    window.addEventListener("resize", checkMedia, { passive: true });

    // Track tab visibility
    const handleVisibilityChange = () => {
      sceneStore.isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Track normalized pointer for 3D parallax
    const handlePointerMove = (e: MouseEvent) => {
      sceneStore.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      sceneStore.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    if (sceneStore.isReducedMotion) {
      const handleNativeScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        sceneStore.scrollProgress = total > 0 ? window.scrollY / total : 0;
      };
      window.addEventListener("scroll", handleNativeScroll, { passive: true });
      return () => {
        window.removeEventListener("resize", checkMedia);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("scroll", handleNativeScroll);
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      // Sync Lenis scroll with GSAP ScrollTrigger & sceneStore
      lenis.on("scroll", (e: { progress: number }) => {
        ScrollTrigger.update();
        sceneStore.scrollProgress = e.progress ?? 0;
      });

      const updateTicker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      // Handle in-page anchor links smoothly
      const handleAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest("a");
        if (!target) return;
        const href = target.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          const element = document.querySelector(href);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element as HTMLElement, { offset: -70 });
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);

      return () => {
        gsap.ticker.remove(updateTicker);
        document.removeEventListener("click", handleAnchorClick);
        lenis.destroy();
        lenisRef.current = null;
      };
    });

    return () => {
      ctx.revert();
      window.removeEventListener("resize", checkMedia);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, []);

  return <>{children}</>;
}
