"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Cursor-following gradient glow (desktop pointers only).
 * Uses `hard-light` blending so the glow reads over both white paper and the
 * black plates without switching themes.
 */
export default function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 90, damping: 24, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 90, damping: 24, mass: 0.7 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 h-0 w-0"
      style={{ x: sx, y: sy }}
    >
      <div
        className="h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          mixBlendMode: "hard-light",
          opacity: 0.5,
          background:
            "radial-gradient(circle at 50% 50%, rgba(79,70,229,.85) 0%, rgba(236,72,153,.55) 38%, rgba(245,158,11,.32) 58%, rgba(245,158,11,0) 72%)",
        }}
      />
    </motion.div>
  );
}
