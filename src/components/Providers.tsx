"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { hydrateStores } from "@/lib/store";

/**
 * Client shell: restores persisted theme + engagement state after hydration
 * and globally honours the OS reduced-motion preference for framer-motion.
 */
export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    hydrateStores();
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
