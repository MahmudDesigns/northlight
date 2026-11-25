"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Page-load wipe: a black plate with the wordmark and a gradient progress
 * rule that lifts away once the page is ready. Respects reduced motion.
 */
export default function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hold = reduce ? 120 : 1150;
    const t = window.setTimeout(() => setDone(true), hold);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setVisible(false), 950);
    return () => window.clearTimeout(t);
  }, [done]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="grain fixed inset-0 z-[250] flex flex-col items-center justify-center bg-black px-6"
          initial={{ y: 0 }}
          exit={{ y: "-101%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="mesh pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative w-full max-w-xl text-center">
            <motion.p
              className="label mb-6 text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Copenhagen · Est. 2016
            </motion.p>
            <motion.h1
              className="text-[clamp(2.25rem,9vw,5rem)] font-extrabold leading-none tracking-[-0.05em] text-white"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              NORTH<span className="grad-text grad-text-animated">LIGHT</span>
            </motion.h1>
            <div className="mt-8 h-px w-full overflow-hidden bg-white/15">
              <motion.div
                className="h-full w-full origin-left grad"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduce ? 0.1 : 1.35, ease: "easeInOut" }}
              />
            </div>
            <motion.p
              className="label mt-6 text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Brand · Product · Illustration · Motion
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
