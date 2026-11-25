"use client";

/**
 * Tiny module stores + useSyncExternalStore bindings.
 * Everything persists to localStorage and degrades gracefully when storage is
 * unavailable (private mode / SSR), so the site needs no backend at all.
 */
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const THEME_KEY = "northlight:theme";
const LIKES_KEY = "northlight:likes";
const SAVES_KEY = "northlight:saves";

/* ----------------------------- tiny pub/sub ------------------------------ */

function createStore<T>(initial: T) {
  let value = initial;
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    set: (next: T) => {
      value = next;
      listeners.forEach((l) => l());
    },
    subscribe: (l: () => void) => {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
  };
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — the session still works, it just won't persist */
  }
}

/* -------------------------------- theme ---------------------------------- */

const themeStore = createStore<Theme>("light");
let themeHydrated = false;

export function hydrateStores() {
  if (themeHydrated) return;
  themeHydrated = true;

  const stored = read<Theme | null>(THEME_KEY, null);
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme: Theme = stored ?? (prefersDark ? "dark" : "light");
  applyTheme(theme);
  themeStore.set(theme);

  likesStore.set({ ...read<Record<string, number>>(LIKES_KEY, {}), ...likesStore.get() });
  savesStore.set({ ...read<Record<string, boolean>>(SAVES_KEY, {}), ...savesStore.get() });
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function useTheme() {
  return useSyncExternalStore(
    themeStore.subscribe,
    themeStore.get,
    () => "light" as Theme,
  );
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  themeStore.set(theme);
  write(THEME_KEY, theme);
}

export function toggleTheme() {
  setTheme(themeStore.get() === "dark" ? "light" : "dark");
}

/* --------------------------- likes & saves ------------------------------ */

type Likes = Record<string, number>;
type Saves = Record<string, boolean>;

const likesStore = createStore<Likes>({});
const savesStore = createStore<Saves>({});

const emptyLikes: Likes = {};
const emptySaves: Saves = {};

export function useLikes() {
  return useSyncExternalStore(likesStore.subscribe, likesStore.get, () => emptyLikes);
}

export function useSaves() {
  return useSyncExternalStore(savesStore.subscribe, savesStore.get, () => emptySaves);
}

/** Toggles a like, keeping the base count from the dataset as the floor. */
export function toggleLike(slug: string, base: number) {
  const current = likesStore.get();
  const liked = slug in current;
  const next: Likes = { ...current };
  if (liked) {
    delete next[slug];
  } else {
    next[slug] = base + 1;
  }
  likesStore.set(next);
  write(LIKES_KEY, next);
  return !liked;
}

export function toggleSave(slug: string) {
  const current = savesStore.get();
  const saved = !current[slug];
  const next: Saves = { ...current };
  if (saved) next[slug] = true;
  else delete next[slug];
  savesStore.set(next);
  write(SAVES_KEY, next);
  return saved;
}

/** Resolves the live count for a project (base count + local override). */
export function resolveLikes(base: number, likes: Likes, slug: string) {
  return slug in likes ? likes[slug] : base;
}
