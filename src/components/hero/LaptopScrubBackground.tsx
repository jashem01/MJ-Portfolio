"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

interface LaptopScrubBackgroundProps {
  trackRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

// Smoothstep cubic interpolation
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function ramp(p: number, a: number, b: number): number {
  if (b <= a) return p >= b ? 1 : 0;
  const t = Math.min(Math.max((p - a) / (b - a), 0), 1);
  return smoothstep(t);
}

// Inline noise grain SVG data URI
const GRAIN_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

export default function LaptopScrubBackground({
  trackRef,
  contentRef,
}: LaptopScrubBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const screenRectRef = useRef<HTMLDivElement | null>(null);
  const screenContentRef = useRef<HTMLDivElement | null>(null);
  const dimLayerRef = useRef<HTMLDivElement | null>(null);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  // Video scrub loop state (pure refs for 60fps zero-react-render scrubbing)
  const engineRef = useRef({
    progress: 0,
    seekTo: 0,
    seekAt: 0,
    duration: 0,
    ready: false,
    rafId: 0,
    blobUrl: "",
    isIntersecting: true,
  });

  // 1. Cover-Fit Calculation for Screen Rect Positioning
  const updateScreenRect = useCallback(() => {
    if (typeof window === "undefined" || !screenRectRef.current) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Source video aspect is 1280 x 720 (16:9)
    const naturalW = 1280;
    const naturalH = 720;
    const scale = Math.max(vw / naturalW, vh / naturalH);
    const renderedW = naturalW * scale;
    const renderedH = naturalH * scale;
    const offsetX = (vw - renderedW) / 2;
    const offsetY = (vh - renderedH) / 2;

    // Laptop screen area within 1280x720 video:
    // Top ~18%, Left ~26%, Width ~48%, Height ~48%
    const screenTop = offsetY + renderedH * 0.175;
    const screenLeft = offsetX + renderedW * 0.258;
    const screenWidth = renderedW * 0.484;
    const screenHeight = renderedH * 0.482;

    const el = screenRectRef.current;
    el.style.setProperty("--screen-top", `${screenTop}px`);
    el.style.setProperty("--screen-left", `${screenLeft}px`);
    el.style.setProperty("--screen-width", `${screenWidth}px`);
    el.style.setProperty("--screen-height", `${screenHeight}px`);
  }, []);

  // 2. Video Scrub Loop & Scroll Paint
  useEffect(() => {
    // Check reduced motion & hardware capability
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = typeof navigator !== "undefined" && (navigator.hardwareConcurrency || 4) < 4;

    if (reduceMotion || lowPower) {
      setIsSupported(false);
      return;
    }

    const video = videoRef.current;
    const track = trackRef.current;
    if (!video || !track) return;

    let isAborted = false;
    let fallbackTimeout: NodeJS.Timeout;
    let safetyTimeout: NodeJS.Timeout;

    // Pick source according to viewport width
    const isMobile = window.innerWidth < 768;
    const videoUrl = isMobile ? "/videos/laptop-scrub-sm.mp4" : "/videos/laptop-scrub.mp4";

    // Initialize screen rect
    updateScreenRect();
    window.addEventListener("resize", updateScreenRect, { passive: true });

    // Cues painting function
    const paintCues = (p: number) => {
      // 1. Hero Content Cue: [0.00, 0.00, 0.08, 0.28]
      if (contentRef.current) {
        const heroRamp = ramp(p, 0.08, 0.28);
        const heroOpacity = 1 - heroRamp;
        const heroTranslateY = -22 * heroRamp;
        contentRef.current.style.opacity = heroOpacity.toFixed(3);
        contentRef.current.style.transform = `translateY(${heroTranslateY.toFixed(2)}px)`;
        contentRef.current.style.pointerEvents = heroOpacity > 0.6 ? "auto" : "none";
      }

      // 2. Dim Layer: 0.55 at progress 0 -> 0 at progress 0.30
      if (dimLayerRef.current) {
        const dimRamp = ramp(p, 0.00, 0.30);
        const dimOpacity = (0.55 * (1 - dimRamp)).toFixed(3);
        dimLayerRef.current.style.opacity = dimOpacity;
      }

      // 3. Screen Text Panel: [0.72, 0.85, 1.10, 1.20]
      if (screenContentRef.current) {
        const enter = ramp(p, 0.72, 0.85);
        const leave = ramp(p, 1.10, 1.20);
        const panelOpacity = enter * (1 - leave);
        const panelTranslateY = (1 - enter) * 22 - leave * 22;
        screenContentRef.current.style.opacity = panelOpacity.toFixed(3);
        screenContentRef.current.style.transform = `translateY(${panelTranslateY.toFixed(2)}px)`;
        screenContentRef.current.style.pointerEvents = panelOpacity > 0.6 ? "auto" : "none";
      }
    };

    // Frame update in requestAnimationFrame
    const frame = () => {
      const state = engineRef.current;
      if (!state.isIntersecting || document.hidden) {
        state.rafId = requestAnimationFrame(frame);
        return;
      }

      // Compute scroll progress strictly within track
      const trackRect = track.getBoundingClientRect();
      const trackScrollable = track.offsetHeight - window.innerHeight;
      let p = 0;
      if (trackScrollable > 0) {
        p = Math.min(Math.max(-trackRect.top / trackScrollable, 0), 1);
      }
      state.progress = p;
      state.seekTo = p * state.duration;

      // Smooth seek interpolation
      if (state.ready && state.duration > 0 && Math.abs(state.seekTo - state.seekAt) > 0.0008) {
        state.seekAt += (state.seekTo - state.seekAt) * 0.115;
        if (video.readyState >= 2 && !video.seeking) {
          try {
            video.currentTime = state.seekAt;
          } catch {
            // Ignore background seek race errors
          }
        }
      }

      paintCues(p);
      state.rafId = requestAnimationFrame(frame);
    };

    // Video ready handlers
    const onLoadedMetadata = () => {
      if (isAborted) return;
      engineRef.current.duration = video.duration || 8;
      engineRef.current.ready = true;
      setIsVideoReady(true);
      paintCues(engineRef.current.progress);
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("loadeddata", onLoadedMetadata);
    video.addEventListener("canplaythrough", onLoadedMetadata);

    // Fetch as Blob with buffered loading
    const loadVideoBlob = async () => {
      try {
        const res = await fetch(videoUrl);
        if (!res.ok) throw new Error("Fetch failed");
        const blob = await res.blob();
        if (isAborted) return;

        const blobUrl = URL.createObjectURL(blob);
        engineRef.current.blobUrl = blobUrl;
        video.src = blobUrl;
        video.load();
      } catch {
        if (isAborted) return;
        // Direct fallback URL
        video.src = videoUrl;
        video.load();
      }
    };

    loadVideoBlob();

    // 15s Bail timer: fallback stream URL if blob hangs
    fallbackTimeout = setTimeout(() => {
      if (!engineRef.current.ready && video && !isAborted) {
        video.src = videoUrl;
        video.load();
      }
    }, 15000);

    // 12s Safety timer to ensure page interactivity
    safetyTimeout = setTimeout(() => {
      if (!isVideoReady && !isAborted) {
        setIsVideoReady(true);
      }
    }, 12000);

    // IntersectionObserver to pause RAF loop when track is off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          engineRef.current.isIntersecting = entry.isIntersecting;
        });
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(track);

    // iOS Safari video unlock
    const unlockVideo = () => {
      if (video) {
        video.play().then(() => video.pause()).catch(() => {});
      }
      window.removeEventListener("touchstart", unlockVideo);
      window.removeEventListener("pointerdown", unlockVideo);
      window.removeEventListener("wheel", unlockVideo);
      window.removeEventListener("keydown", unlockVideo);
    };

    window.addEventListener("touchstart", unlockVideo, { passive: true, once: true });
    window.addEventListener("pointerdown", unlockVideo, { passive: true, once: true });
    window.addEventListener("wheel", unlockVideo, { passive: true, once: true });
    window.addEventListener("keydown", unlockVideo, { passive: true, once: true });

    // Start frame loop
    engineRef.current.rafId = requestAnimationFrame(frame);

    return () => {
      isAborted = true;
      clearTimeout(fallbackTimeout);
      clearTimeout(safetyTimeout);
      window.removeEventListener("resize", updateScreenRect);
      window.removeEventListener("touchstart", unlockVideo);
      window.removeEventListener("pointerdown", unlockVideo);
      window.removeEventListener("wheel", unlockVideo);
      window.removeEventListener("keydown", unlockVideo);
      observer.disconnect();
      if (engineRef.current.rafId) cancelAnimationFrame(engineRef.current.rafId);
      if (engineRef.current.blobUrl) URL.revokeObjectURL(engineRef.current.blobUrl);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("loadeddata", onLoadedMetadata);
      video.removeEventListener("canplaythrough", onLoadedMetadata);
    };
  }, [trackRef, contentRef, updateScreenRect, isVideoReady]);

