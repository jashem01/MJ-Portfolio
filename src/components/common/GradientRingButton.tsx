"use client";

import React from "react";
import { motion } from "framer-motion";

interface GradientRingButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  className?: string;
  innerClassName?: string;
  variant?: "primary" | "secondary" | "surface";
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

export default function GradientRingButton({
  children,
  href,
  onClick,
  target,
  rel,
  className = "",
  innerClassName = "",
  variant = "surface",
  type = "button",
  ariaLabel,
}: GradientRingButtonProps) {
  const variantStyles = {
    primary: "bg-white text-black font-semibold hover:text-black",
    secondary: "bg-surface text-text-primary border border-stroke",
    surface: "bg-surface text-text-primary border border-stroke",
  };

  const innerContent = (
    <span
      className={`relative z-10 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 group-hover:scale-105 ${variantStyles[variant]} ${innerClassName}`}
    >
      {children}
    </span>
  );

  const wrapperClasses = `relative group inline-flex rounded-full p-[2px] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={wrapperClasses}
      >
        {/* Glowing Gradient Ring on Hover */}
        <span
          className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] pointer-events-none"
          aria-hidden="true"
        />
        {innerContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={wrapperClasses}
    >
      {/* Glowing Gradient Ring on Hover */}
      <span
        className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] pointer-events-none"
        aria-hidden="true"
      />
      {innerContent}
    </button>
  );
}
