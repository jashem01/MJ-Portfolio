"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MarqueeText = ({ children, direction = 1, speed = 25 }) => (
  <div className="flex whitespace-nowrap overflow-hidden py-2 select-none pointer-events-none opacity-20">
    <motion.div
      className="flex min-w-max"
      animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ ease: "linear", duration: speed, repeat: Infinity }}
    >
      <h1 className="text-[7vw] md:text-[5vw] font-bold text-zinc-600 px-6 tracking-tight uppercase">
        {children}
      </h1>
      <h1 className="text-[7vw] md:text-[5vw] font-bold text-zinc-600 px-6 tracking-tight uppercase">
        {children}
      </h1>
    </motion.div>
  </div>
);

export default function Loader() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShow(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ 
            opacity: 0, 
            scale: 1.02, 
            filter: "blur(8px)", 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 bg-[#030303] z-[99999] flex items-center justify-center overflow-hidden"
        >
          {/* Ambient Background Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#a194f7]/10 blur-[140px] pointer-events-none" />

          {/* Background Marquee Texts */}
          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0">
            <MarqueeText speed={35} direction={1}>
              MOHAMMED JASHEM • WEB DEVELOPER • FRONTEND DEVELOPER • UI/UX DESIGNER • REACT DEVELOPER • 
            </MarqueeText>
            <MarqueeText speed={40} direction={-1}>
              REACT.JS • NEXT.JS • JAVASCRIPT • TAILWIND CSS • GENERATIVE AI • CLEAN CODE • 
            </MarqueeText>
          </div>

          {/* Center Loading Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Subtle Outer Accent Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#a194f7]/40 via-[#c4b9ff]/20 to-[#a194f7]/40 rounded-full blur-md opacity-60" />
            
            {/* Inner Pill Container */}
            <div className="relative bg-[#0b0b0f] rounded-full px-8 py-4 flex items-center gap-6 border border-white/15 shadow-2xl backdrop-blur-xl">
              <span className="text-white font-semibold text-xs tracking-[0.25em] uppercase">
                Loading
              </span>
              <div className="flex items-center gap-3">
                <span className="text-zinc-200 font-mono text-sm w-9 text-right tabular-nums font-semibold">
                  {count}%
                </span>
                {/* Visual Indicator Track */}
                <div className="w-10 h-1.5 bg-zinc-800 rounded-full overflow-hidden flex items-center relative">
                   <motion.div 
                     className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-zinc-200 to-white rounded-full"
                     style={{ width: `${count}%` }}
                   />
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}