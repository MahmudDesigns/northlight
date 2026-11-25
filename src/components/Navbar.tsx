"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import { toggleTheme, useTheme } from "@/lib/store";
import { GradientButton } from "@/components/ui";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "studio", label: "Studio" },
  { id: "voices", label: "Voices" },
  { id: "contact", label: "Contact" },
];

/** North-pointing studio mark — drawn, not imported. */
function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="nl-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="55%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path d="M16 1.5 20.4 12.1 30.5 16 20.4 19.9 16 30.5 11.6 19.9 1.5 16 11.6 12.1Z" fill="url(#nl-mark)" />
      <path d="M16 7.5 18.4 14.6 25.5 16 18.4 17.4 16 24.5 13.6 17.4 6.5 16 13.6 14.6Z" fill="#000" fillOpacity=".9" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const theme = useTheme();

  /* Transparent over the hero plate, glass once the page starts moving. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Smooth-scroll active-section indicator. */
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Lock body scroll while the mobile sheet is open. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dark = !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-line" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-8">
          <a
            href="#home"
            className={`group flex items-center gap-2.5 transition-colors ${
              dark ? "text-white" : "text-ink"
            }`}
            aria-label="Northlight Studio — back to top"
          >
            <Mark className="h-7 w-7 transition-transform duration-500 group-hover:rotate-90" />
            <span className="text-[15px] font-bold tracking-[-0.03em]">
              NORTH<span className="grad-text">LIGHT</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            className={`hidden items-center gap-9 md:flex ${dark ? "text-white" : "text-ink"}`}
            aria-label="Primary"
          >
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`label sweep relative py-2 transition-opacity duration-300 ${
                  active === l.id ? "opacity-100" : "opacity-55 hover:opacity-100"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="grad absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${
                dark
                  ? "border-white/25 text-white hover:border-white/60"
                  : "border-line text-ink hover:bg-surface"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -70, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 70, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="grid place-items-center"
                >
                  {theme === "dark" ? (
                    <Moon className="h-[17px] w-[17px]" />
                  ) : (
                    <Sun className="h-[17px] w-[17px]" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <div className="hidden sm:block">
              <GradientButton href="#contact" className="px-5 py-3">
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </GradientButton>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`grid h-10 w-10 place-items-center rounded-full border md:hidden ${
                dark ? "border-white/25 text-white" : "border-line text-ink"
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="grain fixed inset-0 z-[90] bg-black px-6 py-6 text-white md:hidden"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="mesh pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold tracking-[-0.03em]">
                  NORTH<span className="grad-text">LIGHT</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/25"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-auto mb-auto flex flex-col gap-2" aria-label="Mobile">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-baseline gap-4 border-b border-white/10 py-4"
                  >
                    <span className="label text-white/40">0{i + 1}</span>
                    <span className="text-4xl font-bold tracking-[-0.04em]">{l.label}</span>
                  </motion.a>
                ))}
              </nav>

              <GradientButton href="#contact" onClick={() => setOpen(false)} className="w-full">
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
