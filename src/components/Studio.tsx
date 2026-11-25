"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { Reveal, SectionHead } from "@/components/ui";
import { services, studio } from "@/data/site";

const DESK =
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80";
const PRESS =
  "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=900&q=80";

/** The studio: overlapping print detail + the working desk, gently parallaxed. */
export default function Studio() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const deskY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "6%"]);
  const pressY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-8%"]);

  return (
    <section id="studio" ref={ref} className="scroll-mt-24 bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead
          index="03"
          label="The studio"
          title={
            <>
              Eleven people, one north-facing room,{" "}
              <span className="grad-text">no account managers</span>.
            </>
          }
          intro="We are a small Copenhagen practice that works the way a print shop does: proof, argue, revise, ship. Clients talk to the people drawing the work — from kickoff to the final handover file."
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* Imagery */}
          <div className="relative lg:col-span-5">
            <Reveal className="relative overflow-hidden rounded-card border border-line">
              <motion.div style={{ y: deskY }} className="relative aspect-[4/5] overflow-hidden">
                <SmartImage
                  src={DESK}
                  alt="Northlight designers reviewing printed brand specimens on a studio worktable"
                  label="The studio"
                  zoom={false}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </motion.div>
            </Reveal>

            <Reveal
              delay={0.15}
              className="absolute -bottom-8 right-4 w-[52%] overflow-hidden rounded-card border border-line shadow-[0_40px_70px_-45px_rgba(0,0,0,.6)] sm:right-8 lg:-right-6 lg:w-[58%]"
            >
              <motion.div style={{ y: pressY }} className="relative aspect-[4/3] overflow-hidden">
                <SmartImage
                  src={PRESS}
                  alt="Freshly printed sheets drying on a rack under an amber work lamp"
                  label="Press"
                  zoom={false}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </motion.div>
            </Reveal>
          </div>

          {/* Copy + services */}
          <div className="lg:col-span-7 lg:pl-6">
            <Reveal>
              <p className="max-w-[54ch] text-lg leading-relaxed text-muted md:text-xl">
                Northlight opened in {studio.founded} above a letterpress on
                Vesterbro with one rule: the work has to survive being printed
                in black and white. Everything we make is tested against
                grayscale, a 320px screen and a four-second attention span.
              </p>
            </Reveal>

            <ul className="mt-10 border-t border-line">
              {services.map((s, i) => (
                <Reveal as="li" key={s.n} delay={i * 0.07}>
                  <div className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-b border-line py-6 transition-colors duration-300 hover:bg-surface md:grid-cols-[3rem_1fr_1.4fr] md:gap-x-8">
                    <span className="label pt-1.5 text-muted transition-colors group-hover:text-nl-indigo">
                      {s.n}
                    </span>
                    <h3 className="text-xl font-bold tracking-[-0.03em] md:text-2xl">
                      {s.title}
                    </h3>
                    <p className="col-span-2 text-sm leading-relaxed text-muted md:col-span-1 md:pt-1.5">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.1}>
              <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  ["Founded", String(studio.founded)],
                  ["Team", `${studio.team} people`],
                  ["Base", "Copenhagen"],
                  ["Awards", `${studio.awards}`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="label text-muted">{k}</dt>
                    <dd className="mt-2.5 text-lg font-bold tracking-[-0.03em]">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.15}>
              <a
                href="#contact"
                className="group mt-10 inline-flex items-center gap-2 text-base font-semibold sweep"
              >
                Work with the studio
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
