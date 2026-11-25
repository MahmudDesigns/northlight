"use client";

import { useState } from "react";

/** Splits an Unsplash URL into responsive widths for srcset. */
function withWidth(src: string, w: number) {
  if (!/[?&]w=\d+/.test(src)) return src;
  return src.replace(/([?&])w=\d+/, `$1w=${w}`);
}

/**
 * Project image with a mesh-gradient fallback.
 * The gradient sits underneath permanently, so it doubles as the loading
 * placeholder and as the fallback if the remote URL ever fails.
 */
export default function SmartImage({
  src,
  alt,
  label,
  className = "",
  sizes = "(max-width: 768px) 100vw, 60vw",
  priority = false,
  zoom = true,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  zoom?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const srcSet = [640, 1024, 1600]
    .map((w) => `${withWidth(src, w)} ${w}w`)
    .join(", ");

  return (
    <>
      {/* Gradient bed — visible while loading and if the image fails. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 mesh"
        style={{
          backgroundColor: "#000",
          opacity: failed || !loaded ? 1 : 0,
          transition: "opacity .7s ease",
        }}
      />
      {failed && label && (
        <span
          aria-hidden="true"
          className="label absolute bottom-4 left-4 z-10 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-white/80 backdrop-blur"
        >
          {label}
        </span>
      )}
      {!failed && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${
            zoom
              ? "transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              : ""
          } ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        />
      )}
    </>
  );
}
