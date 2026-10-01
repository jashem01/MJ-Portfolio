"use client";

import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const links = [
  {
    id: "email",
    label: "Email",
    icon: Mail,
    href: "mailto:mohammedjashemofficial564@gmail.com",
    target: "_self",
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 p-2 rounded-full bg-zinc-950/70 border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      aria-label="Social links rail"
    >
      {links.map((item) => {
        const Icon = item.icon;

        return (
          <motion.a
            key={item.id}
            href={item.href}
            target={item.target}
            rel={item.rel}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-[#a194f7]/20 border border-transparent hover:border-[#a194f7]/40 transition-all duration-300 relative group"
            aria-label={item.label}
          >
            <Icon size={16} />
            {/* Tooltip on hover */}
            <span className="absolute left-14 px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-white text-[11px] font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-xl">
              {item.label}
            </span>
          </motion.a>
        );
      })}
    </motion.aside>
  );
}