"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { GradientButton } from "@/components/ui";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80";

/**
 * The black cover plate: the wordmark cut from a slowly drifting aurora
 * gradient while the studio photograph parallaxes behind it.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.15]);

  return (
    <section
      ref={ref}
      id="home"
      className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-black text-white"
    >
      {/* Parallax studio photograph */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.55]"
        style={{ y: imgY, scale: imgScale }}
        aria-hidden="true"
      >
        <SmartImage
          src={HERO_IMAGE}
          alt=""
          label="Northlight studio"
          zoom={false}
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Scrim + mesh so type always clears the image */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.86) 0%, rgba(0,0,0,.42) 34%, rgba(0,0,0,.72) 72%, #000 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="mesh absolute inset-0 opacity-45 mix-blend-screen"
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative mx-auto w-full max-w-[1440px] px-5 pb-10 pt-32 md:px-8 md:pb-14 md:pt-40"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-5">
          <p className="label text-white/60">[ 01 / Copenhagen — Est. 2016 ]</p>
          <p className="label flex items-center gap-2 text-white/60">
            <span className="animate-pulse-soft inline-block h-2 w-2 rounded-full grad" />
            Booking Q2 2026
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 md:mt-12 md:grid-cols-12 md:gap-8">
          {/* The wordmark */}
          <div className="md:col-span-8">
            <h1 className="text-[clamp(3.4rem,13.5vw,11rem)] font-extrabold leading-[0.84] tracking-[-0.055em]">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: "40%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                NORTH
              </motion.span>
              <motion.span
                className="grad-text grad-text-animated block"
                initial={{ opacity: 0, y: "40%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 1.32, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                LIGHT
              </motion.span>
            </h1>
            <motion.p
              className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/75 md:mt-8 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 1.5, duration: 0.8 }}
            >
              An independent design studio building brand systems, digital
              products, illustration and motion for teams who would rather be
              remembered than merely seen.
            </motion.p>
          </div>

          {/* Side rail */}
          <motion.div
            className="flex flex-col justify-end gap-6 md:col-span-4 md:items-end md:text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 1.66, duration: 0.8 }}
          >
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[
                ["148", "Projects"],
                ["62", "Clients"],
                ["19", "Awards"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="text-2xl font-bold tabular-nums md:text-3xl">{n}</p>
                  <p className="label mt-1.5 text-white/45">{l}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <GradientButton href="#work">
                See the work
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </GradientButton>
              <a
                href="#studio"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/70"
              >
                About the studio
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/15 pt-5 md:mt-14">
          <p className="label text-white/50">Scroll to open the index</p>
          <p className="label hidden text-white/50 sm:block">
            Brand · Product · Illustration · Motion
          </p>
          <p className="label text-white/50">55.6761° N</p>
        </div>
      </motion.div>
    </section>
  );
}
