"use client";

import React, { useEffect, useRef, useState } from "react";

interface HlsVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  ariaLabel?: string;
}

export default function HlsVideo({
  src,
  poster,
  className = "absolute inset-0 w-full h-full object-cover",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  ariaLabel,
}: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);

  useEffect(() => {
    // Check if device is low-powered, mobile, or prefers reduced motion
    const isMobile = window.innerWidth < 768;
    const isLowPower =
      typeof navigator !== "undefined" &&
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency < 4;
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || isLowPower || isReducedMotion) {
      setShouldRenderVideo(false);
      return;
    }

    setShouldRenderVideo(true);
  }, []);

  useEffect(() => {
    if (!shouldRenderVideo) return;

    const video = videoRef.current;
    if (!video || !src) return;

    let hlsInstance: any = null;
    let observer: IntersectionObserver | null = null;

    // IntersectionObserver to pause when off-screen
    observer = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;
        if (entry.isIntersecting && !document.hidden) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    const handleVisibility = () => {
      if (!video) return;
      if (document.hidden) {
        video.pause();
      } else if (videoRef.current) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Lazy load hls.js on idle / requestIdleCallback
    const loadHls = async () => {
      try {
        const { default: Hls } = await import("hls.js");

        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
            capLevelToPlayerSize: true, // Cap resolution to viewport (720p/1080p max)
            maxBufferLength: 10,
            maxMaxBufferLength: 20,
          });
          hlsInstance = hls;

          hls.loadSource(src);
          hls.attachMedia(video);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (autoPlay && !document.hidden) {
              video.play().catch(() => {});
            }
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = src;
        }
      } catch (err) {
        console.warn("hls.js fallback error:", err);
        video.src = src;
      }
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => loadHls());
    } else {
      setTimeout(loadHls, 100);
    }

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [src, autoPlay, shouldRenderVideo]);

  if (!shouldRenderVideo) {
    return (
      <div
        className={`${className} bg-[radial-gradient(ellipse_at_top,_rgba(161,148,247,0.08)_0%,_rgba(6,6,9,0.95)_70%)] pointer-events-none`}
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      poster={poster}
      preload="metadata"
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      aria-label={ariaLabel}
      className={className}
    />
  );
}
