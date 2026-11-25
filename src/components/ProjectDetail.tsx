"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Bookmark, Heart, X } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import type { Project } from "@/data/site";

interface Props {
  project: Project | null;
  prev: Project | null;
  next: Project | null;
  liked: boolean;
  saved: boolean;
  likes: number;
  saves: number;
  onClose: () => void;
  onSelect: (slug: string) => void;
  onLike: () => void;
  onSave: () => void;
}

/**
 * Full-screen project detail: large preview, write-up, tooling, year and
 * prev/next navigation. Keyboard: Esc closes, ←/→ move between projects.
 */
export default function ProjectDetail({
  project,
  prev,
  next,
  liked,
  saved,
  likes,
  saves,
  onClose,
  onSelect,
  onLike,
  onSave,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  /* Lock the page behind the sheet and remember where focus came from.
     The opener is captured once, so prev/next navigation never steals focus. */
  useEffect(() => {
    if (project) {
      if (!wasOpen.current) {
        wasOpen.current = true;
        restoreRef.current = document.activeElement as HTMLElement | null;
      }
      document.body.style.overflow = "hidden";
      const t = window.setTimeout(() => closeRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      document.body.style.overflow = "";
      restoreRef.current?.focus?.();
      restoreRef.current = null;
    }
  }, [project]);

  /* Esc + arrow-key navigation */
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && next) onSelect(next.slug);
      if (e.key === "ArrowLeft" && prev) onSelect(prev.slug);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, next, prev, onClose, onSelect]);

  const meta: [string, string][] = project
    ? [
        ["Client", project.client],
        ["Year", String(project.year)],
        ["Discipline", project.category],
        ["Tools", project.tools.join(", ")],
      ]
    : [];

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-labelledby="detail-title">
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close project"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Sheet */}
          <motion.div
            className="absolute inset-0 overflow-y-auto overscroll-contain"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
          >
            <div className="mx-auto w-full max-w-[1120px] px-0 py-0 md:px-6 md:py-10">
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative overflow-hidden border border-line bg-paper md:rounded-card"
              >
                {/* Sticky header */}
                <div className="glass sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-8">
                  <p className="label truncate text-muted">
                    [ {String(project.index).padStart(2, "0")} / {project.category} ]
                  </p>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface"
                  >
                    Close
                    <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                  </button>
                </div>

                <div className="px-5 pb-10 pt-6 md:px-8 md:pb-14 md:pt-8">
                  {/* Large preview */}
                  <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-tight bg-surface md:aspect-[16/9] md:rounded-card">
                    <SmartImage
                      src={project.image}
                      alt={`${project.title} — ${project.category} project for ${project.client}`}
                      label={project.category}
                      priority
                      zoom={false}
                      sizes="(max-width: 1120px) 100vw, 1100px"
                    />
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-12">
                    <div className="md:col-span-8">
                      <h2
                        id="detail-title"
                        className="text-[clamp(2rem,5.5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.05em]"
                      >
                        {project.title}
                      </h2>
                      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl">
                        {project.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-start gap-3 md:col-span-4 md:justify-end">
                      <button
                        type="button"
                        onClick={onLike}
                        aria-pressed={liked}
                        className={`group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium tabular-nums transition-all duration-300 hover:-translate-y-0.5 ${
                          liked
                            ? "border-transparent bg-nl-magenta text-white"
                            : "border-line hover:border-nl-magenta hover:text-nl-magenta"
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                        {likes} likes
                      </button>
                      <button
                        type="button"
                        onClick={onSave}
                        aria-pressed={saved}
                        className={`group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium tabular-nums transition-all duration-300 hover:-translate-y-0.5 ${
                          saved
                            ? "border-transparent bg-nl-indigo text-white"
                            : "border-line hover:border-nl-indigo hover:text-nl-indigo"
                        }`}
                      >
                        <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                        {saves} saves
                      </button>
                    </div>
                  </div>

                  {/* Spec table */}
                  <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
                    {meta.map(([k, v]) => (
                      <div key={k}>
                        <dt className="label text-muted">{k}</dt>
                        <dd className="mt-2.5 text-sm leading-snug font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  {/* Write-up */}
                  <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12">
                    <p className="label md:col-span-3">The brief</p>
                    <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-muted md:col-span-9">
                      {project.description.map((para) => (
                        <p key={para.slice(0, 24)}>{para}</p>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <ul className="mt-10 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="label rounded-full border border-line px-3.5 py-2 text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* Prev / next */}
                  <nav
                    aria-label="Project navigation"
                    className="mt-12 grid grid-cols-1 gap-3 border-t border-line pt-6 sm:grid-cols-2"
                  >
                    {[
                      { p: prev, dir: "Previous" as const },
                      { p: next, dir: "Next" as const },
                    ].map(({ p, dir }) => (
                      <button
                        key={dir}
                        type="button"
                        disabled={!p}
                        onClick={() => p && onSelect(p.slug)}
                        className={`group flex items-center gap-3 rounded-tight border border-line p-4 text-left transition-all duration-300 ${
                          p ? "hover:-translate-y-0.5 hover:bg-surface" : "cursor-not-allowed opacity-40"
                        } ${dir === "Next" ? "sm:flex-row-reverse sm:text-right" : ""}`}
                      >
                        {dir === "Previous" ? (
                          <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
                        ) : (
                          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                        <span className="min-w-0">
                          <span className="label block text-muted">{dir}</span>
                          <span className="mt-1.5 block truncate text-sm font-semibold">
                            {p ? p.title : "End of index"}
                          </span>
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
