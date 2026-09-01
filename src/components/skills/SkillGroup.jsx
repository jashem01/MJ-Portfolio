"use client";

import { motion } from "framer-motion";

export default function SkillGroup({
  title,
  skills,
  className = "",
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      className={`
        glass-card
        p-8
        ${className}
      `}
    >
      <h3 className="text-xl font-semibold mb-6">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="
              px-4
              py-2
              rounded-full
              border
              border-zinc-800
              text-zinc-300
              hover:border-zinc-500
              transition
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}