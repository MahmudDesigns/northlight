"use client";

import { Counter, Reveal } from "@/components/ui";
import { stats } from "@/data/site";

/** Black plate with animated figures — tabular DM-style numerals in Sora. */
export default function Stats() {
  return (
    <section className="grain relative overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="mesh pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-6">
          <p className="label text-white/55">[ 02 / By the numbers ]</p>
          <p className="label max-w-[34ch] text-right text-white/55">
            Ten years, one north-facing studio, no account managers
          </p>
        </div>

        <div className="grid grid-cols-1 divide-y divide-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.1}
              className={`py-10 md:py-14 ${i === 0 ? "md:pr-10" : "md:px-10"} ${
                i === 2 ? "md:pr-0 md:pl-10" : ""
              }`}
            >
              <p className="text-[clamp(3.5rem,9vw,6.5rem)] font-extrabold leading-[0.85] tracking-[-0.055em]">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="label mt-5 text-white">{s.label}</p>
              <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/55">
                {s.note}
              </p>
              <span
                aria-hidden="true"
                className="mt-6 block h-px w-16"
                style={{
                  background:
                    i === 0 ? "#4F46E5" : i === 1 ? "#EC4899" : "#F59E0B",
                }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