  return (
    <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden select-none">
      {/* 1. Video Layer */}
      {isSupported && (
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          poster="/videos/laptop-poster.jpg"
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover scale-[1.02] transition-opacity duration-700 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ willChange: "transform" }}
        />
      )}

      {/* Static Poster Fallback */}
      <div
        style={{
          backgroundImage: "url(/videos/laptop-poster.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          isVideoReady && isSupported ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* 2. Veil Layer (Top/Bottom gradients, Vignette, Top-Right White Patch Mask, Violet Tint) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top/Bottom Linear Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060609]/70 via-transparent to-[#060609]/70" />

        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,6,9,0.45)_100%)]" />

        {/* Top-Right Corner Radial Patch (ellipse at 100% 0%, 45% x 45%) */}
        <div
          style={{
            background:
              "radial-gradient(ellipse 45% 45% at 100% 0%, rgba(6, 6, 9, 0.95) 0%, transparent 100%)",
          }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Faint Violet Accent Tint (6% opacity) */}
        <div className="absolute inset-0 bg-accent/[0.06] mix-blend-screen" />
      </div>

      {/* 3. Dim Layer (starts at 0.55 opacity, fades to 0 as hero fades out) */}
      <div
        ref={dimLayerRef}
        className="absolute inset-0 bg-[#060609] pointer-events-none"
        style={{ opacity: 0.55 }}
      />

      {/* 4. Grain Layer */}
      <div
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: "180px 180px",
        }}
        className="absolute inset-[-50%] opacity-[0.08] mix-blend-overlay pointer-events-none"
      />

      {/* 5. Screen Text Panel (Sits inside the laptop screen in final frame) */}
      {isSupported && (
        <div
          ref={screenRectRef}
          style={{
            position: "absolute",
            top: "var(--screen-top, 18%)",
            left: "var(--screen-left, 26%)",
            width: "var(--screen-width, 48%)",
            height: "var(--screen-height, 48%)",
          }}
          className="pointer-events-none overflow-hidden z-10"
        >
          <div
            ref={screenContentRef}
            className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 text-center opacity-0 select-none relative"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Subtle Screen Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(161,148,247,0.18)_0%,transparent_75%)] pointer-events-none -z-10" />

            {/* Name */}
            <h2 className="font-display italic text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-text-primary tracking-tight leading-tight">
              Mohammed Jashem
            </h2>

            {/* Role */}
            <p className="mt-1 sm:mt-1.5 text-accent text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase font-mono">
              Frontend Developer
            </p>

            {/* Subtext description */}
            <p className="mt-2 text-muted text-[11px] sm:text-xs md:text-sm max-w-[32ch] font-normal leading-relaxed hidden sm:block">
              Crafting high-performance web applications and fluid interactive experiences.
            </p>

            {/* Quick Actions / Social Icons inside screen */}
            <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2.5 sm:gap-3">
              <a
                href="mailto:mohammedjashemofficial564@gmail.com"
                className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-surface/90 border border-stroke text-text-primary hover:text-accent hover:border-accent/50 hover:scale-110 transition-all duration-200 shadow-md"
                aria-label="Send Email"
              >
                <FaEnvelope size={13} />
              </a>
              <a
                href="https://github.com/jashem01"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-surface/90 border border-stroke text-text-primary hover:text-accent hover:border-accent/50 hover:scale-110 transition-all duration-200 shadow-md"
                aria-label="GitHub Profile"
              >
                <FaGithub size={14} />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-jashem-s-5633b5251"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-surface/90 border border-stroke text-text-primary hover:text-accent hover:border-accent/50 hover:scale-110 transition-all duration-200 shadow-md"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
