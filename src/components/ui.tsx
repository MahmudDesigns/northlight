"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* --------------------------- scroll reveal ------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Words that rise out of a mask, one after another — the load-in of the site. */
export function MaskLine({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: reduce ? 0 : "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/* ------------------------------ section head ----------------------------- */

/** Editorial two-column header: catalogue label rail + oversized statement. */
export function SectionHead({
  index,
  label,
  title,
  intro,
  dark = false,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 border-t pt-6 md:grid-cols-12 md:gap-10"
      style={{ borderColor: dark ? "var(--plate-line)" : "var(--line)" }}
    >
      <div className="md:col-span-3">
        <p
          className={`label flex items-center gap-2 ${dark ? "text-plate-muted" : "text-muted"}`}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full grad" />
          [ {index} / {label} ]
        </p>
      </div>
      <div className="md:col-span-9">
        <h2
          className={`text-balance text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.03] ${
            dark ? "text-plate-text" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p
            className={`mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed md:text-lg ${
              dark ? "text-plate-muted" : "text-muted"
            }`}
          >
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}

/* -------------------------------- buttons -------------------------------- */

export function GradientButton({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  disabled,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const cls = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${className}`;
  const inner = (
    <>
      <span className="grad absolute inset-0 transition-transform duration-500 group-hover:scale-[1.12]" />
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,.28), rgba(255,255,255,0) 60%)",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

/** Outlined control used for filters, sliders and secondary actions. */
export function GhostButton({
  children,
  onClick,
  active = false,
  className = "",
  ariaLabel,
  ariaPressed,
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  ariaLabel?: string;
  ariaPressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
        active
          ? "border-transparent text-white"
          : "border-line text-ink hover:bg-surface"
      } ${className}`}
    >
      {active && <span className="grad absolute inset-0 rounded-full" />}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

/* ------------------------------- counter --------------------------------- */

/** rAF count-up that fires once the element enters the viewport. */
export function Counter({
  value,
  suffix = "",
  duration = 1900,
  className = "",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}
      {suffix}
    </span>
  );
}

/* --------------------------- misc utilities ------------------------------ */

export const spring: Transition = { type: "spring", stiffness: 260, damping: 30 };

export function Rule({ dark = false }: { dark?: boolean }) {
  return (
    <hr
      className="border-0 border-t"
      style={{ borderColor: dark ? "var(--plate-line)" : "var(--line)" }}
    />
  );
}
