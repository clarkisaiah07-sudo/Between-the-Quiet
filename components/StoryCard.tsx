"use client";

import Link from "next/link";
import type { StoryMeta } from "@/lib/stories";
import { audioManager } from "@/lib/audioManager";

export default function StoryCard({ story }: { story: StoryMeta }) {
  const { base, deep, accent } = story.theme;

  function handleClick() {
    // Fire inside the click gesture so iOS Safari permits playback to
    // begin before the route transition completes. No-op if this story
    // has no soundtrack yet.
    if (story.soundtrack) {
      audioManager.loadAndPlay({
        slug: story.slug,
        title: story.soundtrack.title,
        artist: story.soundtrack.artist,
        file: story.soundtrack.file,
      });
    }
  }

  return (
    <Link
      href={`/stories/${story.slug}`}
      onClick={handleClick}
      className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden border border-white/10 p-6 transition-colors duration-500 hover:border-white/20"
      style={{
        backgroundColor: "#0b0a09",
        backgroundImage: `radial-gradient(170% 140% at 20% -20%, ${base} 0%, ${deep} 32%, #0b0a09 78%)`,
        filter: "saturate(0.72) brightness(0.88) contrast(1.03)",
      }}
    >
      {/* Fine grain, layered so the color field reads as a worn/painted
          sheet rather than a flat digital gradient. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 0 90px 20px rgba(0,0,0,0.55)",
        }}
      />

      <div className="relative z-10">
        <h3 className="font-serif text-2xl leading-tight text-ivory-100">
          {story.title}
        </h3>
        <p className="mt-2 italic text-ivory-300">{story.teaser}</p>
        <div
          className="mt-5 mb-3 h-px w-8"
          style={{ backgroundColor: accent }}
        />
        <span className="text-sm text-ivory-300 transition-colors group-hover:text-ivory-100">
          {story.status === "unfinished" ? "Coming Soon" : "Read"}
          {story.status !== "unfinished" && (
            <span aria-hidden="true"> &rarr;</span>
          )}
        </span>
      </div>
    </Link>
  );
}
