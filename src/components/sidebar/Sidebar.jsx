"use client";

import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
  {
    id: "email",
    icon: Mail,
    href: "mailto:mohammedjashemofficial564@gmail.com",
    target: "_self",
  },
  {
    id: "github",
    icon: FaGithub,
    href: "https://github.com/jashem01",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    id: "linkedin",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/mohammed-jashem-s-5633b5251",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

export default function Sidebar() {
  return (
    <div
      className="
      fixed
      left-6
      top-1/2
      -translate-y-1/2
      z-50
      hidden
      lg:flex
      flex-col
      gap-4
      "
    >
      {links.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.id}
            href={item.href}
            target={item.target}
            rel={item.rel}
            className="
            w-12
            h-12
            rounded-full
            border
            border-zinc-800
            bg-black/50
            backdrop-blur-md
            flex
            items-center
            justify-center
            hover:border-white
            transition
            "
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}