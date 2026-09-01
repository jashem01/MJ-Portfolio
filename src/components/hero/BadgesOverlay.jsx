"use client";

import TechBadge from "./TechBadge";

export default function BadgesOverlay() {
  // Positioning the badges around the edges of the 340px container
  const badges = [
    { label: "React.js", style: { top: "5%", left: "-15%" }, duration: 4.0, delay: 0 },
    { label: "JavaScript", style: { top: "15%", right: "-5%" }, duration: 5.0, delay: 0.5 },
    { label: "Next.js", style: { bottom: "20%", left: "-10%" }, duration: 4.5, delay: 0.2 },
    { label: "MongoDB", style: { bottom: "10%", right: "-15%" }, duration: 5.5, delay: 0.7 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {badges.map((b, i) => (
        <div key={i} className="absolute" style={b.style}>
          <TechBadge label={b.label} duration={b.duration} delay={b.delay} />
        </div>
      ))}
    </div>
  );
}
