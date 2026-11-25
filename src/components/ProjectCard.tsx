"use client";

import { motion } from "framer-motion";
import { Bookmark, Heart, ArrowUpRight } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import type { Project } from "@/data/site";

const SPAN: Record<string, string> = {
  wide: "md:col-span-12",
  lg: "md:col-span-7",
  sm: "md:col-span-5",
};

const MIN_H: Record<string, string> = {
  wide: "min-h-[300px] md:min-h-[440px]",
  lg: "min-h-[280px] md:min-h-[380px]",
  sm: "min-h-[280px] md:min-h-[380px]",
};

function LikeSave({
  liked,
  saved,
  likes,
  saves,
  onLike,
  onSave,
}: {
  liked: boolean;
  saved: boolean;
  likes: number;
  saves: number;
  onLike: () => void;
  onSave: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <button
        type="button"
        onClick={onLike}
        aria-pressed={liked}
        aria-label={liked ? "Remove like" : "Like this project"}
        className={`group/btn inline-flex items-center gap-1.5 rounded-full border px-2.5 py-2 text-[11px] font-medium tabular-nums transition-all duration-300 hover:-translate-y-0.5 ${
          liked
            ? "border-transparent bg-nl-magenta text-white"
            : "border-line text-muted hover:border-nl-magenta hover:text-nl-magenta"
        }`}
      >
        <Heart
          className={`h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:scale-110 ${
            liked ? "fill-current" : ""
          }`}
        />
        {likes}
      </button>
      <button
        type="button"
        onClick={onSave}
        aria-pressed={saved}
        aria-label={saved ? "Remove from saved" : "Save this project"}
        className={`group/btn inline-flex items-center gap-1.5 rounded-full border px-2.5 py-2 text-[11px] font-medium tabular-nums transition-all duration-300 hover:-translate-y-0.5 ${
          saved
            ? "border-transparent bg-nl-indigo text-white"
            : "border-line text-muted hover:border-nl-indigo hover:text-nl-indigo"
        }`}
      >
        <Bookmark
          className={`h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:scale-110 ${
            saved ? "fill-current" : ""
          }`}
        />
        {saves}
      </button>
    </div>
  );
}

export default function ProjectCard({
  project,
  span,
  liked,
  saved,
  likes,
  saves,
  onOpen,
  onLike,
  onSave,
}: {
  project: Project;
  span: "wide" | "lg" | "sm";
  liked: boolean;
  saved: boolean;
  likes: number;
  saves: number;
  onOpen: () => void;
  onLike: () => void;
  onSave: () => void;
}) {
  const { title, client, category, year, image, index } = project;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-shadow duration-500 hover:shadow-[0_36px_70px_-40px_rgba(0,0,0,0.45)] grad-border ${SPAN[span]}`}
    >
      <div className={`relative flex-1 overflow-hidden ${MIN_H[span]}`}>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open project: ${title}`}
          className="absolute inset-0 z-10 block h-full w-full cursor-pointer overflow-hidden"
        >
          <SmartImage
            src={image}
            alt={`${title} — ${category} project for ${client}`}
            label={category}
            sizes={span === "wide" ? "(max-width: 768px) 100vw, 90vw" : "(max-width: 768px) 100vw, 45vw"}
          />
        </button>

        {/* Scrim keeps the chips legible over any photograph */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-28"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-4">
          <span className="label rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-white backdrop-blur-md">
            {category}
          </span>
          <span className="label rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-white backdrop-blur-md">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 z-20 grid h-11 w-11 origin-center scale-75 place-items-center rounded-full text-white opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 grad"
        >
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>

      <div className="relative z-20 flex items-start justify-between gap-4 border-t border-line p-5">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold tracking-[-0.03em] md:text-xl">
            <button
              type="button"
              onClick={onOpen}
              className="sweep text-left transition-colors duration-300 hover:text-nl-indigo"
            >
              {title}
            </button>
          </h3>
          <p className="label mt-2.5 truncate text-muted">
            {client} · {year}
          </p>
        </div>
        <LikeSave
          liked={liked}
          saved={saved}
          likes={likes}
          saves={saves}
          onLike={onLike}
          onSave={onSave}
        />
      </div>
    </motion.article>
  );
}
