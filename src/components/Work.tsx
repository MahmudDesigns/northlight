"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetail from "@/components/ProjectDetail";
import { GradientButton, SectionHead } from "@/components/ui";
import { CATEGORIES, projects, type Category } from "@/data/site";
import { resolveLikes, toggleLike, toggleSave, useLikes, useSaves } from "@/lib/store";

type Filter = Category | "All";

/** 12 / 7+5 / 5+7 … — the asymmetric catalogue grid tiles perfectly. */
function spanFor(i: number): "wide" | "lg" | "sm" {
  const m = i % 5;
  if (m === 0) return "wide";
  if (m === 1 || m === 4) return "lg";
  return "sm";
}

export default function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const likes = useLikes();
  const saves = useSaves();

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length };
    CATEGORIES.forEach((c) => {
      map[c] = projects.filter((p) => p.category === c).length;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCat = filter === "All" || p.category === filter;
      if (!matchesCat) return false;
      if (!q) return true;
      const haystack = [
        p.title,
        p.client,
        p.category,
        p.summary,
        p.year,
        ...p.tools,
        ...p.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, query]);

  const active = openSlug ? projects.find((p) => p.slug === openSlug) ?? null : null;
  const activeIdx = active ? filtered.findIndex((p) => p.slug === active.slug) : -1;
  const prev = activeIdx > 0 ? filtered[activeIdx - 1] : null;
  const next =
    activeIdx > -1 && activeIdx < filtered.length - 1 ? filtered[activeIdx + 1] : null;

  const isFiltering = filter !== "All" || query.trim().length > 0;
  const reset = () => {
    setFilter("All");
    setQuery("");
  };

  const filters: Filter[] = ["All", ...CATEGORIES];

  return (
    <section id="work" className="scroll-mt-24 bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead
          index="04"
          label="Selected work"
          title={
            <>
              Twelve projects, each one{" "}
              <span className="grad-text">built to outlive</span> the launch
              week.
            </>
          }
          intro="Filter by discipline or search by client, tool or keyword — the index updates as you type. Open any entry for the full write-up."
        />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-[260px_1fr] lg:gap-12">
          {/* ---------------- sticky index rail ---------------- */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-2 border-b border-line pb-4">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              <label htmlFor="work-search" className="label text-muted">
                Search index
              </label>
            </div>

            <div className="relative mt-4">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                id="work-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. packaging, Figma, Oslo…"
                className="w-full rounded-full border border-line bg-surface py-3.5 pl-11 pr-10 text-sm outline-none transition-all duration-300 placeholder:text-muted focus:border-nl-indigo focus:bg-paper"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <p className="label mt-6 text-muted">Discipline</p>
            <ul className="no-bar mt-3 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              {filters.map((f) => {
                const on = filter === f;
                return (
                  <li key={f} className="shrink-0 lg:w-full">
                    <button
                      type="button"
                      onClick={() => setFilter(f)}
                      aria-pressed={on}
                      className={`relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 lg:justify-start ${
                        on
                          ? "text-white shadow-[0_10px_24px_-14px_rgba(79,70,229,.9)]"
                          : "border border-line text-muted hover:border-transparent hover:bg-surface hover:text-ink"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="filter-active"
                          className="grad absolute inset-0"
                          transition={{ type: "spring", stiffness: 420, damping: 38 }}
                        />
                      )}
                      <span className="relative z-10 whitespace-nowrap">{f}</span>
                      <span
                        className={`label relative z-10 ml-auto hidden lg:inline ${
                          on ? "text-white/80" : "text-muted"
                        }`}
                      >
                        {String(counts[f] ?? 0).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
              <p className="label text-muted" role="status" aria-live="polite">
                {String(filtered.length).padStart(2, "0")} / {projects.length} shown
              </p>
              {isFiltering && (
                <button
                  type="button"
                  onClick={reset}
                  className="label sweep text-nl-indigo transition-opacity hover:opacity-70"
                >
                  Reset
                </button>
              )}
            </div>
          </aside>

          {/* ---------------- gallery ---------------- */}
          <div>
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-12 md:gap-6"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {filtered.map((p, i) => (
                    <ProjectCard
                      key={p.slug}
                      project={p}
                      span={spanFor(i)}
                      liked={p.slug in likes}
                      saved={!!saves[p.slug]}
                      likes={resolveLikes(p.likes, likes, p.slug)}
                      saves={p.saves + (saves[p.slug] ? 1 : 0)}
                      onOpen={() => setOpenSlug(p.slug)}
                      onLike={() => toggleLike(p.slug, p.likes)}
                      onSave={() => toggleSave(p.slug)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-card border border-line px-6 py-16 text-center"
              >
                <div className="mesh pointer-events-none absolute inset-0 opacity-25" />
                <div className="relative">
                  <p className="text-2xl font-bold tracking-[-0.03em]">
                    Nothing in the index matches that.
                  </p>
                  <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-muted">
                    Try “branding”, “Figma” or a city like “Oslo” — or clear the
                    filters to see all twelve projects.
                  </p>
                  <div className="mt-7 flex justify-center">
                    <GradientButton onClick={reset}>Show all projects</GradientButton>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <ProjectDetail
        project={active}
        prev={prev}
        next={next}
        liked={!!active && active.slug in likes}
        saved={!!active && !!saves[active.slug]}
        likes={active ? resolveLikes(active.likes, likes, active.slug) : 0}
        saves={active ? active.saves + (saves[active.slug] ? 1 : 0) : 0}
        onClose={() => setOpenSlug(null)}
        onSelect={(slug) => setOpenSlug(slug)}
        onLike={() => active && toggleLike(active.slug, active.likes)}
        onSave={() => active && toggleSave(active.slug)}
      />
    </section>
  );
}
