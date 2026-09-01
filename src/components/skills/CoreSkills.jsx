"use client";

import { useEffect, useRef, useState } from "react";

const coreSkills = [
  { name: "React.js", level: 85 },
  { name: "JavaScript", level: 85 },
  { name: "HTML5", level: 92 },
  { name: "CSS3", level: 90 },
];

function SkillBar({ name, level, triggered }) {
  const [displayed, setDisplayed] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!triggered) return;

    let start = null;
    const duration = 1200; // ms

    function animate(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * level);
      setDisplayed(current);
      setBarWidth(eased * level);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [triggered, level]);

  return (
    <div className="mb-7">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium text-sm tracking-wide">{name}</span>
        <span
          className="text-zinc-400 text-sm font-mono tabular-nums"
          style={{ minWidth: "3ch", textAlign: "right" }}
        >
          {displayed}%
        </span>
      </div>
      {/* Track */}
      <div className="h-[3px] w-full bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${barWidth}%`,
            background: "linear-gradient(90deg, #ffffff 0%, #a1a1aa 100%)",
            transition: triggered ? "none" : undefined,
          }}
        />
      </div>
    </div>
  );
}

export default function CoreSkills() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="dashed-frame p-8 backdrop-blur-sm bg-black/20">
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white"></div>

      <h3 className="text-3xl font-black text-white tracking-wide mb-8 uppercase">
        Core Technologies
      </h3>
      {coreSkills.map((skill, i) => (
        <SkillBar key={i} {...skill} triggered={triggered} />
      ))}
    </div>
  );
}
