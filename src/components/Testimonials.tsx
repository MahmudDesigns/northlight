"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { SectionHead } from "@/components/ui";
import { testimonials } from "@/data/site";

const DURATION = 7000;

/** Autoplaying slider: pause on hover/focus, swipeable, arrow-navigable. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();

  const go = (next: number, d: number) => {
    setDir(d);
    setIndex((next + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (paused || reduce) return;
    const t = window.setTimeout(() => go(index + 1, 1), DURATION);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, reduce]);

  const t = testimonials[index];
  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <section
      id="voices"
      className="grain relative scroll-mt-24 overflow-hidden bg-black py-16 text-white md:py-24"
    >
      <div
        aria-hidden="true"
        className="mesh pointer-events-none absolute inset-0 opacity-45 mix-blend-screen"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead
          index="05"
          label="Voices"
          dark
          title={
            <>
              What clients say once the{" "}
              <span className="grad-text">launch noise</span> settles down.
            </>
          }
        />

        <div
          className="mt-12 md:mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div className="relative min-h-[380px] sm:min-h-[340px] md:min-h-[320px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: reduce ? 0 : dir * 46 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : dir * -46 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70 || info.velocity.x < -450)
                    go(index + 1, 1);
                  else if (info.offset.x > 70 || info.velocity.x > 450)
                    go(index - 1, -1);
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <span
                  aria-hidden="true"
                  className="grad-text block text-[5rem] font-extrabold leading-[0.6] md:text-[7rem]"
                >
                  “
                </span>
                <blockquote className="mt-6 max-w-[30ch] text-[clamp(1.5rem,3.6vw,2.75rem)] font-semibold leading-[1.16] tracking-[-0.035em] sm:max-w-[34ch] md:max-w-[38ch]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white grad"
                  >
                    {initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="label mt-1.5 block text-white/55">
                      {t.role} · {t.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/15 pt-6">
            <div className="flex items-center gap-3">
              <span className="label tabular-nums text-white/70">
                {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5" role="group" aria-label="Choose testimonial">
                {testimonials.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-current={i === index ? "true" : undefined}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => go(i, i > index ? 1 : -1)}
                    className="group h-6 w-6 rounded-full"
                  >
                    <span
                      className={`block h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        i === index
                          ? "w-6 grad"
                          : "bg-white/30 group-hover:bg-white/70"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60"
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => go(index - 1, -1)}
                aria-label="Previous testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1, 1)}
                aria-label="Next testimonial"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Autoplay progress */}
          <div className="mt-4 h-px w-full overflow-hidden bg-white/12">
            {!reduce && (
              <div
                key={index}
                className="h-full w-full grad animate-progress"
                style={{ animationPlayState: paused ? "paused" : "running" }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
