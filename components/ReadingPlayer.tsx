"use client";

import { useEffect } from "react";
import { audioManager } from "@/lib/audioManager";
import { useAudioManager } from "@/lib/useAudioManager";
import type { SoundtrackMeta } from "@/lib/stories";

export default function ReadingPlayer({
  slug,
  soundtrack,
}: {
  slug: string;
  soundtrack: SoundtrackMeta;
}) {
  const state = useAudioManager();

  // If a visitor lands here directly (no prior click on a story card),
  // prime the track and show a manual Play control rather than attempting
  // a blocked autoplay.
  useEffect(() => {
    if (state.slug !== slug) {
      audioManager.prime({
        slug,
        title: soundtrack.title,
        artist: soundtrack.artist,
        file: soundtrack.file,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const isCurrent = state.slug === slug;
  const isPlaying = isCurrent && state.isPlaying;
  const needsTap = isCurrent && state.blocked && !state.isPlaying;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-ink-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-3 text-ivory-300">
        <button
          type="button"
          onClick={() => audioManager.toggle()}
          aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 hover:border-white/40"
        >
          {isPlaying ? (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
              <rect x="1" y="0.5" width="3.5" height="11" />
              <rect x="7" y="0.5" width="3.5" height="11" />
            </svg>
          ) : (
            <svg width="10" height="12" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
              <path d="M0 0L12 7L0 14V0Z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={() => audioManager.toggleMute()}
          aria-label={state.isMuted ? "Unmute" : "Mute"}
          className="hidden text-xs uppercase tracking-wide2 text-ivory-500 hover:text-ivory-100 sm:block"
        >
          {state.isMuted ? "Muted" : "Mute"}
        </button>

        <input
          type="range"
          className="bq-slider w-20 sm:w-28"
          min={0}
          max={1}
          step={0.01}
          value={state.volume}
          aria-label="Volume"
          onChange={(e) => audioManager.setVolume(parseFloat(e.target.value))}
        />

        <div className="min-w-0 flex-1 truncate text-xs italic text-ivory-500">
          {soundtrack.title} · {soundtrack.artist}
        </div>

        {needsTap && (
          <button
            type="button"
            onClick={() => audioManager.play()}
            className="shrink-0 border border-white/20 px-3 py-1 text-xs text-ivory-100 hover:border-white/40"
          >
            Play Soundtrack
          </button>
        )}
      </div>
    </div>
  );
}
