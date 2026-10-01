"use client";

import { useEffect, useRef, useState } from "react";
import { row1, row2 } from "@/data/marquee";

export default function SkillsMarquee() {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const sectionTop = sectionRef.current.offsetTop;
            const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(currentOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const row1Images = [...row1, ...row1, ...row1];
  const row2Images = [...row2, ...row2, ...row2];

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1 - Moves Right */}
        <div
          className="flex gap-3 will-change-transform"
          style={{
            transform: `translateX(${offset - 200}px)`,
          }}
        >
          {row1Images.map((src, index) => (
            <img
              key={`row1-${index}`}
              src={src}
              alt="Design Showcase"
              loading="lazy"
              className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Row 2 - Moves Left */}
        <div
          className="flex gap-3 will-change-transform"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
          }}
        >
          {row2Images.map((src, index) => (
            <img
              key={`row2-${index}`}
              src={src}
              alt="Design Showcase"
              loading="lazy"
              className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
