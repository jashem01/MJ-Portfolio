"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MarqueeText = ({ children, direction = 1, speed = 20 }) => (
  <div className="flex whitespace-nowrap overflow-hidden py-2 select-none pointer-events-none opacity-50 mix-blend-overlay">
    <motion.div
      className="flex min-w-max"
      animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ ease: "linear", duration: speed, repeat: Infinity }}
    >
      <h1 className="text-[10vw] font-bold text-[#0e0d0f] px-4 tracking-tighter">
        {children}
      </h1>
      <h1 className="text-[10vw] font-bold text-[#0e0d0f] px-4 tracking-tighter">
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
          setTimeout(() => setShow(false), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 18);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 bg-[#e9e7ec] z-[99999] flex items-center justify-center overflow-hidden"
        >
          {/* Background Marquee Texts */}
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-80 pointer-events-none z-0">
            <MarqueeText speed={25} direction={1}>
              MOHAMMED JASHEM • WEB DEVELOPER • FRONTEND DEVELOPER • UI/UX DESIGNER • REACT DEVELOPER • MERN STACK DEVELOPER • 
            </MarqueeText>
          </div>

          {/* Center Loading Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Outer Glow */}
            <div className="absolute inset-[-4px] bg-gradient-to-r from-[#a194f7] to-[#e0d9ff] rounded-full blur-sm opacity-50" />
            
            {/* Inner Pill */}
            <div className="relative bg-[#0e0d0f] rounded-full px-8 py-4 flex items-center gap-6 border border-white/10 shadow-2xl">
              <span className="text-white font-medium text-sm tracking-[0.2em] uppercase">
                Loading
              </span>
              <div className="flex items-center gap-3">
                <span className="text-white font-medium text-sm w-8 text-right tabular-nums">
                  {count}%
                </span>
                {/* Visual Indicator (tiny animated square) */}
                <div className="w-6 h-1.5 bg-zinc-800 rounded-sm overflow-hidden flex items-center relative">
                   <motion.div 
                     className="absolute left-0 top-0 bottom-0 bg-white"
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