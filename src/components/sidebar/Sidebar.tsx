"use client";

import React from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  {
    id: "email",
    label: "Email",
    icon: Mail,
    href: "mailto:mohammedjashemofficial564@gmail.com",
    target: "_self",
    rel: "",
  },
  {
    id: "github",
    label: "GitHub",
    icon: FaGithub,
    href: "https://github.com/jashem01",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/mohammed-jashem-s-5633b5251",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 p-2 rounded-full bg-surface/90 border border-white/10 backdrop-blur-md shadow-2xl"
      aria-label="Social links rail"
    >
      {SOCIAL_LINKS.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.id}
            href={item.href}
            target={item.target}
            rel={item.rel}
            className="relative group w-10 h-10 rounded-full p-[1px] transition-transform duration-300 hover:scale-115 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center justify-center"
            aria-label={item.label}
          >
            {/* Glowing Gradient Ring on Hover */}
            <span
              className="absolute inset-[-1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] pointer-events-none"
              aria-hidden="true"
            />

            {/* Inner Icon Button */}
            <span className="relative z-10 w-full h-full rounded-full flex items-center justify-center text-muted group-hover:text-text-primary bg-surface/80 border border-stroke shadow-sm transition-colors duration-200">
              <Icon size={16} />
            </span>

            {/* Tooltip on Hover */}
            <span className="absolute left-14 px-3 py-1.5 rounded-xl bg-surface border border-stroke text-text-primary text-[11px] font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap shadow-xl group-hover:translate-x-1">
              {item.label}
            </span>
          </a>
        );
      })}
    </motion.aside>
  );
}
