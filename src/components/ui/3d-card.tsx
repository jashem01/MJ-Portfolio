"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ActiveContext = createContext<boolean | undefined>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
  maxTilt = 6,
  disabled = false,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number;
  disabled?: boolean;
}) => {
  const outerRef = useRef<HTMLDivElement>(null); // untransformed: used for measuring
  const innerRef = useRef<HTMLDivElement>(null); // transformed: tilts
  const frame = useRef(0);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (enabled && !disabled) setActive(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || disabled) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (!outerRef.current || !innerRef.current) return;
      const r = outerRef.current.getBoundingClientRect();
      const px = (clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
      const py = (clientY - r.top) / r.height - 0.5;
      innerRef.current.style.transform = `rotateY(${px * maxTilt * 2}deg) rotateX(${py * maxTilt * 2}deg)`;
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(frame.current);
    setActive(false);
    if (innerRef.current) innerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <ActiveContext.Provider value={active}>
      <div
        ref={outerRef}
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={innerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("relative w-full transition-transform duration-200 ease-out", className)}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </ActiveContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]", className)}>
    {children}
  </div>
);

export const CardItem = <T extends React.ElementType = "div">({
  as,
  children,
  className,
  style,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: T;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
} & React.HTMLAttributes<HTMLElement> & Record<string, any>) => {
  const Tag = (as || "div") as any;
  const active = useMouseEnter();
  const transform = active
    ? `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
    : "translate3d(0px, 0px, 0px)";
  return (
    <Tag className={cn("transition-transform duration-200 ease-out", className)} style={{ ...style, transform }} {...rest}>
      {children}
    </Tag>
  );
};

export const useMouseEnter = () => {
  const ctx = useContext(ActiveContext);
  if (ctx === undefined) throw new Error("useMouseEnter must be used within CardContainer");
  return ctx;
};
