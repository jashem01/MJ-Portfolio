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
    const duration = 1100; // ms

    function animate(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
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
    <div className="mb-6 last:mb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-zinc-200 font-medium text-sm tracking-wide">{name}</span>
        <span
          className="text-zinc-400 text-xs font-mono tabular-nums font-semibold"
          style={{ minWidth: "3ch", textAlign: "right" }}
        >
          {displayed}%
        </span>
      </div>
      {/* Track */}
      <div className="h-2 w-full bg-zinc-900/90 rounded-full overflow-hidden border border-white/5 p-0.5">
        <div
          className="h-full rounded-full relative"
          style={{
            width: `${barWidth}%`,
            background: "linear-gradient(90deg, #a194f7 0%, #c4b9ff 60%, #ffffff 100%)",
            boxShadow: "0 0 10px rgba(161, 148, 247, 0.4)",
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="dashed-frame p-8 md:p-10 backdrop-blur-md bg-black/40 group relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>

      <div>
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-wide mb-8 uppercase flex items-center gap-3">
          <span>Core Technologies</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#a194f7]" />
        </h3>
        <div>
          {coreSkills.map((skill, i) => (
            <SkillBar key={i} {...skill} triggered={triggered} />
          ))}
        </div>
      </div>
    </div>
  );
}

