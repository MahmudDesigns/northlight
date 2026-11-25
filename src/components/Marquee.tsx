"use client";

import { marqueeWords } from "@/data/site";

/**
 * Service marquee — continues the black cover plate below the hero.
 * Duplicated track with a CSS translate for a seamless 42s loop.
 */
export default function Marquee() {
  const track = [...marqueeWords, ...marqueeWords];

  return (
    <div
      className="relative overflow-hidden border-y border-white/12 bg-black py-5 text-white"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {track.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-6 text-sm font-medium tracking-[-0.01em] md:text-base">
              {word}
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background:
                  i % 3 === 0 ? "#4F46E5" : i % 3 === 1 ? "#EC4899" : "#F59E0B",
              }}
            />
          </span>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        style={{ background: "linear-gradient(90deg,#000,transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        style={{ background: "linear-gradient(270deg,#000,transparent)" }}
      />
    </div>
  );
}
