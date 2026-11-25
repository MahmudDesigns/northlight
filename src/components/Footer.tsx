"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Briefcase, Camera, Check, PenTool, X } from "lucide-react";
import { CONTACT_EMAIL } from "@/data/site";

const NAV = [
  { id: "work", label: "Work" },
  { id: "studio", label: "Studio" },
  { id: "voices", label: "Voices" },
  { id: "contact", label: "Contact" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com", Icon: Camera },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Briefcase },
  { label: "Dribbble", href: "https://dribbble.com", Icon: PenTool },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  /* Auto-dismiss the confirmation toast. */
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 4600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Enter an email address");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setError("That address doesn't look right");
      return;
    }
    setError("");
    setBusy(true);
    /* Front-end only — persists locally, no external service needed. */
    window.setTimeout(() => {
      setBusy(false);
      setEmail("");
      setToast("You're on the list — the next North Letter lands in March.");
    }, 900);
  };

  return (
    <footer className="grain relative overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="mesh pointer-events-none absolute inset-x-0 top-0 h-80 opacity-45 mix-blend-screen"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        {/* Newsletter */}
        <div className="grid grid-cols-1 gap-8 border-b border-white/15 py-14 md:grid-cols-12 md:gap-12 md:py-20">
          <div className="md:col-span-5">
            <p className="label text-white/55">[ 07 / North Letter ]</p>
            <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
              One email a month.
              <br />
              <span className="grad-text">Process, not promotions.</span>
            </h2>
          </div>

          <div className="md:col-span-7 md:pt-10">
            <form onSubmit={subscribe} noValidate>
              <label htmlFor="nl-email" className="label block text-white/55">
                Your email address
              </label>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    id="nl-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="you@company.com"
                    aria-invalid={!!error}
                    aria-describedby={error ? "nl-error" : undefined}
                    className={`w-full rounded-full border bg-transparent px-5 py-4 text-base text-white outline-none transition-all duration-300 placeholder:text-white/40 ${
                      error ? "border-nl-magenta" : "border-white/25 focus:border-white/70"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="group relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                >
                  <span className="grad absolute inset-0 transition-transform duration-500 group-hover:scale-110" />
                  <span className="relative z-10">
                    {busy ? "Joining…" : "Subscribe"}
                  </span>
                </button>
              </div>
              <div className="mt-3 flex items-center gap-3">
                {error ? (
                  <p id="nl-error" className="label text-nl-magenta" role="alert">
                    {error}
                  </p>
                ) : (
                  <p className="label text-white/45">
                    Unsubscribe in one click · No third-party trackers
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Wordmark + links */}
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <a href="#home" className="group block" aria-label="Northlight Studio, back to top">
              <span
                className="relative block text-[clamp(2.6rem,7vw,5rem)] font-extrabold leading-[0.86] tracking-[-0.055em] text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.35)" }}
              >
                NORTH
                <br />
                LIGHT
                <span
                  aria-hidden="true"
                  className="grad-text grad-text-animated absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ WebkitTextStroke: "0px" }}
                >
                  NORTH
                  <br />
                  LIGHT
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-white/55">
              An independent design studio in Copenhagen working across brand,
              product, illustration and motion since 2016.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <p className="label text-white/45">Index</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="sweep text-base font-medium text-white/85 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="label text-white/45">Elsewhere</p>
            <ul className="mt-5 space-y-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2.5 text-base font-medium text-white/85 transition-colors hover:text-white"
                  >
                    <Icon
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="sweep inline-block text-base font-medium text-white/85 transition-colors hover:text-white"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-5 border-t border-white/15 py-7 sm:flex-row sm:items-center">
          <p className="label text-white/55">
            © 2026 MahmudDesigns. All rights reserved.
          </p>
          <p className="label hidden text-white/40 md:block">
            Vesterbro · 55.6761° N, 12.5683° E
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Newsletter confirmation toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 right-5 z-[130] flex w-[min(24rem,calc(100vw-2.5rem))] items-start gap-3 overflow-hidden rounded-card border border-white/15 bg-black/90 p-4 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)] backdrop-blur-xl"
          >
            <span aria-hidden="true" className="grad absolute inset-x-0 top-0 h-0.5" />
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white grad">
              <Check className="h-4 w-4" />
            </span>
            <p className="flex-1 pt-1.5 text-sm leading-relaxed">{toast}</p>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
              className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
