import React from "react";
import { FaReact, FaNodeJs, FaGithub, FaWordpress } from "react-icons/fa";
import { SiJavascript, SiMongodb, SiOpenai } from "react-icons/si";
import { Code2, Layers, Bot, LayoutTemplate } from "lucide-react";

export interface SkillItem {
  id: string;
  name: string;
  category: "Core Skills" | "AI & Development" | "Tools & Platforms";
  subCategory?: string;
  desc: string;
  tag?: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  tags: string[];
  level?: number;
}

export const ALL_SKILLS: SkillItem[] = [
  // Core Skills
  {
    id: "react",
    name: "React.js",
    category: "Core Skills",
    tag: "Primary",
    desc: "Central & primary frontend framework for building responsive, scalable UI components.",
    icon: FaReact,
    tags: ["Components", "Hooks", "Virtual DOM"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Core Skills",
    desc: "Modern ECMAScript (ES6+), async patterns, event handling, and core application logic.",
    icon: SiJavascript,
    tags: ["ES6+", "Async/Await", "DOM APIs"],
  },
  {
    id: "html-css",
    name: "HTML / CSS",
    category: "Core Skills",
    desc: "Semantic HTML5 markup and modern styling architecture with Flexbox and responsive CSS Grid.",
    icon: Code2,
    tags: ["HTML5", "CSS3", "Responsive Layouts"],
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "Core Skills",
    desc: "Asynchronous client-server communication, JSON endpoints, and robust data integration.",
    icon: Layers,
    tags: ["HTTP", "JSON", "Endpoints"],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Core Skills",
    tag: "Exploring",
    desc: "Server-side JavaScript runtime environment for backend APIs and full-stack services.",
    icon: FaNodeJs,
    tags: ["Runtime", "Express", "Server APIs"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Core Skills",
    tag: "Exploring",
    desc: "NoSQL document database, collection modeling, and schema data persistence.",
    icon: SiMongodb,
    tags: ["NoSQL", "Document Store", "Collections"],
  },

  // AI & Development
  {
    id: "gen-ai",
    name: "Generative AI Tools",
    category: "AI & Development",
    desc: "Prompt Engineering & Generative Workflows",
    icon: SiOpenai,
    tags: ["Prompt Engineering", "Generative Workflows", "AI Prototyping"],
  },
  {
    id: "agentic-ai",
    name: "Agentic AI Tools",
    category: "AI & Development",
    desc: "Autonomous Agents & Workflow Automation",
    icon: Bot,
    tags: ["Autonomous Agents", "Workflow Automation", "Tool Use"],
  },
  {
    id: "no-code",
    name: "No-Code Development",
    category: "AI & Development",
    desc: "Rapid Prototyping & Visual Systems",
    icon: LayoutTemplate,
    tags: ["Rapid Prototyping", "Visual Systems", "Fast Delivery"],
  },

  // Tools & Platforms
  {
    id: "git-github",
    name: "Git & GitHub",
    category: "Tools & Platforms",
    subCategory: "Version Control",
    desc: "Source Control, Branching & Collaboration",
    icon: FaGithub,
    tags: ["Version Control", "Branching", "Collaboration"],
  },
  {
    id: "wordpress",
    name: "WordPress",
    category: "Tools & Platforms",
    subCategory: "CMS Platform",
    desc: "CMS Architecture & Web Publishing",
    icon: FaWordpress,
    tags: ["CMS Architecture", "Web Publishing", "Custom Themes"],
  },
];

export const CATEGORIES = [
  "All",
  "Core Skills",
  "AI & Development",
  "Tools & Platforms",
] as const;

export type CategoryType = (typeof CATEGORIES)[number];
