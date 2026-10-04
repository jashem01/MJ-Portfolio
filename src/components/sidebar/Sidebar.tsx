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
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 p-2 rounded-full bg-surface border border-stroke shadow-lg"
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
            className="relative group w-10 h-10 rounded-full hover-icon border border-stroke flex items-center justify-center focus-visible:outline-none focus-visible:ring-2"
            aria-label={item.label}
          >
            <Icon size={16} />

            {/* Tooltip on Hover */}
            <span className="absolute left-14 px-3 py-1.5 rounded-xl bg-surface border border-stroke text-text-primary text-[11px] font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-md">
              {item.label}
            </span>
          </a>
        );
      })}
    </motion.aside>
  );
}
