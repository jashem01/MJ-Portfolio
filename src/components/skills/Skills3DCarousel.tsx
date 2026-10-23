"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useReducedMotion } from "framer-motion";
import {
  ALL_SKILLS,
  CATEGORIES,
  CategoryType,
} from "./skillsData";

export default function SkillsCarousel3D() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, setIsHovered] = useState(false);
  const [, setIsFocused] = useState(false);
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const isReducedMotion = Boolean(shouldReduceMotion);

  // Filter skills based on category
  const filteredSkills = useMemo(() => {
    if (selectedCategory === "All") return ALL_SKILLS;
    return ALL_SKILLS.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  const count = filteredSkills.length;

  // Container and card refs
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Physics and rotation states (stored in refs for 60fps RAF loop without React re-render overhead)
  const currentRotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const currentTiltXRef = useRef(0);
  const currentTiltYRef = useRef(0);
  const targetTiltXRef = useRef(0);
  const targetTiltYRef = useRef(0);
  const introProgressRef = useRef(0); // 0 to 1 for smooth blossoming opening animation
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartRotRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const lastDragXRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInteractingRef = useRef(false);
  const autoAdvanceTimerRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({
    cardWidth: 245,
    cardHeight: 260,
    radius: 420,
  });
  const dimensionsRef = useRef({
    cardWidth: 245,
    cardHeight: 260,
    radius: 420,
  });

  // Update carousel dimensions based on container width
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    let cardW = 245;
    let cardH = 260;
    let rad = 420;

    if (width < 640) {
      // Mobile
      cardW = 185;
      cardH = 220;
      rad = Math.min(260, Math.max(200, width * 0.44));
    } else if (width < 1024) {
      // Tablet
      cardW = 215;
      cardH = 240;
      rad = Math.min(360, Math.max(280, width * 0.38));
    } else {
      // Desktop
      cardW = 245;
      cardH = 260;
      rad = Math.min(440, Math.max(360, width * 0.36));
    }

    // Adapt radius if items count is small or large
    const angleStepRad = (2 * Math.PI) / Math.max(count, 3);
    const minCalculatedRad = ((cardW / 2) / Math.tan(angleStepRad / 2)) * 1.08;
    const adjustedRadius = Math.max(rad, Math.min(minCalculatedRad, 480));

    const newDims = {
      cardWidth: cardW,
      cardHeight: cardH,
      radius: adjustedRadius,
    };
    dimensionsRef.current = newDims;
    setDimensions(newDims);
  }, [count]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Idle timer management
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (isReducedMotion) return;

    idleTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 2400);
  }, [isReducedMotion]);

  // Calculate shortest rotation delta to target card index
  const rotateToIndex = useCallback(
    (index: number) => {
      const step = 360 / count;
      const targetBase = -index * step;
      const current = currentRotationRef.current;
      // Find closest equivalent angle
      const diff = (((targetBase - current) % 360) + 540) % 360 - 180;
      targetRotationRef.current = current + diff;
      setSelectedIndex(index);
    },
    [count]
  );

  const handlePrev = useCallback(() => {
    isInteractingRef.current = true;
    const nextIdx = (selectedIndex - 1 + count) % count;
    rotateToIndex(nextIdx);
    resetIdleTimer();
  }, [selectedIndex, count, rotateToIndex, resetIdleTimer]);

  const handleNext = useCallback(() => {
    isInteractingRef.current = true;
    const nextIdx = (selectedIndex + 1) % count;
    rotateToIndex(nextIdx);
    resetIdleTimer();
  }, [selectedIndex, count, rotateToIndex, resetIdleTimer]);

  // Main 60-120fps Animation Loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // 1. Opening Animation Blossoming Progress
      if (introProgressRef.current < 1) {
        if (isReducedMotion) {
          introProgressRef.current = 1;
        } else {
          // Controlled natural ease outward
          introProgressRef.current = Math.min(
            1,
            introProgressRef.current + dt * 1.05
          );
        }
      }

      // 2. Automatic Continuous Rotation Check (advances card-by-card at smooth interval)
      if (
        !isDraggingRef.current &&
        !isInteractingRef.current &&
        !isHoveredRef.current &&
        !isFocusedRef.current &&
        !isReducedMotion &&
        introProgressRef.current >= 0.85
      ) {
        autoAdvanceTimerRef.current += dt;
        if (autoAdvanceTimerRef.current >= 2.6) {
          autoAdvanceTimerRef.current = 0;
          // Step to next card smoothly in infinite loop
          const step = 360 / count;
          targetRotationRef.current -= step;
        }
      } else {
        autoAdvanceTimerRef.current = 0;
      }

      // 3. Smooth Lerp Rotation towards Target
      const rotDelta = targetRotationRef.current - currentRotationRef.current;
      if (Math.abs(rotDelta) > 0.001) {
        currentRotationRef.current += rotDelta * (isReducedMotion ? 0.4 : 0.09);
      } else {
        currentRotationRef.current = targetRotationRef.current;
      }

      // 4. Smooth Lerp Mouse Tilt
      const tiltXDelta = targetTiltXRef.current - currentTiltXRef.current;
      const tiltYDelta = targetTiltYRef.current - currentTiltYRef.current;
      currentTiltXRef.current += tiltXDelta * 0.08;
      currentTiltYRef.current += tiltYDelta * 0.08;

      // 5. Update Stage Transform
      if (stageRef.current) {
        stageRef.current.style.transform = `rotateX(${currentTiltXRef.current}deg) rotateY(${currentTiltYRef.current}deg)`;
      }

      // 6. Calculate Card Positions, Scales, Floating & Front Highlighting
      const step = 360 / count;
      const { radius } = dimensionsRef.current;
      // Opening animation expands radius from 20% to 100%
      const blossomEase = 1 - Math.pow(1 - introProgressRef.current, 3);
      const effectiveRadius = radius * (0.2 + 0.8 * blossomEase);
      const openingExtraRot = (1 - blossomEase) * 60;
      const currentRot = currentRotationRef.current + openingExtraRot;

      let closestIndex = 0;
      let minDistance = Infinity;

      for (let i = 0; i < count; i++) {
        const el = cardElementsRef.current[i];
        if (!el) continue;

        const cardBaseAngle = i * step;
        // Total angle of this card relative to stage
        const totalAngle = cardBaseAngle + currentRot;
        // Normalize angle to [-180, 180] relative to camera (0 deg = directly front)
        const normalizedAngle = (((totalAngle % 360) + 540) % 360) - 180;
        const rad = (normalizedAngle * Math.PI) / 180;

        const absAngle = Math.abs(normalizedAngle);
        if (absAngle < minDistance) {
          minDistance = absAngle;
          closestIndex = i;
        }

        // Calculate 3D cylindrical coordinates
        const x = effectiveRadius * Math.sin(rad);
        const z = effectiveRadius * Math.cos(rad) - effectiveRadius;

        // Subtle vertical floating animation (each card has its own timing & phase)
        let floatY = 0;
        if (!isReducedMotion && introProgressRef.current >= 0.8) {
          const speed = 0.0016 + (i % 3) * 0.0003;
          const phase = i * 1.4;
          floatY = Math.sin(now * speed + phase) * 5;
        }

        // Billboarding / perspective facing factor so text remains completely legible
        const cardRotateY = normalizedAngle * 0.55;

        // Cosine-based depth weighting
        const cosFactor = Math.cos(rad); // 1 at front, -1 at back
        const frontness = (cosFactor + 1) / 2; // [0, 1]

        // Scale: Front card is 1.07x, back cards ~0.86x
        const scale = (0.86 + 0.21 * Math.pow(frontness, 2)) * (0.6 + 0.4 * blossomEase);

        // Opacity: Front card is 1.0, back cards ~0.58 (never unreadable)
        const opacity = (0.58 + 0.42 * Math.pow(frontness, 1.3)) * Math.min(1, introProgressRef.current * 1.5);

        // Depth sorting z-index
        const zIndex = Math.round(z + 1000);

        // Front card status
        const isFront = absAngle < step * 0.5;

        // Apply direct style updates without React re-render churn
        el.style.transform = `translate3d(${x}px, ${floatY}px, ${z}px) rotateY(${cardRotateY}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;

        if (isFront) {
          el.dataset.front = "true";
        } else {
          el.dataset.front = "false";
        }
      }

      // Synchronize selected index for state tracking
      if (closestIndex !== selectedIndex) {
        setSelectedIndex(closestIndex);
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [count, isReducedMotion, selectedIndex]);

  // Pointer Drag Handlers (Mouse & Touch)
  const handlePointerDown = useCallback(
    (clientX: number) => {
      isDraggingRef.current = true;
      isInteractingRef.current = true;
      dragStartXRef.current = clientX;
      lastDragXRef.current = clientX;
      dragStartRotRef.current = targetRotationRef.current;
      lastDragTimeRef.current = performance.now();
      dragVelocityRef.current = 0;
      resetIdleTimer();
    },
    [resetIdleTimer]
  );

  const handlePointerMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(now - lastDragTimeRef.current, 1);
    const deltaX = clientX - dragStartXRef.current;
    const stepDelta = clientX - lastDragXRef.current;

    dragVelocityRef.current = stepDelta / dt;
    lastDragXRef.current = clientX;
    lastDragTimeRef.current = now;

    // Circumference sensitivity: 1px drag moves 1px along circle arc
    const { radius } = dimensionsRef.current;
    const circumference = 2 * Math.PI * radius;
    const degPerPixel = 360 / circumference;

    targetRotationRef.current = dragStartRotRef.current + deltaX * degPerPixel * 1.15;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Inertia & Snap to nearest card
    const step = 360 / count;
    let target = targetRotationRef.current;

    // Add inertia if flicked
    if (Math.abs(dragVelocityRef.current) > 0.4) {
      target += dragVelocityRef.current * 80;
    }

    const nearestCardIndex = Math.round(-target / step);
    targetRotationRef.current = -nearestCardIndex * step;

    // Normalize selected index
    const normalizedIdx = ((-nearestCardIndex % count) + count) % count;
    setSelectedIndex(normalizedIdx);
    resetIdleTimer();
  }, [count, resetIdleTimer]);

  // Mouse tilt listeners on carousel container
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isDraggingRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const normX = Math.max(-1, Math.min(1, x / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, y / (rect.height / 2)));

    // Professional subtle tilt: max ±6 deg
    targetTiltXRef.current = -normY * 6.5;
    targetTiltYRef.current = normX * 6.5;
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    isHoveredRef.current = true;
    isInteractingRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    isHoveredRef.current = false;
    targetTiltXRef.current = 0;
    targetTiltYRef.current = 0;
    handlePointerUp();
    resetIdleTimer();
  }, [handlePointerUp, resetIdleTimer]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    isFocusedRef.current = true;
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    isFocusedRef.current = false;
    resetIdleTimer();
  }, [resetIdleTimer]);

  // Window drag listeners for seamless drag release outside bounds
  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        handlePointerMove(e.clientX);
      }
    };
    const onWindowMouseUp = () => {
      if (isDraggingRef.current) {
        handlePointerUp();
      }
    };

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Home") {
        e.preventDefault();
        rotateToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        rotateToIndex(count - 1);
      }
    },
    [handlePrev, handleNext, rotateToIndex, count]
  );

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Category Filter Navigation Bar */}
      <div
        className="flex flex-wrap items-center justify-center gap-2 mb-8 md:mb-10 px-4 z-20"
        role="tablist"
        aria-label="Skill categories"
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          const countForCat =
            cat === "All"
              ? ALL_SKILLS.length
              : ALL_SKILLS.filter((s) => s.category === cat).length;

          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedIndex(0);
                currentRotationRef.current = 0;
                targetRotationRef.current = 0;
                introProgressRef.current = isReducedMotion ? 1 : 0;
                resetIdleTimer();
              }}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                isActive
                  ? "bg-accent/15 border-accent text-accent-lavender shadow-[0_0_15px_rgba(161,148,247,0.25)]"
                  : "bg-surface/80 border-stroke text-muted hover:text-text-primary hover:border-stroke/80"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-accent/25 text-white"
                    : "bg-white/5 text-muted"
                }`}
              >
                {countForCat}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3D Carousel Stage Viewport */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="3D Skills Carousel"
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={(e) => {
          if (e.button === 0) handlePointerDown(e.clientX);
        }}
        onTouchStart={(e) => {
          handlePointerDown(e.touches[0].clientX);
        }}
        onTouchMove={(e) => {
          handlePointerMove(e.touches[0].clientX);
        }}
        onTouchEnd={handlePointerUp}
        className="relative w-full h-[380px] sm:h-[420px] md:h-[450px] lg:h-[480px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 rounded-3xl"
        style={{
          perspective: "1150px",
          touchAction: "pan-y",
        }}
      >
        {/* Subtle Ambient Radial Glow Behind Carousel */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10"
          aria-hidden="true"
        >
          <div className="w-[520px] h-[320px] rounded-full bg-accent/8 blur-[100px]" />
        </div>

        {/* Illuminated Floor / Circular Light Beneath Carousel */}
        <div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0"
          style={{
            width: `${dimensions.radius * 2.1}px`,
            height: `${dimensions.radius * 0.7}px`,
            transform: "rotateX(74deg) translateY(25px)",
            transformStyle: "preserve-3d",
          }}
          aria-hidden="true"
        >
          {/* Floor radial glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(161, 148, 247, 0.22) 0%, rgba(124, 101, 246, 0.08) 50%, transparent 75%)",
              filter: "blur(14px)",
            }}
          />
          {/* Subtle concentric rings on floor */}
          <div className="absolute inset-4 rounded-full border border-accent/25 opacity-60" />
          <div className="absolute inset-14 rounded-full border border-stroke/40 opacity-40 border-dashed" />
          {/* Spotlight center bead */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-accent/20 blur-xl" />
        </div>

        {/* 3D Rotating Stage */}
        <div
          ref={stageRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {filteredSkills.map((skill, index) => {
            const isFrontCard = index === selectedIndex;

            return (
              <div
                key={skill.id}
                ref={(el) => {
                  cardElementsRef.current[index] = el;
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // If not heavily dragging, bring to front
                  if (Math.abs(dragVelocityRef.current) < 0.2) {
                    rotateToIndex(index);
                    resetIdleTimer();
                  }
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-shadow duration-300"
                style={{
                  width: `${dimensions.cardWidth}px`,
                  height: `${dimensions.cardHeight}px`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "visible",
                  willChange: "transform, opacity",
                }}
              >
                {/* Inner Card Container: Displays Only the Skill Name */}
                <div
                  className={`relative w-full h-full rounded-2xl p-6 sm:p-8 flex items-center justify-center text-center backdrop-blur-xl border transition-all duration-300 ${
                    isFrontCard
                      ? "bg-surface/95 border-accent/70 shadow-[0_0_35px_rgba(161,148,247,0.22),0_0_1px_rgba(161,148,247,0.7),0_20px_40px_rgba(0,0,0,0.65)] ring-1 ring-accent/30"
                      : "bg-[#0B0B10]/90 border-stroke/70 shadow-[0_12px_28px_rgba(0,0,0,0.45)] hover:border-stroke"
                  }`}
                >
                  {/* Tech Corner Bracket Accents */}
                  <div
                    className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 transition-colors duration-300 ${
                      isFrontCard ? "border-accent" : "border-white/30"
                    }`}
                  />
                  <div
                    className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 transition-colors duration-300 ${
                      isFrontCard ? "border-accent" : "border-white/30"
                    }`}
                  />
                  <div
                    className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 transition-colors duration-300 ${
                      isFrontCard ? "border-accent" : "border-white/30"
                    }`}
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 transition-colors duration-300 ${
                      isFrontCard ? "border-accent" : "border-white/30"
                    }`}
                  />

                  {/* Front Card Spotlight Flare */}
                  {isFrontCard && (
                    <div
                      className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
                      style={{
                        background:
                          "radial-gradient(280px circle at 50% 50%, rgba(161, 148, 247, 0.16), transparent 70%)",
                      }}
                    />
                  )}

                  {/* Skill Name Only */}
                  <h3
                    className={`relative z-10 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight px-3 select-none transition-all duration-300 ${
                      isFrontCard
                        ? "text-white text-gradient-accent scale-105"
                        : "text-text-primary/90 group-hover:text-white"
                    }`}
                  >
                    {skill.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
